"use client";

import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

import type {
  DesignConcept,
  DesignIntent,
} from "@/app/lib/design/types";

import ConceptVisual from "@/app/components/ConceptVisual";
import { createMavenConceptId } from "@/app/lib/design/productId";

type ConceptWorkspaceProps = {
  concept: DesignConcept;
  designIntent: DesignIntent;
  onRequestFeasibility: () => void;
};

export default function ConceptWorkspace({
  concept,
  designIntent,
  onRequestFeasibility,
}: ConceptWorkspaceProps) {
  const [conceptId, setConceptId] =
    useState("");

  const [saved, setSaved] =
    useState(false);

  const [isDownloading, setIsDownloading] =
    useState(false);

  useEffect(() => {
    const id = createMavenConceptId(
      designIntent.project.name ||
        "Maven Project"
    );

    setConceptId(id);
  }, [designIntent.project.name]);

  const handleSave = () => {
    if (!conceptId) {
      return;
    }

    try {
      localStorage.setItem(
        `maven-concept-${conceptId}`,
        JSON.stringify({
          concept,
          designIntent,
          conceptId,
          savedAt:
            new Date().toISOString(),
        })
      );

      setSaved(true);
    } catch (error) {
      console.error(
        "Unable to save Maven concept:",
        error
      );
    }
  };

  const handleDownload = async () => {
    if (
      !conceptId ||
      !concept.imageUrl
    ) {
      return;
    }

    try {
      setIsDownloading(true);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth =
        pdf.internal.pageSize.getWidth();

      const pageHeight =
        pdf.internal.pageSize.getHeight();

      const margin = 18;

      pdf.setProperties({
        title: `Maven Concept ${conceptId}`,
        subject:
          "Maven Decoratives concept direction",
        author:
          "Maven Decoratives",
        creator:
          "Maven Decoratives",
      });

      /*
       * Header
       */

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.setTextColor(23, 23, 23);

      pdf.text(
        "MAVEN",
        margin,
        18
      );

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(119, 115, 108);

      pdf.text(
        "DECORATIVES",
        margin,
        23
      );

      pdf.setDrawColor(
        222,
        219,
        212
      );

      pdf.line(
        margin,
        28,
        pageWidth - margin,
        28
      );

      /*
       * Project heading
       */

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.setTextColor(119, 115, 108);

      pdf.text(
        "MAVEN CONCEPT",
        margin,
        39
      );

      pdf.setFontSize(19);
      pdf.setTextColor(23, 23, 23);

      pdf.text(
        concept.title,
        margin,
        49
      );

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(119, 115, 108);

      pdf.text(
        concept.subtitle,
        margin,
        56
      );

      /*
       * Concept ID
       */

      pdf.setFontSize(8);
      pdf.setTextColor(119, 115, 108);

      pdf.text(
        "CONCEPT ID",
        pageWidth - margin - 42,
        39
      );

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.setTextColor(23, 23, 23);

      pdf.text(
        conceptId,
        pageWidth - margin - 42,
        45
      );

      /*
       * Image
       */

      const imageX = margin;
      const imageY = 66;
      const imageSize =
        pageWidth - margin * 2;

      pdf.addImage(
        concept.imageUrl,
        "PNG",
        imageX,
        imageY,
        imageSize,
        imageSize
      );

      let cursorY =
        imageY + imageSize + 12;

      /*
       * Project information
       */

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      pdf.setTextColor(119, 115, 108);

      pdf.text(
        "PROJECT",
        margin,
        cursorY
      );

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(23, 23, 23);

      pdf.text(
        designIntent.project.name ||
          "Not specified",
        margin,
        cursorY + 6
      );

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      pdf.setTextColor(119, 115, 108);

      pdf.text(
        "LOCATION",
        90,
        cursorY
      );

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(23, 23, 23);

      pdf.text(
        designIntent.project.location ||
          "Not specified",
        90,
        cursorY + 6
      );

      cursorY += 18;

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      pdf.setTextColor(119, 115, 108);

      pdf.text(
        "SPACE",
        margin,
        cursorY
      );

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(23, 23, 23);

      pdf.text(
        designIntent.project.space ||
          "Not specified",
        margin,
        cursorY + 6
      );

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      pdf.setTextColor(119, 115, 108);

      pdf.text(
        "SCALE",
        90,
        cursorY
      );

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(23, 23, 23);

      pdf.text(
        designIntent.scale ||
          "Not specified",
        90,
        cursorY + 6
      );

      /*
       * Second page
       */

      pdf.addPage();

      cursorY = 20;

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.setTextColor(119, 115, 108);

      pdf.text(
        "MAVEN DESIGN DIRECTION",
        margin,
        cursorY
      );

      cursorY += 10;

      const addSection = (
        label: string,
        text: string
      ) => {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(8);
        pdf.setTextColor(119, 115, 108);

        pdf.text(
          label,
          margin,
          cursorY
        );

        cursorY += 6;

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.setTextColor(23, 23, 23);

        const lines =
          pdf.splitTextToSize(
            text,
            pageWidth - margin * 2
          );

        pdf.text(
          lines,
          margin,
          cursorY
        );

        cursorY +=
          lines.length * 4.5 + 9;
      };

      addSection(
        "DESCRIPTION",
        concept.description
      );

      addSection(
        "FORM",
        concept.form
      );

      addSection(
        "MATERIAL",
        concept.material
      );

      addSection(
        "LIGHTING",
        concept.lighting
      );

      addSection(
        "ARCHITECTURAL ROLE",
        concept.architecturalRole
      );

      addSection(
        "APPLICATION",
        designIntent.application.join(
          ", "
        ) || "Not specified"
      );

      addSection(
        "ATMOSPHERE",
        designIntent.atmosphere.join(
          ", "
        ) || "Not specified"
      );

      addSection(
        "MATERIAL PREFERENCE",
        designIntent.materials.join(
          ", "
        ) || "Not specified"
      );

      addSection(
        "FIXTURE DIRECTION",
        designIntent.fixture.join(
          ", "
        ) || "Not specified"
      );

      /*
       * Footer / disclaimer
       */

      const footerY =
        pageHeight - 28;

      pdf.setDrawColor(
        222,
        219,
        212
      );

      pdf.line(
        margin,
        footerY - 8,
        pageWidth - margin,
        footerY - 8
      );

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7);
      pdf.setTextColor(119, 115, 108);

      const disclaimer =
        "AI-generated concept-stage visual and information. Final dimensions, materials, construction, technical details and manufacturability are subject to Maven feasibility review.";

      const disclaimerLines =
        pdf.splitTextToSize(
          disclaimer,
          pageWidth - margin * 2
        );

      pdf.text(
        disclaimerLines,
        margin,
        footerY
      );

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      pdf.setTextColor(23, 23, 23);

      pdf.text(
        "MAVEN Decoratives",
        margin,
        pageHeight - 10
      );

      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(119, 115, 108);

      pdf.text(
        "Design + Contract Manufacturing | Bespoke Decorative Lighting",
        65,
        pageHeight - 10
      );

      pdf.save(
        `${conceptId}-Maven-Concept.pdf`
      );
    } catch (error) {
      console.error(
        "Unable to generate Maven concept PDF:",
        error
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section
      className="section concept-workspace"
      id="maven-concept"
    >
      <div className="section-heading">
        <div className="section-number">
          10 / MAVEN CONCEPT
        </div>

        <div>
          <h2>
            Now the idea has a direction.
          </h2>

          <p>
            This concept captures the
            direction selected for the
            project. Maven can now take
            it forward into feasibility,
            refinement and pricing.
          </p>
        </div>
      </div>

      <div className="concept-workspace-header">
        <div>
          <span className="concept-workspace-label">
            MAVEN CONCEPT ID
          </span>

          <div className="concept-id">
            {conceptId ||
              "Creating concept ID..."}
          </div>
        </div>

        <div className="concept-status">
          CONCEPT DIRECTION
        </div>
      </div>

      <div className="concept-workspace-main">
        <div className="concept-workspace-visual">
          <div className="concept-workspace-number">
            {concept.number}
          </div>

          <div className="concept-workspace-image">
            <ConceptVisual
              type={concept.visualType}
              imageUrl={concept.imageUrl}
              title={concept.title}
            />
          </div>
        </div>

        <div className="concept-workspace-information">
          <div className="concept-workspace-direction">
            <span>
              MAVEN DIRECTION
            </span>

            <h3>
              {concept.title}
            </h3>

            <p>
              {concept.subtitle}
            </p>
          </div>

          <div className="concept-workspace-description">
            <p>
              {concept.description}
            </p>
          </div>

          <div className="concept-spec-grid">
            <div>
              <span>FORM</span>
              <p>
                {concept.form}
              </p>
            </div>

            <div>
              <span>MATERIAL</span>
              <p>
                {concept.material}
              </p>
            </div>

            <div>
              <span>LIGHT</span>
              <p>
                {concept.lighting}
              </p>
            </div>

            <div>
              <span>
                ARCHITECTURAL ROLE
              </span>
              <p>
                {concept.architecturalRole}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="concept-project-context">
        <div>
          <span>PROJECT</span>
          <p>
            {designIntent.project.name ||
              "Not specified"}
          </p>
        </div>

        <div>
          <span>LOCATION</span>
          <p>
            {designIntent.project.location ||
              "Not specified"}
          </p>
        </div>

        <div>
          <span>SPACE</span>
          <p>
            {designIntent.project.space ||
              "Not specified"}
          </p>
        </div>

        <div>
          <span>SCALE</span>
          <p>
            {designIntent.scale ||
              "Not specified"}
          </p>
        </div>
      </div>

      <div className="concept-downloads">
        <div>
          <span>
            CONCEPT FILES
          </span>

          <h4>
            Keep the direction for your
            project.
          </h4>

          <p>
            Save the concept to this
            browser or download a
            professional Maven concept
            sheet.
          </p>
        </div>

        <div className="concept-download-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={handleSave}
          >
            {saved
              ? "Concept Saved"
              : "Save Concept"}
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading
              ? "Preparing PDF..."
              : "Download Concept PDF"}
          </button>
        </div>
      </div>

      <div className="concept-feasibility">
        <div>
          <span>NEXT STEP</span>

          <h3>
            Take this concept into
            feasibility.
          </h3>

          <p>
            Maven can review the selected
            direction against dimensions,
            materials, construction,
            installation requirements,
            quantities and project
            timelines before preparing a
            commercial proposal.
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={
            onRequestFeasibility
          }
        >
          Request Feasibility &amp;
          Pricing
        </button>
      </div>

      <p className="concept-disclaimer">
        Concept-stage information only.
        Final dimensions, materials,
        construction, technical details
        and manufacturability are subject
        to Maven feasibility review.
      </p>
    </section>
  );
}