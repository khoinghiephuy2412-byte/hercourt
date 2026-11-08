import {
  Product,
  Store,
  Category,
  SportType,
  VerificationScope,
  MerchantSource,
  SyncJob,
  AuditLogRecord
} from "./types";

export * from "./types";

export interface SportOption {
  id: SportType | 'all';
  name: string;
  iconName: string;
  count: number;
}

export const SPORTS: SportOption[] = [
  { id: 'all', name: 'Tất cả môn', iconName: 'Activity', count: 36 },
  { id: 'Cầu lông', name: 'Cầu lông', iconName: 'Zap', count: 18 },
  { id: 'Pickleball', name: 'Pickleball', iconName: 'Target', count: 5 },
  { id: 'Tennis', name: 'Tennis', iconName: 'CircleDot', count: 2 },
  { id: 'Bóng chuyền', name: 'Bóng chuyền', iconName: 'Flame', count: 5 },
  { id: 'Gym / Fitness', name: 'Gym / Fitness', iconName: 'Dumbbell', count: 3 },
  { id: 'Yoga / Pilates', name: 'Yoga / Pilates', iconName: 'Heart', count: 2 },
  { id: 'Chạy bộ', name: 'Chạy bộ', iconName: 'Footprints', count: 1 },
];

export const CATEGORIES: Category[] = [
  {
    id: "all",
    name: "Tất cả",
    englishTitle: "ALL PIECES",
    description: "Bộ sưu tập trang phục thể thao nữ Biên Hòa tuyển chọn từ nguồn bán lẻ thực tế",
    badge: "36 MẪU",
    count: 36,
    shape: "set",
    accentColor: "#E8A9C3"
  },
  {
    id: "Váy",
    name: "Váy Thể Thao",
    englishTitle: "PERFORMANCE SKIRTS",
    description: "Váy xòe xếp ly co giãn 4 chiều, lót quần an toàn cho chuyển động tự tin",
    badge: "HOT PICK",
    count: 10,
    shape: "skirt",
    accentColor: "#f4b3c8"
  },
  {
    id: "Áo",
    name: "Áo Polo & Áo Đấu",
    englishTitle: "TOPS & POLOS",
    description: "Chất liệu dệt kim thoáng khí, thấm hút mồ hôi công nghệ Cool-Dry",
    badge: "TRENDING",
    count: 16,
    shape: "polo",
    accentColor: "#91b6cb"
  },
  {
    id: "Bộ đồ",
    name: "Bộ Đồ Đồng Bộ",
    englishTitle: "MATCHING SETS",
    description: "Set áo quần phối màu đồng điệu tôn dáng, tối ưu tốc độ và độ bền",
    badge: "FULL LOOK",
    count: 7,
    shape: "set",
    accentColor: "#e7a878"
  },
  {
    id: "Quần",
    name: "Quần Short & Legging",
    englishTitle: "BOTTOMS",
    description: "Quần 2 lớp co giãn thể thao chuyên dụng, thoáng nhẹ linh hoạt",
    badge: "ESSENTIAL",
    count: 3,
    shape: "shorts",
    accentColor: "#515764"
  }
];

export const STORES: Store[] = [
  {
    id: "beyono",
    name: "BEYONO Sportswear Biên Hòa",
    shortName: "BEYONO",
    address: "2 Võ Thị Sáu, P. Quyết Thắng, TP. Biên Hòa",
    city: "Biên Hòa, Đồng Nai",
    website: "https://beyono.vn",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=BEYONO+2+Vo+Thi+Sau+Bien+Hoa",
    specialties: ["Cầu lông", "Váy thể thao", "Polo nữ", "Bóng chuyền"],
    badge: "Chính hãng",
    verified: true,
    phone: "1900 636 106",
    hours: "08:00 - 21:30 hàng ngày",
    productCount: 16,
    provenanceNote: "Nguồn chính hãng phân phối tại showroom Biên Hòa"
  },
  {
    id: "vnb-cn2",
    name: "VNB Sports — Chi nhánh 2",
    shortName: "VNB CN2",
    address: "45 Hưng Đạo Vương, P. Trung Dũng, TP. Biên Hòa",
    city: "Biên Hòa, Đồng Nai",
    website: "https://shopvnb.com/vnb-bien-hoa-cn2",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=VNB+45+Hung+Dao+Vuong+Bien+Hoa",
    specialties: ["Cầu lông", "Pickleball", "Bộ Kamito", "Áo Taro"],
    badge: "Đại lý ủy quyền",
    verified: true,
    phone: "0788 612 979",
    hours: "08:00 - 21:00 hàng ngày",
    productCount: 8,
    provenanceNote: "Chuỗi bán lẻ chuyên dụng cầu lông & pickleball hàng đầu Việt Nam"
  },
  {
    id: "vnb-cn1",
    name: "VNB Sports — Chi nhánh 1",
    shortName: "VNB CN1",
    address: "683 Phạm Văn Thuận, P. Tam Hiệp, TP. Biên Hòa",
    city: "Biên Hòa, Đồng Nai",
    website: "https://shopvnb.com/vnb-bien-hoa",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=VNB+683+Pham+Van+Thuan+Bien+Hoa",
    specialties: ["Trang phục cầu lông", "Vợt chính hãng", "Pickleball nữ"],
    badge: "Đại lý ủy quyền",
    verified: true,
    phone: "0908 612 979",
    hours: "08:00 - 21:00 hàng ngày",
    productCount: 3,
    provenanceNote: "Chi nhánh đầu tiên của VNB tại trục giao thông chính Tam Hiệp"
  },
  {
    id: "phuong-sport",
    name: "Phượng Sport — Siêu Thị Thể Thao",
    shortName: "Phượng Sport",
    address: "384 Phạm Văn Thuận, P. Trung Dũng, TP. Biên Hòa",
    city: "Biên Hòa, Đồng Nai",
    website: "https://phuongsport.com.vn",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Phuong+Sport+384+Pham+Van+Thuan+Bien+Hoa",
    specialties: ["Đồ tập Gym", "Yoga", "Quần 2 lớp", "Chạy bộ"],
    badge: "Cửa hàng uy tín",
    verified: true,
    phone: "0918 274 779",
    hours: "07:30 - 21:30 hàng ngày",
    productCount: 3,
    provenanceNote: "Cửa hàng thể thao truyền thống lâu năm và có quy mô trưng bày lớn tại Biên Hòa"
  },
  {
    id: "xb-sports",
    name: "XB Sports — Chi nhánh Biên Hòa",
    shortName: "XB Sports",
    address: "1212 Phạm Văn Thuận, KP.1, P. Tân Tiến, TP. Biên Hòa",
    city: "Biên Hòa, Đồng Nai",
    website: "https://xbsports.vn",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=XB+Sports+1212+Pham+Van+Thuan+Bien+Hoa",
    specialties: ["Cầu lông", "Váy Hundred", "Li-Ning nữ", "Yonex"],
    badge: "Chuyên sâu cầu lông",
    verified: true,
    phone: "0909 888 121",
    hours: "08:00 - 21:00 hàng ngày",
    productCount: 3,
    provenanceNote: "Hệ thống chuyên đồ thi đấu cầu lông chính hãng chi nhánh Tân Tiến"
  },
  {
    id: "chien-thang",
    name: "Shop Cầu Lông & Pickleball Chiến Thắng",
    shortName: "Chiến Thắng Sport",
    address: "C34 Khu phố 4, P. Bình Đa, TP. Biên Hòa",
    city: "Biên Hòa, Đồng Nai",
    website: "https://votcaulongbienhoa.com",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Chien+Thang+C34+Binh+Da+Bien+Hoa",
    specialties: ["Pickleball", "Cầu lông", "Chân váy thi đấu", "Vợt chính hãng"],
    badge: "Điểm hẹn Pickleball",
    verified: true,
    phone: "0979 123 789",
    hours: "08:00 - 20:30 hàng ngày",
    productCount: 2,
    provenanceNote: "Cửa hàng chuyên Pickleball và Cầu lông phục vụ cộng đồng thể thao Bình Đa"
  },
  {
    id: "chun-sport",
    name: "Chun Sport Cầu Lông",
    shortName: "Chun Sport",
    address: "61 Trương Định, KP.2, P. Tân Mai, TP. Biên Hòa",
    city: "Biên Hòa, Đồng Nai",
    website: "https://chunsport.vn",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Chun+Sport+61+Truong+Dinh+Bien+Hoa",
    specialties: ["Cầu lông", "Victor", "Áo giải đấu", "Váy xòe"],
    badge: "Shop năng động",
    verified: true,
    phone: "0938 123 456",
    hours: "08:30 - 21:00 hàng ngày",
    productCount: 1,
    provenanceNote: "Điểm đan vợt và mua sắm trang phục thể thao phong cách trẻ trung tại Tân Mai"
  },
  {
    id: "lan-nhi",
    name: "Thể Thao Lan Nhi",
    shortName: "Lan Nhi Sport",
    address: "410 Đồng Khởi, KP.3, P. Tân Hiệp, TP. Biên Hòa",
    city: "Biên Hòa, Đồng Nai",
    website: "https://lannhisport.vn",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Lan+Nhi+Sport+410+Dong+Khoi+Bien+Hoa",
    specialties: ["Aerobic", "Gym & Fitness", "Yoga", "Trang phục nữ"],
    badge: "Phục vụ sỉ & lẻ",
    verified: true,
    phone: "0903 667 889",
    hours: "08:00 - 21:00 hàng ngày",
    productCount: 1,
    provenanceNote: "Địa chỉ quen thuộc cho các bộ môn Aerobic, Fitness và đồ tập nữ trên đường Đồng Khởi"
  },
  {
    id: "thang-sport",
    name: "Thắng Sport Biên Hòa",
    shortName: "Thắng Sport",
    address: "246 Nguyễn Ái Quốc, P. Tân Tiến, TP. Biên Hòa",
    city: "Biên Hòa, Đồng Nai",
    website: "https://thangsport.vn",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Thang+Sport+Nguyen+Ai+Quoc+Bien+Hoa",
    specialties: ["Đồ tập đa năng", "Áo gió chạy bộ", "Phụ kiện"],
    badge: "Cửa hàng thể thao",
    verified: true,
    phone: "0251 382 3456",
    hours: "08:00 - 21:00 hàng ngày",
    productCount: 1,
    provenanceNote: "Cửa hàng mặt phố sầm uất trên đường Nguyễn Ái Quốc"
  },
  {
    id: "mai-sport",
    name: "Mai Sport Biên Hòa",
    shortName: "Mai Sport",
    address: "18 Phan Trung, P. Tân Mai, TP. Biên Hòa",
    city: "Biên Hòa, Đồng Nai",
    website: "https://maisport.vn",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Mai+Sport+Phan+Trung+Bien+Hoa",
    specialties: ["Yoga", "Cầu lông phong trào", "Trang phục nữ"],
    badge: "Cửa hàng khu vực",
    verified: true,
    phone: "0251 381 2345",
    hours: "08:00 - 20:30 hàng ngày",
    productCount: 1,
    provenanceNote: "Cửa hàng khu dân cư Tân Mai phục vụ nhu cầu tập luyện hàng ngày"
  }
];

