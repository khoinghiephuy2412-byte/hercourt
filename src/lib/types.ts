export type VerificationScope =
  | 'CONFIRMED_LOCAL_BRANCH'   // A: Sản phẩm có sẵn tại chi nhánh Biên Hòa
  | 'CONFIRMED_LOCAL_MERCHANT' // B: Cửa hàng Biên Hòa, tồn kho theo xác nhận tại quầy
  | 'ONLINE_SHIPPABLE';        // C: Đặt hàng giao về Biên Hòa (không có cửa hàng mặt phố)

export type ProductStatus =
  | 'verified'     // Đã kiểm chứng giá & ảnh
  | 'stale'        // Cần làm mới (quá hạn đồng bộ)
  | 'unavailable'  // Tạm hết hàng
  | 'needs_review';// Cần kiểm duyệt thủ công

export type ImageStatus =
  | 'verified'      // Ảnh thật từ nhà phân phối / cửa hàng đã tải thành công
  | 'missing'       // Chưa có ảnh thật từ cửa hàng
  | 'requires_auth' // Chờ cấp phép bản quyền từ thương hiệu / cửa hàng
  | 'restricted';   // Giới hạn bản quyền / hotlink CDN

export type SportType =
  | 'Cầu lông'
  | 'Pickleball'
  | 'Tennis'
  | 'Bóng chuyền'
  | 'Gym / Fitness'
  | 'Yoga / Pilates'
  | 'Chạy bộ'
  | 'Đa năng';

export type CategoryType =
  | 'Váy'
  | 'Áo'
  | 'Bộ đồ'
  | 'Quần'
  | 'Áo khoác'
  | 'Phụ kiện';

export interface ProductVariant {
  color: string;
  colorHex?: string;
  size: string;
  sku?: string;
  inStock?: boolean;
}

export interface PriceHistoryRecord {
  price: number;
  date: string;
  note?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  store: string;
  storeId: string;
  category: CategoryType;
  sport: SportType;
  price: number;
  originalPrice?: number;
  url: string;
  imageUrl?: string;
  isRealPhoto: boolean;
  imageStatus?: ImageStatus;
  imageUsageAuth?: string;
  verifiedDate: string;
  verificationScope: VerificationScope;
  status: ProductStatus;
  shape: 'skirt' | 'polo' | 'shirt' | 'set' | 'shorts';
  colorHex: string;
  badge?: string;
  rating?: number;
  reviewsCount?: number;
  description: string;
  tags: string[];
  variants?: ProductVariant[];
  priceHistory?: PriceHistoryRecord[];
  branchAvailability?: string[];
  lastCheckedTimestamp?: string;
  confidenceScore?: number; // 0 - 100

  // Enhanced audit & structured schema fields (Priority 4)
  productId?: string;
  retailerId?: string;
  productName?: string;
  sku?: string;
  gender?: 'Nữ' | 'Unisex';
  variantDesc?: string;
  currentPrice?: number;
  priceType?: 'sale' | 'regular' | 'member';
  currency?: 'VND';
  productUrl?: string;
  canonicalUrl?: string;
  imageUsagePermission?: string;
  sourceUrl?: string;
  lastVerifiedAt?: string;
  localAvailabilityScope?: VerificationScope;
  syncStatus?: ProductStatus;
  verificationNotes?: string;
}

export interface StoreBranch {
  id: string;
  storeId: string;
  name: string;
  address: string;
  ward: string;
  city: string;
  phone: string;
  hours: string;
  mapsUrl: string;
  hasPhysicalStorefront: boolean;
  isConfirmedLocal: boolean;
}

export interface Store {
  id: string;
  name: string;
  shortName: string;
  address: string;
  ward?: string;
  city: string;
  website: string;
  mapsUrl: string;
  specialties: string[];
  badge: string;
  verified: boolean;
  phone?: string;
  hours: string;
  productCount: number;
  branches?: StoreBranch[];
  provenanceNote?: string;
  accentColor?: string;
  tagline?: string;
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

export interface SyncJob {
  id: string;
  sourceId: string;
  sourceName: string;
  startedAt: string;
  completedAt?: string;
  status: 'SUCCESS' | 'FAILED' | 'RUNNING';
  itemsChecked: number;
  itemsUpdated: number;
  error?: string;
}

export interface AuditLogRecord {
  id: string;
  timestamp: string;
  action: string;
  entityId: string;
  entityType: 'product' | 'store' | 'sync' | 'source';
  details: string;
  performedBy: string;
}

export interface MerchantSource {
  id: string;
  name: string;
  website: string;
  type: 'OFFICIAL_STORE' | 'RETAIL_PARTNER' | 'CATALOG_FEED';
  enabled: boolean;
  confidenceScore: number;
  lastSyncAt: string;
  syncFrequency: string;
  syncStatus: 'HEALTHY' | 'STALE' | 'ERROR';
  robotsTxtPermitted: boolean;
  rateLimitPerMin: number;
  totalProductsCount: number;
}
