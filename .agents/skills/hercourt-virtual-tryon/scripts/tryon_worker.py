#!/usr/bin/env python3
"""
HERCOURT — Open-Source Garment-Preserving Virtual Try-On Worker
Supports Leffa (CVPR 2025), IDM-VTON, FASHN-VTON 1.5, and Local Garment-Lock Compositor.
"""

import os
import sys
import argparse
import time
import json
import shutil
from pathlib import Path
from PIL import Image, ImageOps, ImageFilter
import numpy as np

def preprocess_garment(garment_path: str, rotate_angle: float = 0.0, crop_box: tuple = None) -> str:
    """Preprocess garment: rotate upright, crop tightly, ensure clean bounding box."""
    im = Image.open(garment_path).convert("RGB")
    if rotate_angle != 0.0:
        im = im.rotate(rotate_angle, expand=True, fillcolor=(50, 55, 58))
    if crop_box:
        im = im.crop(crop_box)
    
    tmp_path = Path("/tmp") / f"prep_garment_{int(time.time()*1000)}.jpg"
    im.save(tmp_path, quality=95)
    return str(tmp_path)

def run_leffa(person_path: str, garment_path: str, output_path: str, hf_token: str = None, garment_type: str = "upper_body"):
    """Inference via franciszzj/Leffa (MIT License, CVPR 2025)."""
    from gradio_client import Client, handle_file
    print(f"[Leffa] Connecting to franciszzj/Leffa (token: {'provided' if hf_token else 'anonymous'})...")
    client = Client("franciszzj/Leffa", hf_token=hf_token)
    
    model_type = "viton_hd" if garment_type == "upper_body" else "dress_code"
    print(f"[Leffa] Running /leffa_predict_vt (model: {model_type}, garment: {garment_type})...")
    
    result = client.predict(
        src_image_path=handle_file(person_path),
        ref_image_path=handle_file(garment_path),
        ref_acceleration=False,
        step=30,
        scale=2.5,
        seed=42,
        vt_model_type=model_type,
        vt_garment_type=garment_type,
        vt_repaint=False,
        api_name="/leffa_predict_vt"
    )
    
    gen_img = result[0] if isinstance(result, (list, tuple)) else result
    src = gen_img if isinstance(gen_img, str) else gen_img.get("path")
    
    # Save output
    im = Image.open(src)
    im.convert("RGB").save(output_path, quality=95)
    print(f"[Leffa] Saved result to {output_path}")
    return output_path

def run_idm_vton(person_path: str, garment_path: str, output_path: str, hf_token: str = None, description: str = "badminton sportswear"):
    """Inference via yisol/IDM-VTON."""
    from gradio_client import Client, handle_file
    print(f"[IDM-VTON] Connecting to yisol/IDM-VTON...")
    client = Client("yisol/IDM-VTON", hf_token=hf_token)
    
    print(f"[IDM-VTON] Running /tryon...")
    result = client.predict(
        dict={"background": handle_file(person_path)},
        garm_img=handle_file(garment_path),
        garment_des=description,
        is_checked=True,
        is_checked_crop=False,
        denoise_steps=30,
        seed=42,
        api_name="/tryon"
    )
    
    gen_img = result[0] if isinstance(result, (list, tuple)) else result
    src = gen_img if isinstance(gen_img, str) else gen_img.get("path")
    
    im = Image.open(src)
    im.convert("RGB").save(output_path, quality=95)
    print(f"[IDM-VTON] Saved result to {output_path}")
    return output_path

def run_fashn_vton(person_path: str, garment_path: str, output_path: str, hf_token: str = None, category: str = "tops"):
    """Inference via fashn-ai/fashn-vton-1.5."""
    from gradio_client import Client, handle_file
    print(f"[FASHN-VTON] Connecting to fashn-ai/fashn-vton-1.5...")
    client = Client("fashn-ai/fashn-vton-1.5", hf_token=hf_token)
    
    print(f"[FASHN-VTON] Running /try_on (category: {category})...")
    result = client.predict(
        person_image=handle_file(person_path),
        garment_image=handle_file(garment_path),
        category=category,
        garment_photo_type="flat-lay",
        num_timesteps=40,
        guidance_scale=2.0,
        seed=42,
        segmentation_free=True,
        api_name="/try_on"
    )
    
    src = result if isinstance(result, str) else result.get("path")
    im = Image.open(src)
    im.convert("RGB").save(output_path, quality=95)
    print(f"[FASHN-VTON] Saved result to {output_path}")
    return output_path

def main():
    parser = argparse.ArgumentParser(description="HERCOURT Virtual Try-On CLI Worker")
    parser.add_argument("--backend", choices=["leffa", "idm-vton", "fashn-vton"], default="leffa", help="VTON Backend model")
    parser.add_argument("--person", required=True, help="Path to person/model image")
    parser.add_argument("--garment", required=True, help="Path to authentic garment image")
    parser.add_argument("--output", required=True, help="Destination output image path")
    parser.add_argument("--category", choices=["upper_body", "lower_body", "dresses", "tops", "bottoms"], default="upper_body", help="Garment category")
    parser.add_argument("--rotate", type=float, default=0.0, help="Rotation angle to upright garment")
    parser.add_argument("--crop", type=str, default="", help="Crop box: x1,y1,x2,y2")
    parser.add_argument("--hf-token", default=os.getenv("HF_TOKEN", None), help="Hugging Face access token")
    parser.add_argument("--desc", default="women's badminton athletic shirt", help="Garment description for IDM-VTON")
    
    args = parser.parse_args()
    
    # Preprocess garment if requested
    crop_box = tuple(map(int, args.crop.split(","))) if args.crop else None
    prepared_garment = args.garment
    if args.rotate != 0.0 or crop_box:
        prepared_garment = preprocess_garment(args.garment, args.rotate, crop_box)
        print(f"[Worker] Preprocessed garment saved to {prepared_garment}")
        
    start_time = time.time()
    try:
        if args.backend == "leffa":
            garment_type = "upper_body" if args.category in ["upper_body", "tops"] else ("lower_body" if args.category in ["lower_body", "bottoms"] else "dresses")
            run_leffa(args.person, prepared_garment, args.output, hf_token=args.hf_token, garment_type=garment_type)
        elif args.backend == "idm-vton":
            run_idm_vton(args.person, prepared_garment, args.output, hf_token=args.hf_token, description=args.desc)
        elif args.backend == "fashn-vton":
            cat = "tops" if args.category in ["upper_body", "tops"] else ("bottoms" if args.category in ["lower_body", "bottoms"] else "one-pieces")
            run_fashn_vton(args.person, prepared_garment, args.output, hf_token=args.hf_token, category=cat)
        
        elapsed = round(time.time() - start_time, 2)
        print(f"[Worker] Successfully generated {args.output} in {elapsed}s using {args.backend}")
    except Exception as e:
        print(f"[Worker] Error with backend {args.backend}: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
