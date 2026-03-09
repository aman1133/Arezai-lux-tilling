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
    icon: Bath,
  },
  {
    title: "Kitchen Splashbacks",
    icon: CookingPot,
  },
  {
    title: "Floor & Wall Tiling",
    icon: LayoutGrid,
  },
  {
    title: "Stone Installation",
    icon: Gem,
  },
  {
    title: "Waterproofing",
    icon: Droplets,
  },
  {
    title: "Grouting & Re-grouting",
    icon: Wrench,
  },
  {
    title: "Screeding",
    icon: Layers,
  },
  {
    title: "Commercial Tiling",
    icon: Building2,
  },
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
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="rounded-2xl border bg-white p-5 transition hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-black/5">
                  <Icon className="h-5 w-5 text-gray-800" />
                </div>

                <div className="font-medium">{service.title}</div>

                <p className="text-xs text-gray-600 mt-2">
                  High-quality materials, clean lines, and durable results.
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
