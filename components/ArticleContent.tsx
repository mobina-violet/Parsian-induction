export function ArticleContent({ content }: { content: string }) {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="space-y-5 text-sm leading-8 text-gray-600 sm:text-base">
      {lines.map((line, i) =>
        line.startsWith("## ") ? (
          <h2
            key={i}
            className="pt-4 text-lg font-bold text-slate-900 sm:text-xl">
            {line.slice(3)}
          </h2>
        ) : (
          <p key={i}>{line}</p>
        ),
      )}
    </div>
  );
}