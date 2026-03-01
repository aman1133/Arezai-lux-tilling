import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export default async function WorksPreview() {
  const items = await prisma.galleryItem.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
    take: 6, // show only 6 on homepage
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-3xl font-semibold">Some of Our Work</h2>
          <p className="text-gray-600 mt-2">
            Recent tiling, stone and waterproofing projects.
          </p>
        </div>

        <Link
          href="/gallery"
          className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-50"
        >
          View Full Gallery
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500 mt-6">No gallery items yet.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border bg-white"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={item.imageUrl}
                  alt={item.title || "Project"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {item.title && (
                <div className="p-3 text-sm font-medium">{item.title}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
