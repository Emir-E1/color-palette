import Link from "next/link";

const sections = [
  {
    title: "Information We Collect",
    content:
      "We store basic account information such as your name, email address and profile picture, along with your palettes and favorites. Passwords are securely hashed.",
  },
  {
    title: "No Tracking or Advertising",
    content:
      "We do not use analytics, advertising trackers or profiling tools. Your data is not sold or used for targeted advertising. Data is only used to provide ColorScan's features.",
  },
  {
    title: "Third-Party Services",
    content:
      "ColorScan uses third-party services for hosting, database storage and authentication, including Vercel, MongoDB providers and Google Sign-In. These services may process technical information.",
  },
  {
    title: "Your Data",
    content:
      "You can delete your account through the application settings. You may also request access to or correction of your personal information.",
  },
  {
    title: "Open Source",
    content:
      "ColorScan's source code is publicly available on GitHub. Making the code public does not make user accounts or personal information publicly accessible.",
  },
  {
    title: "Contact",
    content:
      "For any privacy-related questions, please contact the project owner.",
  },
];

function PrivacyPage() {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-2xl space-y-8">
        <header className="space-y-3">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:underline"
          >
            ← Back to ColorScan
          </Link>

          <h1 className="!text-3xl font-bold tracking-tight">Privacy Policy</h1>

          <p className="text-xs text-muted-foreground">
            Last updated: November 2, 2026
          </p>

          <p className="text-sm leading-6 text-muted-foreground">
            ColorScan is a personal side project. Your privacy matters, and this
            page explains how your information is handled.
          </p>
        </header>

        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="space-y-1.5">
              <h2 className="!text-base font-semibold">{section.title}</h2>
              <p className="text-sm leading-6 text-muted-foreground">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <footer className="border-t pt-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} ColorScan. Built as a personal project.
        </footer>
      </div>
    </main>
  );
}

export default PrivacyPage;
