import Image from "next/image";
import Link from "next/link";

const mainNavLinks = [
  { title: "About", href: "/about" },
  { title: "Products", href: "/products" },
  { title: "Projects", href: "/projects" },
  { title: "News", href: "/news" },
  { title: "Support", href: "/support" },
  { title: "Contact", href: "/contact" },
];

const supportLinks = [
  { title: "거래가격 공시", href: "/support?tab=transaction-price" },
  { title: "카탈로그 요청", href: "/support?tab=catalog-request" },
  { title: "A/S 접수", href: "/support?tab=service-request" },
  { title: "온라인 견적 요청", href: "/support?tab=online-quote" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="container mx-auto pt-12 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Logo */}
          <div className="mb-8 md:mb-0">
            <Link href="/" className="w-[80px] h-[30px] relative block">
              <Image
                src="/images/Sein_logo.png"
                alt="SEIN Logo"
                fill
                priority
                className="object-contain invert"
              />
            </Link>
            <div className="mt-4 text-sm text-gray-400">
              <p>세인환경디자인</p>
              <p>사업자등록번호: 123-45-67890</p>
              <p>서울시 강남구 영동대로 82길 25 해승빌딩 3,4층</p>
              <p>Tel: 02-575-3274</p>
              <p>Email: master@spacetalk.co.kr</p>
            </div>
          </div>

          {/* Navigation and Support Links */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            {/* Main Navigation */}
            <div>
              <h3 className="text-lg font-semibold mb-4">메뉴</h3>
              <ul className="space-y-2">
                {mainNavLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">고객 지원</h3>
              <ul className="space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-800 flex items-center justify-between w-full">
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} SEIN. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 text-center">
            site by <Link href="https://facto-studio.com">FACTO</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
