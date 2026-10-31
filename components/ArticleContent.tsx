import Link from "next/link";
import { Fragment } from "react";
import { ProductFaq } from "@/components/ProductFaq";
import { parseArticle, parseInline } from "@/lib/article-markup";

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

export function ArticleContent({ content }: { content: string }) {
  const blocks = parseArticle(content);

  return (
    <div className="space-y-5 text-sm leading-8 text-gray-600 sm:text-base">
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              className="pt-4 text-lg font-bold text-slate-900 sm:text-xl">
              {block.text}
            </h2>
          );
        }

        if (block.type === "faq") {
          return (
            <ProductFaq
              key={i}
              columns={1}
              faqs={block.items.map((item) => ({
                q: item.q,
                a: <Inline text={item.a} />,
              }))}
            />
          );
        }

        return (
          <p key={i}>
            <Inline text={block.text} />
          </p>
        );
      })}
    </div>
  );
}
