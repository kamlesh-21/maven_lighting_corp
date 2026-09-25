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