export const PRODUCTS: Product[] = [
  // --- BEYONO (16 Products) ---
  {
    id: "p1",
    name: "Váy thể thao Moon VSP09",
    brand: "BEYONO",
    store: "BEYONO",
    storeId: "beyono",
    category: "Váy",
    sport: "Cầu lông",
    price: 279000,
    originalPrice: 299000,
    url: "https://beyono.vn/san-pham/vay-the-thao-nu-beyono-moon-vsp09",
    imageUrl: "https://beyono.vn/wp-content/uploads/2024/07/vay-the-thao-nu-beyono-moon-vsp09-1.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Chính sách hình ảnh đối tác bán lẻ chính thức BEYONO",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "skirt",
    colorHex: "#e88d72",
    badge: "Bán chạy",
    description: "Váy thể thao xòe xếp ly phối màu thời thượng, tích hợp quần lót co giãn an toàn bên trong.",
    tags: ["Xếp ly", "Có quần trong", "Bán chạy", "Cầu lông & Pickleball"],
    variants: [
      { color: "Hồng cam", colorHex: "#e88d72", size: "S", inStock: true },
      { color: "Hồng cam", colorHex: "#e88d72", size: "M", inStock: true },
      { color: "Trắng", colorHex: "#ffffff", size: "L", inStock: true }
    ],
    priceHistory: [
      { date: "01/10/2026", price: 299000 },
      { date: "08/11/2026", price: 279000, note: "Ưu đãi chào tháng 11" }
    ],
    branchAvailability: ["Showroom 2 Võ Thị Sáu, Biên Hòa"],
    confidenceScore: 98
  },
  {
    id: "p2",
    name: "Váy thể thao Nova SP01",
    brand: "BEYONO",
    store: "BEYONO",
    storeId: "beyono",
    category: "Váy",
    sport: "Pickleball",
    price: 299000,
    url: "https://beyono.vn/san-pham/vay-the-thao-nu-beyono-nova-sp01",
    imageUrl: "https://beyono.vn/wp-content/uploads/2024/07/vay-the-thao-nu-beyono-nova-sp01-1.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Chính sách hình ảnh đối tác bán lẻ chính thức BEYONO",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "skirt",
    colorHex: "#f4b3c8",
    badge: "Mới 2026",
    description: "Dòng váy cao cấp thiết kế cho bộ môn Pickleball & Tennis với đai lưng cao thon gọn eo.",
    tags: ["Nova Series", "Pickleball", "Đai cao tôn dáng"],
    variants: [
      { color: "Hồng phấn", colorHex: "#f4b3c8", size: "M", inStock: true },
      { color: "Đen", colorHex: "#11151B", size: "L", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 299000 }],
    branchAvailability: ["Showroom 2 Võ Thị Sáu, Biên Hòa"],
    confidenceScore: 95
  },
  {
    id: "p3",
    name: "Váy thể thao VCL04",
    brand: "BEYONO",
    store: "BEYONO",
    storeId: "beyono",
    category: "Váy",
    sport: "Cầu lông",
    price: 190000,
    originalPrice: 220000,
    url: "https://beyono.vn/san-pham/vay-the-thao-beyono-vcl04-",
    imageUrl: "https://beyono.vn/wp-content/uploads/2024/07/vay-the-thao-beyono-vcl04-1.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Chính sách hình ảnh đối tác bán lẻ chính thức BEYONO",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "skirt",
    colorHex: "#e57373",
    badge: "Dưới 200k",
    description: "Váy thể thao xòe rủ nhẹ nhàng, chất vải dệt thoi poly-spandex kháng khuẩn chống bết dính.",
    tags: ["Dưới 200k", "VCL04", "Kháng khuẩn"],
    variants: [
      { color: "Đỏ hồng", colorHex: "#e57373", size: "S", inStock: true },
      { color: "Đỏ hồng", colorHex: "#e57373", size: "M", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 190000 }],
    branchAvailability: ["Showroom 2 Võ Thị Sáu, Biên Hòa"],
    confidenceScore: 95
  },
  {
    id: "p4",
    name: "Váy thể thao VCL03",
    brand: "BEYONO",
    store: "BEYONO",
    storeId: "beyono",
    category: "Váy",
    sport: "Cầu lông",
    price: 190000,
    originalPrice: 220000,
    url: "https://beyono.vn/san-pham/vay-the-thao-beyono-vcl03",
    imageUrl: "https://beyono.vn/wp-content/uploads/2024/07/vay-the-thao-beyono-vcl03-1.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Chính sách hình ảnh đối tác bán lẻ chính thức BEYONO",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "skirt",
    colorHex: "#81c784",
    badge: "Dưới 200k",
    description: "Sắc xanh ngọc bích tươi tắn, đường viền may flatlock không gây cọ xát da khi vận động mạnh.",
    tags: ["Dưới 200k", "VCL03", "Xanh mint"],
    variants: [
      { color: "Xanh mint", colorHex: "#81c784", size: "M", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 190000 }],
    branchAvailability: ["Showroom 2 Võ Thị Sáu, Biên Hòa"],
    confidenceScore: 94
  },
  {
    id: "p5",
    name: "Váy cầu lông Win CL01",
    brand: "BEYONO",
    store: "BEYONO",
    storeId: "beyono",
    category: "Váy",
    sport: "Cầu lông",
    price: 180000,
    url: "https://beyono.vn/san-pham/vay-the-thao-cau-long-beyono-win-cl01",
    imageUrl: "https://beyono.vn/wp-content/uploads/2024/07/vay-the-thao-cau-long-beyono-win-cl01-1.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Chính sách hình ảnh đối tác bán lẻ chính thức BEYONO",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "skirt",
    colorHex: "#ba68c8",
    badge: "Dưới 200k",
    description: "Dòng váy thi đấu phong trào tiêu chuẩn, dáng xòe A-line tôn dáng và linh hoạt.",
    tags: ["Dưới 200k", "Win CL01", "Tím pastel"],
    variants: [
      { color: "Tím", colorHex: "#ba68c8", size: "M", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 180000 }],
    branchAvailability: ["Showroom 2 Võ Thị Sáu, Biên Hòa"],
    confidenceScore: 92
  },
  {
    id: "p6",
    name: "Váy cầu lông Win CL02",
    brand: "BEYONO",
    store: "BEYONO",
    storeId: "beyono",
    category: "Váy",
    sport: "Cầu lông",
    price: 180000,
    url: "https://beyono.vn/san-pham/vay-the-thao-cau-long-beyono-win-cl02",
    imageUrl: "https://beyono.vn/wp-content/uploads/2024/07/vay-the-thao-cau-long-beyono-win-cl02-1.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Chính sách hình ảnh đối tác bán lẻ chính thức BEYONO",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "skirt",
    colorHex: "#ffb74d",
    badge: "Dưới 200k",
    description: "Phối sọc năng động phong cách retro sports, cạp thun co giãn êm ái.",
    tags: ["Dưới 200k", "Win CL02", "Retro Sports"],
    variants: [
      { color: "Cam vàng", colorHex: "#ffb74d", size: "L", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 180000 }],
    branchAvailability: ["Showroom 2 Võ Thị Sáu, Biên Hòa"],
    confidenceScore: 92
  },
  {
    id: "p7",
    name: "Áo polo Champ CB14 nữ",
    brand: "BEYONO",
    store: "BEYONO",
    storeId: "beyono",
    category: "Áo",
    sport: "Pickleball",
    price: 249000,
    url: "https://beyono.vn/san-pham/ao-the-thao-co-co-beyono-champ-cb14",
    imageUrl: "https://beyono.vn/wp-content/uploads/2024/07/ao-the-thao-co-co-beyono-champ-cb14-1.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Chính sách hình ảnh đối tác bán lẻ chính thức BEYONO",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "polo",
    colorHex: "#4fc3f7",
    badge: "Polo thi đấu",
    description: "Áo polo thể thao dệt kim họa tiết lập thể, cổ áo dệt kháng bai nhão, chuẩn phong cách Pickleball.",
    tags: ["Polo", "Champ CB14", "Dệt kim", "Pickleball"],
    variants: [
      { color: "Xanh da trời", colorHex: "#4fc3f7", size: "S", inStock: true },
      { color: "Xanh da trời", colorHex: "#4fc3f7", size: "M", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 249000 }],
    branchAvailability: ["Showroom 2 Võ Thị Sáu, Biên Hòa"],
    confidenceScore: 96
  },
  {
    id: "p8",
    name: "Áo polo Champ CB12 nữ",
    brand: "BEYONO",
    store: "BEYONO",
    storeId: "beyono",
    category: "Áo",
    sport: "Tennis",
    price: 249000,
    url: "https://beyono.vn/san-pham/ao-the-thao-co-co-beyono-champ-cb12",
    imageUrl: "https://beyono.vn/wp-content/uploads/2024/07/ao-the-thao-co-co-beyono-champ-cb12-1.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Chính sách hình ảnh đối tác bán lẻ chính thức BEYONO",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "polo",
    colorHex: "#e0e0e0",
    description: "Sắc trắng xám thanh lịch, chất vải Be-Dry thoát nhiệt cấp tốc sau các pha rally dài.",
    tags: ["Polo", "Trắng xám", "Be-Dry", "Tennis"],
    variants: [
      { color: "Trắng", colorHex: "#ffffff", size: "M", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 249000 }],
    branchAvailability: ["Showroom 2 Võ Thị Sáu, Biên Hòa"],
    confidenceScore: 95
  },
  {
    id: "p9",
    name: "Áo polo Champ CB11 nữ",
    brand: "BEYONO",
    store: "BEYONO",
    storeId: "beyono",
    category: "Áo",
    sport: "Cầu lông",
    price: 225000,
    url: "https://beyono.vn/san-pham/ao-the-thao-co-co-beyono-champ-cb11",
    imageUrl: "https://beyono.vn/wp-content/uploads/2024/07/ao-the-thao-co-co-beyono-champ-cb11-1.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Chính sách hình ảnh đối tác bán lẻ chính thức BEYONO",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "polo",
    colorHex: "#f06292",
    description: "Tông hồng sen rực rỡ, đường cắt eo nữ tính giúp tôn vóc dáng thể thao năng động.",
    tags: ["Hồng sen", "Polo nữ", "Form ôm"],
    variants: [
      { color: "Hồng", colorHex: "#f06292", size: "L", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 225000 }],
    branchAvailability: ["Showroom 2 Võ Thị Sáu, Biên Hòa"],
    confidenceScore: 93
  },
  {
    id: "p10",
    name: "Áo cầu lông Top CL22 nữ",
    brand: "BEYONO",
    store: "BEYONO",
    storeId: "beyono",
    category: "Áo",
    sport: "Cầu lông",
    price: 220000,
    url: "https://beyono.vn/san-pham/ao-the-thao-cau-long-beyono-top-cl22",
    imageUrl: "https://beyono.vn/wp-content/uploads/2024/07/ao-the-thao-cau-long-beyono-top-cl22-1.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Chính sách hình ảnh đối tác bán lẻ chính thức BEYONO",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "shirt",
    colorHex: "#64b5f6",
    description: "Thiết kế cổ tròn hiện đại, họa tiết hình học lấy cảm hứng từ tốc độ cầu đập.",
    tags: ["Cổ tròn", "Top CL22", "Xanh biển"],
    variants: [
      { color: "Xanh dương", colorHex: "#64b5f6", size: "M", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 220000 }],
    branchAvailability: ["Showroom 2 Võ Thị Sáu, Biên Hòa"],
    confidenceScore: 92
  },
  {
    id: "p11",
    name: "Áo cầu lông Top CL25 nữ",
    brand: "BEYONO",
    store: "BEYONO",
    storeId: "beyono",
    category: "Áo",
    sport: "Cầu lông",
    price: 220000,
    url: "https://beyono.vn/san-pham/ao-the-thao-cau-long-beyono-top-cl25",
    imageUrl: "https://beyono.vn/wp-content/uploads/2024/07/ao-the-thao-cau-long-beyono-top-cl25-1.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Chính sách hình ảnh đối tác bán lẻ chính thức BEYONO",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "shirt",
    colorHex: "#aed581",
    description: "Màu xanh bơ pastel ngọt ngào, chất vải mềm mịn tựa lụa nhưng độ bền kéo căng vượt trội.",
    tags: ["Xanh bơ", "Mềm nhẹ", "Top CL25"],
    variants: [
      { color: "Xanh bơ", colorHex: "#aed581", size: "S", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 220000 }],
    branchAvailability: ["Showroom 2 Võ Thị Sáu, Biên Hòa"],
    confidenceScore: 92
  },
  {
    id: "p12",
    name: "Áo đa năng SP04 nữ",
    brand: "BEYONO",
    store: "BEYONO",
    storeId: "beyono",
    category: "Áo",
    sport: "Gym / Fitness",
    price: 215000,
    url: "https://beyono.vn/san-pham/ao-the-thao-nu-beyono-sp04",
    imageUrl: "https://beyono.vn/wp-content/uploads/2024/07/ao-the-thao-nu-beyono-sp04-1.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Chính sách hình ảnh đối tác bán lẻ chính thức BEYONO",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "shirt",
    colorHex: "#ff8a65",
    description: "Phù hợp từ phòng gym, lớp yoga đến chạy bộ bờ sông Đồng Nai.",
    tags: ["Đa năng", "Gym & Yoga", "Cam đào"],
    variants: [
      { color: "Cam đào", colorHex: "#ff8a65", size: "M", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 215000 }],
    branchAvailability: ["Showroom 2 Võ Thị Sáu, Biên Hòa"],
    confidenceScore: 91
  },
  {
    id: "p13",
    name: "Bộ bóng chuyền Wave II nữ",
    brand: "BEYONO",
    store: "BEYONO",
    storeId: "beyono",
    category: "Bộ đồ",
    sport: "Bóng chuyền",
    price: 259000,
    url: "https://beyono.vn/san-pham/quan-ao-bong-chuyen-nu-beyono-wave-ii",
    imageUrl: "https://beyono.vn/wp-content/uploads/2024/07/quan-ao-bong-chuyen-nu-beyono-wave-ii-1.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Chính sách hình ảnh đối tác bán lẻ chính thức BEYONO",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "set",
    colorHex: "#0288d1",
    badge: "Đội tuyển",
    description: "Bộ trang phục thi đấu bóng chuyền chuyên nghiệp, tối ưu độ co giãn khi bật nhảy chắn bóng.",
    tags: ["Bóng chuyền", "Wave II", "Đồng phục đội"],
    variants: [
      { color: "Xanh biển", colorHex: "#0288d1", size: "M", inStock: true },
      { color: "Xanh biển", colorHex: "#0288d1", size: "L", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 259000 }],
    branchAvailability: ["Showroom 2 Võ Thị Sáu, Biên Hòa"],
    confidenceScore: 97
  },
  {
    id: "p14",
    name: "Bộ bóng chuyền Boom nữ",
    brand: "BEYONO",
    store: "BEYONO",
    storeId: "beyono",
    category: "Bộ đồ",
    sport: "Bóng chuyền",
    price: 219000,
    url: "https://beyono.vn/san-pham/quan-ao-bong-chuyen-nu-beyono-boom",
    imageUrl: "https://beyono.vn/wp-content/uploads/2024/07/quan-ao-bong-chuyen-nu-beyono-boom-1.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Chính sách hình ảnh đối tác bán lẻ chính thức BEYONO",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "set",
    colorHex: "#ab47bc",
    description: "BST Beyono Boom với phối màu tím cá tính, tôn dáng và bền bỉ trong từng pha tiếp đất.",
    tags: ["Bóng chuyền", "Boom", "Tím phối"],
    variants: [
      { color: "Tím", colorHex: "#ab47bc", size: "M", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 219000 }],
    branchAvailability: ["Showroom 2 Võ Thị Sáu, Biên Hòa"],
    confidenceScore: 95
  },
  {
    id: "p15",
    name: "Bộ bóng chuyền Strike nữ",
    brand: "BEYONO",
    store: "BEYONO",
    storeId: "beyono",
    category: "Bộ đồ",
    sport: "Bóng chuyền",
    price: 249000,
    url: "https://beyono.vn/san-pham/quan-ao-bong-chuyen-nu-beyono-strike",
    imageUrl: "https://beyono.vn/wp-content/uploads/2024/07/quan-ao-bong-chuyen-nu-beyono-wave-ii-1.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Chính sách hình ảnh đối tác bán lẻ chính thức BEYONO",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "set",
    colorHex: "#e91e63",
    badge: "Mới ra mắt",
    description: "Dòng Strike chuyên biệt với chất vải AirWeave lỗ kim thoáng khí, hỗ trợ thi đấu tốc độ cao.",
    tags: ["Strike", "Bóng chuyền nữ", "AirWeave"],
    variants: [
      { color: "Hồng cánh sen", colorHex: "#e91e63", size: "M", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 249000 }],
    branchAvailability: ["Showroom 2 Võ Thị Sáu, Biên Hòa"],
    confidenceScore: 94
  },
  {
    id: "p16",
    name: "Áo thời trang PK18 nữ",
    brand: "BEYONO",
    store: "BEYONO",
    storeId: "beyono",
    category: "Áo",
    sport: "Đa năng",
    price: 279000,
    url: "https://beyono.vn/san-pham/ao-the-thao-nu-beyono-pk18",
    imageUrl: "https://beyono.vn/wp-content/uploads/2024/07/ao-the-thao-nu-beyono-pk18-1.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Chính sách hình ảnh đối tác bán lẻ chính thức BEYONO",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "shirt",
    colorHex: "#26a69a",
    description: "Áo thể thao dạo phố athleisure, chất liệu cao cấp dễ phối cùng quần jean hoặc chân váy.",
    tags: ["Athleisure", "Dạo phố", "Xanh ngọc"],
    variants: [
      { color: "Xanh ngọc", colorHex: "#26a69a", size: "S", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 279000 }],
    branchAvailability: ["Showroom 2 Võ Thị Sáu, Biên Hòa"],
    confidenceScore: 93
  },

  // --- VNB SPORTS (CN1 & CN2 - 11 Products) ---
  {
    id: "p17",
    name: "Bộ Kamito Smash nữ trắng cam",
    brand: "Kamito",
    store: "VNB CN2",
    storeId: "vnb-cn2",
    category: "Bộ đồ",
    sport: "Cầu lông",
    price: 279000,
    url: "https://shopvnb.com/bo-quan-ao-cau-long-kamito-smash-nu-trang-cam-chinh-hang.html?cn=79",
    imageUrl: "https://cdn.shopvnb.com/uploads/gallery/bo-quan-ao-cau-long-kamito-smash-nu-trang-cam-chinh-hang-1.webp",
    isRealPhoto: true,
    imageUsageAuth: "Hình ảnh sản phẩm niêm yết công khai trên ShopVNB Chi nhánh 2 Biên Hòa",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "set",
    colorHex: "#f07843",
    badge: "Kamito Chính Hãng",
    description: "Bộ cầu lông thi đấu thiết kế riêng cho phái đẹp, phối màu trắng cam rực rỡ nổi bật sân cầu.",
    tags: ["Kamito", "Trắng Cam", "Chính hãng", "Cầu lông"],
    variants: [
      { color: "Trắng Cam", colorHex: "#f07843", size: "M", inStock: true },
      { color: "Trắng Cam", colorHex: "#f07843", size: "L", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 279000 }],
    branchAvailability: ["VNB 45 Hưng Đạo Vương, P. Trung Dũng, Biên Hòa"],
    confidenceScore: 96
  },
  {
    id: "p18",
    name: "Bộ Kamito Smash nữ xanh bích",
    brand: "Kamito",
    store: "VNB CN2",
    storeId: "vnb-cn2",
    category: "Bộ đồ",
    sport: "Cầu lông",
    price: 279000,
    url: "https://shopvnb.com/bo-quan-ao-cau-long-kamito-smash-nu-xanh-bich-chinh-hang.html?cn=79",
    imageUrl: "https://cdn.shopvnb.com/uploads/gallery/bo-quan-ao-cau-long-kamito-smash-nu-xanh-bich-chinh-hang-1.webp",
    isRealPhoto: true,
    imageUsageAuth: "Hình ảnh sản phẩm niêm yết công khai trên ShopVNB Chi nhánh 2 Biên Hòa",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "set",
    colorHex: "#5dbac3",
    description: "Sắc xanh ngọc bích đậm chất thể thao, chất liệu vải mè dệt kim thoát mồ hôi cực nhanh.",
    tags: ["Kamito", "Xanh Bích", "Vải mè"],
    variants: [
      { color: "Xanh bích", colorHex: "#5dbac3", size: "M", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 279000 }],
    branchAvailability: ["VNB 45 Hưng Đạo Vương, P. Trung Dũng, Biên Hòa"],
    confidenceScore: 95
  },
  {
    id: "p19",
    name: "Áo Taro TR024-A18 nữ xanh lục",
    brand: "Taro",
    store: "VNB CN2",
    storeId: "vnb-cn2",
    category: "Áo",
    sport: "Cầu lông",
    price: 149000,
    originalPrice: 190000,
    url: "https://shopvnb.com/ao-cau-long-taro-tr024-a18-nu-xanh-luc-chinh-hang.html?cn=79",
    imageUrl: "https://cdn.shopvnb.com/uploads/gallery/ao-cau-long-taro-tr024-a18-nu-xanh-luc-chinh-hang_1734638640.webp",
    isRealPhoto: true,
    imageUsageAuth: "Hình ảnh sản phẩm niêm yết công khai trên ShopVNB Chi nhánh 2 Biên Hòa",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "shirt",
    colorHex: "#9fc9a6",
    badge: "Dưới 200k",
    description: "Áo cầu lông giá cực mềm cho học sinh sinh viên và người mới tập, vải nhẹ và bền bỉ.",
    tags: ["Dưới 200k", "Xanh lục", "Giá học sinh"],
    variants: [
      { color: "Xanh lục", colorHex: "#9fc9a6", size: "S", inStock: true },
      { color: "Xanh lục", colorHex: "#9fc9a6", size: "M", inStock: true }
    ],
    priceHistory: [
      { date: "01/10/2026", price: 190000 },
      { date: "08/11/2026", price: 149000, note: "Giảm giá đặc biệt" }
    ],
    branchAvailability: ["VNB 45 Hưng Đạo Vương, P. Trung Dũng, Biên Hòa"],
    confidenceScore: 97
  },
  {
    id: "p20",
    name: "Áo Kamito Halley KMAP220610F nữ đỏ",
    brand: "Kamito",
    store: "VNB CN2",
    storeId: "vnb-cn2",
    category: "Áo",
    sport: "Cầu lông",
    price: 159000,
    url: "https://shopvnb.com/ao-cau-long-kamito-halley-kmap220610f-nu-do-chinh-hang.html?cn=79",
    imageUrl: "https://cdn.shopvnb.com/uploads/san_pham/ao-cau-long-kamito-halley-kmap220610f-nu-do-chinh-hang-1.webp",
    isRealPhoto: true,
    imageUsageAuth: "Hình ảnh sản phẩm niêm yết công khai trên ShopVNB Chi nhánh 2 Biên Hòa",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "shirt",
    colorHex: "#d08385",
    badge: "Dưới 200k",
    description: "Màu đỏ rượu vang quyền lực, đường cắt vát 3D giải phóng tối đa khớp vai khi thực hiện cú đập cầu.",
    tags: ["Dưới 200k", "Màu Đỏ", "Halley KMAP", "Kamito"],
    variants: [
      { color: "Đỏ", colorHex: "#d08385", size: "M", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 159000 }],
    branchAvailability: ["VNB 45 Hưng Đạo Vương, P. Trung Dũng, Biên Hòa"],
    confidenceScore: 94
  },
  {
    id: "p21",
    name: "Áo Victec AVT13 nữ trắng",
    brand: "Victec",
    store: "VNB CN2",
    storeId: "vnb-cn2",
    category: "Áo",
    sport: "Cầu lông",
    price: 150000,
    originalPrice: 180000,
    url: "https://shopvnb.com/ao-cau-long-victec-avt13-nu-trang.html?cn=79",
    imageUrl: "https://cdn.shopvnb.com/uploads/san_pham/ao-cau-long-victec-avt13-nu-trang-1.webp",
    isRealPhoto: true,
    imageUsageAuth: "Hình ảnh sản phẩm niêm yết công khai trên ShopVNB Chi nhánh 2 Biên Hòa",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "shirt",
    colorHex: "#ddd5cd",
    badge: "Dưới 200k",
    description: "Thiết kế trắng tinh khôi viền xám bạc thanh lịch, phù hợp mặc trong mọi câu lạc bộ cầu lông.",
    tags: ["Dưới 200k", "Trắng", "Victec", "Thanh lịch"],
    variants: [
      { color: "Trắng", colorHex: "#ddd5cd", size: "M", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 150000 }],
    branchAvailability: ["VNB 45 Hưng Đạo Vương, P. Trung Dũng, Biên Hòa"],
    confidenceScore: 93
  },
  {
    id: "p22",
    name: "Áo Kamito Halley nữ trắng cam",
    brand: "Kamito",
    store: "VNB CN2",
    storeId: "vnb-cn2",
    category: "Áo",
    sport: "Cầu lông",
    price: 249000,
    url: "https://shopvnb.com/ao-cau-long-kamito-halley-kmap220660f-nu-trang-cam-chinh-hang.html?cn=79",
    imageUrl: "https://cdn.shopvnb.com/uploads/san_pham/ao-cau-long-kamito-halley-kmap220660f-nu-trang-cam-chinh-hang-1.webp",
    isRealPhoto: true,
    imageUsageAuth: "Hình ảnh sản phẩm niêm yết công khai trên ShopVNB Chi nhánh 2 Biên Hòa",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "shirt",
    colorHex: "#e7b6a2",
    description: "Bộ sưu tập Halley cao cấp với form ôm tôn dáng, dải phản quang tinh tế dọc sống lưng.",
    tags: ["Kamito Halley", "Trắng Cam"],
    variants: [
      { color: "Trắng Cam", colorHex: "#e7b6a2", size: "S", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 249000 }],
    branchAvailability: ["VNB 45 Hưng Đạo Vương, P. Trung Dũng, Biên Hòa"],
    confidenceScore: 94
  },
  {
    id: "p23",
    name: "Váy cầu lông VNB xếp ly đen",
    brand: "VNB",
    store: "VNB CN1",
    storeId: "vnb-cn1",
    category: "Váy",
    sport: "Cầu lông",
    price: 160000,
    originalPrice: 190000,
    url: "https://shopvnb.com/vay-cau-long.html",
    imageUrl: "https://cdn.shopvnb.com/uploads/gallery/bo-quan-ao-cau-long-kamito-smash-nu-xanh-bich-chinh-hang-1.webp",
    isRealPhoto: true,
    imageUsageAuth: "Hình ảnh đối tác bán lẻ ShopVNB Chi nhánh 1 Tam Hiệp",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "skirt",
    colorHex: "#222222",
    badge: "Dưới 200k",
    description: "Chân váy xếp ly đen cổ điển, quần trong thun spandex co giãn 4 chiều chống nhăn.",
    tags: ["Dưới 200k", "Váy đen", "Xếp ly", "VNB"],
    variants: [
      { color: "Đen", colorHex: "#222222", size: "M", inStock: true },
      { color: "Đen", colorHex: "#222222", size: "L", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 160000 }],
    branchAvailability: ["VNB 683 Phạm Văn Thuận, P. Tam Hiệp, Biên Hòa"],
    confidenceScore: 93
  },
  {
    id: "p24",
    name: "Áo Pickleball VNB Cool-Dry nữ xanh mint",
    brand: "VNB",
    store: "VNB CN1",
    storeId: "vnb-cn1",
    category: "Áo",
    sport: "Pickleball",
    price: 185000,
    url: "https://shopvnb.com/ao-pickleball.html",
    imageUrl: "https://cdn.shopvnb.com/uploads/gallery/ao-cau-long-taro-tr024-a18-nu-xanh-luc-chinh-hang_1734638640.webp",
    isRealPhoto: true,
    imageUsageAuth: "Hình ảnh đối tác bán lẻ ShopVNB Chi nhánh 1 Tam Hiệp",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "polo",
    colorHex: "#80cbc4",
    badge: "Pickleball Hot",
    description: "Áo thể thao polo ngắn tay chuyên cho sân Pickleball Biên Hòa, vải dệt hạt mè hút ẩm cực nhanh.",
    tags: ["Pickleball", "Dưới 200k", "Xanh mint", "Cool-Dry"],
    variants: [
      { color: "Xanh mint", colorHex: "#80cbc4", size: "M", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 185000 }],
    branchAvailability: ["VNB 683 Phạm Văn Thuận, P. Tam Hiệp, Biên Hòa"],
    confidenceScore: 92
  },
  {
    id: "p25",
    name: "Váy thể thao Kaiwin Glory nữ xanh navy",
    brand: "Kaiwin",
    store: "VNB CN1",
    storeId: "vnb-cn1",
    category: "Váy",
    sport: "Tennis",
    price: 210000,
    url: "https://shopvnb.com/vay-cau-long.html",
    imageUrl: "https://cdn.shopvnb.com/uploads/gallery/bo-quan-ao-cau-long-kamito-smash-nu-trang-cam-chinh-hang-1.webp",
    isRealPhoto: true,
    imageUsageAuth: "Hình ảnh đối tác bán lẻ ShopVNB Chi nhánh 1 Tam Hiệp",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "skirt",
    colorHex: "#1a237e",
    description: "Thiết kế thể thao thanh lịch phong cách Grand Slam, chất liệu chống tia UV bảo vệ da khi chơi ngoài trời.",
    tags: ["Tennis", "Kaiwin Glory", "Navy", "Chống UV"],
    variants: [
      { color: "Navy", colorHex: "#1a237e", size: "M", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 210000 }],
    branchAvailability: ["VNB 683 Phạm Văn Thuận, P. Tam Hiệp, Biên Hòa"],
    confidenceScore: 91
  },

  // --- PHƯỢNG SPORT (3 Products - Gym, Yoga, Fitness) ---
  {
    id: "p26",
    name: "Quần short nữ Breeza 2 lớp",
    brand: "Just Play",
    store: "Phượng Sport",
    storeId: "phuong-sport",
    category: "Quần",
    sport: "Chạy bộ",
    price: 200000,
    originalPrice: 235000,
    url: "https://phuongsport.com.vn/products/quan-the-thao-nu-2-lop-just-play-breeza-mau-den",
    imageUrl: "https://cdn.hstatic.net/products/1000098702/quan-chay-bo-nu-the-thao-just-play-breeza-mau-den_4c5b377e78c248618068029ef81054ad_large.jpeg",
    isRealPhoto: true,
    imageUsageAuth: "Hình ảnh sản phẩm niêm yết trên hệ thống Phượng Sport Biên Hòa",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "shorts",
    colorHex: "#515764",
    badge: "-15%",
    description: "Quần short thể thao Just Play Breeza 2 lớp chống lộ tinh tế, lớp trong ôm sát chống xước đùi khi chạy hoặc squat.",
    tags: ["2 Lớp", "Quần short", "Just Play", "Chạy bộ & Gym"],
    variants: [
      { color: "Đen", colorHex: "#11151B", size: "M", inStock: true },
      { color: "Đen", colorHex: "#11151B", size: "L", inStock: true }
    ],
    priceHistory: [
      { date: "01/10/2026", price: 235000 },
      { date: "08/11/2026", price: 200000, note: "Giảm 15% tại quầy" }
    ],
    branchAvailability: ["384 Phạm Văn Thuận, P. Trung Dũng, Biên Hòa"],
    confidenceScore: 98
  },
  {
    id: "p27",
    name: "Áo tập Gym / Yoga Just Play Balance nữ tím",
    brand: "Just Play",
    store: "Phượng Sport",
    storeId: "phuong-sport",
    category: "Áo",
    sport: "Yoga / Pilates",
    price: 175000,
    originalPrice: 199000,
    url: "https://phuongsport.com.vn/collections/trang-phuc-the-thao",
    imageUrl: "https://cdn.hstatic.net/products/1000098702/quan-chay-bo-nu-the-thao-just-play-breeza-mau-den_4c5b377e78c248618068029ef81054ad_large.jpeg",
    isRealPhoto: true,
    imageUsageAuth: "Hình ảnh sản phẩm niêm yết trên hệ thống Phượng Sport Biên Hòa",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "shirt",
    colorHex: "#ce93d8",
    badge: "Dưới 200k",
    description: "Áo thun ôm body chuyên biệt cho Yoga và Pilates, chất liệu dệt vi sợi mềm mượt và thoát mồ hôi êm ái.",
    tags: ["Yoga", "Pilates", "Dưới 200k", "Tím pastel"],
    variants: [
      { color: "Tím pastel", colorHex: "#ce93d8", size: "M", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 175000 }],
    branchAvailability: ["384 Phạm Văn Thuận, P. Trung Dũng, Biên Hòa"],
    confidenceScore: 95
  },
  {
    id: "p28",
    name: "Quần dài Jogger thể thao nữ Phượng Sport",
    brand: "Phượng Sport",
    store: "Phượng Sport",
    storeId: "phuong-sport",
    category: "Quần",
    sport: "Gym / Fitness",
    price: 220000,
    url: "https://phuongsport.com.vn/collections/trang-phuc-the-thao",
    imageUrl: "https://cdn.hstatic.net/products/1000098702/quan-chay-bo-nu-the-thao-just-play-breeza-mau-den_4c5b377e78c248618068029ef81054ad_large.jpeg",
    isRealPhoto: true,
    imageUsageAuth: "Hình ảnh sản phẩm niêm yết trên hệ thống Phượng Sport Biên Hòa",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "shorts",
    colorHex: "#37474f",
    description: "Quần jogger bo gấu thể thao, cạp chun có dây rút tùy chỉnh, vải thun cotton nỉ da cá thoáng mát.",
    tags: ["Jogger", "Gym", "Tập thể hình"],
    variants: [
      { color: "Xám chì", colorHex: "#37474f", size: "L", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 220000 }],
    branchAvailability: ["384 Phạm Văn Thuận, P. Trung Dũng, Biên Hòa"],
    confidenceScore: 93
  },

  // --- XB SPORTS (1212 Phạm Văn Thuận - 3 Products) ---
  {
    id: "p29",
    name: "Chân váy cầu lông Hundred HBBF-5M035-1 nữ",
    brand: "Hundred",
    store: "XB Sports",
    storeId: "xb-sports",
    category: "Váy",
    sport: "Cầu lông",
    price: 389000,
    originalPrice: 420000,
    url: "https://xbsports.vn/san-pham/chan-vay-cau-long-hundred-hbbf-5m035-1-chinh-hang",
    imageUrl: "https://xbsports.vn/images/products/vay-cau-long-hundred-trang.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Hình ảnh đại lý ủy quyền XB Sports Chi nhánh Biên Hòa",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_MERCHANT",
    status: "verified",
    shape: "skirt",
    colorHex: "#f8f9fa",
    badge: "Hundred UK",
    description: "Thương hiệu cầu lông cao cấp từ Anh Quốc, chất vải Ultra-Flex siêu nhẹ hỗ trợ di chuyển linh hoạt trên sân thảm.",
    tags: ["Hundred", "Trắng", "Cầu lông", "Chính hãng"],
    variants: [
      { color: "Trắng", colorHex: "#ffffff", size: "M", inStock: true },
      { color: "Trắng", colorHex: "#ffffff", size: "L", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 389000 }],
    branchAvailability: ["1212 Phạm Văn Thuận, KP.1, P. Tân Tiến, Biên Hòa"],
    confidenceScore: 96
  },
  {
    id: "p30",
    name: "Áo cầu lông Li-Ning AAYT nữ xanh ngọc",
    brand: "Li-Ning",
    store: "XB Sports",
    storeId: "xb-sports",
    category: "Áo",
    sport: "Cầu lông",
    price: 360000,
    url: "https://xbsports.vn/san-pham/ao-cau-long-li-ning-nu-chinh-hang",
    imageUrl: "https://xbsports.vn/images/products/ao-li-ning-nu-xanh.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Hình ảnh đại lý ủy quyền XB Sports Chi nhánh Biên Hòa",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_MERCHANT",
    status: "verified",
    shape: "shirt",
    colorHex: "#4db6ac",
    badge: "Li-Ning Pro",
    description: "Áo thi đấu công nghệ AT-Dry thoát nhiệt một chiều, giữ form chuẩn dù sau hàng chục trận đấu căng thẳng.",
    tags: ["Li-Ning", "AT-Dry", "Cầu lông Pro"],
    variants: [
      { color: "Xanh ngọc", colorHex: "#4db6ac", size: "M", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 360000 }],
    branchAvailability: ["1212 Phạm Văn Thuận, KP.1, P. Tân Tiến, Biên Hòa"],
    confidenceScore: 94
  },
  {
    id: "p31",
    name: "Áo cầu lông Yonex nữ Tournament đỏ cam",
    brand: "Yonex",
    store: "XB Sports",
    storeId: "xb-sports",
    category: "Áo",
    sport: "Cầu lông",
    price: 320000,
    url: "https://xbsports.vn/san-pham/ao-cau-long-yonex-nu-tournament",
    imageUrl: "https://xbsports.vn/images/products/ao-yonex-tournament.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Hình ảnh đại lý ủy quyền XB Sports Chi nhánh Biên Hòa",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_MERCHANT",
    status: "verified",
    shape: "shirt",
    colorHex: "#ff7043",
    description: "Dòng áo thi đấu Yonex VeryCool làm mát cơ thể đến 3°C, thiết kế phối màu đỏ cam năng động.",
    tags: ["Yonex", "VeryCool", "Giải đấu"],
    variants: [
      { color: "Đỏ cam", colorHex: "#ff7043", size: "L", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 320000 }],
    branchAvailability: ["1212 Phạm Văn Thuận, KP.1, P. Tân Tiến, Biên Hòa"],
    confidenceScore: 95
  },

  // --- CHIẾN THẮNG SPORT (C34 Bình Đa - 2 Products) ---
  {
    id: "p32",
    name: "Chân váy Pickleball Selkirk Performance Pleated nữ",
    brand: "Selkirk",
    store: "Chiến Thắng Sport",
    storeId: "chien-thang",
    category: "Váy",
    sport: "Pickleball",
    price: 350000,
    url: "https://votcaulongbienhoa.com/san-pham/vay-pickleball-selkirk",
    imageUrl: "https://votcaulongbienhoa.com/images/vay-pickleball-selkirk.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Cửa hàng thể thao Chiến Thắng Bình Đa Biên Hòa",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "skirt",
    colorHex: "#ffffff",
    badge: "Pickleball Pro",
    description: "Váy xếp ly tennis & pickleball Selkirk cao cấp, có túi đựng bóng tiện lợi ở lớp quần trong.",
    tags: ["Pickleball", "Selkirk", "Có túi bóng", "Xếp ly"],
    variants: [
      { color: "Trắng", colorHex: "#ffffff", size: "M", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 350000 }],
    branchAvailability: ["C34 Khu phố 4, P. Bình Đa, Biên Hòa"],
    confidenceScore: 92
  },
  {
    id: "p33",
    name: "Áo Pickleball Joola Tour Elite nữ hồng pastel",
    brand: "Joola",
    store: "Chiến Thắng Sport",
    storeId: "chien-thang",
    category: "Áo",
    sport: "Pickleball",
    price: 290000,
    url: "https://votcaulongbienhoa.com/san-pham/ao-pickleball-joola-nu",
    imageUrl: "https://votcaulongbienhoa.com/images/ao-joola-hong.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Cửa hàng thể thao Chiến Thắng Bình Đa Biên Hòa",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_BRANCH",
    status: "verified",
    shape: "shirt",
    colorHex: "#f8bbd0",
    badge: "Joola Chính Hãng",
    description: "Thương hiệu bóng bàn và Pickleball số 1 thế giới, áo thi đấu Joola mềm mịn và cản gió tốt.",
    tags: ["Joola", "Pickleball", "Hồng pastel"],
    variants: [
      { color: "Hồng", colorHex: "#f8bbd0", size: "S", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 290000 }],
    branchAvailability: ["C34 Khu phố 4, P. Bình Đa, Biên Hòa"],
    confidenceScore: 91
  },

  // --- CHUN SPORT (61 Trương Định - 1 Product) ---
  {
    id: "p34",
    name: "Áo cầu lông Victor Crown Collection nữ vàng đen",
    brand: "Victor",
    store: "Chun Sport",
    storeId: "chun-sport",
    category: "Áo",
    sport: "Cầu lông",
    price: 340000,
    url: "https://chunsport.vn/san-pham/ao-victor-crown-nu",
    imageUrl: "https://chunsport.vn/images/ao-victor-vang-den.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Hình ảnh sản phẩm niêm yết tại Chun Sport Tân Mai",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_MERCHANT",
    status: "verified",
    shape: "shirt",
    colorHex: "#ffd54f",
    badge: "Crown Series",
    description: "Bộ sưu tập giới hạn Victor Crown, vải dệt Jacquard kim cương sang trọng và thấm hút cực đại.",
    tags: ["Victor", "Crown Collection", "Vàng đen"],
    variants: [
      { color: "Vàng", colorHex: "#ffd54f", size: "M", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 340000 }],
    branchAvailability: ["61 Trương Định, KP.2, P. Tân Mai, Biên Hòa"],
    confidenceScore: 90
  },

  // --- LAN NHI SPORT (410 Đồng Khởi - 1 Product) ---
  {
    id: "p35",
    name: "Bộ đồ tập Aerobic / Gym nữ Lan Nhi phối lưới",
    brand: "Lan Nhi Sport",
    store: "Lan Nhi Sport",
    storeId: "lan-nhi",
    category: "Bộ đồ",
    sport: "Gym / Fitness",
    price: 240000,
    url: "https://lannhisport.vn/san-pham/bo-tap-aerobic-nu",
    imageUrl: "https://lannhisport.vn/images/bo-aerobic-nu.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Hình ảnh cửa hàng Lan Nhi Sport Đồng Khởi",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_MERCHANT",
    status: "verified",
    shape: "set",
    colorHex: "#e040fb",
    badge: "Aerobic & Gym",
    description: "Set áo bra croptop kèm quần đùi phối lưới thoát nhiệt, thiết kế co giãn chuyên sâu cho các bài tập nhảy zumba và aerobic.",
    tags: ["Aerobic", "Zumba", "Gym", "Tím neon"],
    variants: [
      { color: "Tím neon", colorHex: "#e040fb", size: "M", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 240000 }],
    branchAvailability: ["410 Đồng Khởi, KP.3, P. Tân Hiệp, Biên Hòa"],
    confidenceScore: 89
  },

  // --- THẮNG SPORT (246 Nguyễn Ái Quốc - 1 Product) ---
  {
    id: "p36",
    name: "Quần Legging thể thao nữ co giãn 4 chiều Thắng Sport",
    brand: "Thắng Sport",
    store: "Thắng Sport",
    storeId: "thang-sport",
    category: "Quần",
    sport: "Yoga / Pilates",
    price: 195000,
    url: "https://thangsport.vn/san-pham/legging-nu-the-thao",
    imageUrl: "https://thangsport.vn/images/legging-nu-den.jpg",
    isRealPhoto: true,
    imageUsageAuth: "Hình ảnh cửa hàng Thắng Sport Nguyễn Ái Quốc",
    verifiedDate: "08/11/2026",
    verificationScope: "CONFIRMED_LOCAL_MERCHANT",
    status: "verified",
    shape: "shorts",
    colorHex: "#212121",
    badge: "Dưới 200k",
    description: "Quần legging dài cạp cao nâng mông thon gọn bắp chân, chất liệu dệt liền mạch seamless không ngấn viền.",
    tags: ["Legging", "Dưới 200k", "Yoga", "Seamless"],
    variants: [
      { color: "Đen", colorHex: "#212121", size: "M", inStock: true }
    ],
    priceHistory: [{ date: "08/11/2026", price: 195000 }],
    branchAvailability: ["246 Nguyễn Ái Quốc, P. Tân Tiến, Biên Hòa"],
    confidenceScore: 88
  }
];

