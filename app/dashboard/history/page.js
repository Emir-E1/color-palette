import { auth } from "@/lib/auth";
import { connectDB } from "@/db/mongodb";
import History from "@/db/models/History";
import Palette from "@/db/models/Palette"; // nécessaire pour que populate connaisse le modèle

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold">Login to see your history</h1>
      </main>
    );
  }

  await connectDB();

  const history = await History.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .limit(10)
    .populate("paletteId")
    .lean();

  // on ignore les palettes supprimées (populate renvoie null)
  const items = history
    .filter((h) => h.paletteId)
    .map((h) => ({
      _id: h._id.toString(),
      createdAt: h.createdAt.toISOString(),
      palette: {
        _id: h.paletteId._id.toString(),
        colors: h.paletteId.colors,
      },
    }));

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">History</h1>
          <p className="mt-2 text-gray-500">
            Your last palettes (kept for 10 hours, max 10).
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
            <h2 className="text-lg font-semibold">Empty</h2>
            <p className="mt-2 text-sm text-gray-500">
              Generate a palette and it will show up here
            </p>
          </div>
        ) : (
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex h-32 overflow-hidden rounded-xl">
                  {item.palette.colors.map((color, index) => (
                    <div
                      key={`${item._id}-${index}`}
                      className="flex-1"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <div className="mt-4">
                  <h2 className="font-semibold">
                    Palette #{item.palette._id.slice(-6)}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleString("fr-FR")}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.palette.colors.map((color, index) => (
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
