export type ProcessStageId = "brand" | "wireframe" | "concept" | "approved";
export type ProcessStepId = "inputs" | "homepage" | "review" | "payment" | "build";

export type ProcessStage = {
  id: ProcessStageId;
  number: string;
  title: string;
  text: string;
};

export type ProcessStep = {
  id: ProcessStepId;
  stageId: ProcessStageId;
  number: string;
  title: string;
  text: string;
};

export const processValuePoints = [
  "No upfront lock-in",
  "Fast concept turnaround",
  "Built around your brand"
];

export const processStages: ProcessStage[] = [
  {
    id: "brand",
    number: "01",
    title: "Brand Kit",
    text: "Logo, color palette, fonts, and direction."
  },
  {
    id: "wireframe",
    number: "02",
    title: "Wireframe",
    text: "Content structure and page layout."
  },
  {
    id: "concept",
    number: "03",
    title: "Homepage Concept",
    text: "A branded homepage preview tailored to your business."
  },
  {
    id: "approved",
    number: "04",
    title: "Approved",
    text: "You approve the concept. Then we move forward."
  }
];

export const processSteps: ProcessStep[] = [
  {
    id: "inputs",
    stageId: "brand",
    number: "01",
    title: "Brand Inputs",
    text: "Share your brand, goals, and inspiration."
  },
  {
    id: "homepage",
    stageId: "concept",
    number: "02",
    title: "Homepage Concept",
    text: "We create a custom homepage direction for you."
  },
  {
    id: "review",
    stageId: "approved",
    number: "03",
    title: "Review & Approval",
    text: "You review, request changes, and approve the concept."
  },
  {
    id: "payment",
    stageId: "approved",
    number: "04",
    title: "Payment",
    text: "Once approved, you make payment to begin."
  },
  {
    id: "build",
    stageId: "concept",
    number: "05",
    title: "Full Build",
    text: "We build your complete website with precision and care."
  }
];

export const processTrustItems = [
  {
    title: "Zero Risk",
    text: "No payment until you approve."
  },
  {
    title: "Fast Turnaround",
    text: "Concept ready in 3-5 business days."
  },
  {
    title: "Dedicated Experts",
    text: "Senior designers. Strategic thinkers."
  },
  {
    title: "Canadian Owned",
    text: "Proudly Canadian. Here to help you grow."
  }
];
