import Link from "next/link";

import {
  faInstagram,
  faFacebook,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-white/10 mt-24">

      <div className="container-custom py-16">

        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold gradient-text">
              VYOMA
            </h2>

            <p className="text-gray-500 mt-5 leading-relaxed">
              Premium fashion marketplace
              redefining modern style.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Shop
            </h3>

            <div className="flex flex-col gap-3">

              <Link href="/shop">
                All Products
              </Link>

              <Link href="/wishlist">
                Wishlist
              </Link>

              <Link href="/profile">
                My Orders
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Company
            </h3>

            <div className="flex flex-col gap-3">

              <Link href="/">
                About Us
              </Link>

              <Link href="/">
                Contact
              </Link>

              <Link href="/">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Follow Us
            </h3>

            <div className="flex items-center gap-5 text-2xl">

              <a
                href="https://instagram.com"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="hover:text-pink-500 transition"
                />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="hover:text-blue-500 transition"
                />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faXTwitter}
                  className="hover:text-gray-400 transition"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 dark:border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-500 text-sm">
            © 2026 Vyoma. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Built with Next.js & MERN
          </p>
        </div>
      </div>
    </footer>
  );
}