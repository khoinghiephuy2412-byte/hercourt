"use client";

import React, { useState } from "react";
import { STORES } from "@/lib/data";
import { MapPin, ExternalLink, Navigation, Phone, Clock, ShieldCheck, Trophy } from "lucide-react";

export const StoreLocator: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredStores = STORES.filter((store) => {
    if (activeFilter === "verified") return store.verified;
    if (activeFilter === "products") return store.productCount > 0;
    if (activeFilter === "pickleball") return store.specialties.some((s) => s.toLowerCase().includes("pickleball"));
    if (activeFilter === "badminton") return store.specialties.some((s) => s.toLowerCase().includes("cầu lông"));
    return true;
  });

  return (
    <section id="stores" className="py-20 sm:py-28 bg-[#11151B] border-b border-[#2B3441] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.25em] text-[#D9FF3F] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9FF3F]" />
              MẠNG LƯỚI ĐỊA PHƯƠNG
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#FAF9F6] font-display">
              BIÊN HÒA <span className="text-[#E8A9C3]">STORES</span>
            </h2>
          </div>
          <p className="text-sm text-[#FAF9F6]/65 max-w-md">
            Mạng lưới {STORES.length} cửa hàng thể thao thực tế tại TP. Biên Hòa, Đồng Nai. Mở bản đồ Google Maps và ghé thử trang phục trực tiếp tại quầy.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
              activeFilter === "all"
                ? "bg-[#D9FF3F] text-[#11151B]"
                : "bg-[#181D25] text-[#FAF9F6]/70 border border-[#2B3441] hover:text-white"
            }`}
          >
            Tất Cả {STORES.length} Cửa Hàng
          </button>
          <button
            onClick={() => setActiveFilter("products")}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
              activeFilter === "products"
                ? "bg-[#D9FF3F] text-[#11151B]"
                : "bg-[#181D25] text-[#FAF9F6]/70 border border-[#2B3441] hover:text-white"
            }`}
          >
            Có Sản Phẩm Khám Phá ({STORES.filter((s) => s.productCount > 0).length})
          </button>
          <button
            onClick={() => setActiveFilter("pickleball")}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
              activeFilter === "pickleball"
                ? "bg-[#D9FF3F] text-[#11151B]"
                : "bg-[#181D25] text-[#FAF9F6]/70 border border-[#2B3441] hover:text-white"
            }`}
          >
            Pickleball & Tennis
          </button>
          <button
            onClick={() => setActiveFilter("badminton")}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
              activeFilter === "badminton"
                ? "bg-[#D9FF3F] text-[#11151B]"
                : "bg-[#181D25] text-[#FAF9F6]/70 border border-[#2B3441] hover:text-white"
            }`}
          >
            Chuyên Cầu Lông
          </button>
        </div>

        {/* Store Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStores.map((store, index) => (
            <article
              key={store.id}
              className="bg-[#181D25] border border-[#2B3441] rounded-2xl p-5 hover:border-[#E8A9C3]/50 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-[#000]/50 card-premium-hover"
            >
              <div>
                {/* Number & Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black font-mono text-[#FAF9F6]/20 group-hover:text-[#D9FF3F] transition-colors">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      store.verified
                        ? "bg-[#11151B] text-[#D9FF3F] border border-[#D9FF3F]/30"
                        : "bg-[#11151B] text-[#E8A9C3] border border-[#722D4A]"
                    }`}
                  >
                    {store.badge}
                  </span>
                </div>

                {/* Store Name */}
                <h3 className="text-lg font-black uppercase text-[#FAF9F6] group-hover:text-[#E8A9C3] transition-colors leading-tight mb-2">
                  {store.name}
                </h3>

                {/* Address */}
                <address className="not-italic text-xs text-[#FAF9F6]/75 flex items-start gap-1.5 mb-3 leading-relaxed">
                  <MapPin className="w-3.5 h-3.5 text-[#D9FF3F] shrink-0 mt-0.5" />
                  <span>{store.address}</span>
                </address>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {store.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-[#11151B] text-[#FAF9F6]/60 border border-[#2B3441]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Extra info */}
                <div className="space-y-1.5 text-[11px] text-[#FAF9F6]/50 mb-5 border-t border-[#2B3441]/50 pt-3">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#FAF9F6]/40" />
                    <span>{store.hours}</span>
                  </div>
                  {store.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-[#FAF9F6]/40" />
                      <span>{store.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#2B3441]/50">
                <a
                  href={store.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-[#11151B] hover:bg-[#2B3441] border border-[#2B3441] text-[#FAF9F6] text-[11px] font-bold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1"
                >
                  <span>Xem shop</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={store.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-[#722D4A]/50 hover:bg-[#722D4A] border border-[#E8A9C3]/30 text-[#FAF9F6] text-[11px] font-bold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1"
                >
                  <span>Chỉ đường</span>
                  <Navigation className="w-3 h-3 text-[#D9FF3F]" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Local Verification Notice */}
        <div className="mt-12 p-6 rounded-3xl bg-[#181D25] border border-[#2B3441] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#11151B] border border-[#D9FF3F]/30 text-[#D9FF3F]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#FAF9F6]">
                Xác thực địa chỉ thực tế 100% tại TP. Biên Hòa, Đồng Nai
              </div>
              <div className="text-xs text-[#FAF9F6]/60">
                Mỗi địa chỉ đều được đối chiếu giấy phép hoạt động, mặt tiền cửa hàng và tọa độ bản đồ Google Maps chính xác.
              </div>
            </div>
          </div>
          <div className="text-xs font-mono text-[#D9FF3F] bg-[#11151B] px-3.5 py-2 rounded-xl border border-[#2B3441]">
            CẬP NHẬT: THÁNG 11/2026
          </div>
        </div>

      </div>
    </section>
  );
};
