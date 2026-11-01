import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { AlertTriangle, Lightbulb } from "lucide-react";
import { ProductFaq } from "@/components/ProductFaq";
import {
  parseArticle,
  parseInline,
  type ArticleBlock,
} from "@/lib/article-markup";

const linkClass =
  "font-medium text-orange-600 underline decoration-orange-300 underline-offset-4 transition hover:text-orange-700";

function Inline({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((token, i) => {
        if (token.type === "text") {
          return <Fragment key={i}>{token.value}</Fragment>;
        }

        if (token.type === "bold") {
          return (
            <strong key={i} className="font-bold text-slate-900">
              {token.value}
            </strong>
          );
        }

        if (token.href.startsWith("/")) {
          return (
            <Link key={i} href={token.href} className={linkClass}>
              {token.label}
            </Link>
          );
        }

        return (
          <a
            key={i}
            href={token.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}>
            {token.label}
          </a>
        );
      })}
    </>
  );
}

function Callout({
  block,
}: {
  block: Extract<ArticleBlock, { type: "callout" }>;
}) {
  const warning = block.variant === "warning";
  const Icon = warning ? AlertTriangle : Lightbulb;

  return (
    <aside
      className={`rounded-2xl border p-5 sm:p-6 ${
        warning
          ? "border-red-200 bg-red-50"
          : "border-orange-100 bg-orange-50/60"
      }`}>
      {block.title && (
        <p
          className={`flex items-center gap-2 text-sm font-bold sm:text-base ${
            warning ? "text-red-700" : "text-orange-700"
          }`}>
          <Icon className="h-5 w-5 shrink-0" />
          {block.title}
        </p>
      )}

      <div className={`space-y-2 ${block.title ? "mt-3" : ""}`}>
        {block.lines.map((line, i) =>
          line.kind === "li" ? (
            <p key={i} className="flex gap-2 text-sm leading-7 text-slate-700">
              <span
                className={`mt-3 h-1.5 w-1.5 shrink-0 rounded-full ${
                  warning ? "bg-red-400" : "bg-orange-400"
                }`}
              />
              <span>
                <Inline text={line.text} />
              </span>
            </p>
          ) : (
            <p key={i} className="text-sm leading-7 text-slate-700">
              <Inline text={line.text} />
            </p>
          ),
        )}
      </div>
    </aside>
  );
}

function Toc({ headings }: { headings: { id: string; text: string }[] }) {
  return (
    <nav
      aria-label="فهرست مطالب"
      className="rounded-2xl border border-gray-100 bg-gray-50 p-5 sm:p-6">
      <p className="text-sm font-bold text-slate-900">فهرست مطالب</p>
      <ol className="mt-3 space-y-1.5 text-sm [list-style-type:persian] pr-5 marker:text-orange-500">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className="text-slate-600 transition hover:text-orange-600">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ArticleContent({ content }: { content: string }) {
  const blocks = parseArticle(content);
  const headings = blocks.flatMap((b) =>
    b.type === "h2" ? [{ id: b.id, text: b.text }] : [],
  );
  const firstH2 = blocks.findIndex((b) => b.type === "h2");

  return (
    <div className="space-y-5 text-sm leading-8 text-gray-600 sm:text-base">
      {blocks.map((block, i) => {
        const toc =
          i === firstH2 && headings.length >= 4 ? (
            <Toc key="toc" headings={headings} />
          ) : null;

        let node: React.ReactNode = null;

        switch (block.type) {
          case "h2":
            node = (
              <h2
                id={block.id}
                className="scroll-mt-28 pt-4 text-lg font-bold text-slate-900 sm:text-xl">
                {block.text}
              </h2>
            );
            break;

          case "p":
            node = (
              <p>
                <Inline text={block.text} />
              </p>
            );
            break;

          case "img":
            node = (
              <figure className="my-2">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
                {block.alt && (
                  <figcaption className="mt-2 text-center text-xs leading-6 text-gray-400">
                    {block.alt}
                  </figcaption>
                )}
              </figure>
            );
            break;

          case "ul":
            node = (
              <ul className="space-y-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                    <span>
                      <Inline text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
            break;

          case "ol":
            node = (
              <ol className="space-y-2 pr-6 [list-style-type:persian] marker:font-bold marker:text-orange-500">
                {block.items.map((item, j) => (
                  <li key={j} className="pr-1">
                    <Inline text={item} />
                  </li>
                ))}
              </ol>
            );
            break;

          case "callout":
            node = <Callout block={block} />;
            break;

          case "table":
            node = (
              <div className="overflow-x-auto rounded-2xl border border-gray-100">
                <table className="w-full min-w-[32rem] border-collapse text-right text-sm leading-7">
                  <thead className="bg-gray-50 text-slate-900">
                    <tr>
                      {block.head.map((cell, j) => (
                        <th
                          key={j}
                          className="border-b border-gray-100 px-4 py-3 font-bold">
                          <Inline text={cell} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className="border-b border-gray-50 last:border-0">
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className={`px-4 py-3 align-top ${
                              j === 0 ? "font-medium text-slate-900" : ""
                            }`}>
                            <Inline text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
            break;

          case "faq":
            node = (
              <ProductFaq
                columns={1}
                faqs={block.items.map((item) => ({
                  q: item.q,
                  a: <Inline text={item.a} />,
                }))}
              />
            );
            break;
        }

        return (
          <Fragment key={i}>
            {toc}
            {node}
          </Fragment>
        );
      })}
    </div>
  );
}
