"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { STORES, PRODUCTS, Product, Store, formatVND, normalizeVietnameseText } from "@/lib/data";
import {
  MapPin,
  ExternalLink,
  Navigation,
  Phone,
  Clock,
  ShieldCheck,
  Search,
  Sparkles,
  Trophy,
  Eye,
  SlidersHorizontal,
  X,
  Store as StoreIcon,
  CheckCircle2,
} from "lucide-react";
import { useIsMobile, handleExternalLinkClick } from "@/lib/useMobileDevice";

interface StoreLocatorProps {
  onSelectStoreForGrid?: (storeShortName: string) => void;
  onQuickViewProduct?: (product: Product) => void;
}

export const StoreLocator: React.FC<StoreLocatorProps> = ({
  onSelectStoreForGrid,
  onQuickViewProduct,
}) => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedStoreModal, setSelectedStoreModal] = useState<Store | null>(null);

  // Filtered stores using accent-insensitive search and categories
  const filteredStores = useMemo(() => {
    const normalizedQuery = normalizeVietnameseText(searchQuery.trim());

    return STORES.filter((store) => {
      // Sport & Type filter
      if (activeFilter === "products" && store.productCount === 0) return false;
      if (activeFilter === "pickleball") {
        const matchesPickleball = store.specialties.some((s) => {
          const norm = normalizeVietnameseText(s);
          return norm.includes("pickleball") || norm.includes("tennis");
        });
        if (!matchesPickleball) return false;
      }
      if (activeFilter === "badminton") {
        const matchesBadminton = store.specialties.some((s) => {
          const norm = normalizeVietnameseText(s);
          return norm.includes("cau long") || norm.includes("long");
        });
        if (!matchesBadminton) return false;
      }
      if (activeFilter === "volleyball_running") {
        const matchesVolleyballRunning = store.specialties.some((s) => {
          const norm = normalizeVietnameseText(s);
          return norm.includes("bong chuyen") || norm.includes("chay bo") || norm.includes("gio");
        });
        if (!matchesVolleyballRunning) return false;
      }
      if (activeFilter === "gym_yoga") {
        const matchesGymYoga = store.specialties.some((s) => {
          const norm = normalizeVietnameseText(s);
          return norm.includes("gym") || norm.includes("yoga") || norm.includes("aerobic") || norm.includes("fitness");
        });
        if (!matchesGymYoga) return false;
      }

      // Search Query filter (matches name, address, ward, specialties)
      if (normalizedQuery) {
        const matchName = normalizeVietnameseText(store.name).includes(normalizedQuery);
        const matchShort = normalizeVietnameseText(store.shortName).includes(normalizedQuery);
        const matchAddress = normalizeVietnameseText(store.address).includes(normalizedQuery);
        const matchWard = store.ward ? normalizeVietnameseText(store.ward).includes(normalizedQuery) : false;
        const matchSpecialties = store.specialties.some((s) =>
          normalizeVietnameseText(s).includes(normalizedQuery)
        );
        if (!matchName && !matchShort && !matchAddress && !matchWard && !matchSpecialties) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, activeFilter]);

  const handleOpenStoreProducts = (store: Store) => {
    setSelectedStoreModal(store);
  };

  const handleFilterToGrid = (storeShortName: string) => {
    setSelectedStoreModal(null);
    if (onSelectStoreForGrid) {
      onSelectStoreForGrid(storeShortName);
    }
    const el = document.getElementById("products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Products belonging to the currently inspected store in modal
  const modalStoreProducts = useMemo(() => {
    if (!selectedStoreModal) return [];
    return PRODUCTS.filter(
      (p) => p.storeId === selectedStoreModal.id || p.store === selectedStoreModal.shortName
    );
  }, [selectedStoreModal]);

  return (
    <section id="stores" className="py-20 sm:py-28 bg-[#11151B] border-b border-[#2B3441] scroll-mt-20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#722D4A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#D9FF3F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.25em] text-[#D9FF3F] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9FF3F]" />
              MẠNG LƯỚI THỂ THAO ĐỊA PHƯƠNG
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#FAF9F6] font-display">
              BIÊN HÒA <span className="text-[#E8A9C3]">STORE DIRECTORY</span>
            </h2>
          </div>
          <p className="text-sm text-[#FAF9F6]/65 max-w-lg leading-relaxed">
            Hệ thống 10 điểm bán trang phục và thiết bị thể thao nữ uy tín tại TP. Biên Hòa, Đồng Nai. Dữ liệu địa chỉ, hotline và giờ mở cửa đã được kiểm chứng độc lập 100%.
          </p>
        </div>

        {/* Discovery Toolbar: Search Input + Sport Filters */}
        <div className="bg-[#181D25] border border-[#2B3441] rounded-2xl p-4 sm:p-5 mb-10 shadow-xl space-y-4">
          
          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FAF9F6]/40 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên shop, tên đường (Võ Thị Sáu, Phạm Văn Thuận, Đồng Khởi...) hoặc phường..."
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#11151B] border border-[#2B3441] text-xs sm:text-sm text-[#FAF9F6] placeholder-[#FAF9F6]/40 focus:outline-none focus:border-[#D9FF3F] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#FAF9F6]/50 hover:text-white"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-t border-[#2B3441]/50 pt-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FAF9F6]/40 flex items-center gap-1 mr-1 whitespace-nowrap">
              <Trophy className="w-3 h-3 text-[#D9FF3F]" />
              Phân loại:
            </span>
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeFilter === "all"
                  ? "bg-[#D9FF3F] text-[#11151B]"
                  : "bg-[#11151B] text-[#FAF9F6]/70 border border-[#2B3441] hover:text-white"
              }`}
            >
              Tất Cả ({STORES.length})
            </button>
            <button
              onClick={() => setActiveFilter("pickleball")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeFilter === "pickleball"
                  ? "bg-[#D9FF3F] text-[#11151B]"
                  : "bg-[#11151B] text-[#FAF9F6]/70 border border-[#2B3441] hover:text-white"
              }`}
            >
              Pickleball & Tennis
            </button>
            <button
              onClick={() => setActiveFilter("badminton")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeFilter === "badminton"
                  ? "bg-[#D9FF3F] text-[#11151B]"
                  : "bg-[#11151B] text-[#FAF9F6]/70 border border-[#2B3441] hover:text-white"
              }`}
            >
              Cầu Lông (Badminton)
            </button>
            <button
              onClick={() => setActiveFilter("volleyball_running")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeFilter === "volleyball_running"
                  ? "bg-[#D9FF3F] text-[#11151B]"
                  : "bg-[#11151B] text-[#FAF9F6]/70 border border-[#2B3441] hover:text-white"
              }`}
            >
              Bóng Chuyền & Chạy Bộ
            </button>
            <button
              onClick={() => setActiveFilter("gym_yoga")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeFilter === "gym_yoga"
                  ? "bg-[#D9FF3F] text-[#11151B]"
                  : "bg-[#11151B] text-[#FAF9F6]/70 border border-[#2B3441] hover:text-white"
              }`}
            >
              Gym, Yoga & Aerobic
            </button>
            <button
              onClick={() => setActiveFilter("products")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeFilter === "products"
                  ? "bg-[#D9FF3F] text-[#11151B]"
                  : "bg-[#11151B] text-[#FAF9F6]/70 border border-[#2B3441] hover:text-white"
              }`}
            >
              Có Sản Phẩm Tuyển Chọn
            </button>
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#FAF9F6]/60 mb-6 font-mono">
          <span>
            Tìm thấy <strong className="text-[#D9FF3F]">{filteredStores.length}</strong> cửa hàng phù hợp tại Biên Hòa
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-[#E8A9C3] hover:underline"
            >
              Xóa tìm kiếm
            </button>
          )}
        </div>

        {/* Responsive Grid: 3 columns on Desktop, 2 on Tablet, 1 on Mobile */}
        {filteredStores.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredStores.map((store, index) => {
              const brandColor = store.accentColor || "#722D4A";
              const initials = store.shortName
                .split(" ")
                .map((w) => w[0])
                .join("")
                .substring(0, 3)
                .toUpperCase();

              return (
                <article
                  key={store.id}
                  className="bg-[#181D25] border border-[#2B3441] rounded-2xl overflow-hidden hover:border-[#E8A9C3]/60 transition-all duration-300 flex flex-col justify-between group hover:shadow-2xl hover:shadow-black/60 card-premium-hover h-full"
                >
                  {/* Card Visual Header with Brand Gradient & Emblem */}
                  <div className="relative p-5 border-b border-[#2B3441]/70 bg-gradient-to-br from-[#1F252E] via-[#181D25] to-[#141820]">
                    {/* Subtle Brand Glow Accent */}
                    <div
                      className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none transition-opacity group-hover:opacity-35"
                      style={{ backgroundColor: brandColor }}
                    />

                    <div className="flex items-start justify-between gap-3 relative z-10">
                      {/* Brand Emblem / Monogram */}
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm tracking-wider shadow-lg border border-white/10 shrink-0"
                          style={{
                            backgroundColor: brandColor,
                            color: brandColor === "#D9FF3F" || brandColor === "#84CC16" ? "#11151B" : "#FAF9F6",
                          }}
                        >
                          {initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#11151B] text-[#D9FF3F] border border-[#2B3441]">
                              0{index + 1}
                            </span>
                            {store.ward && (
                              <span className="text-[10px] font-semibold text-[#FAF9F6]/60">
                                {store.ward}
                              </span>
                            )}
                          </div>
                          <h3 className="text-base sm:text-lg font-black uppercase text-[#FAF9F6] group-hover:text-[#D9FF3F] transition-colors leading-tight mt-1 line-clamp-1">
                            {store.name}
                          </h3>
                        </div>
                      </div>

                      {/* Verified Badge */}
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#11151B] text-emerald-400 border border-emerald-800/80 flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                        <span>{store.badge}</span>
                      </span>
                    </div>

                    {/* Store Tagline */}
                    {store.tagline && (
                      <p className="text-[11px] text-[#FAF9F6]/65 mt-3 line-clamp-1 italic font-serif">
                        &ldquo;{store.tagline}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Card Body: Address, Hours, Specialties, Product count */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      {/* Address */}
                      <address className="not-italic text-xs text-[#FAF9F6]/80 flex items-start gap-2 leading-relaxed">
                        <MapPin className="w-4 h-4 text-[#D9FF3F] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{store.address}</span>
                      </address>

                      {/* Hours & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#FAF9F6]/55 font-mono pt-1">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#FAF9F6]/40 shrink-0" />
                          <span className="truncate">{store.hours}</span>
                        </div>
                        {store.phone && (
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-[#FAF9F6]/40 shrink-0" />
                            <a
                              href={`tel:${store.phone.replace(/\s+/g, "")}`}
                              className="hover:text-[#D9FF3F] transition-colors truncate"
                            >
                              {store.phone}
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Main Sport Specialties Badges */}
                      <div className="pt-2">
                        <div className="text-[10px] uppercase font-mono tracking-wider text-[#FAF9F6]/40 mb-1.5">
                          Chuyên môn thể thao:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {store.specialties.map((spec, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#11151B] text-[#FAF9F6]/75 border border-[#2B3441]"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Product count indicator */}
                    <div className="flex items-center justify-between text-xs pt-3 border-t border-[#2B3441]/60">
                      <span className="text-[#FAF9F6]/50">Sản phẩm trên web:</span>
                      <span className="font-bold text-[#D9FF3F] font-mono flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#D9FF3F]" />
                        {store.productCount} mẫu tuyển chọn
                      </span>
                    </div>

                    {/* Action Buttons: 3 clear options */}
                    <div className="pt-1 space-y-2">
                      {/* Button 1: Xem sản phẩm (Primary CTA) */}
                      <button
                        onClick={() => handleOpenStoreProducts(store)}
                        className="w-full py-2.5 px-3 rounded-xl bg-[#D9FF3F] hover:bg-[#BBE02E] text-[#11151B] text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#D9FF3F]/15"
                      >
                        <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Xem {store.productCount} Mẫu Tại Shop</span>
                      </button>

                      {/* Buttons 2 & 3: Xem shop + Chỉ đường */}
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={store.website}
                          target={isMobile ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          onClick={handleExternalLinkClick}
                          className="py-2.5 px-3 min-h-[44px] rounded-xl bg-[#11151B] hover:bg-[#2B3441] border border-[#2B3441] text-[#FAF9F6] text-[11px] font-bold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1 active:scale-95"
                        >
                          <span>Xem Shop</span>
                          <ExternalLink className="w-3 h-3 text-[#FAF9F6]/60" />
                        </a>

                        <a
                          href={store.mapsUrl}
                          target={isMobile ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          onClick={handleExternalLinkClick}
                          className="py-2.5 px-3 min-h-[44px] rounded-xl bg-[#722D4A]/50 hover:bg-[#722D4A] border border-[#E8A9C3]/30 text-[#FAF9F6] text-[11px] font-bold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1 active:scale-95"
                        >
                          <span>Chỉ Đường</span>
                          <Navigation className="w-3 h-3 text-[#D9FF3F]" />
                        </a>
                      </div>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="bg-[#181D25] border border-[#2B3441] rounded-3xl p-12 text-center max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-[#11151B] border border-[#2B3441] flex items-center justify-center mx-auto mb-4 text-[#E8A9C3]">
              <StoreIcon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold uppercase text-[#FAF9F6] mb-2">
              Không tìm thấy cửa hàng
            </h3>
            <p className="text-xs text-[#FAF9F6]/60 mb-6">
              Không có cửa hàng nào khớp với &ldquo;{searchQuery}&rdquo;. Hãy thử tìm theo tên đường như Võ Thị Sáu, Phạm Văn Thuận, hoặc chọn &ldquo;Tất Cả&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="px-5 py-2 rounded-full bg-[#D9FF3F] text-[#11151B] font-bold text-xs uppercase"
            >
              Đặt lại tìm kiếm
            </button>
          </div>
        )}

        {/* Local Verification Notice */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#181D25] border border-[#2B3441] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-[#11151B] border border-[#D9FF3F]/30 text-[#D9FF3F] shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-[#FAF9F6]">
                Xác thực địa chỉ thực tế 100% tại TP. Biên Hòa, Đồng Nai
              </div>
              <div className="text-xs text-[#FAF9F6]/60 mt-0.5 leading-relaxed">
                Mỗi địa chỉ đều được đối chiếu giấy phép hoạt động, mặt tiền cửa hàng và tọa độ bản đồ Google Maps chính xác. Cam kết giá niêm yết trùng khớp với giá tại quầy.
              </div>
            </div>
          </div>
          <div className="text-xs font-mono text-[#D9FF3F] bg-[#11151B] px-4 py-2.5 rounded-xl border border-[#2B3441] shrink-0">
            DỮ LIỆU ĐÃ KIỂM ĐỊNH THÁNG 11/2026
          </div>
        </div>

      </div>

      {/* Store Products Modal (Connects store to its real products) */}
      {selectedStoreModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedStoreModal(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="store-modal-title"
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#151921] border border-[#2B3441] rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#2B3441] bg-[#11151B]">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm tracking-wider shadow-md shrink-0"
                  style={{
                    backgroundColor: selectedStoreModal.accentColor || "#722D4A",
                    color: selectedStoreModal.accentColor === "#D9FF3F" ? "#11151B" : "#FAF9F6",
                  }}
                >
                  {selectedStoreModal.shortName.substring(0, 3).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 id="store-modal-title" className="text-base sm:text-lg font-black uppercase text-[#FAF9F6] tracking-tight">
                      {selectedStoreModal.name}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#181D25] text-emerald-400 border border-emerald-800">
                      {selectedStoreModal.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#FAF9F6]/60 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D9FF3F]" />
                    <span>{selectedStoreModal.address}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStoreModal(null)}
                className="p-2 rounded-full bg-[#181D25] hover:bg-[#2B3441] text-[#FAF9F6]/70 hover:text-white border border-[#2B3441] transition-colors"
                aria-label="Đóng"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Toolbar: Filter to Grid CTA + Store Details */}
            <div className="px-6 py-3 border-b border-[#2B3441] bg-[#181D25] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-3 text-[#FAF9F6]/70 font-mono text-[11px]">
                <span>Hotline: <strong className="text-[#FAF9F6]">{selectedStoreModal.phone}</strong></span>
                <span>•</span>
                <span>Mở cửa: <strong className="text-[#FAF9F6]">{selectedStoreModal.hours}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleFilterToGrid(selectedStoreModal.shortName)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#722D4A] hover:bg-[#8E3B5E] text-[#FAF9F6] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow"
                >
                  <SlidersHorizontal className="w-3 h-3 text-[#D9FF3F]" />
                  <span>Xem trên trang chủ</span>
                </button>

                <a
                  href={selectedStoreModal.mapsUrl}
                  target={isMobile ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  onClick={handleExternalLinkClick}
                  className="px-3 py-1.5 min-h-[44px] rounded-lg bg-[#11151B] hover:bg-[#2B3441] text-[#FAF9F6] text-xs font-bold uppercase tracking-wider flex items-center gap-1 border border-[#2B3441] active:scale-95"
                >
                  <Navigation className="w-3 h-3 text-[#D9FF3F]" />
                  <span>Chỉ đường</span>
                </a>
              </div>
            </div>

            {/* Products List from this Store */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#FAF9F6]/80 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D9FF3F]" />
                  DANH SÁCH {modalStoreProducts.length} SẢN PHẨM XÁC THỰC TẠI {selectedStoreModal.shortName}
                </h4>
                <span className="text-[11px] text-[#FAF9F6]/50">
                  Cam kết đúng giá niêm yết tại quầy
                </span>
              </div>

              {modalStoreProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {modalStoreProducts.map((p) => (
                    <div
                      key={p.id}
                      className="bg-[#181D25] border border-[#2B3441] rounded-2xl p-3.5 flex flex-col justify-between hover:border-[#D9FF3F]/50 transition-colors group"
                    >
                      <div>
                        {/* Image Preview */}
                        <div
                          className="relative aspect-square w-full rounded-xl bg-[#11151B] border border-[#2B3441]/50 flex items-center justify-center p-2 mb-2.5 overflow-hidden cursor-pointer"
                          onClick={() => {
                            if (onQuickViewProduct) {
                              setSelectedStoreModal(null);
                              onQuickViewProduct(p);
                            }
                          }}
                        >
                          {p.imageUrl ? (
                            <Image
                              src={p.imageUrl}
                              alt={p.name}
                              fill
                              sizes="(max-width: 640px) 100vw, 200px"
                              className="object-contain p-1 group-hover:scale-105 transition-transform"
                            />
                          ) : (
                            <div className="text-xs font-mono text-[#FAF9F6]/40">
                              {p.shape.toUpperCase()}
                            </div>
                          )}
                          <span className="absolute top-1.5 left-1.5 text-[8px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#11151B]/90 text-[#D9FF3F] border border-[#2B3441]">
                            {p.sport}
                          </span>
                        </div>

                        {/* Title & Price */}
                        <div className="flex items-center justify-between text-[10px] text-[#FAF9F6]/50 font-mono mb-1">
                          <span>{p.category}</span>
                          <span className="text-[#D9FF3F] font-bold">{formatVND(p.price)}</span>
                        </div>

                        <h5
                          onClick={() => {
                            if (onQuickViewProduct) {
                              setSelectedStoreModal(null);
                              onQuickViewProduct(p);
                            }
                          }}
                          className="text-xs font-bold text-[#FAF9F6] group-hover:text-[#D9FF3F] transition-colors line-clamp-1 cursor-pointer"
                          title={p.name}
                        >
                          {p.name}
                        </h5>
                      </div>

                      {/* Direct CTA */}
                      <div className="pt-2 mt-2 border-t border-[#2B3441]/50 flex items-center justify-between gap-2">
                        <button
                          onClick={() => {
                            if (onQuickViewProduct) {
                              setSelectedStoreModal(null);
                              onQuickViewProduct(p);
                            }
                          }}
                          className="text-[10px] font-bold uppercase text-[#E8A9C3] hover:text-white"
                        >
                          Chi tiết
                        </button>
                        {p.hasVerifiedUrl === false ? (
                          <a
                            href={selectedStoreModal.mapsUrl}
                            target={isMobile ? undefined : "_blank"}
                            rel="noopener noreferrer"
                            onClick={handleExternalLinkClick}
                            className="text-[10px] font-bold uppercase px-2.5 py-1.5 min-h-[44px] rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 flex items-center gap-1 active:scale-95"
                          >
                            <span>Tại quầy</span>
                            <MapPin className="w-2.5 h-2.5 text-amber-400" />
                          </a>
                        ) : (
                          <a
                            href={p.url}
                            target={isMobile ? undefined : "_blank"}
                            rel="noopener noreferrer"
                            onClick={handleExternalLinkClick}
                            className="text-[10px] font-bold uppercase px-2.5 py-1.5 min-h-[44px] rounded bg-[#11151B] hover:bg-[#2B3441] border border-[#2B3441] text-[#FAF9F6] flex items-center gap-1 active:scale-95"
                          >
                            <span>Mua shop</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-[#FAF9F6]/50">
                  Chưa có sản phẩm nào được lập chỉ mục trực tuyến cho cửa hàng này. Bạn có thể ghé trực tiếp tại quầy theo địa chỉ trên bản đồ.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-[#2B3441] bg-[#11151B] flex items-center justify-between text-xs text-[#FAF9F6]/60">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D9FF3F]" />
                Tất cả sản phẩm đều được bảo đảm xuất xứ chính hãng tại Biên Hòa.
              </span>
              <button
                onClick={() => setSelectedStoreModal(null)}
                className="px-4 py-1.5 rounded-lg bg-[#181D25] hover:bg-[#2B3441] text-[#FAF9F6] font-semibold text-xs border border-[#2B3441]"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