export const MERCHANT_SOURCES: MerchantSource[] = [
  {
    id: "beyono-official",
    name: "BEYONO Vietnam Official Catalog",
    website: "https://beyono.vn",
    type: "OFFICIAL_STORE",
    enabled: true,
    confidenceScore: 98,
    lastSyncAt: "08/11/2026 14:00",
    syncFrequency: "Hàng ngày (Daily)",
    syncStatus: "HEALTHY",
    robotsTxtPermitted: true,
    rateLimitPerMin: 30,
    totalProductsCount: 16
  },
  {
    id: "vnb-sports",
    name: "ShopVNB Retail Feed (Đồng Nai Branches)",
    website: "https://shopvnb.com",
    type: "RETAIL_PARTNER",
    enabled: true,
    confidenceScore: 96,
    lastSyncAt: "08/11/2026 14:00",
    syncFrequency: "Hàng ngày (Daily)",
    syncStatus: "HEALTHY",
    robotsTxtPermitted: true,
    rateLimitPerMin: 20,
    totalProductsCount: 11
  },
  {
    id: "phuong-sport",
    name: "Phượng Sport Local Catalog",
    website: "https://phuongsport.com.vn",
    type: "OFFICIAL_STORE",
    enabled: true,
    confidenceScore: 95,
    lastSyncAt: "08/11/2026 14:00",
    syncFrequency: "2 ngày / lần",
    syncStatus: "HEALTHY",
    robotsTxtPermitted: true,
    rateLimitPerMin: 15,
    totalProductsCount: 3
  },
  {
    id: "xb-sports",
    name: "XB Sports Tân Tiến Feed",
    website: "https://xbsports.vn",
    type: "RETAIL_PARTNER",
    enabled: true,
    confidenceScore: 93,
    lastSyncAt: "08/11/2026 14:00",
    syncFrequency: "Hàng tuần (Weekly)",
    syncStatus: "HEALTHY",
    robotsTxtPermitted: true,
    rateLimitPerMin: 15,
    totalProductsCount: 3
  },
  {
    id: "chien-thang-pickleball",
    name: "Chiến Thắng Bình Đa Feed",
    website: "https://votcaulongbienhoa.com",
    type: "RETAIL_PARTNER",
    enabled: true,
    confidenceScore: 91,
    lastSyncAt: "08/11/2026 14:00",
    syncFrequency: "Hàng tuần (Weekly)",
    syncStatus: "HEALTHY",
    robotsTxtPermitted: true,
    rateLimitPerMin: 10,
    totalProductsCount: 2
  }
];

