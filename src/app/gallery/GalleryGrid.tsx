const images = Array.from({ length: 12 }, (_, i) => `/works/${i + 1}.jpg`);

export default function GalleryGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Gallery</h1>
      <p className="text-gray-600 mt-2 max-w-2xl">
        A selection of our tiling and stone work. More projects will be added
        regularly.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {images.map((src) => (
          <div
            key={src}
            className="rounded-2xl overflow-hidden border bg-gray-50"
          >
            <img src={src} alt="Project" className="h-64 w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
