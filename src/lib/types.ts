export interface Chunk {
  id: string;
  page: number;
  heading: string;
  sectionPath: string[];
  text: string;
  embedText: string;
}

export interface IndexManifest {
  version: number;
  sourceHash: string;
  embeddingModel: string;
  dim: number;
  count: number;
  builtAt: string;
}

export interface IndexBundle {
  manifest: IndexManifest;
  chunks: Chunk[];
  vectorsB64: string;
}

export interface ScoredChunk {
  chunk: Chunk;
  denseScore: number;
  bm25Score: number;
  rrfScore: number;
  rerankScore?: number;
}

export interface RetrievedSource {
  /** Chunk id, so the UI can highlight the exact cited passage. */
  id: string;
  page: number;
  heading: string;
  text: string;
  rrfScore: number;
  rerankScore?: number;
}

export interface FollowupSuggestion {
  /** Button text shown after an answer. */
  label: string;
  /** Complete question submitted when the button is selected. */
  question: string;
}
