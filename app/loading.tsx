export default function Loading() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-4">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />

        <p className="mt-6 text-sm text-gray-500">در حال بارگذاری...</p>
      </div>
    </main>
  );
}
