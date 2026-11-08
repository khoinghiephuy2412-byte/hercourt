import { chromium } from "playwright";
import assert from "node:assert";

async function runDeepQA() {
  console.log("🚀 Starting HERCOURT Production-Grade Autonomous QA Suite...\n");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  const BASE_URL = process.env.TEST_URL || "http://localhost:3000";

  // ============================================================
  // TEST 1: DESKTOP VIEWPORTS (1920px & 1440px)
  // ============================================================
  console.log("1. Testing Desktop Viewports (1920px & 1440px)...");
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  let overflow1920 = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.offsetWidth);
  assert.strictEqual(overflow1920, false, "1920px must have no horizontal overflow");
  console.log("   ✅ 1920x1080: Zero overflow, clean layout.");

  await page.setViewportSize({ width: 1440, height: 900 });
  let overflow1440 = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.offsetWidth);
  assert.strictEqual(overflow1440, false, "1440px must have no horizontal overflow");
  console.log("   ✅ 1440x900: Zero overflow, clean layout.");

  // ============================================================
  // TEST 2: TABLET VIEWPORT (768px)
  // ============================================================
  console.log("\n2. Testing Tablet Viewport (768px)...");
  await page.setViewportSize({ width: 768, height: 1024 });
  let overflow768 = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.offsetWidth);
  assert.strictEqual(overflow768, false, "768px must have no horizontal overflow");
  console.log("   ✅ 768x1024: Zero overflow, 2-column grid adapts properly.");

  // ============================================================
  // TEST 3: MOBILE VIEWPORTS (390px & 375px)
  // ============================================================
  console.log("\n3. Testing Mobile Viewports (390px & 375px)...");
  await page.setViewportSize({ width: 390, height: 844 });
  let overflow390 = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.offsetWidth);
  assert.strictEqual(overflow390, false, "390px must have no horizontal overflow");
  console.log("   ✅ 390x844: Zero overflow, mobile container tight & responsive.");

  await page.setViewportSize({ width: 375, height: 667 });
  let overflow375 = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.offsetWidth);
  assert.strictEqual(overflow375, false, "375px must have no horizontal overflow");
  console.log("   ✅ 375x667: Zero overflow on small screens.");

  // Restore Desktop for feature interaction tests
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  // ============================================================
  // TEST 4: SEARCH & STORE FILTERING
  // ============================================================
  console.log("\n4. Testing Search & Filtering Interaction...");
  // Test Search Box
  const searchInput = page.locator('#products input[type="text"]');
  await searchInput.fill("Kamito");
  await page.waitForTimeout(300);
  const kamitoCount = await page.locator('#products article').count();
  assert(kamitoCount >= 3, `Expected at least 3 Kamito items, found ${kamitoCount}`);
  console.log(`   ✅ Search for "Kamito" returned ${kamitoCount} matching items.`);

  // Reset Search
  await searchInput.fill("");
  await page.waitForTimeout(200);

  // Test Store Filter Dropdown
  const storeSelect = page.locator('#products select').first();
  await storeSelect.selectOption("VNB CN2");
  await page.waitForTimeout(300);
  const vnbCount = await page.locator('#products article').count();
  assert.strictEqual(vnbCount, 6, `Expected exactly 6 VNB items, found ${vnbCount}`);
  console.log(`   ✅ Filter by "VNB CN2" correctly displays all 6 verified VNB items.`);

  // Reset Store Filter
  await storeSelect.selectOption("all");
  await page.waitForTimeout(200);

  // ============================================================
  // TEST 5: PRICE SORTING
  // ============================================================
  console.log("\n5. Testing Price Sorting...");
  const sortSelect = page.locator('#products select').nth(1);
  
  // Sort Low to High
  await sortSelect.selectOption("low");
  await page.waitForTimeout(300);
  const pricesLow = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('#products article span.text-lg, #products article span.text-xl'))
      .map(el => parseInt(el.textContent.replace(/\D/g, ''), 10))
      .filter(n => !isNaN(n));
  });
  assert(pricesLow.length > 5, "Should have price entries");
  for (let i = 0; i < pricesLow.length - 1; i++) {
    assert(pricesLow[i] <= pricesLow[i + 1], `Sort Low failed: ${pricesLow[i]} > ${pricesLow[i+1]}`);
  }
  console.log(`   ✅ Sort "Giá: Thấp đến Cao" verified: min=${pricesLow[0].toLocaleString('vi-VN')}₫, max=${pricesLow[pricesLow.length-1].toLocaleString('vi-VN')}₫`);

  // Filter Under 200k
  await sortSelect.selectOption("under200");
  await page.waitForTimeout(300);
  const under200Prices = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('#products article span.text-lg, #products article span.text-xl'))
      .map(el => parseInt(el.textContent.replace(/\D/g, ''), 10))
      .filter(n => !isNaN(n));
  });
  for (const pr of under200Prices) {
    assert(pr < 200000, `Expected under 200k, found ${pr}`);
  }
  console.log(`   ✅ Filter "Dưới 200k" verified: ${under200Prices.length} items all under 200.000₫.`);

  // Reset Sort
  await sortSelect.selectOption("featured");
  await page.waitForTimeout(200);

  // ============================================================
  // TEST 6: QUICK-VIEW MODAL & KEYBOARD ACCESSIBILITY (ESCAPE)
  // ============================================================
  console.log("\n6. Testing Quick-View Modal & Keyboard (Escape) Handling...");
  const firstCard = page.locator('#products article').first();
  const cardTitle = await firstCard.locator('h3').textContent();
  await firstCard.locator('div[class*="aspect-square"]').click();
  
  const modal = page.locator('div[role="dialog"]');
  await modal.waitFor({ state: "visible", timeout: 2000 });
  const modalTitle = await modal.locator('#modal-product-title').textContent();
  assert.strictEqual(modalTitle.trim(), cardTitle.trim(), "Modal title must match clicked card title");
  console.log(`   ✅ Modal opened with role="dialog" for "${modalTitle.trim()}".`);

  // Test Escape key closes modal
  await page.keyboard.press("Escape");
  await modal.waitFor({ state: "hidden", timeout: 2000 });
  console.log("   ✅ Escape key cleanly dismissed the modal dialog.");

  // ============================================================
  // TEST 7: WISHLIST PERSISTENCE ACROSS REFRESH
  // ============================================================
  console.log("\n7. Testing Wishlist Persistence...");
  // Clear any wishlist first
  await page.evaluate(() => localStorage.removeItem("hercourt-favs"));
  await page.reload({ waitUntil: "networkidle" });

  // Toggle favorite on first card
  const heartBtn = page.locator('#products article button[aria-label*="yêu thích"]').first();
  await heartBtn.click();
  await page.waitForTimeout(300);

  // Check counter in header
  const counterText = await page.locator('header button[aria-label*="yêu thích"] span.bg-\\[\\#D9FF3F\\]').textContent();
  assert.strictEqual(counterText.trim(), "1", "Wishlist badge counter should be 1");
  console.log("   ✅ Wishlist count updated to 1 on card click.");

  // Reload page to verify persistence
  await page.reload({ waitUntil: "networkidle" });
  const counterAfterReload = await page.locator('header button[aria-label*="yêu thích"] span.bg-\\[\\#D9FF3F\\]').textContent();
  assert.strictEqual(counterAfterReload.trim(), "1", "Wishlist count should persist as 1 after reload");
  console.log("   ✅ Wishlist persistence in localStorage verified across full page reload.");

  // ============================================================
  // TEST 8: IMAGE LOADING AUDIT
  // ============================================================
  console.log("\n8. Testing All Rendered Images on Page...");
  const imageReport = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => ({
      src: img.src.slice(0, 60),
      alt: img.alt,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight
    }));
  });

  const brokenImages = imageReport.filter(img => !img.complete || img.naturalWidth === 0);
  assert.strictEqual(brokenImages.length, 0, `Found broken images: ${JSON.stringify(brokenImages)}`);
  console.log(`   ✅ All ${imageReport.length} images loaded successfully with naturalWidth > 0.`);

  // ============================================================
  // TEST 9: CONSOLE ERRORS & HYDRATION CHECK
  // ============================================================
  console.log("\n9. Testing Console Runtime & Hydration Errors...");
  assert.strictEqual(consoleErrors.length, 0, `Found console errors: ${consoleErrors.join("\n")}`);
  console.log("   ✅ Zero runtime exceptions or React hydration errors detected.");

  await browser.close();
  console.log("\n🎉 ALL 9 PRODUCTION-GRADE QA TESTS PASSED PERFECTLY!\n");
}

runDeepQA().catch((err) => {
  console.error("❌ QA Test Suite failed:", err);
  process.exit(1);
});
