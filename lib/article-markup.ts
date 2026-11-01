// قالب سادهٔ محتوای مقاله (هر خط = یک بلوک):
//   ## عنوان                      → h2 (با فهرست مطالب خودکار)
//   [متن](/مسیر)  یا  **متن**      → لینک / بولد داخل متن
//   ![توضیح](/images/articles/x.webp)   → عکس ۱۶:۹ (توضیح = alt و کپشن)
//   - مورد                        → لیست نقطه‌ای (خط‌های پشت‌سرهم)
//   ۱. مورد                       → لیست شماره‌دار (خط‌های پشت‌سرهم)
//   > # عنوان  /  > متن  /  > - مورد   → کادر خلاصه یا نکته
//   >> # عنوان /  >> متن               → کادر هشدار ایمنی
//   | ستون ۱ | ستون ۲ |             → جدول (خط اول = سرستون؛ خط جداکننده |---| اختیاری)
//   ## پرسش‌های متداول             → بعدش «### سؤال» و پاراگراف جواب

export const FAQ_HEADING = "پرسش‌های متداول";

export type InlineToken =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "link"; label: string; href: string };

export type FaqItem = { q: string; a: string };

export type CalloutLine = { kind: "p" | "li"; text: string };

export type ArticleBlock =
  | { type: "h2"; text: string; id: string }
  | { type: "p"; text: string }
  | { type: "img"; alt: string; src: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | {
      type: "callout";
      variant: "info" | "warning";
      title?: string;
      lines: CalloutLine[];
    }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "faq"; items: FaqItem[] };

const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

export function parseInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let last = 0;

  for (const match of text.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) {
      tokens.push({ type: "text", value: text.slice(last, index) });
    }
    if (match[1]) {
      tokens.push({ type: "link", label: match[1], href: match[2] });
    } else {
      tokens.push({ type: "bold", value: match[3] });
    }
    last = index + match[0].length;
  }

  if (last < text.length) {
    tokens.push({ type: "text", value: text.slice(last) });
  }

  return tokens;
}

// برای JSON-LD و متن ساده: لینک و بولد رو برمی‌داره
export function stripMarkup(text: string) {
  return text
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1");
}

const ORDERED = /^[0-9۰-۹]+[.)]\s+/;
const SEPARATOR_ROW = /^\|?[\s:|-]+\|?$/;

function splitRow(line: string) {
  return line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

export function parseArticle(content: string): ArticleBlock[] {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const blocks: ArticleBlock[] = [];
  let h2Count = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // ===== h2 و FAQ =====
    if (line.startsWith("## ")) {
      const title = line.slice(3);
      h2Count++;
      blocks.push({ type: "h2", text: title, id: `section-${h2Count}` });
      i++;

      if (title === FAQ_HEADING) {
        const items: FaqItem[] = [];

        while (i < lines.length && !lines[i].startsWith("## ")) {
          if (lines[i].startsWith("### ")) {
            const q = lines[i].slice(4);
            i++;
            const answer: string[] = [];
            while (
              i < lines.length &&
              !lines[i].startsWith("### ") &&
              !lines[i].startsWith("## ")
            ) {
              answer.push(lines[i]);
              i++;
            }
            items.push({ q, a: answer.join(" ") });
          } else {
            i++;
          }
        }

        blocks.push({ type: "faq", items });
      }
      continue;
    }

    // ===== کادر خلاصه / هشدار =====
    if (line.startsWith(">")) {
      const warning = line.startsWith(">>");
      const marker = warning ? ">>" : ">";
      const callout: ArticleBlock = {
        type: "callout",
        variant: warning ? "warning" : "info",
        lines: [],
      };

      while (i < lines.length && lines[i].startsWith(marker)) {
        const body = lines[i].slice(marker.length).trim();
        if (body.startsWith("# ") && !callout.title) {
          callout.title = body.slice(2);
        } else if (body.startsWith("- ")) {
          callout.lines.push({ kind: "li", text: body.slice(2) });
        } else if (body) {
          callout.lines.push({ kind: "p", text: body });
        }
        i++;
      }

      blocks.push(callout);
      continue;
    }

    // ===== جدول =====
    if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!SEPARATOR_ROW.test(lines[i])) rows.push(splitRow(lines[i]));
        i++;
      }
      const [head, ...body] = rows;
      blocks.push({ type: "table", head, rows: body });
      continue;
    }

    // ===== لیست نقطه‌ای =====
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    // ===== لیست شماره‌دار =====
    if (ORDERED.test(line)) {
      const items: string[] = [];
      while (i < lines.length && ORDERED.test(lines[i])) {
        items.push(lines[i].replace(ORDERED, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    // ===== عکس =====
    const img = line.match(/^!\[([^\]]*)\]\((\/[^)\s]+)\)$/);
    if (img) {
      blocks.push({ type: "img", alt: img[1], src: img[2] });
      i++;
      continue;
    }

    blocks.push({ type: "p", text: line });
    i++;
  }

  return blocks;
}

export function extractFaq(content: string): FaqItem[] {
  const block = parseArticle(content).find((b) => b.type === "faq");
  return block && block.type === "faq" ? block.items : [];
}

// زمان تقریبی مطالعه (دقیقه) بر اساس ~۲۰۰ کلمه در دقیقه
export function readingMinutes(content: string) {
  const words = stripMarkup(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// همه‌ی لینک‌های داخلی و خارجی متن (برای تست و کنترل کیفیت)
export function extractLinks(content: string) {
  return [...content.matchAll(/\[([^\]]+)\]\(([^)\s]+)\)/g)].map((m) => ({
    label: m[1],
    href: m[2],
  }));
}
