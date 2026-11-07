"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles, ShieldCheck, MapPin, Compass } from "lucide-react";

interface HeroSectionProps {
  onExploreClick: () => void;
  onStoresClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onStoresClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#11151B] pt-6 pb-12 lg:pt-10 lg:pb-20 border-b border-[#2B3441]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#722D4A]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#D9FF3F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Bold Editorial Typography & Mission */}
          <div className="lg:col-span-6 flex flex-col justify-center z-10">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181D25] border border-[#722D4A]/50 w-fit mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D9FF3F]" />
              <span className="text-[11px] font-black tracking-widest text-[#E8A9C3] uppercase">
                HERCOURT DISCOVERY · BIÊN HÒA, ĐỒNG NAI
              </span>
            </div>

            {/* Campaign Headline */}
            <div className="mb-4">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black uppercase tracking-[-0.04em] text-[#FAF9F6] leading-[1.02]">
                OWN THE <span className="text-[#D9FF3F]">GAME.</span>
                <br />
                WEAR THE <span className="text-[#E8A9C3]">ENERGY.</span>
              </h1>
            </div>

            {/* Brand Promise Quote */}
            <p className="text-lg sm:text-xl font-medium text-[#FAF9F6]/90 italic border-l-2 border-[#722D4A] pl-4 my-4 font-serif">
              “Fashion that moves with you.”
            </p>

            {/* Editorial Description */}
            <p className="text-sm sm:text-base text-[#FAF9F6]/70 leading-relaxed max-w-xl mb-8 font-normal">
              Nền tảng khám phá thời trang thể thao nữ chuyên sâu đầu tiên tại Biên Hòa.
              Tuyển tập chân thực các thiết kế váy xòe, áo polo thi đấu, bộ đồ cầu lông và quần thể thao
              từ <strong>BEYONO</strong>, <strong>VNB Sports</strong>, <strong>Phượng Sport</strong>.
              Khám phá mẫu mã, so sánh mức giá và nhận chỉ đường mua sắm tức thì.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onExploreClick}
                className="px-7 py-3.5 rounded-full bg-[#D9FF3F] text-[#11151B] font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-[#BBE02E] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#D9FF3F]/20 flex items-center gap-2"
              >
                <span>Khám Phá 22 Mẫu Tuyển Chọn</span>
                <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={onStoresClick}
                className="px-6 py-3.5 rounded-full bg-[#181D25] hover:bg-[#2B3441] border border-[#2B3441] text-[#FAF9F6] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#E8A9C3]" />
                <span>Xem 8 Cửa Hàng Biên Hòa</span>
              </button>
            </div>

            {/* Credibility & Transparency Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#2B3441]/80 text-left">
              <div>
                <div className="text-2xl font-black text-[#FAF9F6] flex items-center">
                  22<span className="text-[#D9FF3F]">+</span>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#FAF9F6]/60 font-semibold mt-0.5">
                  Mẫu chọn lọc
                </div>
              </div>

              <div>
                <div className="text-2xl font-black text-[#FAF9F6] flex items-center">
                  08<span className="text-[#E8A9C3]">·</span>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#FAF9F6]/60 font-semibold mt-0.5">
                  Cửa hàng Biên Hòa
                </div>
              </div>

              <div>
                <div className="text-2xl font-black text-[#FAF9F6] flex items-center">
                  100<span className="text-[#D9FF3F]">%</span>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#FAF9F6]/60 font-semibold mt-0.5">
                  Giá gốc tại shop
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual featuring LIA */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto rounded-2xl overflow-hidden border border-[#722D4A]/40 shadow-2xl bg-[#181D25] group">
              {/* Image Aspect ratio container */}
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/images/lia-hero.jpg"
                  alt="LIA — The HERCOURT Athlete in high-performance tennis/badminton outfit"
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11151B] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#11151B]/40 via-transparent to-[#11151B]/40" />
              </div>

              {/* Floating Editorial Overlays */}
              <div className="absolute top-4 left-4 z-20">
                <div className="px-3 py-1 rounded bg-[#11151B]/80 backdrop-blur-md border border-[#FAF9F6]/10 text-[10px] uppercase tracking-widest text-[#FAF9F6] font-bold">
                  CAMPAIGN 2026 · THE HERCOURT ATHLETE
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between bg-[#11151B]/85 backdrop-blur-md p-4 rounded-xl border border-[#2B3441]">
                <div>
                  <div className="text-xs uppercase tracking-wider font-extrabold text-[#D9FF3F]">
                    LIA · 26 Tuổi · Đại sứ phong cách
                  </div>
                  <div className="text-sm font-bold text-[#FAF9F6] mt-0.5">
                    Áo Polo Trắng Dệt Kim + Chân Váy Xếp Ly Hồng Phấn
                  </div>
                  <div className="text-[11px] text-[#FAF9F6]/60 mt-0.5">
                    Phong cách thể thao chuyên nghiệp cho phụ nữ hiện đại
                  </div>
                </div>

                <a
                  href="#editorial"
                  className="shrink-0 p-2 rounded-lg bg-[#722D4A] hover:bg-[#8E3B5E] text-[#FAF9F6] text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Xem Lookbook</span>
                </a>
              </div>
            </div>

            {/* Decorative Corner Badge */}
            <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-2 p-3 rounded-xl bg-[#181D25] border border-[#2B3441] shadow-xl z-30">
              <ShieldCheck className="w-5 h-5 text-[#D9FF3F]" />
              <div className="text-[11px] leading-tight">
                <div className="font-bold text-[#FAF9F6]">Minh bạch 100%</div>
                <div className="text-[#FAF9F6]/60">Chuyển tiếp shop thật</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
