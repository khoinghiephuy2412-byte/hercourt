"use client";

import React, { useState, useMemo } from "react";
import { Product, Store, STORES } from "@/lib/data";
import { ProductCard } from "./ProductCard";
import { Search, SlidersHorizontal, ArrowUpDown, RotateCcw } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
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
  searchQuery,
  onSearchChange,
  wishlist,
  onToggleWishlist,
  onQuickView,
}) => {
  const [selectedStore, setSelectedStore] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "low" | "high" | "under200">("featured");

  const categories = [
    { id: "all", label: "Tất cả" },
    { id: "Váy", label: "Váy (6)" },
    { id: "Áo", label: "Áo (11)" },
    { id: "Bộ đồ", label: "Bộ đồ (4)" },
    { id: "Quần", label: "Quần (1)" },
    { id: "favorites", label: `Yêu thích (${wishlist.length})` },
  ];

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
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

        // Store filter
        if (selectedStore !== "all" && p.store !== selectedStore) {
          return false;
        }

        // Search query filter (matches name, store, category, tags)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchStore = p.store.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchStore && !matchCat && !matchTags) return false;
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
  }, [products, selectedCategory, selectedStore, searchQuery, sortBy, wishlist]);

  const handleResetFilters = () => {
    onSelectCategory("all");
    setSelectedStore("all");
    setSortBy("featured");
    onSearchChange("");
  };

  return (
    <section id="products" className="py-16 sm:py-24 bg-[#11151B] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.25em] text-[#D9FF3F] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9FF3F]" />
              BỘ SƯU TẬP TUYỂN CHỌN
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#FAF9F6]">
              DISCOVER <span className="text-[#E8A9C3]">PRODUCTS</span>
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-[#FAF9F6]/60 font-medium">
            Hiển thị <span className="text-[#D9FF3F] font-bold">{filteredProducts.length}</span> / {products.length} mẫu đã chọn lọc tại Biên Hòa
          </div>
        </div>

        {/* Filter Controls Toolbar */}
        <div className="bg-[#181D25] border border-[#2B3441] rounded-2xl p-4 sm:p-5 mb-10 shadow-lg">
          
          {/* Top row: Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-4 border-b border-[#2B3441]/60 no-scrollbar">
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

          {/* Bottom row: Search input & Store Select & Sort Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-3 sm:pt-4 items-center">
            
            {/* Search Input Box */}
            <div className="sm:col-span-5 relative">
              <Search className="w-4 h-4 text-[#FAF9F6]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Tìm tên mẫu, thương hiệu, màu sắc..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#11151B] border border-[#2B3441] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#E8A9C3] placeholder-[#FAF9F6]/40"
              />
            </div>

            {/* Store Filter Select */}
            <div className="sm:col-span-3">
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-[#11151B] border border-[#2B3441] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#E8A9C3] cursor-pointer"
              >
                <option value="all">Tất cả cửa hàng (3 shop có hàng)</option>
                <option value="BEYONO">BEYONO (15 mẫu)</option>
                <option value="VNB CN2">VNB Sports CN2 (6 mẫu)</option>
                <option value="Phượng Sport">Phượng Sport (1 mẫu)</option>
              </select>
            </div>

            {/* Sort Filter Select */}
            <div className="sm:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2 px-3 rounded-xl bg-[#11151B] border border-[#2B3441] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#E8A9C3] cursor-pointer"
              >
                <option value="featured">Sắp xếp: Mặc định</option>
                <option value="low">Giá: Thấp đến Cao</option>
                <option value="high">Giá: Cao đến Thấp</option>
                <option value="under200">Lọc: Dưới 200.000đ</option>
              </select>
            </div>

            {/* Reset Button */}
            <div className="sm:col-span-1 flex justify-end">
              <button
                onClick={handleResetFilters}
                className="p-2.5 rounded-xl bg-[#11151B] hover:bg-[#2B3441] border border-[#2B3441] text-[#FAF9F6]/70 hover:text-white transition-colors"
                title="Đặt lại bộ lọc"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={wishlist.includes(product.id)}
                onToggleFavorite={onToggleWishlist}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter state */
          <div className="py-20 text-center bg-[#181D25] border border-[#2B3441] rounded-2xl p-8 max-w-lg mx-auto">
            <SlidersHorizontal className="w-10 h-10 text-[#FAF9F6]/30 mx-auto mb-4" />
            <h3 className="text-lg font-black uppercase text-[#FAF9F6] mb-2">
              Không tìm thấy mẫu phù hợp
            </h3>
            <p className="text-xs text-[#FAF9F6]/60 mb-6 leading-relaxed">
              Hãy thử chọn danh mục khác, điều chỉnh khoảng giá hoặc xóa từ khóa tìm kiếm.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-full bg-[#D9FF3F] text-[#11151B] text-xs font-black uppercase tracking-wider hover:bg-[#BBE02E] transition-colors"
            >
              Xem Tất Cả 22 Mẫu
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
