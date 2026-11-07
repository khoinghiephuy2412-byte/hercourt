import React from "react";
import Link from "next/link";
import { MapPin, ShieldCheck, Heart, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B0D11] border-t border-[#2B3441] text-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 sm:py-20">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <div className="flex items-baseline tracking-tighter mb-4">
              <span className="text-3xl font-black uppercase text-[#FAF9F6] tracking-[-0.05em]">
                HER
              </span>
              <span className="text-3xl font-black uppercase text-[#722D4A] ml-1 tracking-[-0.05em]">
                COURT
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#D9FF3F] ml-1.5 inline-block" />
            </div>

            <p className="text-lg font-serif italic text-[#E8A9C3] mb-3">
              “Fashion that moves with you.”
            </p>

            <p className="text-xs text-[#FAF9F6]/60 leading-relaxed max-w-sm mb-6">
              Nền tảng khám phá thời trang thể thao nữ chuyên sâu đầu tiên tại Biên Hòa.
              Tôn vinh vẻ đẹp khỏe khoắn, tốc độ và sự tự tin của phái đẹp trên mọi sân tập.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#FAF9F6]/80 bg-[#181D25] border border-[#2B3441] p-3 rounded-xl max-w-sm">
              <ShieldCheck className="w-4 h-4 text-[#D9FF3F] shrink-0" />
              <span>Chuyển tiếp trực tiếp cửa hàng chính hãng tại Biên Hòa</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#D9FF3F] mb-4">
              DANH MỤC SẢN PHẨM
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF9F6]/70">
              <li>
                <a href="#products" className="hover:text-[#E8A9C3] transition-colors">
                  Váy Thể Thao Xếp Ly (6)
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#E8A9C3] transition-colors">
                  Áo Polo Thi Đấu & Đi Chơi (11)
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#E8A9C3] transition-colors">
                  Bộ Quần Áo Cầu Lông (4)
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#E8A9C3] transition-colors">
                  Quần 2 Lớp Co Giãn (1)
                </a>
              </li>
              <li>
                <a href="#editorial" className="hover:text-[#E8A9C3] transition-colors">
                  Lookbook LIA 2026
                </a>
              </li>
            </ul>
          </div>

          {/* Partner Stores */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#D9FF3F] mb-4">
              SHOP BIÊN HÒA NỔI BẬT
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF9F6]/70">
              <li>
                <a href="#stores" className="hover:text-[#E8A9C3] transition-colors">
                  BEYONO — 2 Võ Thị Sáu
                </a>
              </li>
              <li>
                <a href="#stores" className="hover:text-[#E8A9C3] transition-colors">
                  VNB Sports — 45 Hưng Đạo Vương
                </a>
              </li>
              <li>
                <a href="#stores" className="hover:text-[#E8A9C3] transition-colors">
                  VNB Sports — 683 Phạm Văn Thuận
                </a>
              </li>
              <li>
                <a href="#stores" className="hover:text-[#E8A9C3] transition-colors">
                  Phượng Sport — 384 Phạm Văn Thuận
                </a>
              </li>
              <li>
                <a href="#stores" className="hover:text-[#E8A9C3] transition-colors">
                  Gia Thiện Sport — 504 Nguyễn Ái Quốc
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#D9FF3F] mb-4">
              THÔNG TIN & HỖ TRỢ
            </h4>
            <div className="space-y-2.5 text-xs text-[#FAF9F6]/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E8A9C3] shrink-0 mt-0.5" />
                <span>TP. Biên Hòa, Đồng Nai, Việt Nam</span>
              </div>
              <p className="text-[11px] text-[#FAF9F6]/50 leading-relaxed pt-2">
                Thời gian mở cửa trung bình các shop: 08:00 – 21:30 hàng ngày.
              </p>
              <div className="pt-2">
                <a
                  href="#stores"
                  className="inline-block text-[11px] font-bold text-[#D9FF3F] hover:underline"
                >
                  Xem hướng dẫn chỉ đường Google Maps ↗
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="border-t border-[#2B3441] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#FAF9F6]/50">
          <div>
            © 2026 HERCOURT (HER COURT). Tôn vinh thời trang thể thao nữ Biên Hòa.
          </div>
          <div className="flex items-center gap-6">
            <span>Dữ liệu tham khảo trực tiếp tại cửa hàng</span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-[#D9FF3F] transition-colors flex items-center gap-1 font-bold text-[#FAF9F6]/80"
            >
              <span>Lên đầu trang</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
