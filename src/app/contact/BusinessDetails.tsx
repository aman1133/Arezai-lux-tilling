import { site } from "../../../lib/site";

export default function BusinessDetails() {
  return (
    <div className="rounded-2xl border bg-gray-50 p-6">
      <h3 className="text-lg font-semibold">Contact Details</h3>

      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <div className="font-medium">{site.name}</div>
        <div>{site.addressLine1}</div>
        <div>{site.addressLine2}</div>

        <div className="pt-2">
          <div className="text-gray-600 text-xs">Phone</div>
          <a className="underline" href={`tel:${site.phoneHref}`}>
            {site.phoneDisplay}
          </a>
        </div>

        <div>
          <div className="text-gray-600 text-xs">Email</div>
          <a className="underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
      </div>

      <div className="mt-6 border-t pt-5">
        <h4 className="font-semibold">Business Hours</h4>
        <div className="mt-3 space-y-2 text-sm">
          {site.hours.map((h) => (
            <div key={h.day} className="flex justify-between gap-6">
              <span className="text-gray-700">{h.day}</span>
              <span className="text-gray-600">{h.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t pt-5">
        <h4 className="font-semibold">Service Area</h4>
        <p className="text-sm text-gray-600 mt-2">{site.serviceArea}</p>
      </div>
    </div>
  );
}
