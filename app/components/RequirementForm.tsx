"use client";

import { useEffect } from "react";

export default function RequirementForm() {
  useEffect(() => {
    const scriptId = "hubspot-forms-script";

    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://js-na2.hsforms.net/forms/embed/247134889.js";
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      // Keep the HubSpot script available after navigation.
    };
  }, []);

  return (
    <div
      className="hs-form-frame"
      data-region="na2"
      data-form-id="202c1148-d847-44d6-b2d7-75508393b22e"
      data-portal-id="247134889"
    />
  );
}