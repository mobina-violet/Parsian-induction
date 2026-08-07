'use client'

import Image from 'next/image'
import type { Project } from '@/lib/generated/prisma/client'

const industryLabels: Record<string, string> = {
  STEEL: 'صنعت فولاد',
  COPPER: 'صنعت مس',
  ALUMINUM: 'صنعت آلومینیوم',
  AUTOMOTIVE: 'صنعت خودرو',
  NON_FERROUS: 'صنعت فلزات رنگی',
  PRECISION_CASTING: 'صنعت ریخته‌گری دقیق',
}

export function ProjectShowcaseGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-gray-200 py-16 text-center text-sm text-gray-400">
        پروژه‌ای در این دسته یافت نشد.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="group relative h-40 overflow-hidden rounded-xl sm:h-48"
        >
          {project.videoUrl ? (
            <video
              src={project.videoUrl}
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => e.currentTarget.pause()}
            />
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          )}
          <span className="absolute right-2 top-2 rounded-full bg-black/60 px-2.5 py-1 text-[11px] text-white">
            {industryLabels[project.industry] ?? project.industry}
          </span>
        </div>
      ))}
    </div>
  )
}