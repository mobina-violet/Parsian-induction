// آدرس نهایی دامنه رو اینجا (یا از طریق env) تنظیم کن.
// وقتی دامنه‌ی واقعی رو گرفتی، مقدار NEXT_PUBLIC_SITE_URL رو در .env ست کن.
export const siteConfig = {
  name: "پارسیان پرتو الوند",
  shortName: "پارسیان",
  title: "پارسیان پرتو الوند | تولیدکننده کوره‌های القایی صنعتی",
  description:
    "طراحی و تولید انواع کوره‌های القایی ذوب، فورج و سخت‌کاری، سیستم خنک‌کننده و تجهیزات جانبی با بیش از ۲۰ سال تجربه در صنعت ذوب فلزات.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://parsian-partoalvand.ir",
  phone: "09124384191",
  phoneDisplay: "۰۹۱۲۴۳۸۴۱۹۱",
  whatsapp: "989124384191",
  instagram: "https://instagram.com/parsian_partoalvand",
  address: "رباط کریم، میدان غدیر، مجتمع صنعتی و تجاری نور، واحد ۱۷",
};