import nodemailer from "nodemailer";

const host =
  process.env.SMTP_HOST || "smtp.gmail.com";

const port =
  Number(process.env.SMTP_PORT) || 465;

const secure =
  String(
    process.env.SMTP_SECURE || "true"
  ).toLowerCase() === "true";

const user =
  process.env.SMTP_USER;

const password =
  process.env.SMTP_PASSWORD;

const notificationEmail =
  process.env.MAVEN_NOTIFICATION_EMAIL;

if (!user) {
  console.warn(
    "SMTP_USER is not configured."
  );
}

if (!notificationEmail) {
  console.warn(
    "MAVEN_NOTIFICATION_EMAIL is not configured."
  );
}

function getTransporter() {
  if (!user || !password) {
    throw new Error(
      "SMTP configuration is incomplete."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,

    auth: {
      user,
      pass: password,
    },
  });
}

type FeasibilityEmailData = {
  enquiryId: string;

  contact: {
    name: string;
    email: string;
    phone: string;
  };

  project: {
    name: string;
    location: string;
    space: string;
  };

  requirement: {
    quantity: string;
    timeline: string;
    notes: string;
  };

  concept: {
    number: string;
    title: string;
    subtitle: string;
  };
};

export async function sendFeasibilityNotification(
  data: FeasibilityEmailData
) {
  if (!notificationEmail) {
    throw new Error(
      "MAVEN_NOTIFICATION_EMAIL is not configured."
    );
  }

  const transporter =
    getTransporter();

  const subject =
    `New Maven Feasibility Request · ${data.enquiryId}`;

  const text = `
MAVEN DECORATIVES

NEW FEASIBILITY & PRICING REQUEST
========================================

Enquiry ID:
${data.enquiryId}


CONTACT
========================================

Name:
${data.contact.name}

Email:
${data.contact.email}

Phone:
${data.contact.phone || "Not provided"}


PROJECT
========================================

Project:
${data.project.name}

Location:
${data.project.location || "Not specified"}

Space:
${data.project.space || "Not specified"}


SELECTED MAVEN CONCEPT
========================================

Direction:
${data.concept.number} · ${data.concept.title}

${data.concept.subtitle}


PROJECT REQUIREMENT
========================================

Approximate Quantity:
${data.requirement.quantity || "Not specified"}

Required Timeline:
${data.requirement.timeline || "Not specified"}

Additional Notes:
${data.requirement.notes || "None"}


========================================

Reply directly to this email to contact the architect.

MAVEN Decoratives
Design + Contract Manufacturing
Bespoke Decorative Lighting
`.trim();

  await transporter.sendMail({
    from: user,
    to: notificationEmail,
    replyTo: data.contact.email,

    subject,

    text,
  });
}