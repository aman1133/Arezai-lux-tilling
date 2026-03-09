import { site } from "@/lib/site";
import { getCurrentUser } from "@/lib/current-user";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const user = await getCurrentUser();

  return (
    <HeaderClient
      siteName={site.name}
      serviceArea={site.serviceArea}
      phoneDisplay={site.phoneDisplay}
      phoneHref={site.phoneHref}
      user={
        user
          ? {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            }
          : null
      }
    />
  );
}
