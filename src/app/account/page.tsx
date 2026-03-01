import { cookies } from "next/headers";
import { getUserFromSessionToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export default async function AccountPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  const user = token ? await getUserFromSessionToken(token) : null;

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-semibold">My Account</h1>
        <p className="text-gray-600 mt-2">
          Please{" "}
          <a className="underline" href="/login">
            sign in
          </a>{" "}
          to view your account.
        </p>
      </div>
    );
  }

  // ✅ No Prisma imports needed — infer the type from the query result
  const bookings = await prisma.booking.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  type BookingRow = (typeof bookings)[number];

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-semibold">My Account</h1>
      <p className="text-gray-600 mt-2">
        Signed in as <span className="font-medium">{user.email}</span>
      </p>

      <form action="/api/auth/logout" method="post" className="mt-6">
        <button className="border rounded-lg px-4 py-2 text-sm">Logout</button>
      </form>

      <div className="mt-10 rounded-2xl border bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">My Bookings</h2>
          <a
            className="bg-black text-white px-4 py-2 rounded-lg text-sm"
            href="/book"
          >
            New booking
          </a>
        </div>

        {bookings.length === 0 ? (
          <p className="text-gray-600 mt-4">No bookings yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {bookings.map((b: BookingRow) => (
              <div key={b.id} className="border rounded-xl p-4 bg-gray-50">
                <div className="flex justify-between gap-4 flex-wrap">
                  <div>
                    <div className="font-medium">{b.serviceType}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {b.address}
                    </div>
                    {b.notes && (
                      <div className="text-sm text-gray-600 mt-1">
                        Notes: {b.notes}
                      </div>
                    )}
                  </div>
                  <div className="text-sm">
                    <div className="text-gray-600">
                      Preferred:{" "}
                      <span className="font-medium">
                        {new Date(b.startAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-1">
                      Status:{" "}
                      <span className="inline-flex border rounded px-2 py-1 text-xs bg-white">
                        {b.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
