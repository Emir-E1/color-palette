import { LoginForm } from "@/components/login-form";
import { Suspense } from "react";

function Page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-sm space-y-5 md:max-w-5xl">
        <div className="mx-auto max-w-sm space-y-2 text-center">
          <h1 className="text-xl font-semibold">Welcome to ColorScan 🎨</h1>

          <p className="text-sm text-muted-foreground">
            Create your own account or explore the app using our demo account.
            No Google sign-in required.
          </p>

          <div className="rounded-lg border bg-muted/40 p-3 text-sm text-left space-y-2">
            <p className="font-medium">Want to try it first?</p>

            <div className="space-y-1 text-muted-foreground">
              <p>
                Email:{" "}
                <span className="font-mono text-foreground">demo@demo.com</span>
              </p>
              <p>
                Password:{" "}
                <span className="font-mono text-foreground">demo</span>
              </p>
            </div>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
