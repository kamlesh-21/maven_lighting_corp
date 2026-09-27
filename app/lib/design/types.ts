// app/lib/design/types.ts
export type DesignIntent = {
  project: {
    name: string;
    location: string;
    space: string;
  };

  application: string[];
  atmosphere: string[];
  materials: string[];
  fixture: string[];

  reference: {
    fileName: string;
    imageUrl: string;
    notes: string;
  };

  scale: string;
};

export type DesignInterpretation = {
  designCharacter: string;
  formDirection: string;
  materialDirection: string;
  proportionAndScale: string;
  lightingCharacter: string;
  visualLanguage: string;
  referenceInterpretation: string;
  architecturalIntent: string;
  generationDirection: string;
};

export type DesignConcept = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  form: string;
  material: string;
  lighting: string;
  architecturalRole: string;
  generationPrompt: string;
  visualType: "sculptural" | "layered" | "crafted";
  imageUrl?: string;
};

export type ConceptGenerationResult = {
  concepts: DesignConcept[];
};