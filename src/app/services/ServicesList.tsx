const services = [
  {
    title: "Bathroom Tiling",
    desc: "Walls, floors, niches, feature tiles, and clean silicone finishing.",
  },
  {
    title: "Kitchen Splashbacks",
    desc: "Precise cuts, clean grout lines, and a premium final look.",
  },
  {
    title: "Floor & Wall Tiling",
    desc: "Porcelain, ceramic, large format tiles, levelling and alignment.",
  },
  {
    title: "Stone Installation",
    desc: "Natural stone and engineered stone installation with sealing options.",
  },
  {
    title: "Waterproofing",
    desc: "Bathrooms, laundries and wet areas with compliant waterproofing systems.",
  },
  {
    title: "Re-grouting & Repairs",
    desc: "Remove and replace grout/silicone, fix cracked tiles and tidy edges.",
  },
  {
    title: "Screeding & Preparation",
    desc: "Subfloor preparation for a long-lasting finish and proper falls.",
  },
  {
    title: "Commercial Tiling",
    desc: "Retail, offices, strata common areas—reliable scheduling and quality.",
  },
];

export default function ServicesList() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Services</h1>
      <p className="text-gray-600 mt-2 max-w-2xl">
        Professional tiling, stone, and waterproofing services for residential
        and commercial projects.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.title} className="rounded-2xl border bg-white p-6">
            <div className="h-10 w-10 rounded-lg bg-black/5 mb-4" />
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border bg-gray-50 p-6">
        <h2 className="text-xl font-semibold">Need a quote?</h2>
        <p className="text-gray-600 mt-2">
          Send your suburb, area size, tile/stone type, and photos — we’ll get
          back to you quickly.
        </p>
        <a
          href="/contact"
          className="inline-flex mt-4 bg-black text-white px-5 py-3 rounded-lg text-sm"
        >
          Request a Free Consultation
        </a>
      </div>
    </section>
  );
}
