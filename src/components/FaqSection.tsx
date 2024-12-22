import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

const faqItems: FAQItem[] = [
    {
        id: "coding-knowledge",
        question: "Do I need to know how to code or know a lot about AI?",
        answer: "Nope! You don't need to know how to code or be an AI expert. MetricsLM is designed to be user-friendly, so you can easily get the insights you need without any technical skills.",
    },
    {
        id: "pricing",
        question: "How is MetricsLM pricing structured? Any hidden fees?",
        answer: "Our pricing is straightforward, with no hidden costs. You only pay for what you use: we connect to tools like ChatGPT, Google Analytics, Microsoft Clarity, and HotJar, and you're billed according to their usage. We make sure to minimize these costs by processing the data efficiently, saving you money in the long run.",
    },
    {
        id: "integration",
        question: "Can I integrate MetricsLM with my current analytics tools?",
        answer: "Yes! MetricsLM easily integrates with popular tools like Google Analytics, HotJar, and Microsoft Clarity. You can bring all your data together in one place, so you can get a full picture and make informed decisions without the hassle.",
    },
    {
        id: "reports",
        question: "How can I work on analytics reports with MetricsLM?",
        answer: "With MetricsLM, reports are part of customizable templates that use all the data saved in your workspace, including notes and sources. This helps you focus on the insights that matter most—improving your website, increasing traffic, and reducing drop-offs.",
    },
    {
        id: "ai-dropoff",
        question:
            "How does MetricsLM's AI help reduce drop-offs and improve UX?",
        answer: "Our AI analyzes your data to identify where users are dropping off and why. This helps you make changes that improve the user experience—like adjusting page flow or fixing confusing sections—leading to happier users and fewer drop-offs.",
    },
    {
        id: "data-interaction",
        question: "Can I interact with the gathered data?",
        answer: 'Absolutely! First, you gather data from your analytics platforms. Then, you interact with our AI to refine and craft a data set that meets your needs. Once you\'re satisfied, you save it as a "Saved response." You can also add notes and even use AI to enhance those notes—keeping everything organized and ensuring you have the best insights without needing constant API calls.',
    },
];

const FaqSection: React.FC = () => {
    const [openItems, setOpenItems] = useState<string[]>(
        faqItems.map((item) => item.id)
    );

    const toggleItem = (id: string) => {
        setOpenItems((prevOpenItems) =>
            prevOpenItems.includes(id)
                ? prevOpenItems.filter((itemId) => itemId !== id)
                : [...prevOpenItems, id]
        );
    };

    return (
        <div id="_faq" className="flex w-screen  sm:flex-row flex-col justify-between mx-auto px-4 py-3 sm:px-6 lg:px-24 mt-5">
        <div className="flex w-7/12 items-start gap-x-4 p py-12">
            <div className="flex-shrink-0 "></div>
            <div className="">
                <div className="flex flex-col items-center sm:items-start">
                    <div
                        data-layername="smallEyebrowTagLabelStyle1"
                        className="flex  gap-2 items-center px-4 py-3 my-4 sm:px-3 sm:py-2  text-xl sm:text-base font-medium leading-relaxed text-gray-600 whitespace-nowrap bg-white rounded-full border border-solid shadow-xl border-slate-300"
                    >
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fca6a06dfd0f3a5211a89604267850cacf9069f1934935456882018489d58572?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95"
                            alt=""
                            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                        />
                        <p
                            data-layername="content"
                            className="self-stretch "
                        >
                            FAQ
                        </p>
                    </div>
                </div>
                <h2 className="text-4xl sm:text-2xl font-semibold py-4 text-gray-900 ">
                    Frequently asked questions
                </h2>
                <p className="mt-2 sm:text-base text-2xl font-extralight tracking-wide sm:font-normal sm:tracking-normal text-gray-600 w-80">
                    Find answers to common questions about MetricsLM,
                    including its features, security measures, integration
                    options, and more.
                </p>
            </div>
        </div>

        <div className="bg-white sm:w-4/5 rounded-2xl shadow-sm divide-y divide-gray-200 px-6 py-6">
            {faqItems.map((item) => (
                <div
                    key={item.id}
                    className="border-b border-gray-200 last:border-0"
                >
                    <button
                        onClick={() => toggleItem(item.id)}
                        className="flex w-full items-center justify-between py-5 text-left focus:outline-none group"
                        aria-expanded={openItems.includes(item.id)}
                    >
                        <span className="text-2xl sm:text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors flex items-start justify-center gap-2">
                            <img src="/Linewrapper.png" alt="" className="hidden sm:inline-block" /> {item.question}
                        </span>
                        <div
                            className={`ml-6 flex-shrink-0 ${
                                openItems.includes(item.id)
                                    ? "rotate-180"
                                    : ""
                            } transition-transform duration-200`}
                        >
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                        </div>
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            openItems.includes(item.id)
                                ? "max-h-[400px] opacity-100"
                                : "max-h-0 opacity-0"
                        }`}
                    >
                        <p className="pb-5 text-lg sm:text-base tracking-wide sm:tracking-normal  text-gray-900/50 sm:text-gray-600">{item.answer}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="sm:hidden h-[2px] bg-gray-900/30 w-full px-16 my-8"></div>
    </div>
    );
};

export default FaqSection;
