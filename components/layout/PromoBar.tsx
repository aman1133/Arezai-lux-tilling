import { site } from "../../lib/site";

export default function PromoBar() {
  return (
    <div className="w-full bg-black text-white text-sm">
      <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between gap-4">
        <div className="truncate">
          Free onsite quote • Tiling • Stone • Waterproofing • Quality
          workmanship
        </div>
        <a className="shrink-0 underline" href={`tel:${site.phoneHref}`}>
          Call: {site.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
