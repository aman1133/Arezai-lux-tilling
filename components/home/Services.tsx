const services = [
  "Bathroom Tiling",
  "Kitchen Splashbacks",
  "Floor & Wall Tiling",
  "Stone Installation",
  "Waterproofing",
  "Grouting & Re-grouting",
  "Screeding",
  "Commercial Tiling",
];

export default function Services() {
  return (
    <section className="bg-gray-50 border-y">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-2xl font-semibold">Our Services</h2>
            <p className="text-gray-600 mt-2">
              Premium finishes for tiles and stone, done properly from prep to
              seal.
            </p>
          </div>
          <a className="text-sm underline" href="/services">
            View all services
          </a>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {services.map((s) => (
            <div key={s} className="rounded-2xl border bg-white p-5">
              <div className="h-10 w-10 rounded-lg bg-black/5 mb-4" />
              <div className="font-medium">{s}</div>
              <p className="text-xs text-gray-600 mt-2">
                High-quality materials, clean lines, and durable results.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
