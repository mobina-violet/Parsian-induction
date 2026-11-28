export const defaults = {
 heroTitle: "کوره‌های القایی", heroSubtitle: "با تکنولوژی روز دنیا", heroText: "طراحی و ساخت کوره القایی صنعتی با کیفیت بالا، راندمان عالی و خدمات پس از فروش مطمئن برای صنایع فولاد، مس و آلومینیوم.",
 aboutText: "پارسیان پرتو الوند متخصص طراحی، ساخت و راه‌اندازی کوره القایی است. ما با دانش فنی و تیمی مجرب، راهکارهای مطمئن برای صنایع فولاد، مس و آلومینیوم ارائه می‌دهیم.",
 phone: "09124384191", whatsapp: "989124384191", email: "info@parsian-induction.com", address: "رباط کریم، میدان غدیر، مجتمع صنعتی و تجاری نور، واحد ۱۷", hours: "شنبه تا چهارشنبه: ۸ تا ۱۷\nپنجشنبه: ۸ تا ۱۳", instagram: "https://instagram.com/parsian_partoalvand",
 founderImage: "/images/about/founder.webp", ceoImage: "/images/about/ceo-v2.webp",
 seoTitle: "پارسیان پرتو الوند | تولیدکننده کوره‌های القایی صنعتی", seoDescription: "طراحی و تولید انواع کوره‌های القایی ذوب، فورج و سخت‌کاری، سیستم خنک‌کننده و تجهیزات جانبی با بیش از ۲۰ سال تجربه در صنعت ذوب فلزات."
};
export type PublicSettings = typeof defaults;
export const pageFields = {heroTitle:"عنوان بنر اصلی",heroSubtitle:"عنوان دوم بنر",heroText:"توضیح بنر",aboutText:"معرفی شرکت",founderImage:"عکس بنیان‌گذار (صفحه درباره ما)",ceoImage:"عکس مدیرعامل (صفحه درباره ما)",seoTitle:"عنوان سئو صفحه اصلی",seoDescription:"توضیح سئو صفحه اصلی"} as const;
export const contactFields = {phone:"تلفن",whatsapp:"واتساپ با کد کشور بدون +",email:"ایمیل",address:"آدرس",hours:"ساعات کاری (هر خط یک مورد)",instagram:"لینک اینستاگرام"} as const;
