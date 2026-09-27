// app/components/ConceptVisual.tsx
"use client";

type ConceptVisualProps = {
  type: "sculptural" | "layered" | "crafted";
  imageUrl?: string;
  title?: string;
};

export default function ConceptVisual({
  type,
  imageUrl,
  title,
}: ConceptVisualProps) {
  if (imageUrl) {
    return (
      <div className="concept-visual concept-visual-image">
        <img
          src={imageUrl}
          alt={
            title
              ? `${title} Maven lighting concept`
              : "Maven lighting concept"
          }
          className="concept-generated-image"
        />
      </div>
    );
  }

  /*
   * Temporary fallback.
   *
   * This allows the page to remain visually intact if an image
   * is unavailable during development.
   */

  if (type === "sculptural") {
    return (
      <div className="concept-visual concept-visual-sculptural">
        <div className="sculptural-outer" />
        <div className="sculptural-middle" />
        <div className="sculptural-inner" />
        <div className="concept-light" />
      </div>
    );
  }

  if (type === "layered") {
    return (
      <div className="concept-visual concept-visual-layered">
        <div className="layer layer-one" />
        <div className="layer layer-two" />
        <div className="layer layer-three" />
        <div className="layer layer-four" />
        <div className="concept-light" />
      </div>
    );
  }

  return (
    <div className="concept-visual concept-visual-crafted">
      <div className="crafted-frame">
        <div className="crafted-core" />
        <div className="crafted-detail crafted-detail-one" />
        <div className="crafted-detail crafted-detail-two" />
        <div className="crafted-detail crafted-detail-three" />
      </div>

      <div className="concept-light" />
    </div>
  );
}