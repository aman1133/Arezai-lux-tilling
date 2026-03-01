import ContactForm from "./ContactForm";
import BusinessDetails from "./BusinessDetails";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p className="text-gray-600 mt-2 max-w-2xl">
        Send an enquiry for a quote, booking request, or service question.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <ContactForm />
        <BusinessDetails />
      </div>
    </section>
  );
}
