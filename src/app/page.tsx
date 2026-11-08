"use client";

import React, { useState } from "react";
import { PRODUCTS, Product } from "@/lib/data";
import { useWishlist } from "@/hooks/useWishlist";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { MarqueeBanner } from "@/components/MarqueeBanner";
import { CategorySection } from "@/components/CategorySection";
import { ProductGrid } from "@/components/ProductGrid";
import { EditorialSection } from "@/components/EditorialSection";
import { BestValueSection } from "@/components/BestValueSection";
import { StoreLocator } from "@/components/StoreLocator";
import { ProductModal } from "@/components/ProductModal";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { AdminSyncModal } from "@/components/AdminSyncModal";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  const { wishlist, count, toggleWishlist, isFavorite } = useWishlist();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStore, setSelectedStore] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleExploreClick = () => {
    const el = document.getElementById("products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleStoresClick = () => {
    const el = document.getElementById("stores");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    const el = document.getElementById("products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#11151B] text-[#FAF9F6]">
      {/* 1. Global Navigation Bar */}
      <Navigation
        wishlistCount={count}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectCategory={handleSelectCategory}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 2. Cinematic Hero Section with LIA */}
      <HeroSection
        onExploreClick={handleExploreClick}
        onStoresClick={handleStoresClick}
      />

      {/* 3. Infinite Editorial Marquee Ticker */}
      <MarqueeBanner />

      {/* 4. Curated Category Selection */}
      <CategorySection
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* 5. Main Product Grid & Multi-Filter Engine */}
      <ProductGrid
        products={PRODUCTS}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedStore={selectedStore}
        onSelectStore={setSelectedStore}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
        onQuickView={setQuickViewProduct}
      />

      {/* 6. High-Fashion Editorial Lookbook featuring LIA */}
      <EditorialSection />

      {/* 7. Best Value Under 200k Showcase */}
      <BestValueSection
        onQuickView={setQuickViewProduct}
        onSelectCategory={handleSelectCategory}
      />

      {/* 8. Local Store Directory & Map Navigation */}
      <StoreLocator
        onSelectStoreForGrid={setSelectedStore}
        onQuickViewProduct={setQuickViewProduct}
      />

      {/* 9. Global Brand Footer */}
      <Footer />

      {/* Slide-out Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        onRemove={toggleWishlist}
        onQuickView={setQuickViewProduct}
      />

      {/* Quick View Product Modal */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isFavorite={quickViewProduct ? isFavorite(quickViewProduct.id) : false}
        onToggleFavorite={toggleWishlist}
      />

      {/* Admin & Data Pipeline Modal */}
      <AdminSyncModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        totalProductsCount={PRODUCTS.length}
      />
    </main>
  );
}
