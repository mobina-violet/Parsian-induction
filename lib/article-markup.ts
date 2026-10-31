// قالب سادهٔ محتوای مقاله:
//   ## عنوان              → h2
//   [متن](/مسیر)          → لینک (داخلی اگه با / شروع بشه)
//   **متن**               → بولد
//   بخش «## پرسش‌های متداول» شامل خط‌های «### سؤال» و پاراگراف جواب زیرش

export const FAQ_HEADING = "پرسش‌های متداول";

export type InlineToken =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "link"; label: string; href: string };

export type FaqItem = { q: string; a: string };

export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
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

export function parseArticle(content: string): ArticleBlock[] {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const blocks: ArticleBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      const title = line.slice(3);
      blocks.push({ type: "h2", text: title });
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

    blocks.push({ type: "p", text: line });
    i++;
  }

  return blocks;
}

export function extractFaq(content: string): FaqItem[] {
  const block = parseArticle(content).find((b) => b.type === "faq");
  return block && block.type === "faq" ? block.items : [];
}
