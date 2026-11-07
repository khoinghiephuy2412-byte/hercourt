export interface Product {
  id: string;
  name: string;
  store: string;
  storeId: string;
  category: 'Váy' | 'Áo' | 'Bộ đồ' | 'Quần';
  sport: 'Cầu lông' | 'Bóng chuyền' | 'Tennis/Pickleball' | 'Tập luyện' | 'Đa năng';
  price: number;
  originalPrice?: number;
  url: string;
  shape: 'skirt' | 'polo' | 'shirt' | 'set' | 'shorts';
  colorHex: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  description: string;
  tags: string[];
}

export interface Store {
  id: string;
  name: string;
  shortName: string;
  address: string;
  city: string;
  website: string;
  mapsUrl: string;
  specialties: string[];
  badge: string;
  verified: boolean;
  phone?: string;
  hours: string;
  productCount: number;
}

export interface Category {
  id: string;
  name: string;
  englishTitle: string;
  description: string;
  badge: string;
  count: number;
  shape: 'skirt' | 'polo' | 'shirt' | 'set' | 'shorts';
  accentColor: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "all",
    name: "Tất cả",
    englishTitle: "ALL PIECES",
    description: "Bộ sưu tập trang phục thể thao nữ Biên Hòa tuyển chọn",
    badge: "22 MẪU",
    count: 22,
    shape: "set",
    accentColor: "#E8A9C3"
  },
  {
    id: "Váy",
    name: "Váy Thể Thao",
    englishTitle: "PERFORMANCE SKIRTS",
    description: "Váy xòe xếp ly co giãn 4 chiều, lót quần an toàn cho chuyển động tự tin",
    badge: "HOT PICK",
    count: 6,
    shape: "skirt",
    accentColor: "#f4b3c8"
  },
  {
    id: "Áo",
    name: "Áo Polo & Áo Đấu",
    englishTitle: "TOPS & POLOS",
    description: "Chất liệu dệt kim thoáng khí, thấm hút mồ hôi công nghệ Cool-Dry",
    badge: "TRENDING",
    count: 11,
    shape: "polo",
    accentColor: "#91b6cb"
  },
  {
    id: "Bộ đồ",
    name: "Bộ Đồ Đồng Bộ",
    englishTitle: "MATCHING SETS",
    description: "Set áo quần phối màu đồng điệu tôn dáng, tối ưu tốc độ và độ bền",
    badge: "FULL LOOK",
    count: 4,
    shape: "set",
    accentColor: "#e7a878"
  },
  {
    id: "Quần",
    name: "Quần Short & Legging",
    englishTitle: "BOTTOMS",
    description: "Quần 2 lớp co giãn thể thao chuyên dụng, thoáng nhẹ linh hoạt",
    badge: "ESSENTIAL",
    count: 1,
    shape: "shorts",
    accentColor: "#515764"
  }
];

