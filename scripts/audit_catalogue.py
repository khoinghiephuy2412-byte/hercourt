import re
import urllib.request
import ssl
import json
import time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

with open('/Users/macos/Documents/GitHub/hercourt/src/lib/data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Extract all products
matches = list(re.finditer(r'\{\s*id:\s*\"(p\d+)\"', text))
products = []
for i, m in enumerate(matches):
    start = m.start()
    end = matches[i+1].start() if i+1 < len(matches) else text.find('];', start)
    block = text[start:end]
    
    pid = m.group(1)
    name = re.search(r'name:\s*\"([^\"]+)\"', block).group(1)
    store = re.search(r'store:\s*\"([^\"]+)\"', block).group(1)
    store_id = re.search(r'storeId:\s*\"([^\"]+)\"', block).group(1)
    category = re.search(r'category:\s*\"([^\"]+)\"', block).group(1)
    sport = re.search(r'sport:\s*\"([^\"]+)\"', block).group(1)
    url_m = re.search(r'url:\s*\"([^\"]+)\"', block)
    url = url_m.group(1) if url_m else ''
    price = int(re.search(r'price:\s*(\d+)', block).group(1))
    orig_m = re.search(r'originalPrice:\s*(\d+)', block)
    orig_price = int(orig_m.group(1)) if orig_m else None
    img_m = re.search(r'imageUrl:\s*\"([^\"]+)\"', block)
    img_url = img_m.group(1) if img_m else None
    is_real = 'isRealPhoto: true' in block
    img_status_m = re.search(r'imageStatus:\s*\"([^\"]+)\"', block)
    img_status = img_status_m.group(1) if img_status_m else 'missing'
    scope_m = re.search(r'verificationScope:\s*\"([^\"]+)\"', block)
    scope = scope_m.group(1) if scope_m else 'CONFIRMED_LOCAL_BRANCH'
    
    products.append({
        'id': pid,
        'name': name,
        'store': store,
        'storeId': store_id,
        'category': category,
        'sport': sport,
        'currentCataloguePrice': price,
        'currentCatalogueOriginalPrice': orig_price,
        'url': url,
        'imageUrl': img_url,
        'isRealPhoto': is_real,
        'imageStatus': img_status,
        'verificationScope': scope
    })

print(f"Loaded {len(products)} products from data.ts")

audit_results = []
for p in products:
    url = p['url']
    pid = p['id']
    store = p['store']
    print(f"Auditing {pid} ({store}): {url} ...")
    
    result = {
        'id': pid,
        'name': p['name'],
        'store': store,
        'storeId': p['storeId'],
        'category': p['category'],
        'sport': p['sport'],
        'cataloguePrice': p['currentCataloguePrice'],
        'catalogueOriginalPrice': p['currentCatalogueOriginalPrice'],
        'url': url,
        'finalUrl': url,
        'httpStatus': None,
        'isRedirected': False,
        'detectedSalePrice': None,
        'detectedOriginalPrice': None,
        'title': '',
        'priceDiscrepancy': False,
        'urlDiscrepancy': False,
        'imageDiscrepancy': False,
        'notes': []
    }
    
    if not url or url.startswith('https://chunsport.vn') or url.startswith('https://lannhisport.vn') or url.startswith('https://thangsport.vn') or url.startswith('https://votcaulongbienhoa.com'):
        result['httpStatus'] = 'LOCAL_STOREFRONT_NO_CDN'
        result['notes'].append('Cửa hàng truyền thống tại Biên Hòa không có hệ thống e-commerce riêng; bán trực tiếp tại quầy')
        audit_results.append(result)
        continue
        
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'})
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=8) as resp:
            result['httpStatus'] = resp.getcode()
            result['finalUrl'] = resp.geturl()
            if result['finalUrl'] != url:
                result['isRedirected'] = True
                result['urlDiscrepancy'] = True
                result['notes'].append(f"Redirected to {result['finalUrl']}")
                
            html = resp.read().decode('utf-8', errors='ignore')
            title_m = re.search(r'<title>([^<]+)</title>', html)
            if title_m:
                result['title'] = title_m.group(1).strip()
                
            # Store-specific price parser
            if 'beyono.vn' in url:
                # BEYONO has <del><span class="price">X</span></del> and <span class="product-price price">Y</span>
                sale_m = re.search(r'<span class=\"product-price price\"[^>]*>\s*([0-9\.]+)\s*<span', html)
                orig_m = re.search(r'<del[^>]*>[\s\S]*?<span class=\"price\"[^>]*>\s*([0-9\.]+)\s*<span[\s\S]*?</del>', html)
                if not orig_m:
                    orig_m = re.search(r'<span class=\"price\"[^>]*>\s*([0-9\.]+)\s*<span', html)
                    
                if sale_m:
                    val = int(sale_m.group(1).replace('.', ''))
                    if val > 10000:
                        result['detectedSalePrice'] = val
                if orig_m:
                    val = int(orig_m.group(1).replace('.', ''))
                    if val > 10000:
                        result['detectedOriginalPrice'] = val
                        
            elif 'shopvnb.com' in url:
                # ShopVNB product page pricing
                # class="price" or specific product prices
                prices = re.findall(r'(\d{1,3}(?:\.\d{3})+)\s*(?:₫|đ)', html)
                num_prices = [int(p.replace('.', '')) for p in prices if int(p.replace('.', '')) > 50000]
                if num_prices:
                    # Lowest is sale price, second is list price
                    sorted_p = sorted(list(dict.fromkeys(num_prices)))
                    result['detectedSalePrice'] = sorted_p[0]
                    if len(sorted_p) > 1 and sorted_p[1] > sorted_p[0]:
                        result['detectedOriginalPrice'] = sorted_p[1]
                        
            elif 'phuongsport.com.vn' in url or 'xbsports.vn' in url:
                # Haravan format: class="price" or data-price
                prices = re.findall(r'(\d{1,3}(?:\.\d{3})+)\s*(?:₫|đ)', html)
                num_prices = [int(p.replace('.', '')) for p in prices if int(p.replace('.', '')) > 50000]
                if num_prices:
                    sorted_p = sorted(list(dict.fromkeys(num_prices)))
                    result['detectedSalePrice'] = sorted_p[0]
                    if len(sorted_p) > 1:
                        result['detectedOriginalPrice'] = sorted_p[1]
                        
            elif 'justplay.vn' in url:
                prices = re.findall(r'(\d{1,3}(?:\.\d{3})+)\s*(?:₫|đ)', html)
                num_prices = [int(p.replace('.', '')) for p in prices if int(p.replace('.', '')) > 50000]
                if num_prices:
                    sorted_p = sorted(list(dict.fromkeys(num_prices)))
                    result['detectedSalePrice'] = sorted_p[0]
                    
            elif 'joola.com.vn' in url:
                prices = re.findall(r'(\d{1,3}(?:\.\d{3})+)\s*(?:₫|đ)', html)
                num_prices = [int(p.replace('.', '')) for p in prices if int(p.replace('.', '')) > 50000]
                if num_prices:
                    result['detectedSalePrice'] = min(num_prices)
                    
            # Check price discrepancy
            if result['detectedSalePrice'] and result['detectedSalePrice'] != result['cataloguePrice']:
                result['priceDiscrepancy'] = True
                result['notes'].append(f"Price diff: Catalogue {result['cataloguePrice']} vs Retailer {result['detectedSalePrice']}")
                
    except Exception as e:
        result['httpStatus'] = f"ERROR: {str(e)}"
        result['notes'].append(f"Request failed: {str(e)}")
        
    audit_results.append(result)
    time.sleep(0.3)

with open('/Users/macos/Documents/GitHub/hercourt/scripts/audit_output.json', 'w', encoding='utf-8') as f:
    json.dump(audit_results, f, ensure_ascii=False, indent=2)

print("\n=== AUDIT FINISHED ===")
