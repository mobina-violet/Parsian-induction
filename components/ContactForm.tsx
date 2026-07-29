'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { submitConsultationRequest } from '@/app/actions/consultation'

const subjects = [
  'مشاوره خرید محصول',
  'پشتیبانی فنی',
  'همکاری تجاری',
  'سایر موارد',
]

export function ContactForm() {
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit() {
    setStatus('loading')
    const result = await submitConsultationRequest({
      fullName,
      phoneNumber,
      email,
      subject,
      message,
      source: 'CONTACT_PAGE',
    })
    if (result.success) {
      setStatus('success')
      setFullName('')
      setPhoneNumber('')
      setEmail('')
      setSubject('')
      setMessage('')
    } else {
      setStatus('error')
      setError(result.error ?? 'مشکلی در ارسال پیام پیش آمد')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
        <p className="text-sm leading-7 text-green-600">
          پیام شما با موفقیت ثبت شد. کارشناسان ما در سریع‌ترین زمان با شما تماس خواهند گرفت.
        </p>
      </div>
    )
  }

  return (
    <div dir="rtl" className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
      <h2 className="text-lg font-bold text-slate-900 sm:text-xl">برای ما پیام بگذارید</h2>
      <p className="mt-1.5 text-sm text-gray-400">
        فرم زیر را تکمیل کنید تا کارشناسان ما با شما تماس بگیرند.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="شماره تماس"
          className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-300 focus:border-orange-400 focus:outline-none"
        />
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="نام و نام خانوادگی"
          className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-300 focus:border-orange-400 focus:outline-none"
        />
      </div>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ایمیل"
        className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-300 focus:border-orange-400 focus:outline-none"
      />

      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-slate-600 focus:border-orange-400 focus:outline-none"
      >
        <option value="">موضوع پیام</option>
        {subjects.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="پیام شما"
        rows={4}
        className="mt-4 w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-300 focus:border-orange-400 focus:outline-none"
      />

      {status === 'error' && <p className="mt-2 text-xs text-red-500">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={status === 'loading' || !phoneNumber}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 py-3 text-sm font-medium text-white transition hover:bg-orange-600 disabled:opacity-50"
      >
        {status === 'loading' ? 'در حال ارسال...' : 'ارسال پیام'}
        <Send className="h-4 w-4" />
      </button>

      <p className="mt-3 text-center text-[11px] text-gray-400">
        اطلاعات شما محفوظ است و برای هیچ‌گونه کار تبلیغاتی استفاده نمی‌شود.
      </p>
    </div>
  )
}