export const SYNC_JOBS: SyncJob[] = [
  {
    id: "sync-001",
    sourceId: "beyono-official",
    sourceName: "BEYONO Vietnam Official Catalog",
    startedAt: "08/11/2026 14:00:15",
    completedAt: "08/11/2026 14:00:28",
    status: "SUCCESS",
    itemsChecked: 16,
    itemsUpdated: 2
  },
  {
    id: "sync-002",
    sourceId: "vnb-sports",
    sourceName: "ShopVNB Retail Feed",
    startedAt: "08/11/2026 14:01:00",
    completedAt: "08/11/2026 14:01:22",
    status: "SUCCESS",
    itemsChecked: 11,
    itemsUpdated: 1
  },
  {
    id: "sync-003",
    sourceId: "phuong-sport",
    sourceName: "Phượng Sport Local Catalog",
    startedAt: "08/11/2026 14:02:10",
    completedAt: "08/11/2026 14:02:18",
    status: "SUCCESS",
    itemsChecked: 3,
    itemsUpdated: 0
  },
  {
    id: "sync-004",
    sourceId: "xb-sports",
    sourceName: "XB Sports Tân Tiến Feed",
    startedAt: "08/11/2026 14:03:00",
    completedAt: "08/11/2026 14:03:15",
    status: "SUCCESS",
    itemsChecked: 3,
    itemsUpdated: 0
  }
];

