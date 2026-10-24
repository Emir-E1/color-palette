import SettingsForm from "@/components/SettingsForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-500">
            Manage your profile and account security.
          </p>
        </div>

        <SettingsForm
          user={{
            name: session.user.name ?? "",
            image: session.user.image ?? "",
            email: session.user.email ?? "",
            hashedPassword: session.user.password ?? null,
          }}
        />
      </div>
    </main>
  );
}
