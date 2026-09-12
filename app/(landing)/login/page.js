import { LoginForm } from "@/components/login-form";

function page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-sm md:max-w-5xl">
        <LoginForm />
      </div>
    </div>
  );
}

export default page;
