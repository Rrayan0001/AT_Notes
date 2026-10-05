export interface Bm25Doc {
  id: string;
  tokens: string[];
}

const STOPWORDS = new Set([
  "a","an","and","are","as","at","be","but","by","for","from","has","have","how","i","if",
  "in","into","is","it","its","of","on","or","that","the","then","there","these","this",
  "to","was","were","what","when","where","which","who","why","will","with","you","your",
  "do","does","did","not","no","can","could","should","would","about","also","any","all",
  "more","most","some","such","only","own","same","so","than","too","very","just","my",
]);

export function tokenize(text: string): string[] {
  return (text.toLowerCase().match(/[a-z0-9][a-z0-9'+.#-]*/g) ?? [])
    .map((t) => t.replace(/^[.'-]+|[.'-]+$/g, ""))
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

export class Bm25Index {
  private docs: Bm25Doc[] = [];
  private df = new Map<string, number>();
  private docLen: number[] = [];
  private avgLen = 0;

  constructor(k1 = 1.5, b = 0.75) {
    this.k1 = k1;
    this.b = b;
  }

  private k1: number;
  private b: number;

  build(ids: string[], texts: string[]): void {
    this.docs = ids.map((id, i) => ({ id, tokens: tokenize(texts[i]) }));
    this.docLen = this.docs.map((d) => d.tokens.length);
    this.avgLen = this.docLen.reduce((a, b) => a + b, 0) / Math.max(1, this.docs.length);
    this.df.clear();
    for (const d of this.docs) {
      for (const t of new Set(d.tokens)) this.df.set(t, (this.df.get(t) ?? 0) + 1);
    }
  }

  search(query: string): Map<string, number> {
    const qTokens = tokenize(query);
    const scores = new Map<string, number>();
    const N = this.docs.length;
    if (N === 0 || qTokens.length === 0) return scores;

    for (const [i, doc] of this.docs.entries()) {
      const tf = new Map<string, number>();
      for (const t of doc.tokens) tf.set(t, (tf.get(t) ?? 0) + 1);

      let score = 0;
      for (const qt of qTokens) {
        const f = tf.get(qt);
        if (!f) continue;
        const n = this.df.get(qt) ?? 0;
        // Lucene's BM25 idf floor, clamped so ubiquitous terms cannot go negative.
        const idf = Math.max(0.01, Math.log(1 + (N - n + 0.5) / (n + 0.5)));
        const denom = f + this.k1 * (1 - this.b + (this.b * this.docLen[i]) / this.avgLen);
        score += idf * ((f * (this.k1 + 1)) / denom);
      }
      if (score > 0) scores.set(doc.id, score);
    }
    return scores;
  }
}
