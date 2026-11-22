import Link from "next/link";
import {
  Cpu,
  Orbit,
  BatteryCharging,
  Flame,
  Snowflake,
  ShieldCheck,
  Check,
  Zap,
  Magnet,
  Thermometer,
  ArrowLeft,
} from "lucide-react";
import { ConsultationCtaButton } from "@/components/ConsultationCtaButton";
import { ProductFaq } from "@/components/ProductFaq";

/**
 * محتوای سئو و تجاری دسته‌بندی «کوره القایی ذوب».
 * فقط وقتی نمایش داده می‌شود که ?category=MELTING_FURNACE فعال باشد.
 * هیچ عدد ظرفیت/قیمت/راندمان ادعایی در متن نیست؛ قبل از انتشار مسئول فنی مرور کند.
 */

export const meltingFaqs = [
  {
    q: "کوره القایی ذوب چه تفاوتی با کوره سوختی دارد؟",
    a: "در کوره القایی، گرما با القای الکترومغناطیسی در خود فلز ایجاد می‌شود؛ اما کوره سوختی برای تأمین حرارت از احتراق استفاده می‌کند. تفاوت این دو روش بر کنترل دما، زیرساخت مورد نیاز و شرایط بهره‌برداری تأثیر می‌گذارد.",
  },
  {
    q: "مصرف برق کوره القایی ذوب چقدر است؟",
    a: "مصرف انرژی به ظرفیت دستگاه، نوع فلز، زمان ذوب و راندمان واقعی سیستم بستگی دارد. برای مقایسه دقیق، معمولاً شاخص کیلووات‌ساعت به ازای هر تن مذاب بررسی می‌شود.",
  },
  {
    q: "آیا کوره القایی برای ذوب مس و آلومینیوم مناسب است؟",
    a: "بله. کوره القایی با طراحی متناسب می‌تواند برای ذوب مس، آلومینیوم و آلیاژهای آن‌ها استفاده شود. انتخاب بوته، آستر و پارامترهای کاری باید با ویژگی‌های فلز هماهنگ باشد.",
  },
  {
    q: "ظرفیت مناسب کوره القایی چگونه تعیین می‌شود؟",
    a: "ظرفیت مناسب بر اساس حجم تولید، وزن شارژ، تعداد نوبت‌های ذوب و زمان چرخه تولید مشخص می‌شود. بررسی این عوامل پیش از سفارش دستگاه ضروری است.",
  },
  {
    q: "آیا کوره القایی به سیستم خنک‌کننده نیاز دارد؟",
    a: "بله. در کوره‌های القایی صنعتی، خنک‌کاری مناسب کویل و تجهیزات قدرت برای عملکرد ایمن و پایدار اهمیت اساسی دارد.",
  },
  {
    q: "هنگام خرید کوره القایی چه اطلاعاتی باید ارائه شود؟",
    a: "نوع فلز، ظرفیت هر نوبت ذوب، تولید روزانه، شرایط برق، فضای نصب و تجهیزات جانبی مورد نیاز، مهم‌ترین اطلاعات برای بررسی فنی هستند.",
  },
];

const steps = [
  { icon: Zap, title: "جریان کویل", desc: "عبور جریان از کویل مسی اطراف بوته" },
  {
    icon: Magnet,
    title: "میدان مغناطیسی",
    desc: "ایجاد میدان متناوب و جریان‌های گردابی در فلز",
  },
  {
    icon: Thermometer,
    title: "حرارت و ذوب",
    desc: "تبدیل انرژی به حرارت با مقاومت الکتریکی فلز",
  },
];

const metals = [
  { name: "فولاد و استیل", use: "تولید قطعات فولادی و آلیاژی" },
  { name: "چدن", use: "صنایع ریخته‌گری و تولید قطعات صنعتی" },
  { name: "مس و برنج", use: "تولید قطعات و آلیاژهای غیرآهنی" },
  { name: "آلومینیوم", use: "تولید قطعات سبک و کاربردهای صنعتی" },
];

const components = [
  {
    icon: Cpu,
    name: "تابلو قدرت و اینورتر",
    desc: "تبدیل و کنترل انرژی الکتریکی برای تأمین جریان مورد نیاز کویل.",
  },
  {
    icon: Orbit,
    name: "کویل مسی",
    desc: "ایجاد میدان مغناطیسی متناوب برای گرمایش فلز.",
  },
  {
    icon: BatteryCharging,
    name: "بانک خازنی",
    desc: "مشارکت در تشکیل مدار رزونانس و تنظیم شرایط الکتریکی سیستم.",
  },
  {
    icon: Flame,
    name: "بوته و آستر نسوز",
    desc: "نگهداری فلز مذاب و محافظت از ساختار کوره در برابر حرارت.",
  },
  {
    icon: Snowflake,
    name: "سیستم خنک‌کننده",
    desc: "کنترل دمای کویل و تجهیزات قدرت برای جلوگیری از آسیب حرارتی.",
  },
  {
    icon: ShieldCheck,
    name: "سیستم کنترل و حفاظت",
    desc: "نظارت بر پارامترهای کاری و تشخیص شرایط غیرمجاز.",
  },
];

