---
name: hercourt-virtual-tryon
description: Free, open-source garment-preserving virtual try-on workflow for HERCOURT women's badminton apparel. Specializes in upper body badminton shirts, skorts, and dresses using Leffa (MIT License, CVPR 2025), IDM-VTON, and garment-locked composition. Activates when generating, testing, or auditing AI female model imagery while strictly preserving retailer garment fidelity.
allowed-tools: Bash, Read, Write, Edit
---

# HERCOURT — Free Open-Source Virtual Try-On Pipeline

A standardized, zero-cost virtual try-on workflow specifically engineered for women's badminton sportswear (badminton shirts, pleated skorts, performance dresses). Built in accordance with Anthropic Skill Creator and WebApp Testing principles, it ensures 100% garment design preservation from official retailer photographs without paid AI subscriptions.

## 1. Trigger Conditions & Purpose

### When to Use:
- Generating, evaluating, or fixing AI female model try-on imagery for women's badminton products.
- Validating that newly published products have authentic retailer photos paired with accurate AI athlete previews.
- Auditing existing try-on assets for garment preservation (collar, shoulder stripes, color fidelity, brand logos).

### When NOT to Use:
- Non-badminton sportswear or generic fashion items without verified retailer photographs.
- Generating surrogate or synthetic replacement garments. If no authentic physical photograph exists, do NOT run virtual try-on.

---

## 2. Input Specifications & Preconditions

| Input | Requirement | Verification Method |
| :--- | :--- | :--- |
| **Authentic Garment** | Flat-lay or mannequin photo from authorized shop (ShopVNB, XB Sports, BEYONO). | Inspect `imageUrl` in `src/lib/data.ts` and verify image file exists. |
| **Model Reference** | Front-facing or 15° athletic stance, arms clear of chest/torso, holding badminton racket cleanly. | Use verified reference assets (`lia-hero.jpg` or approved athlete poses). |
| **Output Path** | Standardized naming: `public/images/products/ai-model-{id}-{slug}.jpg`. | Target must be within `public/images/products/` and synced to `out/`. |

---

## 3. Garment Preprocessing & Upright Alignment

Store photos are frequently shot flat-lay at diagonal angles on tiled floors. Feeding tilted images into neural try-on networks causes severe warping and sleeve asymmetry.

Preprocess before inference:
1. **Rotate Upright:** Rotate the garment so the shoulder seam and hem are horizontally level (e.g., Taro TR024 requires `-38°` rotation).
2. **Crop Bounding Box:** Tightly crop the garment, discarding surrounding floor tiles, rackets, shoes, or catalog booklets.
3. **Aspect Ratio:** Keep the bounding box centered with a 3:4 aspect ratio.

```bash
# Automated preprocessing via CLI worker:
python3 .agents/skills/hercourt-virtual-tryon/scripts/tryon_worker.py \
  --garment public/images/products/p19-vnb-taro-tr024-xanh-luc.webp \
  --rotate -38 \
  --crop "480,520,1630,1560" \
  --output public/images/products/ai-model-p19-taro-green.jpg
```

---

## 4. Execution Workflow & Inference Backends

CLI Worker Script: `.agents/skills/hercourt-virtual-tryon/scripts/tryon_worker.py`

### Supported Backends:
1. **Leffa (`franciszzj/Leffa`, MIT License, CVPR 2025):**
   - High-fidelity flow-field warping for upper body (`viton_hd`) and dresses/bottoms (`dress_code`).
   - Requires boolean parameters for `ref_acceleration` and `vt_repaint`.
2. **IDM-VTON (`yisol/IDM-VTON`):**
   - Exceptional micro-detail preservation for badges, collar trims, and chest emblems.
3. **FASHN VTON 1.5 (`fashn-ai/fashn-vton-1.5`):**
   - Maskless pixel-space MMDiT diffusion try-on.

### Inference Invocations:
```bash
# Standard Leffa upper-body try-on:
python3 .agents/skills/hercourt-virtual-tryon/scripts/tryon_worker.py \
  --backend leffa \
  --person public/images/lia-hero.jpg \
  --garment public/images/products/p30-xb-yonex-trm3488-aqua.webp \
  --category upper_body \
  --output public/images/products/ai-model-p30-yonex-aqua.jpg

# With Hugging Face Access Token (bypasses anonymous IP ZeroGPU quota):
export HF_TOKEN="hf_xxxxxxxxxxxxxxxxxxxx"
python3 .agents/skills/hercourt-virtual-tryon/scripts/tryon_worker.py \
  --backend leffa \
  --person public/images/lia-hero.jpg \
  --garment public/images/products/p30-xb-yonex-trm3488-aqua.webp \
  --hf-token $HF_TOKEN \
  --output public/images/products/ai-model-p30-yonex-aqua.jpg
```

---

## 5. Quality Gate: 8-Point Visual Audit & Automated Verification

Every generated image MUST pass all 8 quality criteria before being marked `approved`:

1. **Neckline / Collar Shape:** Crew neck must remain crew neck; polo must remain polo; contrasting ribbing must be intact.
2. **Shoulder / Sleeve Trim:** Sleeve bands, raglan cuts, and contrast piping must match the original.
3. **Primary Color Fidelity:** Garment body color must match the original hex code (e.g. `#4db6ac` for Yonex TRM3488).
4. **Graphic Lines & Motifs:** Diagonal bands, speed streaks, and geometric patterns must be preserved without blur or hallucination.
5. **Brand Logo & Position:** Legible, unaltered logo in the correct chest location (e.g. black Yonex double-triangle on left chest).
6. **No Phantom Elements:** Absolutely NO added buttons, fictional text (e.g. "AERO"), or imaginary patterns.
7. **Athlete Realism:** Anatomically natural fingers, realistic stance, appropriate athletic badminton skirt and footwear.
8. **Frontend Coexistence:** The authentic retailer photo is ALWAYS primary; the AI model image is displayed as a clearly labeled secondary view ("Người mẫu AI minh họa").

### Rule of Rejection:
If ANY of criteria 1–6 fail, the image is **REJECTED**.
- Attempt 1: Re-crop and rotate garment to perfect vertical alignment.
- Attempt 2: Switch backend (Leffa ↔ IDM-VTON).
- Attempt 3: If inference remains distorted or blocked, **withhold AI view completely** and display only the authentic retailer photograph.

---

## 6. End-to-End Testing via WebApp Testing Skill

In accordance with `.agents/skills/webapp-testing/`:
1. Start local server: `npx serve -l 3000 out`.
2. Inspect browser rendering at Desktop (`1440 × 900`) and Mobile (`390 × 844`).
3. Assert that both `p.imageUrl` ("Ảnh sản phẩm gốc") and `p.aiModelImageUrl` ("Người mẫu AI minh họa") load with HTTP 200 and `naturalWidth > 0`.
4. Capture screenshots for automated regression detection.

---

## 7. License & Compliance Guidelines

- **franciszzj/Leffa:** MIT License. Commercial and educational use permitted.
- **Retailer Integrity:** All images attribute local merchants (XB Sports, ShopVNB) and provide direct one-tap links to the original purchase page.
- **Consumer Transparency:** AI model imagery is strictly labeled as informational draping visualization ("Ảnh người mẫu AI minh họa") to aid size and style selection.
