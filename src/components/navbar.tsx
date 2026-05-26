"use client";

import Link from "next/link";

import { useTheme } from "next-themes";

import { useEffect, useState } from "react";

import CartDrawer from "./cart-drawer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuthStore } from "@/store/auth.store";

import toast from "react-hot-toast";

import {
  faSearch,
  faBagShopping,
  faHeart,
  faMoon,
  faSun,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const { theme, setTheme } =
    useTheme();

  const { user, logout } =
    useAuthStore();

  const [mounted, setMounted] =
    useState(false);

  const [cartOpen, setCartOpen] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 glass">
        <div className="container-custom h-20 flex items-center justify-between">

          {/* Logo */}
          <Link href="/">
            <h1 className="text-3xl font-bold gradient-text tracking-wide">
              VYOMA
            </h1>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              "Home",
              "Shop",
              "Collections",
              "About",
            ].map((item) => (
              <Link
                key={item}
                href="/"
                className="text-sm font-medium hover:text-purple-400 transition duration-300"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-5">

            {/* Search */}
            <button className="hidden md:block">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-lg hover:text-purple-400 transition"
              />
            </button>

            {/* Wishlist */}
            <button className="hidden md:block">
              <FontAwesomeIcon
                icon={faHeart}
                className="text-lg hover:text-pink-400 transition"
              />
            </button>

            {/* Cart */}
            <button
              onClick={() =>
                setCartOpen(true)
              }
              className="relative"
            >
              <FontAwesomeIcon
                icon={faBagShopping}
                className="text-lg hover:text-orange-400 transition"
              />
            </button>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() =>
                  setTheme(
                    theme === "dark"
                      ? "light"
                      : "dark"
                  )
                }
              >
                <FontAwesomeIcon
                  icon={
                    theme === "dark"
                      ? faSun
                      : faMoon
                  }
                  className="text-lg hover:text-yellow-400 transition"
                />
              </button>
            )}

            {/* Auth */}
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="hidden md:block text-sm font-medium"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="hidden md:block px-5 py-2 rounded-full bg-gradient-to-r from-[#7C8CFF] via-[#C084FC] to-[#FFB38A] text-white text-sm"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-4">

                <p className="text-sm">
                  Hi, {user.name}
                </p>

                <button
                  onClick={() => {
                    logout();

                    toast.success(
                      "Logged out"
                    );
                  }}
                  className="text-sm hover:text-red-400 transition"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Mobile Menu */}
            <button className="md:hidden">
              <FontAwesomeIcon
                icon={faBars}
                className="text-xl"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        setOpen={setCartOpen}
      />
    </>
  );
}