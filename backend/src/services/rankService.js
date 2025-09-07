export function rankResults(results) {
  // simple deduplication by src
  const seen = new Set();
  return results.filter(r => {
    if (seen.has(r.src)) return false;
    seen.add(r.src);
    return true;
  });
}