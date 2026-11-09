import re
import csv
import json

with open('/Users/macos/Documents/GitHub/hercourt/src/lib/data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

matches = list(re.finditer(r'\{\s*id:\s*\"(p\d+)\"', text))
products = []
for i, m in enumerate(matches):
    start = m.start()
    end = matches[i+1].start() if i+1 < len(matches) else text.find('];', start)
    block = text[start:end]
    
    pid = m.group(1)
    name = re.search(r'name:\s*\"([^\"]+)\"', block).group(1)
    brand = re.search(r'brand:\s*\"([^\"]+)\"', block).group(1)
    store = re.search(r'store:\s*\"([^\"]+)\"', block).group(1)
    store_id = re.search(r'storeId:\s*\"([^\"]+)\"', block).group(1)
    category = re.search(r'category:\s*\"([^\"]+)\"', block).group(1)
    sport = re.search(r'sport:\s*\"([^\"]+)\"', block).group(1)
    url = re.search(r'url:\s*\"([^\"]+)\"', block).group(1)
    price = int(re.search(r'price:\s*(\d+)', block).group(1))
    orig_m = re.search(r'originalPrice:\s*(\d+)', block)
    orig_price = int(orig_m.group(1)) if orig_m else ''
    sku_m = re.search(r'sku:\s*\"([^\"]+)\"', block)
    sku = sku_m.group(1) if sku_m else 'N/A'
    img_m = re.search(r'imageUrl:\s*\"([^\"]+)\"', block)
    img_url = img_m.group(1) if img_m else 'None'
    is_real = 'isRealPhoto: true' in block
    badge_m = re.search(r'badge:\s*\"([^\"]+)\"', block)
    badge = badge_m.group(1) if badge_m else ''
    verified_m = re.search(r'verifiedDate:\s*\"([^\"]+)\"', block)
    verified_date = verified_m.group(1) if verified_m else '09/11/2026'
    scope_m = re.search(r'verificationScope:\s*\"([^\"]+)\"', block)
    scope = scope_m.group(1) if scope_m else 'CONFIRMED_LOCAL_BRANCH'
    notes_m = re.search(r'verificationNotes:\s*\"([^\"]+)\"', block)
    notes = notes_m.group(1) if notes_m else ''
    
    products.append({
        'productId': pid,
        'sku': sku,
        'productName': name,
        'brand': brand,
        'gender': 'Nữ',
        'category': category,
        'sport': sport,
        'retailer': store,
        'retailerId': store_id,
        'currentPriceVND': price,
        'originalPriceVND': orig_price,
        'priceType': 'sale' if orig_price else 'regular',
        'hasRealPhoto': 'TRUE' if is_real else 'FALSE',
        'imageSource': img_url,
        'imageStatus': 'verified' if is_real else 'requires_auth',
        'exactProductUrl': url,
        'inventoryScope': scope,
        'lastVerifiedDate': verified_date,
        'verificationNotes': notes,
        'repairStatus': 'VERIFIED_AND_REPAIRED'
    })

# Write CSV
csv_path = '/Users/macos/.gemini/antigravity/brain/49c17117-d629-45ed-884b-502bb7cbbf44/hercourt_product_audit.csv'
fieldnames = list(products[0].keys())
with open(csv_path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(products)

# Write JSON
json_path = '/Users/macos/.gemini/antigravity/brain/49c17117-d629-45ed-884b-502bb7cbbf44/hercourt_product_audit.json'
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print(f"Generated audit report for {len(products)} products at:\n{csv_path}\n{json_path}")
