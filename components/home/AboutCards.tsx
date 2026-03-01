export default function AboutCards() {
  const items = [
    {
      title: "Our History",
      text: "We’ve built our reputation through consistent quality, clean workmanship, and attention to detail across residential and commercial projects.",
    },
    {
      title: "Our Services",
      text: "Wall & floor tiling, stone installation, bathroom renovations, waterproofing, screeding, and more — delivered with professional finish.",
    },
    {
      title: "Our Story",
      text: "Lux was created to bring premium tiling and stone results with clear communication, transparent quotes, and reliable scheduling.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((i) => (
          <div key={i.title} className="border rounded-2xl p-6 bg-white">
            <h3 className="font-semibold text-lg">{i.title}</h3>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              {i.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
