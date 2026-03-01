const testimonials = [
  {
    name: "Customer",
    text: "Excellent finish and very professional. The bathroom looks amazing and everything was clean and tidy.",
  },
  {
    name: "Customer",
    text: "Great communication and on-time. Quality work with attention to detail. Highly recommended.",
  },
  {
    name: "Customer",
    text: "Fast quote and perfect installation. Will definitely use Lux again for our kitchen and floors.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 border-y">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-semibold">
          Don’t just take our word for it
        </h2>
        <p className="text-gray-600 mt-2">
          Here’s what our customers say about our work.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div key={idx} className="rounded-2xl border bg-white p-6">
              <p className="text-sm text-gray-700 leading-relaxed">
                “{t.text}”
              </p>
              <div className="mt-4 text-sm font-medium">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
