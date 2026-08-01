'use client'

import Link from 'next/link'
import { Home, RefreshCw } from 'lucide-react'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-4">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-7xl font-bold text-gray-200 sm:text-8xl">۵۰۰</p>

        <h1 className="mt-4 text-xl font-bold text-slate-900 sm:text-2xl">
          مشکلی پیش آمده است
        </h1>

        <p className="mt-3 text-sm leading-7 text-gray-500">
          متأسفانه خطایی رخ داده. لطفاً دوباره تلاش کنید یا به صفحه اصلی برگردید.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-orange-600"
          >
            <RefreshCw className="h-4 w-4" />
            تلاش مجدد
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-orange-300 hover:text-orange-500"
          >
            <Home className="h-4 w-4" />
            بازگشت به خانه
          </Link>
        </div>
      </div>
    </main>
  )
}