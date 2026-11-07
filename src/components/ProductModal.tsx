"use client";

import React from "react";
import { Product, STORES, formatVND } from "@/lib/data";
import { GarmentVisual } from "./GarmentVisual";
import { X, ExternalLink, Heart, MapPin, ShieldCheck, Tag, Star } from "lucide-react";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!product) return null;

  const store = STORES.find((s) => s.id === product.storeId || s.shortName === product.store);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000]/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-3xl bg-[#181D25] border border-[#2B3441] rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#11151B]/80 hover:bg-[#11151B] text-[#FAF9F6]/70 hover:text-white border border-[#2B3441] transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          
          {/* Left Column: Visual Display */}
          <div className="md:col-span-5 relative aspect-square rounded-2xl bg-gradient-to-b from-[#1F252E] to-[#151921] border border-[#2B3441] flex items-center justify-center p-6 overflow-hidden">
            <div
              className="absolute inset-0 opacity-25 blur-3xl pointer-events-none"
              style={{ backgroundColor: product.colorHex }}
            />
            <GarmentVisual
              shape={product.shape}
              colorHex={product.colorHex}
              className="w-full h-full max-h-[240px] drop-shadow-2xl"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#11151B] text-[#FAF9F6] border border-[#2B3441]">
                {product.badge}
              </span>
            )}
          </div>

          {/* Right Column: Detailed Info */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              {/* Category & Store Badges */}
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#722D4A] text-[#FAF9F6] text-[10px] font-bold uppercase tracking-wider">
                  {product.store}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#11151B] text-[#D9FF3F] text-[10px] font-bold uppercase tracking-wider border border-[#2B3441]">
                  {product.category} · {product.sport}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-black uppercase text-[#FAF9F6] tracking-tight leading-tight">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1.5 my-2 text-xs text-[#FAF9F6]/70">
                <div className="flex text-[#D9FF3F]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D9FF3F]" />
                  ))}
                </div>
                <span className="font-bold text-[#FAF9F6]">{product.rating}</span>
                <span className="text-[#FAF9F6]/40">({product.reviewsCount} lượt quan tâm)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 my-3">
                <span className="text-2xl sm:text-3xl font-black text-[#FAF9F6] tracking-tight">
                  {formatVND(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#FAF9F6]/40 line-through">
                    {formatVND(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-[#E8A9C3] font-bold">Giá tham khảo</span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#FAF9F6]/75 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {product.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded bg-[#11151B] text-[#FAF9F6]/60 border border-[#2B3441] flex items-center gap-1"
                  >
                    <Tag className="w-2.5 h-2.5 text-[#D9FF3F]" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Store Address info */}
              {store && (
                <div className="p-3 rounded-xl bg-[#11151B] border border-[#2B3441] mb-4 text-xs">
                  <div className="font-bold text-[#FAF9F6] flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D9FF3F]" />
                    <span>Có mặt tại: {store.name}</span>
                  </div>
                  <div className="text-[11px] text-[#FAF9F6]/60 pl-5">
                    {store.address}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-3 border-t border-[#2B3441]">
              <button
                onClick={() => onToggleFavorite(product.id)}
                className={`p-3 rounded-xl border transition-colors flex items-center justify-center ${
                  isFavorite
                    ? "bg-[#722D4A] border-[#E8A9C3] text-white"
                    : "bg-[#11151B] border-[#2B3441] text-[#FAF9F6]/70 hover:text-white"
                }`}
                title={isFavorite ? "Đã lưu vào yêu thích" : "Lưu vào yêu thích"}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-white" : ""}`} />
              </button>

              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-5 rounded-xl bg-[#D9FF3F] hover:bg-[#BBE02E] text-[#11151B] text-xs font-black uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Xem ảnh thật & Mua tại website shop</span>
                <ExternalLink className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
