// "use client";

// import { useEffect } from "react";

// export default function RequirementForm() {
//   useEffect(() => {
//     const scriptId = "hubspot-forms-script";

//     if (document.getElementById(scriptId)) return;

//     const script = document.createElement("script");
//     script.id = scriptId;
//     script.src = "https://js-na2.hsforms.net/forms/embed/247134889.js";
//     script.defer = true;

//     document.body.appendChild(script);

//     return () => {
//       // Keep the HubSpot script available after navigation.
//     };
//   }, []);

//   return (
//     <div
//       className="hs-form-frame"
//       data-region="na2"
//       data-form-id="202c1148-d847-44d6-b2d7-75508393b22e"
//       data-portal-id="247134889"
//     />
//   );
// }

"use client";

import { useEffect, useRef } from "react";

export default function RequirementForm() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const load = () => {
      const scriptId = "hubspot-forms-script";
      if (document.getElementById(scriptId)) return;

      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://js-na2.hsforms.net/forms/embed/247134889.js";
      script.defer = true;
      document.body.appendChild(script);
    };

    if (!("IntersectionObserver" in window)) {
      load();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          load();
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="hs-form-frame"
      data-region="na2"
      data-form-id="202c1148-d847-44d6-b2d7-75508393b22e"
      data-portal-id="247134889"
      style={{ minHeight: 480 }}
    />
  );
}