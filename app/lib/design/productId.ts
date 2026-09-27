export function createMavenConceptId(
  projectName: string
): string {
  const projectCode =
    projectName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 3)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "MAVEN";

  const date = new Date();

  const year =
    String(date.getFullYear()).slice(-2);

  const month =
    String(date.getMonth() + 1).padStart(
      2,
      "0"
    );

  const random =
    Math.floor(
      1000 + Math.random() * 9000
    );

  return `MAVEN-${projectCode}-${year}${month}-${random}`;
}