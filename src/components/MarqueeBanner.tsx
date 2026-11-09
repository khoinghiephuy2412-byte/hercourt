import React from "react";

export const MarqueeBanner: React.FC = () => {
  const items = [
    "OWN THE COURT",
    "THỜI TRANG CẦU LÔNG NỮ BIÊN HÒA",
    "BEYONO · SHOPVNB · XB SPORTS · CHUN SPORT",
    "ÁO CẦU LÔNG NỮ · VÁY XẾP LY · BỘ ĐỒ THI ĐẤU",
    "100% SẢN PHẨM CHÍNH HÃNG",
    "ẢNH PHỐI MẪU AI & ẢNH THẬT TỪ SHOP",
    "ĐỐI CHIẾU GIÁ NIÊM YẾT MINH BẠCH",
    "CHỈ ĐƯỜNG MUA SẮM TẬN NƠI",
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
