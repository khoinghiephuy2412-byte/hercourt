/**
 * HERCOURT — Garment Review & Identity Storage
 * Stores the audit records, original specifications, and approval status
 * for all women's badminton apparel in Biên Hòa.
 */

import auditData from "./garmentReferenceAudit.json";

export interface GarmentReferenceAuditItem {
  id: string;
  retailer: string;
  productUrl: string;
  sku: string;
  colorVariant: string;
  originalGarmentPhoto: string | null;
  aiModelPhoto?: string;
  collarType: string;
  sleeveDesign: string;
  colorPlacement: string;
  logosTrademarks: string;
  graphicPatterns: string;
  fabricTexture: string;
  hemConstruction: string;
  case: string;
  status: "APPROVED_ORIGINAL_PRIMARY" | "APPROVED_DUAL_VIEW" | "REJECTED_UNTIL_ORIGINAL_AVAILABLE";
}

export const GARMENT_AUDIT_CATALOG: GarmentReferenceAuditItem[] = auditData as GarmentReferenceAuditItem[];

export function getGarmentAuditRecord(productId: string): GarmentReferenceAuditItem | undefined {
  return GARMENT_AUDIT_CATALOG.find((item) => item.id === productId);
}

export function isAiModelApproved(productId: string): boolean {
  const record = getGarmentAuditRecord(productId);
  if (!record) return false;
  return record.status === "APPROVED_DUAL_VIEW";
}