const advantages = [
  ["کنترل بهتر فرآیند", "امکان تنظیم توان و پایش شرایط ذوب"],
  ["گرمایش بدون شعله مستقیم", "حذف محصولات احتراق سوخت از محیط داخل کوره"],
  ["قابلیت استفاده برای فلزات مختلف", "با انتخاب تجهیزات و آستر مناسب"],
  ["امکان اتوماسیون", "قابلیت یکپارچه‌سازی سیستم کنترل با فرآیند تولید"],
  [
    "بهره‌وری انرژی",
    "امکان دستیابی به عملکرد مناسب با طراحی صحیح و بهره‌برداری اصولی",
  ],
];

const buyingGuide = [
  {
    title: "ظرفیت ذوب",
    text: "ظرفیت کوره معمولاً بر اساس جرم شارژ در هر نوبت ذوب بیان می‌شود. انتخاب ظرفیت باید با میزان تولید روزانه، تعداد نوبت‌های ذوب و زمان چرخه تولید هماهنگ باشد.",
  },
  {
    title: "توان الکتریکی",
    text: "توان مورد نیاز به ظرفیت، نوع فلز، دمای نهایی و زمان مطلوب ذوب بستگی دارد. انتخاب توان نامناسب ممکن است باعث افزایش زمان تولید یا هزینه سرمایه‌گذاری شود.",
  },
  {
    title: "فرکانس کاری و نوع اینورتر",
    text: "فرکانس بر رفتار جریان القایی و توزیع حرارت در شارژ تأثیر می‌گذارد. طراحی مدار رزونانس سری یا موازی نیز باید با مشخصات الکتریکی سیستم هماهنگ باشد.",
  },
  {
    title: "زیرساخت و تجهیزات جانبی",
    text: "پیش از انتخاب دستگاه، ظرفیت برق ورودی، سیستم خنک‌کاری، فضای نصب، شرایط تخلیه مذاب و الزامات ایمنی باید بررسی شوند.",
  },
];

const priceFactors = [
  "ظرفیت ذوب و توان نامی",
  "نوع و ساختار اینورتر",
  "مشخصات کویل و مدار خنک‌کننده",
  "سیستم کنترل و حفاظت",
  "تجهیزات مکانیکی و تخلیه مذاب",
  "میزان سفارشی‌سازی و خدمات مورد نیاز",
];

const linkClass =
  "font-medium text-orange-600 underline decoration-orange-300 underline-offset-4 transition hover:text-orange-700 hover:decoration-orange-500";

function SectionTitle({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className="flex items-center gap-3 text-xl font-bold text-slate-900 sm:text-2xl"
    >
      <span
        aria-hidden="true"
        className="h-6 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-orange-400 to-orange-600 shadow-[0_0_14px_rgba(249,115,22,0.7)]"
      />
      {children}
    </h2>
  );
}

const tile =
  "rounded-2xl border border-gray-200 bg-white p-5 transition duration-200 hover:border-orange-400 hover:shadow-[0_0_28px_-8px_rgba(249,115,22,0.55)]";