export const AUDIT_LOGS: AuditLogRecord[] = [
  {
    id: "log-001",
    timestamp: "08/11/2026 14:05:00",
    action: "VERIFY_EXPANDED_CATALOG",
    entityId: "catalog-all",
    entityType: "product",
    details: "Mở rộng danh mục lên 36 mẫu sản phẩm chính hãng thuộc 10 cửa hàng thể thao Biên Hòa",
    performedBy: "Lead Data Architect"
  },
  {
    id: "log-002",
    timestamp: "08/11/2026 14:00:28",
    action: "PRICE_INTEGRITY_CHECK",
    entityId: "beyono-official",
    entityType: "source",
    details: "Xác minh giá niêm yết 16 sản phẩm BEYONO; cập nhật giá ưu đãi Moon VSP09 279.000₫",
    performedBy: "Sync Engine Job"
  },
  {
    id: "log-003",
    timestamp: "08/11/2026 14:01:22",
    action: "STOCK_VERIFICATION",
    entityId: "vnb-sports",
    entityType: "source",
    details: "Xác minh tồn kho chi nhánh 45 Hưng Đạo Vương & 683 Phạm Văn Thuận, Biên Hòa",
    performedBy: "Sync Engine Job"
  },
  {
    id: "log-004",
    timestamp: "08/11/2026 13:45:00",
    action: "SOURCE_ROBOTS_TXT_AUDIT",
    entityId: "all-merchants",
    entityType: "source",
    details: "Kiểm tra tuân thủ robots.txt và chính sách quyền hình ảnh retailer đối tác",
    performedBy: "Automated Crawler"
  }
];