export const STORES: Store[] = [
  {
    id: "beyono",
    name: "BEYONO Sportswear",
    shortName: "BEYONO",
    address: "2 Võ Thị Sáu, P. Quyết Thắng, Biên Hòa",
    city: "Biên Hòa, Đồng Nai",
    website: "https://beyono.vn",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=BEYONO+2+Vo+Thi+Sau+Bien+Hoa",
    specialties: ["Cầu lông", "Váy thể thao", "Polo nữ", "Bóng chuyền"],
    badge: "Chính hãng",
    verified: true,
    phone: "1900 636 106",
    hours: "08:00 - 21:30 hàng ngày",
    productCount: 15
  },
  {
    id: "vnb-cn2",
    name: "VNB Sports — Chi nhánh 2",
    shortName: "VNB CN2",
    address: "45 Hưng Đạo Vương, P. Trung Dũng, Biên Hòa",
    city: "Biên Hòa, Đồng Nai",
    website: "https://shopvnb.com/vnb-bien-hoa-cn2",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=VNB+45+Hung+Dao+Vuong+Bien+Hoa",
    specialties: ["Cầu lông", "Bộ Kamito", "Áo thi đấu Victor/Yonex"],
    badge: "Đại lý ủy quyền",
    verified: true,
    phone: "0788 612 979",
    hours: "08:00 - 21:00 hàng ngày",
    productCount: 6
  },
  {
    id: "vnb-cn1",
    name: "VNB Sports — Chi nhánh 1",
    shortName: "VNB CN1",
    address: "683 Phạm Văn Thuận, P. Tam Hiệp, Biên Hòa",
    city: "Biên Hòa, Đồng Nai",
    website: "https://shopvnb.com/vnb-bien-hoa",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=VNB+683+Pham+Van+Thuan+Bien+Hoa",
    specialties: ["Trang phục cầu lông", "Vợt chính hãng", "Giày thể thao"],
    badge: "Đại lý ủy quyền",
    verified: true,
    phone: "0908 612 979",
    hours: "08:00 - 21:00 hàng ngày",
    productCount: 0
  },
  {
    id: "phuong-sport",
    name: "Phượng Sport",
    shortName: "Phượng Sport",
    address: "384 Phạm Văn Thuận, P. Trung Dũng, Biên Hòa",
    city: "Biên Hòa, Đồng Nai",
    website: "https://phuongsport.com.vn/collections/trang-phuc-the-thao",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Phuong+Sport+384+Pham+Van+Thuan+Bien+Hoa",
    specialties: ["Đồ thể thao đa năng", "Quần 2 lớp", "Phụ kiện tập luyện"],
    badge: "Cửa hàng uy tín",
    verified: true,
    phone: "0918 333 444",
    hours: "08:30 - 21:00 hàng ngày",
    productCount: 1
  },
  {
    id: "gia-thien-sport",
    name: "Gia Thiện Sport",
    shortName: "Gia Thiện Sport",
    address: "504 Nguyễn Ái Quốc, P. Hố Nai, Biên Hòa",
    city: "Biên Hòa, Đồng Nai",
    website: "https://www.facebook.com/giathiensports",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gia+Thien+Sport+504+Nguyen+Ai+Quoc+Bien+Hoa",
    specialties: ["Gym", "Yoga", "Aerobic", "Quần áo tập nữ"],
    badge: "Facebook Store",
    verified: false,
    hours: "08:00 - 20:30",
    productCount: 0
  },
  {
    id: "bao-ngoc-sport",
    name: "Bảo Ngọc Sport",
    shortName: "Bảo Ngọc Sport",
    address: "Biên Hòa — vui lòng gọi xác nhận trước khi đến",
    city: "Biên Hòa, Đồng Nai",
    website: "https://www.google.com/search?q=Bao+Ngoc+Sport+Bien+Hoa",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bao+Ngoc+Sport+Bien+Hoa",
    specialties: ["Đồ tập nữ", "Đồ bơi", "Đồ gym phong cách trẻ"],
    badge: "Cần xác minh",
    verified: false,
    hours: "09:00 - 20:00",
    productCount: 0
  },
  {
    id: "hanh-sport",
    name: "Hạnh Sport",
    shortName: "Hạnh Sport",
    address: "Biên Hòa — xem ghim bản đồ chính xác",
    city: "Biên Hòa, Đồng Nai",
    website: "https://www.google.com/search?q=Hanh+Sport+Bien+Hoa",
    mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJr1ptXgDfdDERZjYubdvjfjs",
    specialties: ["Gym", "Yoga", "Trang phục thể hình"],
    badge: "Cần xác minh",
    verified: false,
    hours: "08:30 - 20:30",
    productCount: 0
  },
  {
    id: "maxxsport",
    name: "MaxxSport Biên Hòa",
    shortName: "MaxxSport",
    address: "1347 Phạm Văn Thuận, P. Thống Nhất, Biên Hòa",
    city: "Biên Hòa, Đồng Nai",
    website: "https://www.google.com/maps/search/?api=1&query=MaxxSport+Bien+Hoa",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=MaxxSport+1347+Pham+Van+Thuan+Bien+Hoa",
    specialties: ["Đồ thể thao đa thương hiệu", "Li-Ning", "361°", "Asics"],
    badge: "Trung tâm lớn",
    verified: true,
    hours: "09:00 - 22:00 hàng ngày",
    productCount: 0
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Váy thể thao Noon VSP09",
    store: "BEYONO",
    storeId: "beyono",
    category: "Váy",
    sport: "Cầu lông",
    price: 299000,
    originalPrice: 350000,
    url: "https://www.beyono.vn/san-pham/vay-the-thao-nu-beyono-noon-vsp09",
    shape: "skirt",
    colorHex: "#f4b3c8",
    badge: "Mẫu mới",
    rating: 4.9,
    reviewsCount: 38,
    description: "Váy thể thao xếp ly công nghệ thoáng nhiệt, form dáng chữ A thanh thoát tôn dáng khi di chuyển trên sân cầu.",
    tags: ["Mẫu mới", "Xếp ly", "Hồng phấn", "Cầu lông"]
  },
  {
    id: "p2",
    name: "Váy thể thao Nova SP01",
    store: "BEYONO",
    storeId: "beyono",
    category: "Váy",
    sport: "Cầu lông",
    price: 299000,
    url: "https://beyono.vn/danh-muc/vay-the-thao",
    shape: "skirt",
    colorHex: "#bacbc2",
    rating: 4.8,
    reviewsCount: 24,
    description: "Chất vải poly-spandex cao cấp tông xanh ngọc sage tinh tế, kèm quần lót thể thao chống cọ xát.",
    tags: ["Thoáng mát", "Sage Green", "Cao cấp"]
  },
  {
    id: "p3",
    name: "Váy thể thao VCL04",
    store: "BEYONO",
    storeId: "beyono",
    category: "Váy",
    sport: "Cầu lông",
    price: 190000,
    originalPrice: 240000,
    url: "https://beyono.vn/san-pham/vay-the-thao-beyono-vcl04-",
    shape: "skirt",
    colorHex: "#1d2831",
    badge: "Giá tốt",
    rating: 4.7,
    reviewsCount: 52,
    description: "Gam màu đen than midnight thanh lịch, cạp cao ôm bụng nhẹ nhàng và thoải mái tối đa.",
    tags: ["Giá tốt", "Tone Đen", "Bán chạy"]
  },
  {
    id: "p4",
    name: "Váy thể thao VCL03",
    store: "BEYONO",
    storeId: "beyono",
    category: "Váy",
    sport: "Cầu lông",
    price: 190000,
    url: "https://beyono.vn/danh-muc/vay-the-thao",
    shape: "skirt",
    colorHex: "#e0c9c0",
    rating: 4.6,
    reviewsCount: 19,
    description: "Tone be nude ấm áp dễ phối đồ tập, vải mềm mượt thấm hút tức thì.",
    tags: ["Tone Be", "Giá mềm"]
  },
  {
    id: "p5",
    name: "Váy cầu lông Win CL01",
    store: "BEYONO",
    storeId: "beyono",
    category: "Váy",
    sport: "Cầu lông",
    price: 180000,
    originalPrice: 220000,
    url: "https://beyono.vn/danh-muc/vay-the-thao",
    shape: "skirt",
    colorHex: "#e2c0d6",
    rating: 4.7,
    reviewsCount: 31,
    description: "Thiết kế năng động dành cho các trận đấu cường độ cao, viền màu tím lavender nữ tính.",
    tags: ["Lavender", "Thi đấu"]
  },
  {
    id: "p6",
    name: "Váy cầu lông Win CL02",
    store: "BEYONO",
    storeId: "beyono",
    category: "Váy",
    sport: "Cầu lông",
    price: 180000,
    url: "https://beyono.vn/danh-muc/vay-the-thao",
    shape: "skirt",
    colorHex: "#a6b3c7",
    rating: 4.5,
    reviewsCount: 16,
    description: "Tone xanh khói pastel hiện đại, đường cắt may tỉ mỉ ôm vừa vặn vòng hông.",
    tags: ["Xanh khói", "Váy ngắn"]
  },
  {
    id: "p7",
    name: "Áo polo Champ CB14 nữ",
    store: "BEYONO",
    storeId: "beyono",
    category: "Áo",
    sport: "Cầu lông",
    price: 249000,
    originalPrice: 289000,
    url: "https://www.beyono.vn/san-pham/ao-polo-the-thao-nu-beyono-champ-cb14",
    shape: "polo",
    colorHex: "#b6d2c4",
    badge: "Mẫu mới",
    rating: 4.9,
    reviewsCount: 44,
    description: "Cổ polo thanh lịch kết hợp cúc ngọc trai tinh tế, vải dệt lỗ kim siêu nhẹ cho cảm giác mát lạnh.",
    tags: ["Mẫu mới", "Polo sang trọng", "Mint"]
  },
  {
    id: "p8",
    name: "Áo polo Champ CB12 nữ",
    store: "BEYONO",
    storeId: "beyono",
    category: "Áo",
    sport: "Cầu lông",
    price: 249000,
    url: "https://beyono.vn/danh-muc/thoi-trang-the-thao",
    shape: "polo",
    colorHex: "#f1aebf",
    rating: 4.8,
    reviewsCount: 29,
    description: "Sắc hồng san hô ngọt ngào, đường may vát vai tạo hiệu ứng vai thon gọn và chuyển động tay nhẹ nhàng.",
    tags: ["Hồng san hô", "Polo nữ"]
  },
  {
    id: "p9",
    name: "Áo polo Champ CB11 nữ",
    store: "BEYONO",
    storeId: "beyono",
    category: "Áo",
    sport: "Cầu lông",
    price: 225000,
    url: "https://beyono.vn/danh-muc/thoi-trang-the-thao",
    shape: "polo",
    colorHex: "#9da6d5",
    rating: 4.7,
    reviewsCount: 22,
    description: "Sắc xanh periwinkle thanh nhã, phù hợp cả khi thi đấu lẫn mặc cafe dạo phố sau giờ tập.",
    tags: ["Periwinkle", "Thanh lịch"]
  },
  {
    id: "p10",
    name: "Áo cầu lông Top CL22 nữ",
    store: "BEYONO",
    storeId: "beyono",
    category: "Áo",
    sport: "Cầu lông",
    price: 220000,
    url: "https://www.beyono.vn/san-pham/ao-the-thao-cau-long-nu-beyono-top-cl22",
    shape: "shirt",
    colorHex: "#deafcf",
    badge: "Pastel",
    rating: 4.8,
    reviewsCount: 35,
    description: "Form áo thể thao cổ tròn cách điệu nhẹ, họa tiết chuyển màu pastel tạo điểm nhấn trên sân.",
    tags: ["Pastel", "Cổ tròn", "Áo đấu"]
  },
  {
    id: "p11",
    name: "Áo cầu lông Top CL25 nữ",
    store: "BEYONO",
    storeId: "beyono",
    category: "Áo",
    sport: "Cầu lông",
    price: 220000,
    url: "https://www.beyono.vn/san-pham/ao-the-thao-cau-long-nu-beyono-top-cl25",
    shape: "shirt",
    colorHex: "#91b6cb",
    rating: 4.6,
    reviewsCount: 18,
    description: "Màu xanh da trời mát mắt, công nghệ thoát ẩm đa chiều giữ cơ thể luôn khô ráo.",
    tags: ["Xanh dương", "Thoát ẩm"]
  },
  {
    id: "p12",
    name: "Áo đa năng SP04 nữ",
    store: "BEYONO",
    storeId: "beyono",
    category: "Áo",
    sport: "Đa năng",
    price: 215000,
    url: "https://beyono.vn/danh-muc/thoi-trang-the-thao",
    shape: "shirt",
    colorHex: "#d7c1a2",
    rating: 4.7,
    reviewsCount: 27,
    description: "Áo thun thể thao phom rộng vừa phải, phối màu camel sang trọng thích hợp tập gym, chạy bộ, yoga.",
    tags: ["Đa năng", "Tone Camel"]
  },
  {
    id: "p13",
    name: "Bộ bóng chuyền Wave II nữ",
    store: "BEYONO",
    storeId: "beyono",
    category: "Bộ đồ",
    sport: "Bóng chuyền",
    price: 259000,
    originalPrice: 310000,
    url: "https://beyono.vn/shop?page=1",
    shape: "set",
    colorHex: "#bdcadc",
    rating: 4.8,
    reviewsCount: 30,
    description: "Set áo quần bóng chuyền chuyên nghiệp, độ co giãn vượt bậc cho các pha bật nhảy và cứu bóng.",
    tags: ["Bóng chuyền", "Đồng bộ", "Co giãn"]
  },
  {
    id: "p14",
    name: "Bộ bóng chuyền Boom nữ",
    store: "BEYONO",
    storeId: "beyono",
    category: "Bộ đồ",
    sport: "Bóng chuyền",
    price: 219000,
    url: "https://beyono.vn/shop?page=1",
    shape: "set",
    colorHex: "#c49a9c",
    rating: 4.6,
    reviewsCount: 20,
    description: "Họa tiết năng động bùng nổ năng lượng, màu hồng đất trầm ấm sang trọng.",
    tags: ["Bóng chuyền", "Hồng đất"]
  },
  {
    id: "p15",
    name: "Áo thời trang PK18 nữ",
    store: "BEYONO",
    storeId: "beyono",
    category: "Áo",
    sport: "Tennis/Pickleball",
    price: 279000,
    url: "https://beyono.vn/shop?page=1",
    shape: "polo",
    colorHex: "#d7b9d5",
    rating: 4.9,
    reviewsCount: 41,
    description: "Áo polo thời trang thể thao cao cấp cho các tay vợt pickleball & tennis hiện đại.",
    tags: ["Pickleball", "Polo tím", "Cao cấp"]
  },
  {
    id: "p16",
    name: "Bộ Kamito Smash nữ trắng cam",
    store: "VNB CN2",
    storeId: "vnb-cn2",
    category: "Bộ đồ",
    sport: "Cầu lông",
    price: 279000,
    originalPrice: 320000,
    url: "https://shopvnb.com/bo-quan-ao-cau-long-kamito-smash-nu-trang-cam-chinh-hang.html?cn=79",
    shape: "set",
    colorHex: "#e7a878",
    badge: "Có tại CN2",
    rating: 4.9,
    reviewsCount: 57,
    description: "Bộ quần áo cầu lông Kamito chính hãng thiết kế riêng cho phái đẹp, phối màu trắng cam rực rỡ nổi bật sân cầu.",
    tags: ["Kamito", "Trắng Cam", "Chính hãng"]
  },
  {
    id: "p17",
    name: "Bộ Kamito Smash nữ xanh bích",
    store: "VNB CN2",
    storeId: "vnb-cn2",
    category: "Bộ đồ",
    sport: "Cầu lông",
    price: 279000,
    url: "https://shopvnb.com/vnb-bien-hoa-cn2/bo-quan-ao-cau-long.html",
    shape: "set",
    colorHex: "#5dbac3",
    rating: 4.8,
    reviewsCount: 33,
    description: "Sắc xanh ngọc bích đậm chất thể thao, chất liệu vải mè dệt kim thoát mồ hôi cực nhanh.",
    tags: ["Kamito", "Xanh Bích", "Vải mè"]
  },
  {
    id: "p18",
    name: "Áo Taro TR024-A18 nữ xanh lục",
    store: "VNB CN2",
    storeId: "vnb-cn2",
    category: "Áo",
    sport: "Cầu lông",
    price: 149000,
    originalPrice: 190000,
    url: "https://shopvnb.com/vnb-bien-hoa-cn2/ao-cau-long.html?page=8",
    shape: "shirt",
    colorHex: "#9fc9a6",
    badge: "Dưới 200k",
    rating: 4.6,
    reviewsCount: 48,
    description: "Áo cầu lông giá cực mềm cho học sinh sinh viên và người mới tập, vải nhẹ và bền bỉ.",
    tags: ["Dưới 200k", "Xanh lục", "Giá học sinh"]
  },
  {
    id: "p19",
    name: "Áo Kamito Flash Light V2 nữ đỏ",
    store: "VNB CN2",
    storeId: "vnb-cn2",
    category: "Áo",
    sport: "Cầu lông",
    price: 159000,
    url: "https://shopvnb.com/vnb-bien-hoa-cn2/ao-cau-long.html?page=8",
    shape: "shirt",
    colorHex: "#d08385",
    rating: 4.7,
    reviewsCount: 39,
    description: "Màu đỏ rượu vang quyền lực, đường cắt vát 3D giải phóng tối đa khớp vai khi thực hiện cú đập cầu.",
    tags: ["Màu Đỏ", "Flash Light", "Kamito"]
  },
  {
    id: "p20",
    name: "Áo Victec AVT13 nữ trắng",
    store: "VNB CN2",
    storeId: "vnb-cn2",
    category: "Áo",
    sport: "Cầu lông",
    price: 150000,
    url: "https://shopvnb.com/vnb-bien-hoa-cn2/ao-cau-long.html?page=8",
    shape: "shirt",
    colorHex: "#ddd5cd",
    rating: 4.5,
    reviewsCount: 15,
    description: "Thiết kế trắng tinh khôi viền xám bạc thanh lịch, phù hợp mặc trong mọi câu lạc bộ cầu lông.",
    tags: ["Trắng", "Victec", "Thanh lịch"]
  },
  {
    id: "p21",
    name: "Áo Kamito Halley nữ trắng cam",
    store: "VNB CN2",
    storeId: "vnb-cn2",
    category: "Áo",
    sport: "Cầu lông",
    price: 249000,
    url: "https://shopvnb.com/vnb-bien-hoa-cn2/ao-cau-long.html?page=8",
    shape: "shirt",
    colorHex: "#e7b6a2",
    rating: 4.8,
    reviewsCount: 26,
    description: "Bộ sưu tập Halley cao cấp với form ôm tôn dáng, dải phản quang tinh tế dọc sống lưng.",
    tags: ["Kamito Halley", "Trắng Cam"]
  },
  {
    id: "p22",
    name: "Quần short nữ Breeza 2 lớp",
    store: "Phượng Sport",
    storeId: "phuong-sport",
    category: "Quần",
    sport: "Tập luyện",
    price: 200000,
    originalPrice: 235000,
    url: "https://phuongsport.com.vn/products/quan-the-thao-nu-2-lop-just-play-breeza-mau-den",
    shape: "shorts",
    colorHex: "#515764",
    badge: "-15%",
    rating: 4.9,
    reviewsCount: 63,
    description: "Quần short thể thao Just Play Breeza 2 lớp chống lộ tinh tế, lớp trong ôm sát chống xước đùi khi chạy hoặc squat.",
    tags: ["2 Lớp", "Quần short", "Just Play", "-15%"]
  }
];

export function formatVND(amount: number): string {
  return amount.toLocaleString('vi-VN') + 'đ';
}
