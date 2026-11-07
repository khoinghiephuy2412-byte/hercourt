"use client";

import React from "react";
import { CATEGORIES, Category } from "@/lib/data";
import { GarmentVisual } from "./GarmentVisual";
import { ArrowRight } from "lucide-react";

interface CategorySectionProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="py-14 sm:py-20 bg-[#11151B] border-b border-[#2B3441]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.25em] text-[#D9FF3F] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9FF3F]" />
              DANH MỤC THIẾT KẾ
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#FAF9F6]">
              SHOP BY <span className="text-[#E8A9C3]">CATEGORY</span>
            </h2>
          </div>
          <p className="text-sm text-[#FAF9F6]/60 max-w-md">
            Lựa chọn theo phân loại chuyên môn được tối ưu cho từng bộ môn: cầu lông, tennis, pickleball, bóng chuyền và tập luyện hàng ngày.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat: Category) => {
            const isSelected =
              selectedCategory === cat.id ||
              (cat.id === "all" && selectedCategory === "Tất cả");

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isSelected
                    ? "bg-[#1F252E] border-[#D9FF3F] shadow-xl shadow-[#D9FF3F]/10 scale-[1.02]"
                    : "bg-[#181D25] border-[#2B3441] hover:border-[#E8A9C3]/50 hover:bg-[#1C222B]"
                }`}
              >
                {/* Background glow when selected */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#D9FF3F]/15 rounded-full blur-2xl pointer-events-none" />
                )}

                {/* Top Badge & Count */}
                <div className="flex items-center justify-between w-full mb-3 z-10">
                  <span
                    className={`text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full ${
                      isSelected
                        ? "bg-[#D9FF3F] text-[#11151B]"
                        : "bg-[#11151B] text-[#E8A9C3] border border-[#2B3441]"
                    }`}
                  >
                    {cat.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#FAF9F6]/50">
                    {cat.count} Mẫu
                  </span>
                </div>

                {/* Garment Silhouette Visual */}
                <div className="h-32 w-full my-2 flex items-center justify-center relative transition-transform duration-300 group-hover:scale-105">
                  <GarmentVisual
                    shape={cat.shape}
                    colorHex={cat.accentColor}
                    className="max-h-full max-w-[140px]"
                  />
                </div>

                {/* Titles & Desc */}
                <div className="mt-3 z-10">
                  <div className="text-[10px] font-black tracking-widest uppercase text-[#FAF9F6]/40">
                    {cat.englishTitle}
                  </div>
                  <h3 className="text-base font-black uppercase text-[#FAF9F6] group-hover:text-[#D9FF3F] transition-colors mt-0.5 flex items-center justify-between">
                    <span>{cat.name}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${isSelected ? "text-[#D9FF3F]" : "text-[#FAF9F6]/40"}`} />
                  </h3>
                  <p className="text-[11px] text-[#FAF9F6]/60 line-clamp-2 mt-1 leading-snug">
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
