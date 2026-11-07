import React from "react";

export const MarqueeBanner: React.FC = () => {
  const items = [
    "OWN THE GAME",
    "FASHION THAT MOVES WITH YOU",
    "BIÊN HÒA SPORTSWEAR DISCOVERY",
    "BEYONO · VNB SPORTS · PHƯỢNG SPORT",
    "WEAR THE ENERGY",
    "100% SẢN PHẨM CHÍNH HÃNG",
    "VÁY THỂ THAO XẾP LY",
    "CẦU LÔNG · TENNIS · PICKLEBALL",
    "CHỈ ĐƯỜNG TRỰC TIẾP CỬA HÀNG",
  ];

  return (
    <div className="relative overflow-hidden bg-[#722D4A] py-2.5 border-y border-[#8E3B5E] select-none">
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center mx-6">
            <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] uppercase text-[#FAF9F6] whitespace-nowrap">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9FF3F] ml-6 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
