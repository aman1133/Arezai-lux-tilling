import Link from "next/link";

export default function CTASection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="rounded-2xl border bg-black text-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-semibold">
            Ready to start your project?
          </h3>
          <p className="text-white/80 mt-2">
            Get a fast quote and professional guidance on tiles, stone, and
            waterproofing.
          </p>
        </div>
        <Link
          href="/contact"
          className="bg-white text-black px-5 py-3 rounded-lg text-sm font-medium"
        >
          Request a Free Consultation
        </Link>
      </div>
    </section>
  );
}
