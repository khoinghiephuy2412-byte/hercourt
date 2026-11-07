import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#11151B",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bien-hoa-do-the-thao-nu.vercel.app"),
  title: "HERCOURT — Nền Tảng Khám Phá Đồ Thể Thao Nữ Biên Hòa",
  description:
    "Cổng khám phá váy thể thao xếp ly, áo polo thi đấu, bộ đồ cầu lông và quần thể thao nữ cao cấp từ BEYONO, VNB Sports, Phượng Sport tại Biên Hòa, Đồng Nai. Giá gốc minh bạch, chỉ đường Google Maps trực tiếp.",
  keywords: [
    "đồ thể thao nữ biên hòa",
    "váy cầu lông biên hòa",
    "áo polo thể thao nữ",
    "beyono biên hòa",
    "vnb sports biên hòa",
    "phượng sport",
    "thời trang thể thao nữ đồng nai",
    "hercourt",
  ],
  authors: [{ name: "HERCOURT Studio" }],
  openGraph: {
    title: "HERCOURT — Own The Game. Wear The Energy.",
    description: "Khám phá thời trang thể thao nữ Biên Hòa tuyển chọn cùng đại sứ LIA.",
    url: "https://bien-hoa-do-the-thao-nu.vercel.app",
    siteName: "HERCOURT",
    images: [
      {
        url: "/images/lia-hero.jpg",
        width: 1920,
        height: 1080,
        alt: "HERCOURT Athlete LIA",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#11151B] text-[#FAF9F6] antialiased selection:bg-[#D9FF3F] selection:text-[#11151B]">
        {children}
      </body>
    </html>
  );
}
