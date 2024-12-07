const items = [
    {
        id: 1,
        title: "1. Introduction",
        content:
        'Welcome to MetricsLM ("Company", "we", "our", or "us"). These Terms and Conditions ("Terms") govern your use of our platform, services, website, and any related software or content ("Services"). By accessing or using our Services, you signify that you have read, understood, and agree to be legally bound by these Terms. If you do not agree to these Terms, you are expressly prohibited from using our Services and must discontinue use immediately.'
    },
    {
        id: 2,
        title: "2. Eligibility",
        content:
            "You affirm that you are at least 18 years of age and fully able to enter into, abide by, and comply with these Terms. Use of the Services is void where prohibited. You represent and warrant that your use of MetricsLM complies with applicable laws and regulations in the United Kingdom, European Union, and the United States.",
    },
    {
        id: 3,
        title: "3. User Accounts and Responsibilities",
        content:
            "To access our Services, you are required to create an account, and you must provide accurate, complete, and updated information. You are solely responsible for maintaining the confidentiality of your credentials and for all activities that occur under your account. Should you suspect unauthorized activity, you must immediately notify us in writing at support@metricslm.com. Failure to maintain the confidentiality of your account may result in the suspension or termination of your access.",
    },
    {
        id: 4,
        title: "4. Acceptable Use and Prohibited Activities",
        content:
            "You shall use the Services strictly in accordance with these Terms and applicable laws. Any unauthorized use is expressly prohibited. You agree that you will not Use the Services in any manner that could damage, disable, or impair our operations. Attempt to gain unauthorized access to our systems or networks. Attempt to gain information on other companies or entities. Engage in any unlawful activities, including but not limited to data scraping, infringement of intellectual property, or distribution of harmful software.",
    },
    {
        id: 5,
        title: "5. Data Collection and Privacy",
        content:
            "MetricsLM adheres to the highest standards of data protection as required by the General Data Protection Regulation (GDPR), the Data Protection Act 2018, and the California Consumer Privacy Act (CCPA). All personal data collected will be handled in accordance with our Privacy Policy. By using the Services, you consent to such processing and warrant that all provided data is accurate.",
    },
    {
        id: 6,
        title: "6. Intellectual Property Rights",
        content:
            "All content, features, functionality, and intellectual property within the Services, including but not limited to trademarks, service marks, software, text, and graphics, are owned by MetricsLM or its licensors and are protected under applicable copyright, trademark, and intellectual property laws. Unauthorized reproduction, modification, distribution, or use is strictly prohibited without prior written consent.",
    },
    {
        id: 7,
        title: "7. Subscription, Fees, and Payment Terms",
        content:
            "Access to certain features of MetricsLM requires a subscription, which may be subject to fees. By subscribing, you agree to pay all applicable charges at the prices set forth on our pricing page. Users are responsible for any third-party fees, such as those relating to integrated services like ChatGPT, Google Analytics, Microsoft Clarity, and HotJar. We reserve the right to adjust pricing and payment terms, and users will be notified of any changes in advance.",
    },
    {
        id: 8,
        title: "8. Third-Party Integrations and User Authority",
        content:
            "MetricsLM offers integrations with various third-party services for enhanced functionality. You represent and warrant that you are authorized to use any API keys and authentication methods on behalf of the company or entity you represent. By using our Services, you confirm that you have the authority to provide these credentials. MetricsLM will use the provided API keys solely to ensure the proper functioning of the integrations, and we disclaim any liability for damages, excess charges, or other costs incurred due to improper use or excessive activity. MetricsLM limits its liability for any usage above normal expectations performed by users. MetricsLM is not responsible for any data leaks or technical issues related to any third party integrated in the platform.",
    },
    {
        id: 9,
        title: "9. Limitation of Liability",
        content:
            "To the maximum extent permitted by law, MetricsLM and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or related to your use or inability to use the Services. MetricsLM’s total liability for any claim under these Terms shall not exceed the amount you paid to us for use of the Services during the twelve-month period preceding the event that gave rise to the claim.",
    },
    {
        id: 10,
        title: "10. Indemnification",
        content:
            "You agree to indemnify, defend, and hold harmless MetricsLM, its affiliates, officers, directors, employees, agents, and licensors from any and all claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising from or related to your use of the Services, breach of these Terms, or violation of any applicable law.",
    },
    {
        id: 11,
        title: "11. Modifications to Terms",
        content:
            "MetricsLM reserves the right to modify these Terms at any time. Such modifications will be effective upon posting the updated Terms on our website. You are responsible for reviewing these Terms periodically for changes. Continued use of the Services after modifications constitute your acceptance of the updated Terms.",
    },
    {
        id: 12,
        title: "12. Governing Law and Jurisdiction",
        content:
            "These Terms shall be governed by and construed in accordance with the laws of the United Kingdom, the European Union, and the United States, without regard to conflict of law principles. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales, as well as applicable jurisdictions within the EU and USA.",
    },
    {
        id: 13,
        title: "13. Termination",
        content:
            "MetricsLM may suspend or terminate your account and access to the Services at any time, without notice, for conduct that we believe violates these Terms, our policies, or is harmful to our interests. Upon termination, your right to use the Services will immediately cease.",
    },
    {
        id: 14,
        title: "14. Contact Information",
        content:
            "If you have any questions, concerns, or require further clarification regarding these Terms, please contact us at: support@metricslm.com.",
    },
    {
        id: 15,
        title: "15. Entire Agreement",
        content:
            "These Terms, together with our Privacy Policy, constitute the entire agreement between you and MetricsLM concerning the use of our Services, superseding any prior agreements or understandings.",
    },
    {
        id: 16,
        title: "16. Severability",
        content:
            "If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the Terms will otherwise remain in full force and effect.",
    },
];

export const Terms = () => {
    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-gray-50 p-5">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-y-auto p-6 space-y-8">
                <h1 className="text-3xl font-bold border-b pb-3 text-[#000000]">
                    Terms and Conditions
                </h1>
                <p>Last update: 1 October 2024</p>
                {items.map((item) => (
                    <div key={item.id} className="space-y-3">
                        <h2 className="text-xl font-semibold text-[#4B5162]">
                            {item.title}
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {item.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