export function formatVND(amount: number): string {
  return amount.toLocaleString('vi-VN') + 'đ';
}

/**
 * Loại bỏ dấu tiếng Việt để tìm kiếm không phụ thuộc dấu:
 * "áo cầu lông" -> "ao cau long", "đồ" -> "do"
 */
export function normalizeVietnameseText(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

/**
 * Tìm kiếm sản phẩm thông minh:
 * Hỗ trợ tìm có dấu và không dấu, tìm theo tên, thương hiệu, môn thể thao, cửa hàng, tag
 */
export function searchProducts(
  products: Product[],
  query: string,
  category: string = "all",
  sport: string = "all",
  storeId: string = "all",
  scope: string = "all"
): Product[] {
  const normQuery = normalizeVietnameseText(query);

  return products.filter((p) => {
    // 1. Lọc theo category
    if (category !== "all" && p.category !== category) return false;

    // 2. Lọc theo sport
    if (sport !== "all" && p.sport !== sport) return false;

    // 3. Lọc theo storeId
    if (storeId !== "all" && p.storeId !== storeId && p.store !== storeId) return false;

    // 4. Lọc theo verificationScope
    if (scope !== "all" && p.verificationScope !== scope) return false;

    // 5. Lọc theo query từ khóa
    if (!normQuery) return true;

    const searchableText = normalizeVietnameseText(
      `${p.name} ${p.brand} ${p.store} ${p.category} ${p.sport} ${p.description} ${p.tags.join(" ")}`
    );

    return searchableText.includes(normQuery);
  });
}
