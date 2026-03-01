import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[520px] w-full overflow-hidden">
        <img
          src="/hero.jpg"
          alt="Luxury tiling and stone finishes"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0">
          <div className="mx-auto max-w-6xl px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <p className="text-sm uppercase tracking-widest text-white/80">
                Tiling • Stone • Waterproofing
              </p>
              <h1 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">
                Lux Tiling & Stone Services
                <br />
                Clean finishes. Reliable timelines.
              </h1>
              <p className="mt-4 text-white/90 text-lg">
                Bathroom renovations, kitchen splashbacks, floor tiling, natural
                stone installation and waterproofing — done professionally.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="bg-white text-black px-5 py-3 rounded-lg text-sm font-medium"
                >
                  Request a Free Consultation
                </Link>
                <Link
                  href="/gallery"
                  className="border border-white/70 text-white px-5 py-3 rounded-lg text-sm font-medium"
                >
                  View Our Work
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <Stat label="Years Experience" value="10+" />
                <Stat label="On-time Delivery" value="Reliable" />
                <Stat label="Waterproofing" value="AS Compliant" />
                <Stat label="Free Quotes" value="Fast" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-lg p-3">
      <div className="text-lg font-semibold">{value}</div>
      <div className="text-white/80 text-xs mt-1">{label}</div>
    </div>
  );
}
