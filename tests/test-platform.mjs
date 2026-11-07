import assert from "node:assert";

async function runSmokeTests() {
  console.log("🚀 Starting HERCOURT Smoke Tests...");

  const BASE_URL = "https://nimble-bromine-r13gw7l.tmp.now";

  // Test 1: Root HTML endpoint
  console.log("1. Testing Root URL...");
  const res = await fetch(BASE_URL);
  assert.strictEqual(res.status, 200, "Root page must return 200 OK");
  const html = await res.text();
  assert(html.includes("HERCOURT"), "Must contain brand name HERCOURT");
  assert(html.includes("OWN THE GAME"), "Must contain campaign headline OWN THE GAME");
  assert(html.includes("WEAR THE ENERGY"), "Must contain campaign slogan WEAR THE ENERGY");
  assert(html.includes("BEYONO"), "Must contain BEYONO store products");
  assert(html.includes("VNB Sports"), "Must contain VNB Sports store products");
  assert(html.includes("Phượng Sport"), "Must contain Phượng Sport store products");
  console.log("   ✅ Root HTML contains all required brand & store markers.");

  // Test 2: Verify 5 LIA Campaign Images
  console.log("2. Testing LIA Campaign Assets...");
  const images = [
    "lia-hero.jpg",
    "lia-action.jpg",
    "lia-lifestyle.jpg",
    "lia-portrait.jpg",
    "lia-mobile.jpg",
  ];

  for (const img of images) {
    const imgRes = await fetch(`${BASE_URL}/images/${img}`, { method: "HEAD" });
    assert.strictEqual(imgRes.status, 200, `Image ${img} must return 200`);
    const size = parseInt(imgRes.headers.get("content-length") || "0", 10);
    assert(size > 100000, `Image ${img} must be a valid high-res photo (>100KB), got ${size}`);
    console.log(`   ✅ /images/${img} verified (${(size / 1024).toFixed(1)} KB)`);
  }

  // Test 3: Verify Data integrity (22 products & 8 stores)
  console.log("3. Testing Data Integrity...");
  // Check that all 22 products are referenced in the rendered page
  const expectedProducts = [
    "Váy thể thao Noon VSP09",
    "Váy thể thao Nova SP01",
    "Váy thể thao VCL04",
    "Váy thể thao VCL03",
    "Váy cầu lông Win CL01",
    "Váy cầu lông Win CL02",
    "Áo polo Champ CB14 nữ",
    "Áo polo Champ CB12 nữ",
    "Áo polo Champ CB11 nữ",
    "Áo cầu lông Top CL22 nữ",
    "Áo cầu lông Top CL25 nữ",
    "Áo đa năng SP04 nữ",
    "Bộ bóng chuyền Wave II nữ",
    "Bộ bóng chuyền Boom nữ",
    "Áo thời trang PK18 nữ",
    "Bộ Kamito Smash nữ trắng cam",
    "Bộ Kamito Smash nữ xanh bích",
    "Áo Taro TR024-A18 nữ xanh lục",
    "Áo Kamito Flash Light V2 nữ đỏ",
    "Áo Victec AVT13 nữ trắng",
    "Áo Kamito Halley nữ trắng cam",
    "Quần short nữ Breeza 2 lớp",
  ];

  for (const p of expectedProducts) {
    assert(html.includes(p), `Page must contain product: "${p}"`);
  }
  console.log(`   ✅ All 22 products present in SSR HTML.`);

  // Test 4: Verify 8 Biên Hòa Stores
  const expectedStores = [
    "2 Võ Thị Sáu",
    "45 Hưng Đạo Vương",
    "683 Phạm Văn Thuận",
    "384 Phạm Văn Thuận",
    "504 Nguyễn Ái Quốc",
    "Bảo Ngọc Sport",
    "Hạnh Sport",
    "1347 Phạm Văn Thuận",
  ];

  for (const s of expectedStores) {
    assert(html.includes(s), `Page must contain store address/name: "${s}"`);
  }
  console.log(`   ✅ All 8 Biên Hòa store locations present.`);

  console.log("\n🎉 ALL SMOKE TESTS PASSED PERFECTLY!");
}

runSmokeTests().catch((err) => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});
