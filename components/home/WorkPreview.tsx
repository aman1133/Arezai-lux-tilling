import Link from "next/link";

const images = [1, 2, 3, 4, 5, 6].map((n) => `/works/${n}.jpg`);

export default function WorksPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h2 className="text-2xl font-semibold">Some of Our Works</h2>
          <p className="text-gray-600 mt-2">
            A selection of recent tiling and stone projects.
          </p>
        </div>
        <Link className="text-sm underline" href="/gallery">
          View full gallery
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {images.map((src) => (
          <div
            key={src}
            className="rounded-2xl overflow-hidden border bg-gray-50"
          >
            <img src={src} alt="Project" className="h-56 w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
