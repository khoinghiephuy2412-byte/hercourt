"use client";

import React from "react";
import { Product, PRODUCTS, formatVND } from "@/lib/data";
import { GarmentVisual } from "./GarmentVisual";
import { X, Heart, ExternalLink, Trash2, ArrowRight } from "lucide-react";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onRemove: (id: string) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  onRemove,
  onQuickView,
}) => {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const favoriteProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wishlist-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#000]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#181D25] border-l border-[#2B3441] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-[#2B3441] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-[#E8A9C3] text-[#E8A9C3]" />
              <h2 id="wishlist-drawer-title" className="text-lg font-black uppercase text-[#FAF9F6] tracking-tight">
                Mẫu Đã Lưu ({favoriteProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Đóng danh sách yêu thích"
              className="p-2 rounded-full hover:bg-[#2B3441] text-[#FAF9F6]/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body items list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {favoriteProducts.length > 0 ? (
              favoriteProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#11151B] border border-[#2B3441] rounded-2xl p-4 flex gap-4 items-center justify-between group hover:border-[#E8A9C3]/50 transition-colors"
                >
                  <div
                    className="w-16 h-16 rounded-xl bg-[#181D25] border border-[#2B3441] flex items-center justify-center p-2 shrink-0 cursor-pointer"
                    onClick={() => {
                      onQuickView(p);
                      onClose();
                    }}
                  >
                    <GarmentVisual shape={p.shape} colorHex={p.colorHex} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase font-bold text-[#E8A9C3] truncate">
                      {p.store} · {p.category}
                    </div>
                    <div
                      className="text-xs font-bold text-[#FAF9F6] truncate cursor-pointer hover:text-[#D9FF3F]"
                      onClick={() => {
                        onQuickView(p);
                        onClose();
                      }}
                    >
                      {p.name}
                    </div>
                    <div className="text-sm font-black text-[#FAF9F6] mt-0.5">
                      {formatVND(p.price)}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#722D4A] hover:bg-[#8E3B5E] text-[#FAF9F6] transition-colors"
                      title="Xem tại shop"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => onRemove(p.id)}
                      className="p-2 rounded-lg bg-[#181D25] hover:bg-[#2B3441] text-[#FAF9F6]/50 hover:text-red-400 transition-colors"
                      title="Xóa khỏi danh sách"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <Heart className="w-12 h-12 text-[#FAF9F6]/20 mx-auto mb-4" />
                <h3 className="text-base font-black uppercase text-[#FAF9F6] mb-1">
                  Chưa có sản phẩm nào được lưu
                </h3>
                <p className="text-xs text-[#FAF9F6]/50 mb-6 max-w-xs mx-auto">
                  Nhấn vào biểu tượng trái tim trên bất kỳ mẫu đồ nào để lưu lại danh sách cần ghé mua tại Biên Hòa.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#D9FF3F] text-[#11151B] text-xs font-black uppercase tracking-wider"
                >
                  Khám Phá Ngay
                </button>
              </div>
            )}
          </div>

          {/* Footer note */}
          {favoriteProducts.length > 0 && (
            <div className="p-6 border-t border-[#2B3441] bg-[#11151B]">
              <div className="text-[11px] text-[#FAF9F6]/60 leading-relaxed mb-3">
                Danh sách được lưu trữ an toàn ngay trên trình duyệt thiết bị của bạn.
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-[#2B3441] hover:bg-[#722D4A] text-[#FAF9F6] text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <span>Tiếp Tục Mua Sắm</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
