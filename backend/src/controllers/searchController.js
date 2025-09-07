import { googleScraper } from "../services/scrapers/googleScraper.js";
import { rankResults } from "../services/rankService.js";

export async function searchImages(req, res) {
  try {
    const { query, page = 1, perPage = 10 } = req.body;

    // 1. Use original query directly (no LLM rewriting)
    console.log(`🔍 Searching for: "${query}" (page ${page})`);

    // 2. Run scrapers with pagination
    const googleResults = await googleScraper(query, page, perPage);

    // (later add Bing, AliExpress, etc.)
    let allResults = [...googleResults];

    // 3. Deduplicate + rank
    const ranked = rankResults(allResults);

    // 4. Return results with pagination info
    res.json({
      original: query,
      results: ranked,
      pagination: {
        page: parseInt(page),
        perPage: parseInt(perPage),
        hasMore: ranked.length > 0 // Continue loading as long as we get any results
      }
    });
  } catch (err) {
    console.error('❌ Search error:', err.message);
    res.status(500).json({ error: "Search failed" });
  }
}