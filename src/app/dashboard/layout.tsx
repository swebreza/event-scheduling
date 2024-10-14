"use client";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../_components/dashboard/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession(); // useSession hook to check if the user is logged in

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // If no session exists, redirect the user to the login page or show nothing
  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-500 to-indigo-600">
        <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
          <h1 className="mb-4 animate-pulse text-4xl font-bold text-gray-800">
            Access Denied!!!
          </h1>
          <p className="mb-6 text-lg text-gray-700">
            You are not logged in. Please sign in to continue to the dashboard.
          </p>
          <button
            className="mx-2 transform rounded-md bg-gray-700 px-6 py-3 text-lg font-medium text-white shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-gray-600"
            onClick={() => signIn()}
          >
            Sign In
          </button>
          <Link
            href="/"
            className="transform rounded-md bg-gray-700 px-6 py-3 text-lg font-medium text-white shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-gray-600"
          >
            Explore Home
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-br from-gray-500 to-indigo-600 md:flex md:min-h-screen md:p-2">
      <Navbar />
      <div className="flex flex-grow flex-col">
        <main className="flex-grow bg-black">{children}</main>
      </div>
    </div>
  );
}
