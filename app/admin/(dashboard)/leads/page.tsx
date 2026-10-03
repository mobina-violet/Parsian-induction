import { prisma } from "@/lib/prisma";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";

const sourceLabels: Record<string, string> = {
  HEADER_BUTTON: "دکمه هدر",
  HERO_WIDGET: "صفحه اصلی",
  PRODUCT_PAGE: "صفحه محصول",
  PROJECT_PAGE: "صفحه پروژه",
  CONTACT_PAGE: "صفحه تماس",
};

const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export default async function AdminLeadsPage() {
  const leads = await prisma.consultationRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: { product: { select: { name: true } } },
  });

  return (
    <div>
      <h1 className="text-lg font-bold text-slate-900">
        درخواست‌های مشاوره و تماس ({leads.length})
      </h1>

      {leads.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-gray-200 py-16 text-center text-sm text-gray-400">
          هنوز درخواستی ثبت نشده.
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {lead.fullName || "بدون نام"}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    {dateFormatter.format(lead.createdAt)} ·{" "}
                    {sourceLabels[lead.source] ?? lead.source}
                    {lead.product && ` · ${lead.product.name}`}
                  </p>
                </div>

                <LeadStatusSelect id={lead.id} status={lead.status} />
              </div>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-500">
                {lead.phoneNumber && (
                  <a
                    href={`tel:${lead.phoneNumber}`}
                    className="hover:text-orange-600"
                    dir="ltr">
                    📱 {lead.phoneNumber}
                  </a>
                )}
                {lead.email && (
                  <a
                    href={`mailto:${lead.email}`}
                    className="hover:text-orange-600">
                    ✉️ {lead.email}
                  </a>
                )}
              </div>

              {lead.subject && (
                <p className="mt-3 text-sm font-medium text-slate-700">
                  {lead.subject}
                </p>
              )}
              {lead.message && (
                <p className="mt-1 text-sm leading-6 text-gray-500">
                  {lead.message}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}