---
name: hercourt-virtual-tryon
description: Completely free, open-source garment-preserving virtual try-on workflow for HERCOURT women's badminton fashion. Uses Leffa (MIT, CVPR 2025), IDM-VTON, and FASHN-VTON 1.5 without paid APIs.
allowed-tools: Bash, Read, Write, Edit
---

# HERCOURT — Free Open-Source Virtual Try-On Pipeline

This skill provides a standardized, zero-cost virtual try-on workflow specifically engineered for women's badminton sportswear (badminton shirts, pleated skorts, performance dresses). It ensures 100% garment design preservation from official retailer photographs without paying for external AI subscriptions.

## 1. Input Image Preparation & Verification

Before running virtual try-on, two reference inputs must be prepared:

### A. Authentic Retailer Garment Photo
- **Source of truth:** Must be an authorized retailer photograph from ShopVNB, XB Sports, BEYONO, or Phượng Sport.
- **Verification:** Check `src/lib/garmentReferenceAudit.json` to verify collar shape, sleeve construction, color distribution, logo placement, and woven tags.
- **Prohibition:** Never use AI text-to-image to generate a surrogate shirt. If no physical photograph exists (e.g. Chun Sport `p34`), **reject try-on and withhold from public view**.

### B. Female Badminton Model Image
- **Pose requirements:** Front-facing or subtle 15° 3/4 turn, upright athletic posture, arms resting at sides or holding a badminton racket cleanly without occluding the chest/torso.
- **Reference models:** Use verified athlete base poses (`lia-mobile.jpg` or `ai_model_p19_taro_green.jpg`).

---

## 2. Garment Preprocessing & Upright Alignment

Store photos are frequently shot flat-lay at diagonal angles on tiled floors. Feeding tilted images into neural try-on networks causes severe warping and sleeve asymmetry.

Preprocess before inference:
1. **Rotate Upright:** Rotate the garment so the shoulder seam and hem are horizontally level (e.g., Taro TR024 requires `-38°` rotation).
2. **Crop Bounding Box:** Tightly crop the garment, discarding surrounding floor tiles, rackets, shoes, or catalog booklets.
3. **Aspect Ratio:** Keep the bounding box centered with a 3:4 aspect ratio.

```bash
# Example preprocessing invocation built into tryon_worker.py:
python3 .agents/skills/hercourt-virtual-tryon/scripts/tryon_worker.py \
  --garment public/images/products/p19-vnb-taro-tr024-xanh-luc.webp \
  --rotate -38 \
  --crop "480,520,1630,1560" \
  --output public/images/products/ai-model-p19-taro-green.jpg
```

---

## 3. Supported Open-Source Models & Hardware Constraints

### Hardware Inspection Summary (macOS Intel Core i5 x86_64, 16GB RAM)
- **Architecture:** Intel x86_64 (No NVIDIA CUDA GPU; No Apple Silicon MPS Neural Engine).
- **Execution Strategy:** Use Gradio Client to interface directly with official open-source GPU-backed spaces (`franciszzj/Leffa`, `yisol/IDM-VTON`, `fashn-ai/fashn-vton-1.5`).

### Supported Backends:

| Model | Repository | License | Specialization |
| :--- | :--- | :--- | :--- |
| **Leffa** *(Primary)* | `franciszzj/Leffa` | **MIT License** (CVPR 2025) | Flow-field attention, handles both tops (`viton_hd`) and bottoms/dresses (`dress_code`). |
| **IDM-VTON** | `yisol/IDM-VTON` | Research / Open Demo | Exceptional micro-detail preservation (text, fine lines, woven tags). |
| **FASHN VTON 1.5** | `fashn-ai/fashn-vton-1.5` | Open-source weights | Maskless pixel-space MMDiT diffusion try-on. |

---

## 4. Local Execution Commands

The CLI adapter is located at:
`scripts/tryon_worker.py`

### Basic Inference Command (Leffa):
```bash
python3 .agents/skills/hercourt-virtual-tryon/scripts/tryon_worker.py \
  --backend leffa \
  --person public/images/lia-mobile.jpg \
  --garment public/images/products/p19-clean.jpg \
  --category upper_body \
  --output public/images/products/ai-model-p19-taro-green.jpg
```

### High-Detail Inference Command (IDM-VTON):
```bash
python3 .agents/skills/hercourt-virtual-tryon/scripts/tryon_worker.py \
  --backend idm-vton \
  --person public/images/lia-mobile.jpg \
  --garment public/images/products/p20-clean.jpg \
  --desc "women red and yellow badminton sport shirt with collar" \
  --output public/images/products/ai-model-p20-kamito-red.jpg
```

### With Hugging Face Access Token (Bypasses Free Anonymous IP Limits):
```bash
export HF_TOKEN="hf_xxxxxxxxxxxxxxxxxxxx"
python3 .agents/skills/hercourt-virtual-tryon/scripts/tryon_worker.py \
  --backend leffa \
  --person public/images/lia-mobile.jpg \
  --garment public/images/products/p21-clean.jpg \
  --category upper_body \
  --output public/images/products/ai-model-p21-victec-white.jpg
```

---

## 5. Quality Gate: Detail Comparison & Approval Rules

Every output image must pass an 8-point visual audit before publication:

1. **Neckline / Collar:** Does the neckline match the original? (Crew neck must stay crew neck; polo must stay polo).
2. **Sleeve Length & Color:** Are sleeves symmetric and true to original coloring (e.g. asymmetrical sleeves must retain contrasting colors)?
3. **Primary Colors:** Do the hex tones match the physical retailer photograph?
4. **Graphic Lines & Banners:** Are diagonal sashes, speed lines, or chevron patterns preserved without AI-blurring?
5. **Brand Logo:** Is the original brand emblem (Taro, Kamito, Victor, Yonex) legible and in the correct chest location?
6. **No Phantom Elements:** Ensure no invented buttons, fictional sponsor text (e.g. "AERO"), or imaginary patterns exist.
7. **Athlete Anatomy:** Natural fingers, posture, and badminton racket grip.
8. **No Primary Overwrite:** The official retailer photograph must ALWAYS remain primary (`viewAiModel = false`).

### Rule of Rejection:
If any of criteria 1–6 fail, the image is **REJECTED**.
- Attempt 1: Re-align and crop garment closer to borders.
- Attempt 2: Switch to alternative backend (Leffa ↔ IDM-VTON).
- Attempt 3: If try-on still distorts the design, **withhold AI view completely** and display only the authentic retailer photograph.

---

## 6. Error Recovery

- **ZeroGPU Quota Exceeded:** Occurs when calling public spaces without authentication.
  - *Fix:* Obtain a free Hugging Face User Access Token at `https://huggingface.co/settings/tokens` and pass `--hf-token $HF_TOKEN`.
- **Garment Warping / Distortion:**
  - *Fix:* Check rotation angle. Garments tilted >15° on floors must be rotated with `--rotate <degrees>` before passing to neural try-on.
- **Occluded Torso Error:**
  - *Fix:* Ensure the model's arms or racket do not cross directly over the chest.

---

## 7. License & Commercial Use Notice

- **franciszzj/Leffa:** Code and weights are released under the **MIT License**. Permissive for commercial and private use. Note that underlying training datasets (VITON-HD, DressCode) are academic.
- **yisol/IDM-VTON:** Demo and research checkpoints are intended for non-commercial exploration and evaluation unless commercial licensing is secured.
- **Editorial Policy:** HERCOURT displays AI styling strictly as an optional informational preview ("Ảnh người mẫu AI minh họa") to help female customers visualize garment drape. All purchase links lead directly to official local retailers.
