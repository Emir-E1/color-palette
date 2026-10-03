import { auth } from "@/lib/auth";
import { connectDB } from "@/db/mongodb";
import User from "@/db/models/User";
import FavoritesList from "@/components/FavoritesList";
export default async function page() {
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <main className="p-6">
        {" "}
        <h1 className="text-xl font-semibold">
          {" "}
          Login to get your favorite{" "}
        </h1>{" "}
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
      {" "}
      <div className="mx-auto max-w-5xl">
        {" "}
        {/* Header */}{" "}
        <div className="mb-8">
          {" "}
          <h1 className="text-3xl font-bold">My Favorites</h1>{" "}
          <p className="mt-2 text-gray-500">
            {" "}
            Find all your saved palette here!{" "}
          </p>{" "}
        </div>{" "}
        {/* Favorites */}{" "}
        {favorites.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
            {" "}
            <h2 className="text-lg font-semibold">Empty</h2>{" "}
            <p className="mt-2 text-sm text-gray-500">
              {" "}
              Add favorites and find it here{" "}
            </p>{" "}
          </div>
        ) : (
          <FavoritesList favorites={JSON.parse(JSON.stringify(favorites))} />
        )}{" "}
      </div>{" "}
    </main>
  );
}
