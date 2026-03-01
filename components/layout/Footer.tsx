import Link from "next/link";
import { site } from "../../lib/site";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-semibold">{site.name}</div>
          <p className="text-sm text-gray-600 mt-2">
            Professional tiling, stone installation and waterproofing with clean
            finishes and reliable timelines.
          </p>
          <div className="text-sm mt-4 space-y-1">
            <div>{site.addressLine1}</div>
            <div>{site.addressLine2}</div>
            <div>
              <a className="underline" href={`tel:${site.phoneHref}`}>
                {site.phoneDisplay}
              </a>
            </div>
            <div>
              <a className="underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
          </div>
        </div>

        <div>
          <div className="font-semibold">Quick Links</div>
          <div className="mt-3 space-y-2 text-sm">
            <Link className="block hover:underline" href="/">
              Home
            </Link>
            <Link className="block hover:underline" href="/services">
              Services
            </Link>
            <Link className="block hover:underline" href="/gallery">
              Gallery
            </Link>
            <Link className="block hover:underline" href="/contact">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <div className="font-semibold">Business Hours</div>
          <div className="mt-3 space-y-2 text-sm">
            {site.hours.map((h) => (
              <div key={h.day} className="flex justify-between gap-6">
                <span className="text-gray-700">{h.day}</span>
                <span className="text-gray-600">{h.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-gray-600 flex justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>ABN / ACN (add here)</span>
        </div>
      </div>
    </footer>
  );
}