export function MeltingFurnaceContent() {
  return (
    <section
      dir="rtl"
      aria-labelledby="melting-intro"
      className="mx-auto max-w-7xl space-y-14 px-4 pb-14 sm:px-6 lg:px-8"
    >
      {/* مقدمه: کارت نئونی */}
      <div className="neon-card neon-grid p-6 sm:p-10">
        <div className="flex items-center gap-2 text-xs font-medium text-orange-300">
          <span
            aria-hidden="true"
            className="neon-dot h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_10px_#fb923c]"
          />
          راهنمای فنی و خرید
        </div>
        <h2
          id="melting-intro"
          className="neon-text mt-3 text-2xl font-bold leading-snug text-white sm:text-3xl"
        >
          طراحی، ساخت و انتخاب کوره ذوب فلزات
        </h2>
        <p className="mt-5 max-w-4xl text-start text-sm leading-8 text-slate-300 sm:text-base sm:leading-9">
          <strong className="font-bold text-white">کوره القایی ذوب</strong> یکی
          از تجهیزات اصلی صنایع ریخته‌گری و{" "}
          <strong className="font-bold text-white">ذوب فلزات</strong> است که با
          استفاده از{" "}
          <strong className="font-bold text-white">القای الکترومغناطیسی</strong>
          ، انرژی الکتریکی را به حرارت تبدیل می‌کند. این فناوری امکان ذوب{" "}
          <strong className="font-bold text-white">فلزات آهنی و غیرآهنی</strong>{" "}
          را با قابلیت کنترل توان و دمای فرآیند فراهم می‌سازد.
        </p>
        <p className="mt-4 max-w-4xl text-start text-sm leading-8 text-slate-300 sm:text-base sm:leading-9">
          شرکت{" "}
          <strong className="font-bold text-orange-300">
            پارسیان پرتو الوند
          </strong>{" "}
          در زمینه طراحی و ساخت کوره‌های القایی صنعتی، از جمله کوره‌های ذوب مجهز
          به سیستم‌های{" "}
          <strong className="font-bold text-white">
            اینورتر رزونانس سری و موازی
          </strong>
          ، فعالیت دارد. انتخاب تجهیزات با توجه به نوع فلز، ظرفیت تولید، توان
          مورد نیاز و شرایط بهره‌برداری انجام می‌شود.
        </p>
      </div>

      {/* چیست و چگونه کار می‌کند */}
      <div>
        <SectionTitle>کوره القایی ذوب چیست و چگونه کار می‌کند؟</SectionTitle>
        <p className="mt-4 max-w-4xl text-start text-sm leading-8 text-slate-600">
          کوره ذوب القایی دستگاهی است که بدون نیاز به شعله مستقیم، فلز را با
          استفاده از میدان مغناطیسی متناوب گرم می‌کند.
        </p>

        <ol className="mt-6 grid gap-3 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={`${tile} relative flex items-start gap-4`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-orange-400 shadow-[0_0_16px_rgba(249,115,22,0.45)]">
                <s.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  <span className="text-orange-500">{i + 1}.</span> {s.title}
                </p>
                <p className="mt-1 text-start text-[13px] leading-6 text-gray-600">
                  {s.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-6 max-w-4xl text-start text-sm leading-8 text-slate-600">
          در این فرآیند، جریان الکتریکی از کویل مسی اطراف بوته عبور کرده و میدان
          مغناطیسی ایجاد می‌کند. این میدان باعث شکل‌گیری جریان‌های گردابی در فلز
          می‌شود. مقاومت الکتریکی فلز در برابر این جریان‌ها، انرژی را به حرارت
          تبدیل می‌کند و با افزایش دما، فرآیند ذوب انجام می‌شود.
        </p>
        <p className="mt-3 max-w-4xl text-start text-sm leading-8 text-slate-600">
          در کوره‌های صنعتی، سیستم قدرت و اینورتر وظیفه تأمین جریان با فرکانس
          مناسب را بر عهده دارند. انتخاب صحیح فرکانس، توان و مدار رزونانس در
          عملکرد دستگاه اهمیت زیادی دارد.
        </p>
      </div>

      {/* انواع */}
      <div>
        <SectionTitle>انواع کوره القایی ذوب</SectionTitle>
        <p className="mt-4 text-start text-sm leading-8 text-slate-600">
          کوره‌های القایی را می‌توان بر اساس ساختار، ظرفیت و فرکانس کاری
          دسته‌بندی کرد.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <article className={tile}>
            <h3 className="text-base font-bold text-slate-900">
              کوره القایی بدون هسته
            </h3>
            <p className="mt-2 text-start text-sm leading-7 text-gray-600">
              در کوره‌های بدون هسته (Coreless)، فلز داخل بوته نسوز قرار می‌گیرد
              و کویل اطراف آن میدان مغناطیسی لازم را ایجاد می‌کند. این ساختار
              برای ذوب نوبتی فلزات مختلف کاربرد گسترده‌ای دارد و در ظرفیت‌های
              متفاوت طراحی می‌شود.
            </p>
          </article>
          <article className={tile}>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">
                کوره القایی کانالی
              </h3>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] text-slate-600">
                معرفی علمی
              </span>
            </div>
            <p className="mt-2 text-start text-sm leading-7 text-gray-600">
              در کوره‌های کانالی (Channel)، یک کانال حاوی فلز مذاب بخشی از مدار
              القایی را تشکیل می‌دهد. این تجهیزات بیشتر در کاربردهای نگهداری
              مذاب یا فرآیندهای پیوسته خاص استفاده می‌شوند.
            </p>
          </article>
        </div>
        <p className="mt-4 text-start text-sm leading-8 text-slate-600">
          انتخاب بین این ساختارها به نوع فرآیند و شرایط تولید بستگی دارد.
        </p>
      </div>

      {/* فلزات */}
      <div>
        <SectionTitle>کوره القایی ذوب چه فلزاتی را ذوب می‌کند؟</SectionTitle>
        <p className="mt-4 text-start text-sm leading-8 text-slate-600">
          کوره‌های القایی با طراحی مناسب برای ذوب فلزات مختلف قابل استفاده
          هستند؛ از جمله:
        </p>
        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metals.map((m) => (
            <li key={m.name} className={tile}>
              <p className="text-sm font-bold text-slate-900">{m.name}</p>
              <p className="mt-1 text-start text-[13px] leading-6 text-gray-600">
                {m.use}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-4xl text-start text-sm leading-8 text-slate-600">
          نوع فلز بر انتخاب توان، فرکانس، جنس آستر نسوز و شرایط بهره‌برداری
          تأثیر دارد. به همین دلیل، نمی‌توان یک مشخصات فنی ثابت را برای تمام
          کاربردها مناسب دانست.
        </p>
      </div>

      {/* اجزا */}
      <div>
        <SectionTitle>اجزای اصلی کوره القایی ذوب</SectionTitle>
        <p className="mt-4 text-start text-sm leading-8 text-slate-600">
          عملکرد پایدار کوره به هماهنگی چند بخش اصلی وابسته است:
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {components.map((c) => (
            <li key={c.name} className={`${tile} flex items-start gap-4`}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-orange-400 shadow-[0_0_16px_rgba(249,115,22,0.45)]">
                <c.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{c.name}</h3>
                <p className="mt-1 text-start text-[13px] leading-6 text-gray-600">
                  {c.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-4xl text-start text-sm leading-8 text-slate-600">
          کیفیت و تناسب این اجزا بر عملکرد دستگاه تأثیر مستقیم دارد. برای آشنایی
          با تجهیزات مرتبط می‌توانید بخش{" "}
          <Link
            href="/services?category=SPARE_PARTS#services-catalog"
            className={linkClass}
          >
            قطعات و تجهیزات جانبی کوره القایی
          </Link>{" "}
          را بررسی کنید.
        </p>
      </div>

      {/* مزایا */}
      <div>
        <SectionTitle>مزایای کوره القایی ذوب در صنعت</SectionTitle>
        <p className="mt-4 text-start text-sm leading-8 text-slate-600">
          استفاده از کوره ذوب القایی می‌تواند مزایای زیر را به همراه داشته باشد:
        </p>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {advantages.map(([title, desc]) => (
            <li
              key={title}
              className="flex items-start gap-3 text-sm leading-7"
            >
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white shadow-[0_0_12px_rgba(249,115,22,0.6)]">
                <Check className="h-3 w-3" aria-hidden="true" />
              </span>
              <span className="text-start text-slate-600">
                <strong className="font-bold text-slate-900">{title}:</strong>{" "}
                {desc}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-4xl rounded-xl border border-orange-200 bg-orange-50/60 px-4 py-3 text-start text-sm leading-7 text-slate-700">
          البته مصرف انرژی و کیفیت نهایی مذاب به عواملی مانند نوع شارژ، دمای
          تخلیه، شرایط آستر و تنظیمات دستگاه وابسته است. کوره القایی به‌تنهایی
          تضمین‌کننده نبود ناخالصی در مذاب نیست.
        </p>
      </div>

      {/* راهنمای انتخاب */}
      <div>
        <SectionTitle>راهنمای انتخاب و خرید کوره القایی ذوب</SectionTitle>
        <p className="mt-4 max-w-4xl text-start text-sm leading-8 text-slate-600">
          برای خرید کوره القایی، بررسی قیمت اولیه کافی نیست. مشخصات دستگاه باید
          با نیاز واقعی خط تولید هماهنگ باشد.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {buyingGuide.map((g) => (
            <article key={g.title} className={tile}>
              <h3 className="text-base font-bold text-slate-900">{g.title}</h3>
              <p className="mt-2 text-start text-sm leading-7 text-gray-600">
                {g.text}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-5 max-w-4xl text-start text-sm leading-8 text-slate-600">
          همچنین دسترسی به قطعات یدکی و امکان دریافت خدمات فنی و راه‌اندازی کوره
          القایی در تصمیم خرید اهمیت دارد.
        </p>
      </div>

      {/* قیمت */}
      <div>
        <SectionTitle>
          قیمت کوره القایی ذوب به چه عواملی بستگی دارد؟
        </SectionTitle>
        <p className="mt-4 text-start text-sm leading-8 text-slate-600">
          قیمت کوره القایی ذوب به مشخصات فنی و دامنه تجهیزات سفارش بستگی دارد.
          مهم‌ترین عوامل عبارت‌اند از:
        </p>
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {priceFactors.map((f) => (
            <li
              key={f}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-orange-400 hover:shadow-[0_0_22px_-8px_rgba(249,115,22,0.55)]"
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]"
              />
              {f}
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-4xl text-start text-sm leading-8 text-slate-600">
          به همین دلیل، مقایسه قیمت دو دستگاه بدون بررسی مشخصات و تجهیزات همراه
          آن‌ها ممکن است گمراه‌کننده باشد. برای دریافت برآورد دقیق، لازم است نوع
          فلز، ظرفیت مورد نیاز، تعداد نوبت‌های ذوب و شرایط برق محل نصب مشخص شود.
        </p>
      </div>

      {/* پارسیان */}
      <div>
        <SectionTitle>کوره‌های القایی ذوب پارسیان پرتو الوند</SectionTitle>
        <p className="mt-4 max-w-4xl text-start text-sm leading-8 text-slate-600">
          پارسیان پرتو الوند در حوزه طراحی و ساخت کوره‌های القایی ذوب و تأمین
          تجهیزات مرتبط فعالیت می‌کند. در محصولات معرفی‌شده مجموعه، استفاده از
          طراحی اینورتر رزونانس سری و موازی و توجه به شرایط کاری صنایع ذوب فلزات
          مطرح شده است.
        </p>
        <p className="mt-3 max-w-4xl text-start text-sm leading-8 text-slate-600">
          فرآیند انتخاب تجهیزات با بررسی نیاز تولید، مشخصات الکتریکی و الزامات
          فنی انجام می‌شود. همچنین خدمات طراحی، ساخت، نصب و راه‌اندازی در{" "}
          <Link href="/services" className={linkClass}>
            بخش خدمات
          </Link>{" "}
          مجموعه معرفی شده‌اند.
        </p>
      </div>

      {/* سوالات متداول */}
      <div>
        <SectionTitle>سوالات متداول درباره کوره القایی ذوب</SectionTitle>
        <ProductFaq faqs={meltingFaqs} columns={1} />
      </div>

      {/* جمع‌بندی + CTA: کارت نئونی */}
      <div className="neon-card neon-grid p-6 sm:p-10">
        <div className="flex items-center gap-2 text-xs font-medium text-orange-300">
          <span
            aria-hidden="true"
            className="neon-dot h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_10px_#fb923c]"
          />
          بررسی فنی پیش از خرید
        </div>
        <h2 className="neon-text mt-3 text-2xl font-bold leading-snug text-white sm:text-3xl">
          جمع‌بندی و مشاوره انتخاب کوره القایی ذوب
        </h2>
        <p className="mt-5 max-w-3xl text-start text-sm leading-8 text-slate-300 sm:text-base sm:leading-9">
          انتخاب کوره مناسب باید بر اساس{" "}
          <strong className="font-bold text-white">نیاز واقعی تولید</strong>{" "}
          انجام شود؛ نه صرفاً ظرفیت اسمی یا قیمت دستگاه. هماهنگی{" "}
          <strong className="font-bold text-white">ظرفیت ذوب</strong>،{" "}
          <strong className="font-bold text-white">توان الکتریکی</strong>،{" "}
          <strong className="font-bold text-white">نوع فلز</strong> و زیرساخت
          محل نصب، پایه‌ی یک خرید درست است.
        </p>
        <p className="mt-4 max-w-3xl text-start text-sm leading-8 text-slate-300 sm:text-base sm:leading-9">
          اگر برای راه‌اندازی خط ذوب، توسعه ظرفیت تولید یا انتخاب تجهیزات القایی
          برنامه‌ریزی می‌کنید، می‌توانید مشخصات مورد نیاز خود را برای{" "}
          <strong className="font-bold text-white">بررسی فنی</strong> در اختیار{" "}
          <strong className="font-bold text-orange-300">
            پارسیان پرتو الوند
          </strong>{" "}
          قرار دهید.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ConsultationCtaButton
            label="درخواست بررسی فنی و مشاوره"
            source="PRODUCT_PAGE"
            className="neon-btn rounded-full px-7 py-3.5 text-sm font-bold"
          />
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-400/60 px-6 py-3 text-sm font-medium text-orange-200 transition hover:border-orange-300 hover:bg-orange-500/10 hover:text-white hover:shadow-[0_0_24px_rgba(249,115,22,0.45)]"
          >
            صفحه تماس با پارسیان پرتو الوند
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
