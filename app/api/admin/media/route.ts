
import { requireAdmin } from "@/lib/admin-auth";
import { listMedia, saveMedia } from "@/lib/cms-media";
import { randomUUID } from "node:crypto";
import sharp from "sharp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await requireAdmin())) {
    return Response.json(
      { error: "دسترسی غیرمجاز" },
      { status: 401 }
    );
  }

  try {
    const images = await listMedia();

    return Response.json(images, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Media list failed:", error);

    return Response.json(
      { error: "دریافت تصاویر ناموفق بود." },
      { status: 503 }
    );
  }
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return Response.json(
      { error: "دسترسی غیرمجاز" },
      { status: 401 }
    );
  }

  if (req.headers.get("sec-fetch-site") === "cross-site") {
    return Response.json(
      { error: "درخواست غیرمجاز" },
      { status: 403 }
    );
  }

  let stage = "validation";

  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!(file instanceof File) || file.size === 0) {
      return Response.json(
        { error: "لطفاً یک تصویر انتخاب کنید." },
        { status: 400 }
      );
    }

    if (file.size > 4 * 1024 * 1024) {
      return Response.json(
        { error: "حداکثر حجم فایل ۴ مگابایت است." },
        { status: 413 }
      );
    }

    stage = "processing";

    const input = sharp(
      Buffer.from(await file.arrayBuffer()),
      {
        limitInputPixels: 25000000,
      }
    );

    const metadata = await input.metadata();

    if (
      !["jpeg", "png", "webp", "avif"].includes(
        metadata.format ?? ""
      ) ||
      (metadata.pages ?? 1) > 1
    ) {
      return Response.json(
        { error: "فرمت تصویر پشتیبانی نمی‌شود." },
        { status: 415 }
      );
    }

    const { data, info } = await input
      .rotate()
      .resize({
        width: 1600,
        height: 1600,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: 75,
      })
      .toBuffer({
        resolveWithObject: true,
      });

    if (data.length > 1024 * 1024) {
      return Response.json(
        { error: "حجم تصویر پردازش‌شده بیش از حد مجاز است." },
        { status: 413 }
      );
    }

    console.log("Processed image:", {
      originalSize: file.size,
      compressedSize: data.length,
      width: info.width,
      height: info.height,
    });

    stage = "database";

    const id = randomUUID();

    await saveMedia(id, file.name.slice(0, 200), info.width, info.height, data);

    console.log("Media saved successfully:", id);

    return Response.json({
      url: `/api/media/${id}`,
    });
  } catch (error) {
    console.error(`Media upload failed [${stage}]:`, error);

    return Response.json(
      {
        error:
          stage === "database"
            ? "ارتباط با دیتابیس هنگام ذخیره تصویر ناموفق بود."
            : "پردازش تصویر ناموفق بود.",
      },
      {
        status: stage === "database" ? 503 : 422,
      }
    );
  }
}
