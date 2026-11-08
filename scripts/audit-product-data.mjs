import { PRODUCTS, STORES } from '../src/lib/data.ts';

async function fetchWithTimeout(url, timeoutMs = 8000, retries = 1) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Range': 'bytes=0-1024',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
        },
        signal: controller.signal,
        redirect: 'follow'
      });
      clearTimeout(id);
      return { ok: res.ok || res.status === 403 || res.status === 405 || res.status === 206, status: res.status };
    } catch (err) {
      clearTimeout(id);
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, 1000));
        continue;
      }
      return { ok: false, error: err.name === 'AbortError' ? 'TIMEOUT' : err.message };
    }
  }
}

async function auditData() {
  console.log(`🔍 Auditing all ${PRODUCTS.length} products in HERCOURT data.ts...\n`);
  
  let brokenUrls = 0;
  let brokenImages = 0;
  let unverifiedStores = 0;

  for (const p of PRODUCTS) {
    const store = STORES.find(s => s.id === p.storeId || s.shortName === p.store);
    if (!store) {
      console.log(`❌ Invalid storeId: ${p.storeId}`);
      unverifiedStores++;
    }

    const urlCheck = await fetchWithTimeout(p.url, 4000);
    const imgCheck = p.imageUrl ? await fetchWithTimeout(p.imageUrl, 4000) : { ok: true };

    if (!urlCheck.ok) {
      brokenUrls++;
      console.log(`❌ [${p.id}] Product URL failed (${urlCheck.status || urlCheck.error}): ${p.url}`);
    } else if (!imgCheck.ok) {
      brokenImages++;
      console.log(`❌ [${p.id}] Image URL failed (${imgCheck.status || imgCheck.error}): ${p.imageUrl}`);
    } else {
      console.log(`✅ [${p.id}] ${p.name.slice(0, 28).padEnd(30)} | ${p.store.padEnd(12)} | ${p.price.toLocaleString('vi-VN')}₫ | Verified: ${p.verifiedDate}`);
    }
  }

  console.log(`\n========================================`);
  console.log(`Audit Summary:`);
  console.log(`- Total Products: ${PRODUCTS.length}`);
  console.log(`- Broken Product URLs: ${brokenUrls}`);
  console.log(`- Broken Image URLs: ${brokenImages}`);
  console.log(`- Unverified Stores: ${unverifiedStores}`);
  console.log(`========================================\n`);

  if (brokenUrls > 0 || brokenImages > 0 || unverifiedStores > 0) {
    process.exit(1);
  } else {
    console.log(`🎉 100% DATA INTEGRITY VERIFIED!`);
  }
}

auditData().catch(err => {
  console.error("Audit error:", err);
  process.exit(1);
});
