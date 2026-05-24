import { chromium, type BrowserContext, type Page } from "playwright";
import path from "path";

const USER_DATA_DIR = path.join(process.cwd(), ".cl-browser-profile");

// Human-like random delay
function delay(minMs: number, maxMs: number): Promise<void> {
  const ms = Math.floor(Math.random() * (maxMs - minMs)) + minMs;
  return new Promise((r) => setTimeout(r, ms));
}

// Type like a human - random speed per keystroke
async function humanType(page: Page, selector: string, text: string) {
  await page.click(selector);
  for (const char of text) {
    await page.keyboard.type(char, { delay: Math.random() * 100 + 30 });
  }
}

export interface PostData {
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  subcategory: string;
  email: string;
  images?: string[];
}

export interface PostResult {
  success: boolean;
  url?: string;
  error?: string;
  needsCaptcha?: boolean;
  needsEmailVerify?: boolean;
}

export async function postToCraigslist(data: PostData): Promise<PostResult> {
  let browser: BrowserContext | null = null;

  try {
    // Launch visible browser with persistent profile
    browser = await chromium.launchPersistentContext(USER_DATA_DIR, {
      headless: false,
      viewport: { width: 1280, height: 900 },
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      args: [
        "--disable-blink-features=AutomationControlled",
        "--no-sandbox",
      ],
    });

    const page = browser.pages()[0] || (await browser.newPage());

    // Navigate to Craigslist posting page
    const clCity = data.location.toLowerCase().replace(/[^a-z]/g, "") || "springfield";
    await page.goto(`https://${clCity}.craigslist.org/`, {
      waitUntil: "domcontentloaded",
    });
    await delay(2000, 4000);

    // Click "post to classifieds"
    const postLink = page.locator('a:has-text("post to classifieds"), a[href*="post.craigslist"]');
    if (await postLink.count() > 0) {
      await postLink.first().click();
    } else {
      await page.goto(`https://post.craigslist.org/c/${clCity}`);
    }
    await delay(2000, 5000);

    // Select category - "service offered"
    const serviceRadio = page.locator('input[value="so"], label:has-text("service offered")');
    if (await serviceRadio.count() > 0) {
      await serviceRadio.first().click();
      await delay(1000, 2000);
    }

    // Click continue/next
    const continueBtn = page.locator('button:has-text("continue"), button.continue, input[type="submit"]');
    if (await continueBtn.count() > 0) {
      await continueBtn.first().click();
      await delay(2000, 4000);
    }

    // Select subcategory if visible
    const subCat = page.locator(`input[value="${data.subcategory}"], label:has-text("computer")`);
    if (await subCat.count() > 0) {
      await subCat.first().click();
      await delay(1000, 2000);
      const nextBtn = page.locator('button:has-text("continue"), input[type="submit"]');
      if (await nextBtn.count() > 0) {
        await nextBtn.first().click();
        await delay(2000, 4000);
      }
    }

    // Fill in the posting form
    const titleInput = page.locator('input[name="PostingTitle"], #PostingTitle');
    if (await titleInput.count() > 0) {
      await humanType(page, 'input[name="PostingTitle"]', data.title);
      await delay(500, 1500);
    }

    // Description
    const descInput = page.locator('textarea[name="PostingBody"], #PostingBody');
    if (await descInput.count() > 0) {
      await descInput.click();
      await page.keyboard.type(data.description, { delay: 10 });
      await delay(500, 1500);
    }

    // Price
    const priceInput = page.locator('input[name="price"]');
    if (await priceInput.count() > 0 && data.price > 0) {
      await humanType(page, 'input[name="price"]', String(data.price));
      await delay(500, 1000);
    }

    // Location
    const locInput = page.locator('input[name="geographic_area"], input[name="city"]');
    if (await locInput.count() > 0) {
      await locInput.first().click();
      await page.keyboard.type(data.location, { delay: Math.random() * 100 + 30 });
      await delay(500, 1000);
    }

    // Email
    const emailInput = page.locator('input[name="FromEMail"], input[type="email"]');
    if (await emailInput.count() > 0) {
      await emailInput.first().click();
      await page.keyboard.type(data.email, { delay: Math.random() * 100 + 30 });
      await delay(500, 1000);
    }

    // PAUSE HERE - let user handle CAPTCHA and submit
    console.log("\n┌─────────────────────────────────────────────┐");
    console.log("│  📋 Form filled! Please:                    │");
    console.log("│  1. Review the post                         │");
    console.log("│  2. Solve CAPTCHA if shown                  │");
    console.log("│  3. Click Submit / Continue                 │");
    console.log("│  4. Verify via email when prompted          │");
    console.log("│                                             │");
    console.log("│  The browser will stay open.                │");
    console.log("│  Press Enter here when done posting.        │");
    console.log("└─────────────────────────────────────────────┘\n");

    // Wait for user to complete manually
    await new Promise<void>((resolve) => {
      process.stdin.once("data", () => resolve());
    });

    return {
      success: true,
      needsCaptcha: true,
      needsEmailVerify: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
