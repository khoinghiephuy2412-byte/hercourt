"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product, formatVND } from "@/lib/data";
import { GarmentVisual } from "./GarmentVisual";
import { Heart, ExternalLink, Eye, Camera, CheckCircle2, ShieldCheck, Trophy, Sparkles } from "lucide-react";

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
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const hasAiModel = Boolean(product.aiModelImageUrl);
  const [viewAiModel, setViewAiModel] = useState(
    product.photoSourceType === "ai_styling_visualization" && hasAiModel
  );

  const currentImage = viewAiModel && product.aiModelImageUrl
    ? product.aiModelImageUrl
    : product.imageUrl;

  return (
    <article className="group relative bg-[#181D25] border border-[#2B3441] rounded-2xl overflow-hidden hover:border-[#E8A9C3]/60 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-[#000]/40 card-premium-hover">
      
      {/* Top Media & Visual Area */}
      <div
        className="relative aspect-square w-full bg-[#151921] flex items-center justify-center p-3 overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        {/* Subtle radial glow matching garment color */}
        <div
          className="absolute inset-0 opacity-15 blur-2xl transition-opacity group-hover:opacity-30 pointer-events-none"
          style={{ backgroundColor: product.colorHex }}
        />

        {/* Badges in top-left */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
          {product.badge && (
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#11151B]/90 text-[#FAF9F6] border border-[#2B3441] shadow-sm">
              {product.badge}
            </span>
          )}
          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#11151B]/90 text-[#D9FF3F] border border-[#2B3441] flex items-center gap-1 shadow-sm">
            <Trophy className="w-2.5 h-2.5" />
            <span>{product.sport}</span>
          </span>
          {viewAiModel || product.photoSourceType === "ai_styling_visualization" ? (
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-950/90 text-[#FAF9F6] border border-purple-400/40 flex items-center gap-1 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-[#D9FF3F]" />
              <span>Ảnh phối mẫu AI</span>
            </span>
          ) : product.isRealPhoto && !imageError && imageLoaded ? (
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#722D4A]/90 text-[#FAF9F6] border border-[#E8A9C3]/30 flex items-center gap-1 shadow-sm">
              <Camera className="w-2.5 h-2.5 text-[#D9FF3F]" />
              <span>Ảnh thật từ shop</span>
            </span>
          ) : (
            <span className="text-[9px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#1B222D]/90 text-[#FAF9F6]/70 border border-[#2B3441] flex items-center gap-1 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-[#E8A9C3]" />
              <span>Minh họa phom dáng</span>
            </span>
          )}
        </div>

        {/* Dual-View Switcher: Shop Photo vs AI Model Styling */}
        {hasAiModel && product.imageUrl && product.imageUrl !== product.aiModelImageUrl && (
          <div
            className="absolute top-3 right-12 z-20 flex items-center rounded-lg bg-[#11151B]/90 border border-[#2B3441] p-0.5 text-[9px] font-bold shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => {
                setViewAiModel(false);
                setImageLoaded(false);
              }}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                !viewAiModel
                  ? "bg-[#722D4A] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              title="Xem ảnh thực tế từ shop"
            >
              Shop
            </button>
            <button
              type="button"
              onClick={() => {
                setViewAiModel(true);
                setImageLoaded(false);
              }}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                viewAiModel
                  ? "bg-purple-700 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              title="Xem ảnh phối mẫu AI"
            >
              Mẫu AI
            </button>
          </div>
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

        {/* Product Visual Display: Verified Real Retailer Photo, AI Model or Fallback Silhouette */}
        <div className="w-full h-full relative flex items-center justify-center">
          {currentImage && !imageError ? (
            <div className="relative w-full h-full">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                  <GarmentVisual
                    shape={product.shape}
                    colorHex={product.colorHex}
                    className="w-full h-full max-h-[140px] opacity-30"
                  />
                </div>
              )}
              <Image
                src={currentImage}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={`object-contain p-2 group-hover:scale-105 transition-all duration-500 ease-out ${
                  imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="w-full h-full max-w-[200px] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
              <GarmentVisual
                shape={product.shape}
                colorHex={product.colorHex}
                className="w-full h-full max-h-[190px] drop-shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-x-4 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
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
            <span className="text-[#E8A9C3] font-bold flex items-center gap-1">
              <span>{product.store}</span>
              <CheckCircle2 className="w-3 h-3 text-[#D9FF3F]" />
            </span>
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
          
          {/* Verification Scope Tag */}
          <div className="flex items-center justify-between text-[10px] text-[#FAF9F6]/50 mt-1">
            <span className="flex items-center gap-1">
              {product.verificationScope === "CONFIRMED_LOCAL_BRANCH" ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Sẵn tại Biên Hòa (Scope A)
                </span>
              ) : (
                <span className="text-rose-300 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  Shop Biên Hòa (Scope B)
                </span>
              )}
            </span>
            <span className="font-mono">Xác minh {product.verifiedDate}</span>
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
            <span>Xem và mua tại shop</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>

    </article>
  );
};
