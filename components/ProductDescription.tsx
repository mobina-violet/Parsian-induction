function boldLeadIn(paragraph: string) {
  const commaIndex = paragraph.search(/[،,]/);

  if (commaIndex !== -1 && commaIndex < 80) {
    const lead = paragraph.slice(0, commaIndex + 1);
    const rest = paragraph.slice(commaIndex + 1);
    return (
      <>
        <strong className="font-bold text-slate-900">{lead}</strong>
        {rest}
      </>
    );
  }

  const words = paragraph.split(" ");
  const lead = words.slice(0, 4).join(" ");
  const rest = words.slice(4).join(" ");

  return (
    <>
      <strong className="font-bold text-slate-900">{lead}</strong>{" "}
      {rest}
    </>
  );
}

export function ProductDescription({ text }: { text: string }) {
  const paragraphs = text
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="mt-6 space-y-4 text-sm leading-7 text-gray-500">
      {paragraphs.map((paragraph, i) => (
        <p key={i}>{boldLeadIn(paragraph)}</p>
      ))}
    </div>
  );
}