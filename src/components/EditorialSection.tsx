"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, Quote, Info } from "lucide-react";

export const EditorialSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const lookbooks = [
    {
      id: "action",
      title: "ACTION: BỨT PHÁ TỐC ĐỘ",
      subtitle: "Powerful Badminton Movement & Smash",
      image: "/images/lia-action.jpg",
      quote: "Sức mạnh thực sự đến từ sự tự do trong từng sải chân và đường cầu dứt khoát.",
      styling: "Polo trắng dệt kim thoát ẩm + Váy xếp ly hồng phấn co giãn 4D",
      tag: "PERFORMANCE",
    },
    {
      id: "lifestyle",
      title: "LIFESTYLE: PHONG THÁI TỰ NHIÊN",
      subtitle: "Courtside Relaxed Modern Athletic Living",
      image: "/images/lia-lifestyle.jpg",
      quote: "Sau mỗi hiệp đấu căng thẳng là khoảnh khắc tĩnh lặng tái tạo năng lượng.",
      styling: "Trang phục tối giản, chất liệu mềm mại thoáng khí cho cả ngày năng động",
      tag: "OFF-COURT",
    },
    {
      id: "portrait",
      title: "PORTRAIT: ÁNH MẮT BẢN LĨNH",
      subtitle: "Editorial Beauty & Confident Focus",
      image: "/images/lia-portrait.jpg",
      quote: "Tự tin là món trang sức rực rỡ nhất của người phụ nữ trên sân thể thao.",
      styling: "Đường may sắc sảo tôn vinh nét đẹp khỏe khoắn, hiện đại Á Đông",
      tag: "CONFIDENCE",
    },
    {
      id: "mobile",
      title: "CAMPAIGN: TƯƠNG LAI THỜI TRANG THỂ THAO",
      subtitle: "The Next-Gen Sportswear Aesthetic",
      image: "/images/lia-mobile.jpg",
      quote: "HERCOURT đồng hành cùng từng bước chuyển động của phái đẹp Biên Hòa.",
      styling: "Phối màu Blush Pink & Midnight Black — biểu tượng của sự uyển chuyển và nội lực",
      tag: "HERCOURT ICON",
    },
  ];

  return (
    <section id="editorial" className="py-20 sm:py-28 bg-[#151921] border-b border-[#2B3441] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#E8A9C3]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#722D4A]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181D25] border border-[#722D4A]/50 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D9FF3F]" />
            <span className="text-[11px] font-black uppercase tracking-widest text-[#FAF9F6]">
              HERCOURT EDITORIAL LOOKBOOK 2026
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#FAF9F6] leading-[1.05]">
            THE COURT IS YOUR <span className="text-[#D9FF3F]">RUNWAY.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#FAF9F6]/75 mt-4 leading-relaxed font-normal">
            Gặp gỡ <strong>LIA</strong> — 26 tuổi, biểu tượng phong cách đại diện cho thế hệ vận động viên nữ mới:
            tự tin, duyên dáng, tràn đầy năng lượng và làm chủ mọi khoảnh khắc thi đấu.
          </p>
        </div>

        {/* Big Editorial Feature Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#181D25] border border-[#2B3441] rounded-3xl p-6 sm:p-10 mb-12 shadow-2xl">
          
          {/* Main Visual Display */}
          <div className="lg:col-span-7 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#11151B] border border-[#2B3441] group">
            <Image
              src={lookbooks[activeTab].image}
              alt={lookbooks[activeTab].title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#11151B] via-transparent to-transparent opacity-70" />
            
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-[#11151B]/80 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-[#D9FF3F] border border-[#D9FF3F]/30">
                {lookbooks[activeTab].tag}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#11151B]/85 backdrop-blur-md border border-[#2B3441]">
              <div className="text-xs font-black text-[#E8A9C3] uppercase tracking-wider">
                {lookbooks[activeTab].title}
              </div>
              <div className="text-[11px] text-[#FAF9F6]/60 mt-0.5">
                {lookbooks[activeTab].subtitle}
              </div>
            </div>
          </div>

          {/* Right Column: Quotes & Outfit Notes */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#722D4A]/50 flex items-center justify-center text-[#E8A9C3] mb-6">
                <Quote className="w-5 h-5" />
              </div>

              <blockquote className="text-xl sm:text-2xl font-medium text-[#FAF9F6] italic font-serif leading-snug mb-6">
                “{lookbooks[activeTab].quote}”
              </blockquote>

              <div className="p-4 rounded-2xl bg-[#11151B] border border-[#2B3441] mb-6">
                <div className="text-[11px] font-black uppercase tracking-wider text-[#D9FF3F] mb-1">
                  CHI TIẾT PHỐI ĐỒ (STYLING BREAKDOWN)
                </div>
                <p className="text-xs text-[#FAF9F6]/80 leading-relaxed">
                  {lookbooks[activeTab].styling}
                </p>
              </div>
            </div>

            {/* Lookbook Selector Tabs */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#FAF9F6]/50 mb-3">
                CHỌN CHUYÊN ĐỀ LOOKBOOK:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {lookbooks.map((lb, index) => (
                  <button
                    key={lb.id}
                    onClick={() => setActiveTab(index)}
                    className={`p-3 rounded-xl text-left border text-xs font-bold transition-all ${
                      activeTab === index
                        ? "bg-[#722D4A] border-[#E8A9C3] text-[#FAF9F6] shadow-md"
                        : "bg-[#11151B] border-[#2B3441] text-[#FAF9F6]/70 hover:text-white hover:border-[#FAF9F6]/30"
                    }`}
                  >
                    <div className="text-[9px] uppercase tracking-wider opacity-60">0{index + 1}</div>
                    <div className="truncate mt-0.5">{lb.title.split(":")[0]}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Gallery Thumbnails Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {lookbooks.map((lb, idx) => (
            <div
              key={lb.id}
              onClick={() => setActiveTab(idx)}
              className={`cursor-pointer rounded-2xl overflow-hidden border p-2 transition-all ${
                activeTab === idx
                  ? "bg-[#1F252E] border-[#D9FF3F] scale-[1.02]"
                  : "bg-[#181D25] border-[#2B3441] hover:border-[#E8A9C3]/50 opacity-70 hover:opacity-100"
              }`}
            >
              <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                <Image
                  src={lb.image}
                  alt={lb.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="text-[11px] font-black uppercase text-[#FAF9F6] truncate px-1">
                {lb.title.split(":")[0]}
              </div>
              <div className="text-[10px] text-[#FAF9F6]/50 truncate px-1">
                {lb.tag}
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Notice */}
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#11151B]/80 border border-[#2B3441] text-xs text-[#FAF9F6]/60">
          <Info className="w-4 h-4 text-[#D9FF3F] shrink-0 mt-0.5" />
          <p>
            <strong>Lưu ý xác thực:</strong> Nhân vật LIA là đại sứ phong cách hư cấu trong chiến dịch thời trang của HERCOURT.
            Hình ảnh trên chỉ sử dụng cho chuyên mục Lookbook & Campaign nghệ thuật, không đại diện sai lệch cho sản phẩm thương mại của các cửa hàng bán lẻ.
          </p>
        </div>

      </div>
    </section>
  );
};
