/**
 * HERCOURT — Garment-Locked AI Fashion Engineering Pipeline
 * Implements FASHN VTON / Model-Swap / Product-to-Model workflows
 * with strict 8-point Product Identity Quality Gate.
 */

import Fashn from "fashn";
import { Product } from "./types";

export type FashnWorkflowType = "model-swap" | "tryon-max" | "product-to-model" | "reject";

export interface QualityGateResult {
  passed: boolean;
  score: number; // 0 - 100
  checks: {
    sameModel: boolean;
    collarShapeAndTrim: boolean;
    sleeveLengthAndDesign: boolean;
    fabricColorsAndBlocks: boolean;
    logoLocationAndDesign: boolean;
    printedPatternsAndGraphics: boolean;
    stitchingAndConstruction: boolean;
    noInventedBranding: boolean;
  };
  reviewNotes: string;
  status: "APPROVED" | "REJECTED" | "NEEDS_HUMAN_REVIEW";
}

export interface FashnJobRecord {
  productId: string;
  retailer: string;
  sourceUrl: string;
  originalImage: string | null;
  generatedImage?: string;
  workflow: FashnWorkflowType;
  modelName: string;
  generationParameters: Record<string, any>;
  creditsSpent: number;
  qualityGate: QualityGateResult;
  approvedDate?: string;
}

/**
 * Phase 2 — Intelligent Workflow Selection
 * Evaluates the source product photo and selects the mathematically optimal FASHN model.
 */
export function selectFashnWorkflow(product: Product): {
  workflow: FashnWorkflowType;
  modelName: string;
  reason: string;
  recommendedParams: Record<string, any>;
} {
  // Case D: No authentic retailer garment image exists
  if (!product.imageUrl) {
    return {
      workflow: "reject",
      modelName: "none",
      reason: "Case D: Chưa có ảnh sản phẩm thật từ shop. Không tạo ảnh AI khi thiếu vật phẩm gốc.",
      recommendedParams: {},
    };
  }

  // Case A: Original photo already shows an authorized female model (e.g. BEYONO)
  if (product.photoSourceType === "official_female_model") {
    return {
      workflow: "model-swap",
      modelName: "model-swap",
      reason: "Case A: Ảnh gốc của hãng đã có người mẫu nữ thật. Giữ nguyên ảnh gốc làm ảnh chính.",
      recommendedParams: {
        generation_mode: "quality",
        resolution: "2k",
        prompt:
          "a photorealistic adult Asian female badminton athlete, elegant natural appearance, athletic proportions, premium editorial commercial lighting",
      },
    };
  }

  // Case B: Garment without a model (flat-lay, ghost mannequin, or on-hanger)
  // Flagship VTON preserves clothing geometry and prints
  return {
    workflow: "tryon-max",
    modelName: "tryon-max",
    reason: "Case B: Ảnh tĩnh sản phẩm từ shop. Dùng tryon-max để giữ nguyên 100% phom dáng và logo.",
    recommendedParams: {
      generation_mode: "quality",
      resolution: "2k",
      num_images: 1,
      output_format: "png",
      prompt:
        "photorealistic adult Asian female badminton athlete, athletic toned physique, clean studio background, professional sports apparel photography",
    },
  };
}

/**
 * Phase 3 — Hard Product-Identity Quality Gate
 * Compares an AI candidate image against the verified retailer garment record.
 */
export function evaluateQualityGate(
  originalSpec: {
    collarType: string;
    sleeveDesign: string;
    colorPlacement: string;
    logosTrademarks: string;
    graphicPatterns: string;
  },
  aiInspection: {
    collarMatches: boolean;
    sleevesMatch: boolean;
    colorsMatch: boolean;
    logoAccurate: boolean;
    patternsAccurate: boolean;
    constructionAccurate: boolean;
    noInventedBranding: boolean;
    visualArtifactsPresent: boolean;
  }
): QualityGateResult {
  const checks = {
    sameModel: aiInspection.collarMatches && aiInspection.sleevesMatch,
    collarShapeAndTrim: aiInspection.collarMatches,
    sleeveLengthAndDesign: aiInspection.sleevesMatch,
    fabricColorsAndBlocks: aiInspection.colorsMatch,
    logoLocationAndDesign: aiInspection.logoAccurate,
    printedPatternsAndGraphics: aiInspection.patternsAccurate,
    stitchingAndConstruction: aiInspection.constructionAccurate,
    noInventedBranding: aiInspection.noInventedBranding && !aiInspection.visualArtifactsPresent,
  };

  const trueCount = Object.values(checks).filter(Boolean).length;
  const score = Math.round((trueCount / 8) * 100);

  // All 8 mandatory checks must pass for automatic approval
  const passed = score === 100;
  const status: QualityGateResult["status"] = passed
    ? "APPROVED"
    : score >= 75
    ? "NEEDS_HUMAN_REVIEW"
    : "REJECTED";

  return {
    passed,
    score,
    checks,
    reviewNotes: passed
      ? "100% khớp chi tiết cổ, tay, khối màu, logo và đường may của sản phẩm gốc."
      : `Không đạt 8/8 tiêu chí (${score}%). Khóa hiển thị ảnh AI; ưu tiên hiển thị ảnh gốc từ shop.`,
    status,
  };
}

/**
 * Check FASHN API Key status server-side without revealing secret value.
 */
export function getFashnApiStatus(): {
  configured: boolean;
  source?: "env" | "missing";
} {
  const key = process.env.FASHN_API_KEY;
  if (key && key.trim().length > 0) {
    return { configured: true, source: "env" };
  }
  return { configured: false, source: "missing" };
}

/**
 * Query available credits from FASHN REST API before initiating paid calls.
 */
export async function checkFashnCredits(): Promise<{
  success: boolean;
  totalCredits?: number;
  subscriptionCredits?: number;
  onDemandCredits?: number;
  error?: string;
}> {
  const key = process.env.FASHN_API_KEY;
  if (!key) {
    return {
      success: false,
      error: "FASHN_API_KEY chưa được cấu hình trong môi trường bí mật.",
    };
  }

  try {
    const res = await fetch("https://api.fashn.ai/v1/credits", {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });

    if (!res.ok) {
      return {
        success: false,
        error: `FASHN API trả về HTTP ${res.status}: ${res.statusText}`,
      };
    }

    const data = await res.json();
    return {
      success: true,
      totalCredits: data.credits?.total ?? 0,
      subscriptionCredits: data.credits?.subscription ?? 0,
      onDemandCredits: data.credits?.on_demand ?? 0,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Lỗi kết nối đến FASHN API",
    };
  }
}
