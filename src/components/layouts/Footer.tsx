import { Separator } from "@radix-ui/react-select";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full text-left bg-neutral-950 text-neutral-300 py-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + description */}
        <div>
          <h2 className="text-xl font-semibold text-white">E-Commerce</h2>
          <p className="text-sm mt-3 text-neutral-400 leading-relaxed">
            Minimal, modern, and fast shopping experience built for everyone.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition">All Products</li>
            <li className="hover:text-white transition">Categories</li>
            <li className="hover:text-white transition">New Arrivals</li>
            <li className="hover:text-white transition">Best Sellers</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition">Help Center</li>
            <li className="hover:text-white transition">Contact Us</li>
            <li className="hover:text-white transition">Returns</li>
            <li className="hover:text-white transition">Order Status</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex items-center gap-4">
            <Facebook className="w-5 h-5 hover:text-white cursor-pointer" />
            <Instagram className="w-5 h-5 hover:text-white cursor-pointer" />
            <Twitter className="w-5 h-5 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>

      <Separator className="my-10 bg-neutral-800" />

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
        <p>© {new Date().getFullYear()} E-Commerce. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="hover:text-white cursor-pointer">Terms</span>
          <span className="hover:text-white cursor-pointer">Privacy</span>
          <span className="hover:text-white cursor-pointer">Cookies</span>
        </div>
      </div>
    </footer>
  );
}
