"use client";

import React from "react";
import { Product, formatVND } from "@/lib/data";
import { GarmentVisual } from "./GarmentVisual";
import { Heart, ExternalLink, Eye, MapPin } from "lucide-react";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onQuickView,
}) => {
  return (
    <article className="group relative bg-[#181D25] border border-[#2B3441] rounded-2xl overflow-hidden hover:border-[#E8A9C3]/60 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-[#000]/40">
      
      {/* Top Media & Visual Area */}
      <div className="relative aspect-[4/4.5] w-full bg-gradient-to-b from-[#1F252E] to-[#151921] flex items-center justify-center p-6 overflow-hidden">
        
        {/* Subtle radial glow matching garment color */}
        <div
          className="absolute inset-0 opacity-20 blur-2xl transition-opacity group-hover:opacity-35 pointer-events-none"
          style={{ backgroundColor: product.colorHex }}
        />

        {/* Badge in top-left */}
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#11151B]/90 text-[#FAF9F6] border border-[#2B3441] shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Favorite Heart Button in top-right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isFavorite
              ? "bg-[#722D4A] text-[#FAF9F6] scale-110 shadow-md"
              : "bg-[#11151B]/70 text-[#FAF9F6]/70 hover:text-white hover:bg-[#11151B]"
          }`}
          aria-label={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-[#FAF9F6] text-[#FAF9F6]" : ""}`} />
        </button>

        {/* Garment Shape Representation */}
        <div className="w-full h-full max-w-[200px] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
          <GarmentVisual
            shape={product.shape}
            colorHex={product.colorHex}
            className="w-full h-full max-h-[190px] drop-shadow-lg"
          />
        </div>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-x-4 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onQuickView(product)}
            className="w-full py-2 px-3 rounded-xl bg-[#11151B]/95 text-[#FAF9F6] text-xs font-bold uppercase tracking-wider border border-[#2B3441] hover:border-[#D9FF3F] hover:text-[#D9FF3F] transition-colors flex items-center justify-center gap-1.5 shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem Chi Tiết Mẫu</span>
          </button>
        </div>

      </div>

      {/* Product Information Card Body */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          {/* Store Name & Category tag */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#FAF9F6]/50 uppercase tracking-wider mb-1.5">
            <span className="text-[#E8A9C3] font-bold">{product.store}</span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#11151B] border border-[#2B3441]/50">
              {product.category}
            </span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-sm sm:text-base font-bold text-[#FAF9F6] group-hover:text-[#D9FF3F] transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-[11px] text-[#FAF9F6]/60 line-clamp-1 mt-1 leading-snug">
            {product.description}
          </p>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-lg sm:text-xl font-black text-[#FAF9F6] tracking-tight">
              {formatVND(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#FAF9F6]/40 line-through">
                {formatVND(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="text-[10px] text-[#FAF9F6]/40 italic mt-0.5">
            Giá tham khảo tại nguồn
          </div>
        </div>

        {/* Direct Action Link to Original Retailer */}
        <div className="mt-4 pt-3 border-t border-[#2B3441]/60 flex items-center justify-between gap-2">
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-xl bg-[#2B3441]/60 hover:bg-[#722D4A] text-[#FAF9F6] text-[11px] sm:text-xs font-bold uppercase tracking-wider text-center transition-all duration-200 flex items-center justify-center gap-1.5 group/btn"
          >
            <span>Xem ảnh thật & Mua tại shop</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>

    </article>
  );
};
