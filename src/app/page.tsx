import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  // Automatically redirect logged in users to main page
  const { userId } = auth();
  if (userId) redirect("/main");

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation Bar */}

      {/* Marketing Message on Welcome Page */}
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <h1 className="mb-5 text-4xl font-extrabold">
          Career Exploration made simple, with Is-sem.
        </h1>
        <p className="mb-10 text-lg text-gray-600">
          Explore careers. Find out what you need to thrive in your your career.
        </p>
        <div className="flex space-x-4">
          <Button size="lg" asChild>
            <Link href="/main">Try Is-sem Now</Link>
          </Button>
        </div>
      </div>

      {/* Footer text */}
      <div style={{ textAlign: "center" }}>
        <p className="mx-2 mb-4 text-xs text-gray-400">
          Is-sem is currently in beta mode and can answer questions about a few
          job positions. More capabilities to come.
        </p>
      </div>
    </div>
  );
}
