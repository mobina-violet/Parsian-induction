"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { saveSettings } from "@/app/actions/admin-settings";
import { MediaUpload } from "@/components/admin/MediaUpload";

type SettingField = { key: string; label: string; value: string };

export function SettingsForm({ group, fields }: { group: string; fields: SettingField[] }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // فیلدهایی که اسمشان با Image تمام می‌شود، علاوه بر آدرس، دکمه‌ی آپلود عکس هم دارند
  const isImage = (key: string) => key.endsWith("Image");

  return (
    <form
      ref={formRef}
      className="space-y-4 rounded-2xl border bg-white p-5"
      onSubmit={async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setBusy(true);
        try {
          const r = await saveSettings(group, data);
          setMessage(r.success ? "تغییرات ذخیره شد" : r.error ?? "خطا");
          if (r.success) router.refresh();
        } catch {
          setMessage("خطای ارتباط");
        } finally {
          setBusy(false);
        }
      }}>
      {fields.map((f) => (
        <div key={f.key} className="space-y-2 text-sm">
          <label className="block space-y-1">
            <span>{f.label}</span>
            <textarea
              name={f.key}
              defaultValue={f.value}
              required
              maxLength={2000}
              rows={isImage(f.key) ? 1 : f.value.length > 80 ? 4 : 2}
              dir={isImage(f.key) ? "ltr" : undefined}
              className="block w-full rounded-xl border p-3"
            />
          </label>

          {isImage(f.key) && (
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.value}
                alt=""
                className="mb-2 max-h-32 rounded-lg border object-contain"
              />
              <p className="mb-1 text-xs text-gray-500">
                عکس جدید آپلود کن؛ آدرسش خودکار در کادر بالا می‌نشیند. بعد «ذخیره تغییرات» را بزن.
              </p>
              <MediaUpload
                onSelect={(url) => {
                  const el = formRef.current?.elements.namedItem(f.key);
                  if (el instanceof HTMLTextAreaElement) el.value = url;
                }}
              />
            </div>
          )}
        </div>
      ))}
      <button disabled={busy} className="rounded-xl bg-orange-600 px-5 py-2 text-white">
        {busy ? "در حال ذخیره" : "ذخیره تغییرات"}
      </button>
      <p role="status">{message}</p>
    </form>
  );
}
