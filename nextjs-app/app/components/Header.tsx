import Image from "next/image";
import Link from "next/link";

export default function Header({ className = "" }: { className?: string }) {
  const isTransparent = className.includes("bg-transparent");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-4  bg-white border-b transition-all duration-300 ${className}`}
    >
      <nav className="container mx-auto flex items-center justify-between">
        <Link href="/" className="w-[80px] h-[30px] relative">
          <Image
            src="/images/Sein_logo.png"
            alt="SEIN Logo"
            fill
            priority
            className={`object-contain transition-all duration-300 ${isTransparent ? "invert" : ""}`}
          />
        </Link>

        <div className="flex space-x-6 text-[13px] font-medium absolute left-1/2 transform -translate-x-1/2">
          <Link href="/about" className="hover:opacity-60 transition-opacity">
            About
          </Link>
          <Link
            href="/products"
            className="hover:opacity-60 transition-opacity"
          >
            Products
          </Link>
          <Link
            href="/projects"
            className="hover:opacity-60 transition-opacity"
          >
            Projects
          </Link>
          <Link href="/news" className="hover:opacity-60 transition-opacity">
            News
          </Link>
        </div>

        <div className="flex space-x-6 text-[13px] font-medium">
          <Link href="/download" className="hover:opacity-60 transition-opacity">
            Download
          </Link>
          <Link href="/contact" className="hover:opacity-60 transition-opacity">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
