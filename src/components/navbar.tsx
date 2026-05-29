"use client";

import Link from "next/link";

import { useTheme } from "next-themes";

import { useEffect, useState } from "react";

import CartDrawer from "./cart-drawer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuthStore } from "@/store/auth.store";

import { useWishlistStore } from "@/store/wishlist.store";

import { useCartStore } from "@/store/cart.store";

import toast from "react-hot-toast";

import {
  faSearch,
  faBagShopping,
  faHeart,
  faMoon,
  faSun,
  faBars,
  faXmark,
  faUser,
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

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Shop",
      href: "/shop",
    },
    {
      name: "Collections",
      href: "/",
    },
  ];

  const cart =
    useCartStore(
      (state) => state.cart
    );

  const wishlist =
    useWishlistStore(
      (state) => state.wishlist
    );

  return (
    <>
      <header className="sticky top-0 z-50 glass">
        <div className="container-custom h-20 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/">
            <h1 className="text-3xl font-bold gradient-text tracking-wide">
              VYOMA
            </h1>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((item) => {
              /* COLLECTIONS DROPDOWN */
              if (
                item.name ===
                "Collections"
              ) {
                const collections = [
                  "tshirts",
                  "shirts",
                  "vest",
                  "kurta",
                  "jeans",
                  "pant",
                  "shoes",
                  "trousers",
                  "cargo",
                  "joggers",
                  "shorts",
                ];

                return (
                  <div
                    key={item.name}
                    className="relative group"
                  >
                    {/* BUTTON */}
                    <button className="text-sm font-medium hover:text-purple-400 transition duration-300">
                      Collections
                    </button>

                    {/* DROPDOWN */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">

                      <div className="w-[320px] bg-[#111827]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl">

                        {/* TITLE */}
                        <div className="mb-4">
                          <h3 className="text-sm font-semibold text-white">
                            Explore Collections
                          </h3>

                          <p className="text-xs text-gray-400 mt-1">
                            Premium fashion categories
                          </p>
                        </div>

                        {/* COLLECTION GRID */}
                        <div className="grid grid-cols-2 gap-2">
                          {collections.map(
                            (
                              collection
                            ) => (
                              <Link
                                key={
                                  collection
                                }
                                href={`/collections/${collection}`}
                                className="px-4 py-3 rounded-2xl text-sm capitalize hover:bg-white/5 hover:text-purple-400 transition"
                              >
                                {
                                  collection
                                }
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              /* NORMAL LINKS */
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium hover:text-purple-400 transition duration-300"
                >
                  {item.name}
                </Link>
              );
            })}

            {/* ADMIN LINKS */}
            {user?.role ===
              "admin" && (
                <>
                  <Link
                    href="/admin"
                  className="text-sm font-medium text-orange-500 hover:text-orange-400 transition"
                  >
                    ERP
                  </Link>
                </>
              )}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-5">
            {/* SEARCH */}
            <button className="hidden md:block">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-lg hover:text-purple-400 transition"
              />
            </button>

            {/* WISHLIST */}
            <Link
              href="/wishlist"
              className="hidden md:block relative"
            >
              <FontAwesomeIcon
                icon={faHeart}
                className="text-lg hover:text-pink-400 transition"
              />

              {wishlist.length >
                0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] flex items-center justify-center font-semibold">
                    {
                      wishlist.length
                    }
                  </span>
                )}
            </Link>

            {/* CART */}
            <button
              onClick={() =>
                setCartOpen(true)
              }
              className="relative"
            >
              <FontAwesomeIcon
                icon={
                  faBagShopping
                }
                className="text-lg hover:text-orange-400 transition"
              />

              {cart.length >
                0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center font-semibold">
                    {cart.length}
                  </span>
                )}
            </button>

            {/* THEME */}
            {mounted && (
              <button
                onClick={() =>
                  setTheme(
                    theme ===
                      "dark"
                      ? "light"
                      : "dark"
                  )
                }
              >
                <FontAwesomeIcon
                  icon={
                    theme ===
                      "dark"
                      ? faSun
                      : faMoon
                  }
                  className="text-lg hover:text-yellow-400 transition"
                />
              </button>
            )}

            {/* USER */}
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  href="/profile"
                >
                  <FontAwesomeIcon
                    icon={
                      faUser
                    }
                    className="text-lg hover:text-purple-400 transition"
                  />
                </Link>

                <button
                  onClick={() => {
                    logout();

                    toast.success(
                      "Logged out"
                    );
                  }}
                  className="text-sm font-medium hover:text-red-400 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:block text-sm font-medium hover:text-purple-400 transition"
              >
                Login
              </Link>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() =>
                setMobileMenuOpen(
                  !mobileMenuOpen
                )
              }
              className="md:hidden"
            >
              <FontAwesomeIcon
                icon={
                  mobileMenuOpen
                    ? faXmark
                    : faBars
                }
                className="text-xl"
              />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10">
            <div className="container-custom py-6 flex flex-col gap-5">
              {navLinks.map(
                (item) => (
                  <Link
                    key={
                      item.name
                    }
                    href={
                      item.href
                    }
                    onClick={() =>
                      setMobileMenuOpen(
                        false
                      )
                    }
                    className="text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                )
              )}

              {/* ADMIN LINKS MOBILE */}
              {user?.role ===
                "admin" && (
                  <>
                    <Link
                      href="/admin/products"
                      className="text-sm font-medium text-orange-500"
                    >
                      Admin Products
                    </Link>

                    <Link
                      href="/admin/orders"
                      className="text-sm font-medium text-pink-500"
                    >
                      Admin Orders
                    </Link>
                  </>
                )}

              {user ? (
                <>
                  <Link href="/profile">
                    Profile
                  </Link>

                  <button
                    onClick={() => {
                      logout();

                      toast.success(
                        "Logged out"
                      );

                      setMobileMenuOpen(
                        false
                      );
                    }}
                    className="text-left text-red-400"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* CART DRAWER */}
      <CartDrawer
        open={cartOpen}
        setOpen={setCartOpen}
      />
    </>
  );
}