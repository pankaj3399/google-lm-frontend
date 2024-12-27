const items = [
  {
    id: 1,
    title: "1. Introduction",
    content:
      'MetricsLM ("Company", "we", "our", or "us") is committed to safeguarding your privacy. This Privacy Policy explains how we collect, use, share, and protect your personal information in connection with our services ("Services"). By using our Services, you consent to the data practices outlined in this policy.',
  },
  {
    id: 2,
    title: "2. Information We Collect",
    content:
      "2.1. Personal Information: We collect personal information you provide when creating an account, including but not limited to: Name, Email address, Company information, Authentication credentials (such as usernames and API keys). " +
      "2.2. Usage address, Browser type, Operating system, Pages viewed, clickstream, and the actions taken within our Services. " +
      "2.3. Third-Party Data: MetricsLM integrates with third-party services, such as Google Analytics, Microsoft Clarity, and HotJar. By connecting these services, we collect and process data from these integrations to provide enhanced insights.",
  },
  {
    id: 3,
    title: "3. How We Use Your Information",
    content:
      "We use your information for the following purposes: " +
      "Account Management: To create, maintain, and manage your account. " +
      "Service Delivery: To provide, improve, and personalize our Services. " +
      "Communication: To respond to your inquiries, send updates, and provide support. " +
      "Analytics and Insights: To aggregate and analyze data, offering users insights and actionable recommendations. " +
      "Compliance and Legal Obligations: To comply with applicable laws and regulations, including GDPR, the Data Protection Act 2018, and the California Consumer Privacy Act (CCPA).",
  },
  {
    id: 4,
    title: "4. Legal Basis for Processing (EU Users)",
    content:
      "If you are located in the European Union, we rely on the following legal bases to process your data: " +
      "Performance of a Contract: Processing necessary to provide the Services as agreed upon in our Terms. " +
      "Consent: Where applicable, such as for email marketing. " +
      "Legitimate Interests: To improve our Services, manage communications, and understand user behavior. " +
      "Legal Compliance: Where processing is required to fulfill our legal obligations.",
  },
  {
    id: 5,
    title: "5. Data Sharing and Disclosure",
    content:
      "We do not sell your personal information. We may share your information in the following circumstances: " +
      "Service Providers: We engage trusted third-party vendors to perform functions such as data analysis, hosting, and customer support. These parties are contractually required to safeguard your information. " +
      "Legal Requirements: If required by law, we may disclose your information to comply with any legal process or protect the rights, property, or safety of MetricsLM or others. " +
      "Business Transfers: In the event of a merger, acquisition, or asset sale, your data may be transferred to the new ownership.",
  },
  {
    id: 6,
    title: "6. Data Security",
    content:
      "MetricsLM employs industry-standard measures to protect your data, including encryption, secure servers, and access controls. However, no method of transmission or electronic storage is completely secure, and we cannot guarantee absolute security. Users are responsible for maintaining the security of their account credentials.",
  },
  {
    id: 7,
    title: "7. Data Retention",
    content:
      "We retain your personal information only as long as necessary for the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.",
  },
  {
    id: 8,
    title: "8. Your Data Protection Rights",
    content:
      "8.1. General Rights: Depending on your location, you may have the following rights: " +
      "Access: Request a copy of the information we hold about you. " +
      "Correction: Request correction of any inaccurate data. " +
      "Erasure: Request the deletion of your personal data, under certain conditions. " +
      "Restriction: Request restriction on processing your data. " +
      "Objection: Object to our processing of your personal data. " +
      "Data Portability: Request that we transfer your data to another party. " +
      "8.2. Exercising Your Rights: To exercise these rights, please contact us at support@metricslm.com. We will respond to your request in accordance with applicable laws.",
  },
  {
    id: 9,
    title: "9. Cookies and Tracking Technologies",
    content:
      "We use cookies and similar technologies to enhance user experience, analyze trends, and gather demographic information. You may control the use of cookies through your browser settings. Please note that disabling cookies may limit your use of certain features.",
  },
  {
    id: 10,
    title: "10. International Data Transfers",
    content:
      "MetricsLM operates globally. By using our Services, you agree that your data may be transferred to, processed, and stored outside your country of residence, including the UK, EU, and USA. We take steps to ensure your data is protected in accordance with this Privacy Policy.",
  },
  {
    id: 11,
    title: "11. Children's Privacy",
    content:
      "Our Services are not intended for individuals under 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with their personal data, please contact us so we can delete it.",
  },
  {
    id: 12,
    title: "12. Changes to This Privacy Policy",
    content:
      "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal obligations, or regulatory requirements. You are encouraged to review this page periodically. We will notify you of any significant changes by posting the updated policy and revising the effective date.",
  },
  {
    id: 13,
    title: "13. Contact Information",
    content:
      "If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at: support@metricslm.com.",
  },
];

export const Privacy = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-50 p-5">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-y-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold border-b pb-3 text-[#000000]">
          Privacy policy
        </h1>
        <p>Last update: 1 October 2024</p>
        {items.map((item) => (
          <div key={item.id} className="space-y-3">
            <h2 className="text-xl font-semibold text-[#4B5162]">
              {item.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
