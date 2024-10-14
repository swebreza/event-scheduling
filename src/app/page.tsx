"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  FaCalendar,
  FaCheck,
  FaChevronRight,
  FaClock,
  FaUsers,
} from "react-icons/fa";
import Header from "~/components/header";
import { Button } from "~/components/ui/button";

export default function Home() {
  const userData = useSession();
  console.log("Session Data", userData);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* Main Content */}
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  Simplify Your Scheduling
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Seamlessly integrate with Google Calendar to manage your
                  appointments and boost productivity.
                </p>
              </div>
              {userData.data === null || userData.data === undefined ? (
                <div className="space-x-4">
                  <Link
                    href="/auth"
                    className="rounded-xl bg-black p-4 text-white"
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <div className="">
                  <Link
                    href="/dashboard"
                    className="rounded-xl bg-black p-4 text-white"
                  >
                    Dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-5xl">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              {[
                {
                  icon: FaClock,
                  title: "Easy Scheduling",
                  description:
                    "Set your availability and let clients book their own appointments.",
                },
                {
                  icon: FaCalendar,
                  title: "Google Calendar Sync",
                  description:
                    "Automatically sync with your Google Calendar to avoid double bookings.",
                },
                {
                  icon: FaUsers,
                  title: "Team Scheduling",
                  description:
                    "Coordinate schedules across your entire team effortlessly.",
                },
              ].map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex flex-col items-center space-y-2 rounded-lg border-gray-800 p-4"
                >
                  <Icon className="mb-2 h-8 w-8" />
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                  Google Calendar Integration
                </h2>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl lg:text-base xl:text-xl">
                  Our platform seamlessly integrates with Google Calendar,
                  allowing you to:
                </p>
                <ul className="space-y-2">
                  {[
                    "Sync your existing events",
                    "Automatically update your availability",
                    "Receive real-time updates",
                  ].map((item) => (
                    <li key={item} className="flex items-center">
                      <FaCheck className="mr-2 h-4 w-4" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center">
                <FaCalendar className="h-64 w-64 text-primary" />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full bg-primary py-12 text-primary-foreground md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Ready to Streamline Your Scheduling?
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl">
                  Join thousands of professionals who have simplified their
                  scheduling process.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                {userData.data === null || userData.data === undefined ? (
                  <>
                    <Link href="/auth">
                      <Button
                        className="bg-primary-foreground text-primary"
                        type="submit"
                      >
                        Get Started
                        <FaChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <p className="text-xs text-primary-foreground/90">
                      Start now. No credit card required.
                    </p>
                  </>
                ) : (
                  <div className="">
                    <Link
                      href="/dashboard"
                      className="rounded-xl bg-white p-4 text-black"
                    >
                      Dashboard
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Acme Scheduling. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          {["Terms of Service", "Privacy"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-xs underline-offset-4 hover:underline"
            >
              {item}
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  );
}
