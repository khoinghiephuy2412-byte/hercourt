"use client";

import React from "react";
import Image from "next/image";
import { Product, PRODUCTS, formatVND } from "@/lib/data";
import { GarmentVisual } from "./GarmentVisual";
import { ExternalLink, Sparkles, Camera } from "lucide-react";

interface BestValueSectionProps {
  onQuickView: (product: Product) => void;
  onSelectCategory?: (cat: string) => void;
}

export const BestValueSection: React.FC<BestValueSectionProps> = ({
  onQuickView,
}) => {
  // Products under or equal to 200.000đ sorted ascending
  const budgetProducts = PRODUCTS.filter((p) => p.price <= 200000).sort(
    (a, b) => a.price - b.price
  );

  return (
    <section className="py-16 sm:py-24 bg-[#151921] border-b border-[#2B3441]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.25em] text-[#D9FF3F] mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D9FF3F]" />
              GIÁ TỐT NHẤT CHO NGƯỜI MỚI BẮT ĐẦU
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#FAF9F6] font-display">
              BEST VALUE <span className="text-[#E8A9C3]">UNDER 200K</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#FAF9F6]/60 max-w-md">
            Tuyển chọn các thiết kế áo thi đấu, chân váy và quần thể thao chất lượng cao với mức giá dễ tiếp cận nhất tại các shop Biên Hòa.
          </p>
        </div>

        {/* Horizontal Scroll / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {budgetProducts.map((p) => (
            <div
              key={p.id}
              className="bg-[#181D25] border border-[#2B3441] rounded-2xl p-4 flex flex-col justify-between group hover:border-[#D9FF3F]/50 transition-all duration-300 card-premium-hover"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-[#E8A9C3] uppercase">
                    {p.store}
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#11151B] text-[#D9FF3F] border border-[#D9FF3F]/30">
                    {formatVND(p.price)}
                  </span>
                </div>

                <div
                  className="relative aspect-square w-full rounded-xl bg-[#11151B] border border-[#2B3441] flex items-center justify-center p-3 mb-3 cursor-pointer group-hover:scale-105 transition-transform overflow-hidden"
                  onClick={() => onQuickView(p)}
                >
                  {p.imageUrl ? (
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 250px"
                      className="object-contain p-2"
                    />
                  ) : (
                    <GarmentVisual shape={p.shape} colorHex={p.colorHex} />
                  )}
                  {p.isRealPhoto && (
                    <span className="absolute bottom-2 right-2 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#11151B]/90 text-[#FAF9F6] border border-[#2B3441] flex items-center gap-0.5">
                      <Camera className="w-2 h-2 text-[#D9FF3F]" />
                      <span>Ảnh thật</span>
                    </span>
                  )}
                </div>

                <h4
                  className="text-xs sm:text-sm font-bold text-[#FAF9F6] group-hover:text-[#D9FF3F] transition-colors truncate cursor-pointer"
                  onClick={() => onQuickView(p)}
                  title={p.name}
                >
                  {p.name}
                </h4>

                <p className="text-[11px] text-[#FAF9F6]/55 line-clamp-1 mt-1">
                  {p.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#2B3441]/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => onQuickView(p)}
                  className="text-[11px] font-bold text-[#FAF9F6]/70 hover:text-white"
                >
                  Chi tiết
                </button>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#722D4A] hover:bg-[#8E3B5E] text-[#FAF9F6] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                >
                  <span>Mua tại shop</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
