// اسکلت هم‌رنگ هیروی صفحه‌ها؛ به‌جای اسپینر روی صفحه‌ی سفید، حس عوض شدن آنی صفحه را می‌دهد
export default function Loading() {
  return (
    <main aria-busy="true" aria-live="polite" className="bg-white">
      <span className="sr-only">در حال بارگذاری...</span>

      {/* نوار پیشرفت باریک بالای صفحه */}
      <div className="fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden bg-orange-100">
        <div className="h-full w-1/3 animate-pulse bg-orange-500" />
      </div>

      {/* هیروی تیره */}
      <section className="bg-slate-900 pt-32 pb-20">
        <div className="mx-auto max-w-7xl animate-pulse space-y-4 px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-2/3 max-w-md rounded bg-white/15" />
          <div className="h-4 w-full max-w-xl rounded bg-white/10" />
          <div className="h-4 w-4/5 max-w-lg rounded bg-white/10" />
        </div>
      </section>

      {/* کارت‌ها */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid animate-pulse gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-2xl border border-gray-100 p-4">
              <div className="aspect-[4/3] rounded-xl bg-gray-100" />
              <div className="mt-4 h-4 w-3/4 rounded bg-gray-100" />
              <div className="mt-2 h-3 w-1/2 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
