import { auth } from "@/lib/auth";
import { connectDB } from "@/db/mongodb";
import User from "@/db/models/User";
import Palette from "@/db/models/Palette";
async function page() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold">Login to get your favorite</h1>
      </main>
    );
  }

  await connectDB();

  const user = await User.findById(session.user.id)
    .populate("favorites")
    .lean();

  const favorites = user?.favorites || [];

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Favorites</h1>

          <p className="mt-2 text-gray-500">
            Find all your saved palette here !
          </p>
        </div>

        {/* Empty state */}
        {favorites.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
            <h2 className="text-lg font-semibold">Empty</h2>

            <p className="mt-2 text-sm text-gray-500">
              Add favorites and find it here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((palette) => (
              <div
                key={palette._id.toString()}
                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                {/* Palette colors */}
                <div className="flex h-32 overflow-hidden rounded-xl">
                  {palette.colors.map((color, index) => (
                    <div
                      key={`${palette._id}-${index}`}
                      className="flex-1"
                      style={{
                        backgroundColor: color,
                      }}
                    />
                  ))}
                </div>

                {/* Palette information */}
                <div className="mt-4">
                  <h2 className="font-semibold">
                    Palette #{palette._id.toString().slice(-6)}
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {palette.colors.map((color, index) => (
                      <span
                        key={`${color}-${index}`}
                        className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default page;
