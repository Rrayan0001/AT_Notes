export interface EvalCase {
  question: string;
  /** Pages a correct answer must draw on. */
  expectPages: number[];
  /** Substrings that should appear in the answer. */
  expectTerms?: string[];
  /** Questions the notes cannot answer — the model must refuse. */
  unanswerable?: boolean;
}

export const CASES: EvalCase[] = [
  {
    question: "How do I calculate the number of valid hosts in a Class C subnet?",
    expectPages: [19],
    expectTerms: ["256", "254"],
  },
  {
    question: "What port does HTTPS use and what does it rely on for encryption?",
    expectPages: [1],
    expectTerms: ["443", "SSL", "TLS"],
  },
  {
    question: "Difference between a hub and a switch?",
    expectPages: [3],
    expectTerms: ["memory", "MAC", "duplex"],
  },
  {
    question: "What is CIDR and what does it replace?",
    expectPages: [5],
    expectTerms: ["classful", "mask"],
  },
  {
    question: "How does a switch handle broadcast compared to a hub?",
    expectPages: [3],
  },
  {
    question: "What is TTL in DNS and why does it matter?",
    expectPages: [16],
    expectTerms: ["TTL"],
  },
  {
    question: "What are the three cloud service models and what does each manage?",
    expectPages: [23, 24],
    expectTerms: ["IaaS", "PaaS", "SaaS"],
  },
  {
    question: "What does the shared responsibility model cover in Azure?",
    expectPages: [25],
  },
  {
    question: "What are the ACID properties?",
    expectPages: [37],
    expectTerms: ["ACID"],
  },
  {
    question: "What is the difference between 3NF and BCNF?",
    expectPages: [40],
    expectTerms: ["3NF", "BCNF"],
  },
  {
    question: "What does the CIA triad stand for?",
    expectPages: [44],
    expectTerms: ["Confidentiality", "Integrity", "Availability"],
  },
  {
    question: "What are the different HTTP status code classes?",
    expectPages: [53],
    expectTerms: ["2xx", "4xx", "5xx"],
  },
  {
    question: "What is the difference between declarative and imperative in Terraform?",
    expectPages: [55],
    expectTerms: ["Declarative", "Imperative"],
  },
  {
    question: "What are the components of a prompt?",
    expectPages: [66],
    expectTerms: ["Instruction", "Context", "Constraints"],
  },
  {
    question: "What is RAG and what are the steps involved?",
    expectPages: [71],
    expectTerms: ["chunk", "embedding", "vector"],
  },
  {
    question: "What are the similarity metrics used with vector search?",
    expectPages: [81],
    expectTerms: ["Cosine", "Dot product", "Euclidean"],
  },
  {
    question: "What are the three encoder architectures for transformers?",
    expectPages: [74, 75],
    expectTerms: ["Encoder", "Decoder"],
  },
  {
    question: "What are the core concepts of LangGraph?",
    expectPages: [76],
    expectTerms: ["Nodes", "Edges", "State"],
  },
  {
    question: "What types of encryption are described in the notes?",
    expectPages: [47],
  },
  {
    question: "How does RAGAS evaluate a RAG application?",
    expectPages: [78],
    expectTerms: ["Faithfulness", "Relevancy", "Precision", "Recall"],
  },
  {
    question: "What is DNS caching?",
    expectPages: [16],
    expectTerms: ["TTL"],
  },
  {
    question: "What is the role of a router and which OSI layer does it operate at?",
    expectPages: [4],
    expectTerms: ["3", "routing table"],
  },
  {
    question: "Which Azure services are listed under core Azure services?",
    expectPages: [26],
  },
  {
    question: "What does Terraform state manage?",
    expectPages: [57],
    expectTerms: ["state"],
  },
  {
    question: "How many workers can be obtained from a Class C network and why?",
    expectPages: [19],
    expectTerms: ["256", "254"],
  },
  {
    question: "What are the private IPv4 ranges?",
    expectPages: [16],
    expectTerms: ["10.", "172.", "192.168"],
  },
  {
    question: "What is a VPN and what is tunneling?",
    expectPages: [18, 19],
    expectTerms: ["IPsec", "Wireguard"],
  },
  {
    question: "What are the different types of cloud deployment models?",
    expectPages: [25],
  },
  {
    question: "How do you find the broadcast address in a subnet?",
    expectPages: [20],
    expectTerms: ["broadcast"],
  },
  {
    question: "What are the Linux directories for configuration and user home?",
    expectPages: [8],
    expectTerms: ["/etc", "/home", "/root"],
  },
  {
    question: "What is a prompt chaining technique?",
    expectPages: [69],
  },
  {
    question: "How do embeddings work?",
    expectPages: [73],
    expectTerms: ["vector", "TF-IDF"],
  },
  {
    question: "What are the prompt design strategies like zero shot and few shot?",
    expectPages: [67],
    expectTerms: ["Zero shot", "Few Shot"],
  },
  {
    question: "What is Pinecone and what are its pros?",
    expectPages: [82],
    expectTerms: ["managed", "Scal"],
  },
  {
    question: "What is FAISS and what are its limitations?",
    expectPages: [81],
    expectTerms: ["FAISS", "metadata", "updates"],
  },
  {
    question: "What does the OSI model physical layer do?",
    expectPages: [2],
    expectTerms: ["Signal", "Bit"],
  },
  {
    question: "What is the difference between TCP and UDP?",
    expectPages: [12],
  },
  {
    question: "What is Azure AD or Entra ID used for?",
    expectPages: [21],
  },
  {
    question: "What are the common types of database attacks?",
    expectPages: [45],
  },
  {
    question: "What is RMAN used for in Oracle?",
    expectPages: [43],
  },
  {
    question: "What are the key functions of AD DS?",
    expectPages: [17],
  },
  {
    question: "What is the AWS architecture overview?",
    expectPages: [33],
  },
  {
    question: "What are the REST API authentication methods?",
    expectPages: [52],
    expectTerms: ["API Key", "Auth"],
  },
  {
    question: "What is the purpose of LangSmith?",
    expectPages: [77],
    expectTerms: ["debug", "monitor"],
  },
];
