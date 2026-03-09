import {
  Bath,
  CookingPot,
  LayoutGrid,
  Gem,
  Droplets,
  Wrench,
  Layers,
  Building2,
} from "lucide-react";

const services = [
  {
    title: "Bathroom Tiling",
    desc: "Walls, floors, niches, feature tiles, and clean silicone finishing.",
    icon: Bath,
  },
  {
    title: "Kitchen Splashbacks",
    desc: "Precise cuts, clean grout lines, and a premium final look.",
    icon: CookingPot,
  },
  {
    title: "Floor & Wall Tiling",
    desc: "Porcelain, ceramic, large format tiles, levelling and alignment.",
    icon: LayoutGrid,
  },
  {
    title: "Stone Installation",
    desc: "Natural stone and engineered stone installation with sealing options.",
    icon: Gem,
  },
  {
    title: "Waterproofing",
    desc: "Bathrooms, laundries and wet areas with compliant waterproofing systems.",
    icon: Droplets,
  },
  {
    title: "Re-grouting & Repairs",
    desc: "Remove and replace grout/silicone, fix cracked tiles and tidy edges.",
    icon: Wrench,
  },
  {
    title: "Screeding & Preparation",
    desc: "Subfloor preparation for a long-lasting finish and proper falls.",
    icon: Layers,
  },
  {
    title: "Commercial Tiling",
    desc: "Retail, offices, strata common areas—reliable scheduling and quality.",
    icon: Building2,
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
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <div
              key={service.title}
              className="rounded-2xl border bg-white p-6 transition hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-black/5">
                <Icon className="h-5 w-5 text-gray-800" />
              </div>

              <h3 className="font-semibold">{service.title}</h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {service.desc}
              </p>
            </div>
          );
        })}
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
