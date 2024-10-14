"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaCalendar, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { Button } from "./ui/button";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const userData = useSession();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      {/* Header */}
      <header className="container mx-auto flex h-14 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center">
          <FaCalendar className="h-6 w-6" />
          <span className="sr-only">Acme Scheduling</span>
        </Link>

        {/* Hamburger Menu (mobile) */}
        <button
          className="block sm:hidden"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {menuOpen ? (
            <FaTimes className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>

        {/* Navigation Menu */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute right-0 top-14 z-10 w-full bg-white shadow-lg sm:static sm:ml-auto sm:flex sm:w-auto sm:gap-6 sm:bg-transparent sm:shadow-none`}
        >
          {userData.data === null || userData.data === undefined ? (
            <div className="space-x-4">
              <Link
                href="/auth"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:underline sm:inline sm:px-0 sm:py-0"
              >
                signin
              </Link>
            </div>
          ) : (
            <div className="">
              <Button className="btn btn-danger" onClick={() => signOut()}>
                <span className="px-1">Sign out </span>
                <FaSignOutAlt />
              </Button>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}
