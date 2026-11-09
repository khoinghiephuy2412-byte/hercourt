"use client";

import React, { useState, useMemo } from "react";
import { Product, SPORTS, STORES, normalizeVietnameseText } from "@/lib/data";
import { ProductCard } from "./ProductCard";
import { Search, SlidersHorizontal, RotateCcw, ShieldCheck, Trophy, Sparkles } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedStore?: string;
  onSelectStore?: (store: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  selectedStore: controlledStore,
  onSelectStore,
  searchQuery,
  onSearchChange,
  wishlist,
  onToggleWishlist,
  onQuickView,
}) => {
  const [selectedSport, setSelectedSport] = useState<string>("all");
  const [selectedPhotoSource, setSelectedPhotoSource] = useState<string>("all");
  const [selectedScope, setSelectedScope] = useState<string>("all");
  const [internalStore, setInternalStore] = useState<string>("all");
  const selectedStore = controlledStore !== undefined ? controlledStore : internalStore;
  const setSelectedStore = onSelectStore || setInternalStore;
  const [sortBy, setSortBy] = useState<"featured" | "low" | "high" | "under200">("featured");

  // Dynamic counts for category tabs
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length, Váy: 0, Áo: 0, "Bộ đồ": 0, Quần: 0 };
    products.forEach((p) => {
      if (counts[p.category] !== undefined) counts[p.category]++;
    });
    return counts;
  }, [products]);

  const categories = [
    { id: "all", label: `Tất cả (${products.length})` },
    { id: "Áo", label: `Áo Cầu Lông (${categoryCounts["Áo"] || 0})` },
    { id: "Váy", label: `Váy Cầu Lông (${categoryCounts["Váy"] || 0})` },
    { id: "Bộ đồ", label: `Bộ Đồ Cầu Lông (${categoryCounts["Bộ đồ"] || 0})` },
    { id: "Quần", label: `Quần / Short (${categoryCounts["Quần"] || 0})` },
    { id: "favorites", label: `Yêu thích (${wishlist.length})` },
  ];

  // Filtering & Sorting Logic with Accent-insensitive Vietnamese search
  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalizeVietnameseText(searchQuery.trim());

    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory === "favorites") {
          if (!wishlist.includes(p.id)) return false;
        } else if (
          selectedCategory !== "all" &&
          selectedCategory !== "Tất cả" &&
          p.category !== selectedCategory
        ) {
          return false;
        }

        // Sport filter
        if (selectedSport !== "all" && p.sport !== selectedSport) {
          return false;
        }

        // Photo Source filter
        if (selectedPhotoSource === "shop") {
          if (p.photoSourceType === "ai_styling_visualization") return false;
        } else if (selectedPhotoSource === "ai") {
          if (p.photoSourceType !== "ai_styling_visualization" && !p.aiModelImageUrl) return false;
        }

        // Verification Scope filter
        if (selectedScope !== "all" && p.verificationScope !== selectedScope) {
          return false;
        }

        // Store filter
        if (selectedStore !== "all" && p.store !== selectedStore && p.storeId !== selectedStore) {
          return false;
        }

        // Accent-insensitive search query filter
        if (normalizedQuery) {
          const matchName = normalizeVietnameseText(p.name).includes(normalizedQuery);
          const matchBrand = p.brand ? normalizeVietnameseText(p.brand).includes(normalizedQuery) : false;
          const matchStore = normalizeVietnameseText(p.store).includes(normalizedQuery);
          const matchCat = normalizeVietnameseText(p.category).includes(normalizedQuery);
          const matchSport = normalizeVietnameseText(p.sport).includes(normalizedQuery);
          const matchTags = p.tags.some((t) => normalizeVietnameseText(t).includes(normalizedQuery));
          if (!matchName && !matchBrand && !matchStore && !matchCat && !matchSport && !matchTags) {
            return false;
          }
        }

        // Under 200k filter
        if (sortBy === "under200" && p.price >= 200000) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "low") return a.price - b.price;
        if (sortBy === "high") return b.price - a.price;
        return 0; // default featured order
      });
  }, [
    products,
    selectedCategory,
    selectedSport,
    selectedScope,
    selectedStore,
    searchQuery,
    sortBy,
    wishlist,
    selectedPhotoSource,
  ]);

  const handleResetFilters = () => {
    onSelectCategory("all");
    setSelectedSport("all");
    setSelectedPhotoSource("all");
    setSelectedScope("all");
    setSelectedStore("all");
    setSortBy("featured");
    onSearchChange("");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedSport !== "all" ||
    selectedPhotoSource !== "all" ||
    selectedScope !== "all" ||
    selectedStore !== "all" ||
    sortBy !== "featured" ||
    searchQuery.trim().length > 0;

  return (
    <section id="products" className="py-16 sm:py-24 bg-[#11151B] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.25em] text-[#D9FF3F] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9FF3F]" />
              BỘ SƯU TẬP TUYỂN CHỌN XÁC THỰC
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#FAF9F6] font-display">
              DISCOVER <span className="text-[#E8A9C3]">PRODUCTS</span>
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-[#FAF9F6]/60 font-medium">
            Hiển thị <span className="text-[#D9FF3F] font-bold">{filteredProducts.length}</span> / {products.length} mẫu tại các cửa hàng Biên Hòa
          </div>
        </div>

        {/* Filter Controls Toolbar */}
        <div className="bg-[#181D25] border border-[#2B3441] rounded-2xl p-4 sm:p-5 mb-10 shadow-lg space-y-4">
          
          {/* Row 1: Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((c) => {
              const active =
                selectedCategory === c.id ||
                (c.id === "all" && selectedCategory === "Tất cả");

              return (
                <button
                  key={c.id}
                  onClick={() => onSelectCategory(c.id)}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                    active
                      ? "bg-[#D9FF3F] text-[#11151B] shadow-md shadow-[#D9FF3F]/20 scale-105"
                      : "bg-[#11151B] text-[#FAF9F6]/80 hover:text-white border border-[#2B3441] hover:border-[#E8A9C3]/50"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* Row 2: Photo Source & AI Styling Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-t border-[#2B3441]/50 pt-3 no-scrollbar">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FAF9F6]/40 flex items-center gap-1 mr-1 whitespace-nowrap">
              <Sparkles className="w-3 h-3 text-[#D9FF3F]" />
              Nguồn ảnh:
            </span>
            <button
              onClick={() => setSelectedPhotoSource("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedPhotoSource === "all"
                  ? "bg-[#D9FF3F] text-[#11151B] font-black shadow-sm"
                  : "bg-[#11151B] text-[#FAF9F6]/70 hover:text-white border border-[#2B3441]"
              }`}
            >
              Tất cả mẫu ({products.length})
            </button>
            <button
              onClick={() => setSelectedPhotoSource("shop")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedPhotoSource === "shop"
                  ? "bg-[#722D4A] text-[#FAF9F6] border border-[#E8A9C3]/40 shadow-sm"
                  : "bg-[#11151B] text-[#FAF9F6]/70 hover:text-white border border-[#2B3441]"
              }`}
            >
              <span>Ảnh thật từ shop</span>
              <span className="text-[10px] font-mono opacity-70">
                ({products.filter((p) => p.photoSourceType !== "ai_styling_visualization").length})
              </span>
            </button>
            <button
              onClick={() => setSelectedPhotoSource("ai")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedPhotoSource === "ai"
                  ? "bg-purple-900 text-[#FAF9F6] border border-purple-400 shadow-sm"
                  : "bg-[#11151B] text-purple-300 hover:text-white border border-purple-900/50"
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#D9FF3F]" />
              <span>Ảnh phối mẫu AI</span>
              <span className="text-[10px] font-mono opacity-70">
                ({products.filter((p) => p.photoSourceType === "ai_styling_visualization" || !!p.aiModelImageUrl).length})
              </span>
            </button>
          </div>

          {/* Row 3: Verification Scope Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-t border-[#2B3441]/50 pt-3 no-scrollbar">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FAF9F6]/40 flex items-center gap-1 mr-1 whitespace-nowrap">
              <ShieldCheck className="w-3 h-3 text-[#D9FF3F]" />
              Xác thực:
            </span>
            <button
              onClick={() => setSelectedScope("all")}
              className={`px-3 py-1 rounded-md text-[11px] font-bold whitespace-nowrap transition-all ${
                selectedScope === "all"
                  ? "bg-[#D9FF3F] text-[#11151B]"
                  : "bg-[#11151B] text-[#FAF9F6]/70 hover:text-white border border-[#2B3441]"
              }`}
            >
              Tất cả cấp độ ({products.length})
            </button>
            <button
              onClick={() => setSelectedScope("CONFIRMED_LOCAL_BRANCH")}
              className={`px-3 py-1 rounded-md text-[11px] font-bold whitespace-nowrap transition-all ${
                selectedScope === "CONFIRMED_LOCAL_BRANCH"
                  ? "bg-[#D9FF3F] text-[#11151B]"
                  : "bg-[#11151B] text-emerald-400 hover:text-emerald-300 border border-emerald-900/60"
              }`}
            >
              Scope A: Sẵn tại chi nhánh Biên Hòa ({products.filter((p) => p.verificationScope === "CONFIRMED_LOCAL_BRANCH").length})
            </button>
            <button
              onClick={() => setSelectedScope("CONFIRMED_LOCAL_MERCHANT")}
              className={`px-3 py-1 rounded-md text-[11px] font-bold whitespace-nowrap transition-all ${
                selectedScope === "CONFIRMED_LOCAL_MERCHANT"
                  ? "bg-[#D9FF3F] text-[#11151B]"
                  : "bg-[#11151B] text-rose-300 hover:text-rose-200 border border-rose-900/60"
              }`}
            >
              Scope B: Cửa hàng Biên Hòa ({products.filter((p) => p.verificationScope === "CONFIRMED_LOCAL_MERCHANT").length})
            </button>
          </div>

          {/* Row 4: Search input & Store Select & Sort Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-3 border-t border-[#2B3441]/50 items-center">
            
            {/* Accent-insensitive Search Input */}
            <div className="sm:col-span-5 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FAF9F6]/40 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Tìm áo cầu lông, chân váy xếp ly, bộ đồ, BEYONO, VNB, Yonex..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#11151B] border border-[#2B3441] text-xs text-[#FAF9F6] placeholder-[#FAF9F6]/40 focus:outline-none focus:border-[#D9FF3F] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#FAF9F6]/50 hover:text-white"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* Store Select Dropdown */}
            <div className="sm:col-span-4 relative">
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#11151B] border border-[#2B3441] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#D9FF3F] appearance-none cursor-pointer"
              >
                <option value="all">Tất cả 10 cửa hàng Biên Hòa</option>
                {STORES.map((s) => (
                  <option key={s.id} value={s.shortName}>
                    {s.name} ({s.productCount} mẫu)
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#FAF9F6]/40 text-xs">
                ▼
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="sm:col-span-3 relative flex gap-2">
              <div className="relative w-full">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#11151B] border border-[#2B3441] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#D9FF3F] appearance-none cursor-pointer"
                >
                  <option value="featured">Nổi bật nhất</option>
                  <option value="low">Giá: Thấp đến cao</option>
                  <option value="high">Giá: Cao đến thấp</option>
                  <option value="under200">Dưới 200.000đ</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#FAF9F6]/40 text-xs">
                  ▼
                </div>
              </div>

              {/* Reset filter button */}
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="p-2.5 rounded-xl bg-[#11151B] hover:bg-[#2B3441] border border-[#2B3441] text-[#FAF9F6]/60 hover:text-white transition-colors"
                  title="Đặt lại tất cả bộ lọc"
                  aria-label="Đặt lại bộ lọc"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isFavorite={wishlist.includes(p.id)}
                onToggleFavorite={onToggleWishlist}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#181D25] border border-[#2B3441] rounded-3xl p-12 text-center max-w-xl mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-[#11151B] border border-[#2B3441] flex items-center justify-center mx-auto mb-4 text-[#E8A9C3]">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold uppercase text-[#FAF9F6] mb-2">
              Không tìm thấy sản phẩm phù hợp
            </h3>
            <p className="text-xs text-[#FAF9F6]/60 mb-6 leading-relaxed">
              Không có sản phẩm nào thỏa mãn các tiêu chí lọc hiện tại. Thử chọn &ldquo;Tất cả bộ môn&rdquo;, xóa từ khóa tìm kiếm hoặc đổi cửa hàng.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-full bg-[#D9FF3F] text-[#11151B] font-bold text-xs uppercase tracking-wider hover:bg-[#BBE02E] transition-colors"
            >
              Đặt lại tất cả bộ lọc
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
