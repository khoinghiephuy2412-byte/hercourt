"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Product, STORES, formatVND } from "@/lib/data";
import { GarmentVisual } from "./GarmentVisual";
import {
  X,
  ExternalLink,
  Heart,
  MapPin,
  Camera,
  CheckCircle2,
  ShieldCheck,
  TrendingDown,
  Trophy,
  Sparkles,
  Copy,
  Check,
  Phone,
  AlertCircle,
} from "lucide-react";
import { useIsMobile, handleExternalLinkClick } from "@/lib/useMobileDevice";

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
  const isMobile = useIsMobile();
  const [prevProductId, setPrevProductId] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const hasAiModel = Boolean(product?.aiModelImageUrl);
  const [viewAiModel, setViewAiModel] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      setViewAiModel(
        product.photoSourceType === "ai_styling_visualization" &&
          Boolean(product.aiModelImageUrl)
      );
    }
  }, [product]);

  const currentImage = viewAiModel && product?.aiModelImageUrl
    ? product.aiModelImageUrl
    : product?.imageUrl;

  const availableColors = useMemo(() => {
    if (!product?.variants) return [];
    return Array.from(new Set(product.variants.map((v) => v.color)));
  }, [product]);

  const availableSizes = useMemo(() => {
    if (!product?.variants) return [];
    return Array.from(new Set(product.variants.map((v) => v.size)));
  }, [product]);

  if (product && product.id !== prevProductId) {
    setPrevProductId(product.id);
    setImageError(false);
    setImageLoaded(false);
    setCopied(false);
    setSelectedSize(product.variants?.[0]?.size || "M");
    setSelectedColor(product.variants?.[0]?.color || "Tiêu chuẩn");
  }

  const fallbackCopy = (text: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    } catch {
      // ignore
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product) return;
    const urlToCopy = product.url;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(urlToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        fallbackCopy(urlToCopy);
      }
    } catch {
      fallbackCopy(urlToCopy);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const store = STORES.find((s) => s.id === product.storeId || s.shortName === product.store);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-title"
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#181D25] border border-[#2B3441] rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200"
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
          <div className="md:col-span-5 relative aspect-square rounded-2xl bg-[#151921] border border-[#2B3441] flex items-center justify-center p-4 overflow-hidden">
            <div
              className="absolute inset-0 opacity-20 blur-3xl pointer-events-none"
              style={{ backgroundColor: product.colorHex }}
            />

            {currentImage && !imageError ? (
              <div className="relative w-full h-full">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                    <GarmentVisual
                      shape={product.shape}
                      colorHex={product.colorHex}
                      className="w-full h-full max-h-[160px] opacity-30"
                    />
                  </div>
                )}
                <Image
                  src={currentImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  className={`object-contain p-2 transition-all duration-300 ${
                    imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <GarmentVisual
                shape={product.shape}
                colorHex={product.colorHex}
                className="w-full h-full max-h-[240px] drop-shadow-2xl"
              />
            )}

            <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
              {product.badge && (
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#11151B] text-[#FAF9F6] border border-[#2B3441]">
                  {product.badge}
                </span>
              )}
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#11151B] text-[#D9FF3F] border border-[#2B3441] flex items-center gap-1">
                <Trophy className="w-2.5 h-2.5" />
                <span>{product.sport}</span>
              </span>
              {viewAiModel || product.photoSourceType === "ai_styling_visualization" ? (
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-950/90 text-[#FAF9F6] border border-purple-400/40 flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-2.5 h-2.5 text-[#D9FF3F]" />
                  <span>Ảnh phối mẫu AI</span>
                </span>
              ) : product.isRealPhoto && !imageError && imageLoaded ? (
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#722D4A] text-[#FAF9F6] border border-[#E8A9C3]/30 flex items-center gap-1 shadow-sm">
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

            {/* Dual-View Switcher inside Modal */}
            {hasAiModel && product.imageUrl && product.imageUrl !== product.aiModelImageUrl && (
              <div className="absolute bottom-3 right-3 z-20 flex items-center rounded-lg bg-[#11151B]/95 border border-[#2B3441] p-1 text-[10px] font-bold shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    setViewAiModel(false);
                    setImageLoaded(false);
                  }}
                  className={`px-2 py-1 rounded transition-colors ${
                    !viewAiModel
                      ? "bg-[#722D4A] text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Ảnh shop
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewAiModel(true);
                    setImageLoaded(false);
                  }}
                  className={`px-2 py-1 rounded transition-colors ${
                    viewAiModel
                      ? "bg-purple-700 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Mẫu phối AI
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Detailed Info */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              {/* Category & Store Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#722D4A] text-[#FAF9F6] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <span>{product.store}</span>
                  <CheckCircle2 className="w-3 h-3 text-[#D9FF3F]" />
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#11151B] text-[#D9FF3F] text-[10px] font-bold uppercase tracking-wider border border-[#2B3441]">
                  {product.category}
                </span>
                {product.verificationScope === "CONFIRMED_LOCAL_BRANCH" ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-800">
                    Scope A: Sẵn tại Biên Hòa
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 text-[10px] font-bold uppercase tracking-wider border border-rose-800">
                    Scope B: Cửa hàng Biên Hòa
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 id="modal-product-title" className="text-xl sm:text-2xl font-black uppercase text-[#FAF9F6] tracking-tight leading-tight">
                {product.name}
              </h3>

              {/* Verified Product Metadata */}
              <div className="flex flex-wrap items-center gap-2 my-2.5 text-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#11151B] border border-[#2B3441] text-[11px] text-[#D9FF3F] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D9FF3F]" />
                  <span>Sản phẩm chính hãng tại {product.store}</span>
                </span>
                {product.photoSourceType === "ai_styling_visualization" ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-950/80 border border-purple-500/40 text-[11px] text-purple-200 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#D9FF3F]" />
                    <span>Phối mẫu AI trên VĐV</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-[11px] text-emerald-200 font-semibold">
                    <Camera className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ảnh chụp thật tại shop</span>
                  </span>
                )}
                <span className="text-[11px] text-[#FAF9F6]/50 font-mono">
                  Xác minh: {product.verifiedDate}
                </span>
              </div>
              {product.verificationNotes && (
                <div className="text-[11px] text-[#FAF9F6]/60 bg-[#11151B]/60 border-l-2 border-[#D9FF3F] pl-2.5 py-1 mb-2 font-sans">
                  {product.verificationNotes}
                </div>
              )}

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
                {product.originalPrice && (
                  <span className="text-xs font-bold text-[#D9FF3F] bg-[#D9FF3F]/10 px-2 py-0.5 rounded">
                    Tiết kiệm {formatVND(product.originalPrice - product.price)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#FAF9F6]/75 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Color & Size selection */}
              {availableColors.length > 0 && (
                <div className="mb-3">
                  <div className="text-[11px] uppercase tracking-wider text-[#FAF9F6]/50 font-bold mb-1.5">
                    Màu sắc ({availableColors.length}):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {availableColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                          selectedColor === color
                            ? "bg-[#D9FF3F] text-[#11151B] border-[#D9FF3F] font-bold"
                            : "bg-[#11151B] text-[#FAF9F6]/80 border-[#2B3441] hover:border-[#FAF9F6]/40"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {availableSizes.length > 0 && (
                <div className="mb-4">
                  <div className="text-[11px] uppercase tracking-wider text-[#FAF9F6]/50 font-bold mb-1.5">
                    Kích cỡ ({availableSizes.length}):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {availableSizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`w-9 h-8 rounded-lg text-xs font-mono font-bold border transition-colors ${
                          selectedSize === sz
                            ? "bg-[#D9FF3F] text-[#11151B] border-[#D9FF3F]"
                            : "bg-[#11151B] text-[#FAF9F6]/80 border-[#2B3441] hover:border-[#FAF9F6]/40"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price History Track if available */}
              {product.priceHistory && product.priceHistory.length > 1 && (
                <div className="mb-4 p-3 rounded-xl bg-[#11151B] border border-[#2B3441]/70">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#FAF9F6]/50 flex items-center gap-1.5 mb-2">
                    <TrendingDown className="w-3 h-3 text-[#D9FF3F]" />
                    Lịch sử xác minh giá niêm yết:
                  </div>
                  <div className="space-y-1">
                    {product.priceHistory.map((ph, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#FAF9F6]/60">{ph.date}:</span>
                        <span className={idx === product.priceHistory!.length - 1 ? "text-[#D9FF3F] font-bold" : "text-[#FAF9F6]/40 line-through"}>
                          {formatVND(ph.price)} {idx === product.priceHistory!.length - 1 ? "(Hiện tại)" : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Store Address & Contact */}
              {store && (
                <div className="p-3.5 rounded-2xl bg-[#11151B] border border-[#2B3441] mb-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#E8A9C3]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{store.name}</span>
                  </div>
                  <p className="text-[11px] text-[#FAF9F6]/70 pl-5">
                    {store.address}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pl-5 text-[10px] text-[#FAF9F6]/50 font-mono">
                    <span>Hotline: {store.phone}</span>
                    <span>•</span>
                    <span>Giờ mở cửa: {store.hours}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            {product.hasVerifiedUrl === false ? (
              <div className="pt-4 border-t border-[#2B3441] space-y-3">
                <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="font-bold text-amber-300">Chưa xác minh link sản phẩm trực tuyến</div>
                    <p className="text-[11px] text-amber-200/80 leading-relaxed">
                      Website của Chun Sport đang bảo trì. Quý khách vui lòng ghé trực tiếp quầy hàng tại 61 Trương Định, Biên Hòa hoặc gọi hotline để tư vấn chọn size sẵn có.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => onToggleFavorite(product.id)}
                    className={`p-3 min-h-[48px] rounded-2xl border transition-colors flex items-center justify-center shrink-0 ${
                      isFavorite
                        ? "bg-[#722D4A] border-[#E8A9C3] text-[#FAF9F6]"
                        : "bg-[#11151B] border-[#2B3441] text-[#FAF9F6]/70 hover:text-white"
                    }`}
                    aria-label="Yêu thích"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-white text-white" : ""}`} />
                  </button>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Chun+Sport+61+Truong+Dinh+Bien+Hoa"
                    target={isMobile ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    onClick={handleExternalLinkClick}
                    className="flex-1 py-3 px-4 min-h-[48px] rounded-2xl bg-amber-400 hover:bg-amber-300 text-[#11151B] font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Chỉ đường đến shop (Google Maps)</span>
                  </a>

                  <a
                    href="tel:0979123789"
                    className="py-3 px-4 min-h-[48px] rounded-2xl bg-[#11151B] hover:bg-[#2B3441] border border-[#2B3441] text-[#FAF9F6] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shrink-0"
                  >
                    <Phone className="w-4 h-4 text-[#D9FF3F]" />
                    <span className="hidden sm:inline">Hotline</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="pt-4 border-t border-[#2B3441] space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => onToggleFavorite(product.id)}
                    className={`p-3 min-h-[48px] rounded-2xl border transition-colors flex items-center justify-center shrink-0 ${
                      isFavorite
                        ? "bg-[#722D4A] border-[#E8A9C3] text-[#FAF9F6]"
                        : "bg-[#11151B] border-[#2B3441] text-[#FAF9F6]/70 hover:text-white"
                    }`}
                    aria-label="Yêu thích"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-white text-white" : ""}`} />
                  </button>

                  <a
                    href={product.url}
                    target={isMobile ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    onClick={handleExternalLinkClick}
                    className="flex-1 py-3 px-5 min-h-[48px] rounded-2xl bg-[#D9FF3F] hover:bg-[#BBE02E] text-[#11151B] font-black text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D9FF3F]/20 active:scale-98"
                  >
                    <span>Xem và mua tại {product.store}</span>
                    <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="py-3 px-3.5 min-h-[48px] rounded-2xl bg-[#11151B] hover:bg-[#2B3441] border border-[#2B3441] text-[#FAF9F6] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shrink-0 active:scale-95"
                    title="Sao chép link sản phẩm để mở trong Safari hoặc Zalo/Facebook"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#D9FF3F]" />
                        <span className="text-[#D9FF3F] font-bold text-[11px]">Đã chép!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#FAF9F6]/70" />
                        <span className="text-[#FAF9F6]/80 text-[11px] font-medium">Sao chép</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-[#FAF9F6]/50 text-center flex items-center justify-center gap-1.5 pt-0.5">
                  <span>💡</span>
                  <span>Mẹo iPhone: Nếu mở trong Zalo hoặc Facebook, bạn có thể sao chép link và dán vào Safari để mua sắm thuận tiện nhất.</span>
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
