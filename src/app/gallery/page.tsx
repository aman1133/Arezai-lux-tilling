import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function GalleryPage() {
  const items = await prisma.galleryItem.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Gallery</h1>
      <p className="text-gray-600 mt-2 max-w-2xl">
        A selection of our tiling and stone work.
      </p>

      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border bg-gray-50 p-8 text-gray-700">
          No gallery items yet (or none published). In Prisma Studio, add rows
          to <span className="font-medium">GalleryItem</span> and set{" "}
          <span className="font-medium">isPublished</span> to true.
        </div>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item: any) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden border bg-gray-50"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={item.imageUrl}
                  alt={item.title || "Project"}
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              {(item.title || item.description) && (
                <div className="p-4 bg-white">
                  {item.title && (
                    <div className="font-medium">{item.title}</div>
                  )}
                  {item.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
