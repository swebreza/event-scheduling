"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaFilm,
  FaHome,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaSeedling,
  FaProductHunt,
  FaVideo,
} from "react-icons/fa";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("/dashboard");

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleSelect = (path: string) => {
    setSelected(path);
  };

  const linkClasses = (path: string) =>
    selected === path
      ? "flex items-center px-4 py-2 bg-gray-800 text-white font-bold rounded-lg"
      : "flex items-center px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-lg";

  return (
    <div className="md:flex md:min-h-min">
      {/* Mobile Menu Button */}
      <button
        className="p-4 focus:outline-none md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <FaTimes className="h-6 w-6" />
        ) : (
          <FaBars className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-10 w-64 transform bg-black shadow-md transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:w-64 md:translate-x-0`}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-200">
            <Link href="/dashboard">Dashboard</Link>
          </h1>
        </div>
        <nav className="mt-6 flex flex-col gap-3">
          <Link
            href="/dashboard"
            className={linkClasses("/dashboard")}
            onClick={() => handleSelect("/dashboard")}
          >
            <FaHome className="mr-2 h-5 w-5" />
            Dashboard
          </Link>

          <Link
            href="/dashboard/meeting"
            className={linkClasses("/dashboard/meeting")}
            onClick={() => handleSelect("/dashboard/meeting")}
          >
            <FaVideo className="mr-2 h-5 w-5" />
            My meetings
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-gray-100 text-gray-800 hover:text-white">
                <FaSignOutAlt className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogDescription>Are you sure?</DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button onClick={() => signOut()} className="bg-gray-800">
                  Logout
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
