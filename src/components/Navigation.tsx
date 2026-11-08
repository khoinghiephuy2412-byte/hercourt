"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  Menu,
  X,
  MapPin,
  Sparkles,
  ShieldCheck,
  Database,
  RefreshCw,
} from "lucide-react";

interface NavigationProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory: (category: string) => void;
  onOpenAdmin?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  wishlistCount,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
  onSelectCategory,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleNavClick = (cat: string) => {
    onSelectCategory(cat);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Editorial Utility Bar */}
      <div className="bg-[#11151B] border-b border-[#2B3441] px-4 lg:px-8 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#FAF9F6]/75 font-mono text-[11px] tracking-wider">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D9FF3F] animate-pulse" />
            <span className="font-semibold text-[#FAF9F6]">
              BIÊN HÒA SPORTS FASHION DISCOVERY PLATFORM
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[11px] text-[#FAF9F6]/60">
            <span>CHUYỂN TIẾP TRỰC TIẾP ĐẾN CỬA HÀNG CHÍNH HÃNG</span>
            <span className="text-[#E8A9C3] font-semibold">CAM KẾT GIÁ THỰC TẠI NGUỒN</span>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation */}
      <nav className="editorial-glass border-b border-[#2B3441]/80 backdrop-blur-xl px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 focus:outline-none"
          >
            <div className="flex flex-col">
              <div className="flex items-baseline tracking-tighter">
                <span className="text-2xl lg:text-3xl font-black uppercase text-[#FAF9F6] tracking-[-0.05em] group-hover:text-[#E8A9C3] transition-colors">
                  HER
                </span>
                <span className="text-2xl lg:text-3xl font-black uppercase text-[#722D4A] ml-1 tracking-[-0.05em]">
                  COURT
                </span>
                <span className="w-2 h-2 rounded-full bg-[#D9FF3F] ml-1.5 inline-block group-hover:scale-125 transition-transform" />
              </div>
              <span className="text-[9px] font-semibold tracking-[0.22em] uppercase text-[#FAF9F6]/50 -mt-1">
                Biên Hòa · Đồng Nai
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7 text-[13px] font-bold tracking-wider uppercase">
            <a
              href="#products"
              onClick={() => handleNavClick("all")}
              className="text-[#FAF9F6]/90 hover:text-[#D9FF3F] transition-colors"
            >
              Bộ Sưu Tập (36)
            </a>
            <a
              href="#products"
              onClick={() => handleNavClick("Váy")}
              className="text-[#FAF9F6]/75 hover:text-[#E8A9C3] transition-colors"
            >
              Váy Thể Thao
            </a>
            <a
              href="#products"
              onClick={() => handleNavClick("Áo")}
              className="text-[#FAF9F6]/75 hover:text-[#E8A9C3] transition-colors"
            >
              Áo Polo & Đấu
            </a>
            <a
              href="#products"
              onClick={() => handleNavClick("Bộ đồ")}
              className="text-[#FAF9F6]/75 hover:text-[#E8A9C3] transition-colors"
            >
              Đồ Bộ
            </a>
            <a
              href="#stores"
              className="text-[#FAF9F6]/75 hover:text-[#D9FF3F] transition-colors flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D9FF3F]" />
              10 Shop Biên Hòa
            </a>
            <a
              href="#editorial"
              className="text-[#E8A9C3] hover:text-[#FAF9F6] transition-colors flex items-center gap-1 font-extrabold"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D9FF3F]" />
              Lookbook Lia
            </a>
          </div>

          {/* Right Action Icons & Search */}
          <div className="flex items-center gap-3">
            {/* Search Box Trigger */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-[#181D25] border border-[#722D4A] rounded-full px-3 py-1.5 w-48 sm:w-64">
                  <Search className="w-4 h-4 text-[#E8A9C3] mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Tìm váy, áo, cửa hàng..."
                    className="bg-transparent text-xs text-[#FAF9F6] focus:outline-none w-full"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setShowSearchInput(false);
                      onSearchChange("");
                    }}
                    className="text-[#FAF9F6]/50 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2.5 rounded-full bg-[#181D25] hover:bg-[#2B3441] border border-[#2B3441] text-[#FAF9F6]/80 hover:text-white transition-all flex items-center gap-1.5"
                  title="Tìm kiếm"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs font-semibold pr-1">Tìm kiếm</span>
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-full bg-[#181D25] hover:bg-[#2B3441] border border-[#2B3441] text-[#FAF9F6] transition-all flex items-center gap-1.5"
              aria-label="Danh sách yêu thích"
            >
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? "fill-[#E8A9C3] text-[#E8A9C3]" : "text-[#FAF9F6]"}`} />
              <span className="hidden sm:inline text-xs font-bold">Yêu thích</span>
              {wishlistCount > 0 && (
                <span className="bg-[#D9FF3F] text-[#11151B] font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center -ml-0.5">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Admin / Data Pipeline Button */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="p-2.5 rounded-full bg-[#181D25] hover:bg-[#2B3441] border border-[#722D4A]/50 text-[#FAF9F6] hover:text-[#D9FF3F] transition-all flex items-center gap-1.5"
                title="Quản trị & Đồng bộ dữ liệu"
                aria-label="Đồng bộ dữ liệu"
              >
                <Database className="w-4 h-4 text-[#D9FF3F]" />
                <span className="hidden md:inline text-xs font-bold">Đồng bộ</span>
              </button>
            )}

            {/* CTA Shop Direct button */}
            <a
              href="#stores"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#722D4A] hover:bg-[#8E3B5E] text-[#FAF9F6] text-xs font-black tracking-wider uppercase transition-all shadow-md"
            >
              Bản Đồ Shop
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-[#181D25] border border-[#2B3441] text-[#FAF9F6]"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#11151B] border-b border-[#2B3441] px-6 py-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-wider">
            <a
              href="#products"
              onClick={() => handleNavClick("all")}
              className="text-[#FAF9F6] hover:text-[#D9FF3F] py-2 border-b border-[#2B3441]/50"
            >
              Tất Cả Sản Phẩm (36 Mẫu)
            </a>
            <a
              href="#products"
              onClick={() => handleNavClick("Váy")}
              className="text-[#FAF9F6]/80 hover:text-[#E8A9C3] py-2 border-b border-[#2B3441]/50"
            >
              Váy Thể Thao Xếp Ly
            </a>
            <a
              href="#products"
              onClick={() => handleNavClick("Áo")}
              className="text-[#FAF9F6]/80 hover:text-[#E8A9C3] py-2 border-b border-[#2B3441]/50"
            >
              Áo Polo & Áo Thi Đấu
            </a>
            <a
              href="#products"
              onClick={() => handleNavClick("Bộ đồ")}
              className="text-[#FAF9F6]/80 hover:text-[#E8A9C3] py-2 border-b border-[#2B3441]/50"
            >
              Bộ Đồ Đồng Bộ
            </a>
            <a
              href="#stores"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#D9FF3F] py-2 border-b border-[#2B3441]/50 flex items-center justify-between"
            >
              <span>10 Cửa Hàng Thể Thao Biên Hòa</span>
              <MapPin className="w-4 h-4" />
            </a>
            <a
              href="#editorial"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#E8A9C3] py-2 border-b border-[#2B3441]/50 flex items-center justify-between"
            >
              <span>Lookbook Lia — The HERCOURT Athlete</span>
              <Sparkles className="w-4 h-4 text-[#D9FF3F]" />
            </a>
            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-[#D9FF3F] py-2 flex items-center justify-between text-left"
              >
                <span>Hệ Thống Đồng Bộ & Quản Trị Pipeline</span>
                <Database className="w-4 h-4 text-[#D9FF3F]" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
