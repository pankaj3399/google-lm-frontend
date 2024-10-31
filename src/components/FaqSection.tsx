// import React from 'react';
// import { FaqItem } from './ui/faqItem';

// interface FaqData {
//   question: string;
//   answer: string;
// }

// const faqs: FaqData[] = [
//   {
//     question: "Do I need to know how to code or know a lot about AI?",
//     answer: "Nope! You don't need to know how to code or be an AI expert. MetricsLM is designed to be user-friendly, so you can easily get the insights you need without any technical skills."
//   },
//   {
//     question: "How is MetricsLM pricing structured? Any hidden fees?",
//     answer: "Our pricing is straightforward, with no hidden costs. You only pay for what you use: we connect to tools like ChatGPT, Google Analytics, Microsoft Clarity, and HotJar, and you're billed according to their usage. We make sure to minimize these costs by processing the data efficiently, saving you money in the long run."
//   },
//   {
//     question: "Can I integrate MetricsLM with my current analytics tools?",
//     answer: "Yes! MetricsLM easily integrates with popular tools like Google Analytics, HotJar, and Microsoft Clarity. You can bring all your data together in one place, so you can get a full picture and make informed decisions without the hassle."
//   },
//   {
//     question: "How can I work on analytics reports with MetricsLM?",
//     answer: "With MetricsLM, reports are part of customizable templates that use all the data saved in your workspace, including notes and sources. This helps you focus on the insights that matter most—improving your website, increasing traffic, and reducing drop-offs."
//   },
//   {
//     question: "How does MetricsLM's AI help reduce drop-offs and improve UX?",
//     answer: "Our AI analyzes your data to identify where users are dropping off and why. This helps you make changes that improve the user experience—like adjusting page flow or fixing confusing sections—leading to happier users and fewer drop-offs."
//   },
//   {
//     question: "Can I interact with the gathered data?",
//     answer: "Absolutely! First, you gather data from your analytics platforms. Then, you interact with our AI to refine and craft a data set that meets your needs. Once you're satisfied, you save it as a \"Saved response.\" You can also add notes and even use AI to enhance those notes—keeping everything organized and ensuring you have the best insights without needing constant API calls."
//   }
// ];

// const FaqSection: React.FC = () => {
//   return (
//     <section data-layername="faqSection3" className="flex overflow-hidden flex-col items-center px-8 pt-32 pb-28 w-full bg-white max-md:px-5 max-md:py-24 max-md:max-w-full">
//       <div data-layername="container" className="flex flex-wrap gap-12 items-start w-full max-w-[1204px] max-md:max-w-full">
//         <div data-layername="secitonHeadlingLevel11" className="flex flex-col flex-1 shrink pr-10 text-base text-gray-600 basis-0 max-w-[476px] min-w-[360px] max-md:max-w-full">
//           <div className="flex flex-col w-full max-md:max-w-full">
//             <div data-layername="smallEyebrowTagLabelStyle1" className="flex gap-2 items-center self-start px-3 py-2 font-medium leading-relaxed text-center whitespace-nowrap bg-white rounded-3xl border border-solid shadow border-slate-300">
//               <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/da1551cc8b91c976fdb49c0fa63f590c0bf2cb5e0338da5ec52d6eeb8dee00a5?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95" alt="" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" />
//               <p data-layername="content" className="self-stretch my-auto">
//                 FAQ
//               </p>
//             </div>
//             <h2 data-layername="headingWrapper" className="flex-1 shrink gap-2 self-stretch mt-4 w-full text-4xl font-bold leading-10 text-neutral-800 max-md:max-w-full">
//               Frequently asked questions
//             </h2>
//             <div data-layername="descrWrapper" className="flex gap-2 items-center pr-6 mt-4 w-full leading-7 max-md:pr-5 max-md:max-w-full">
//               <p data-layername="description" className="flex-1 shrink self-stretch my-auto opacity-80 basis-0">
//                 Find answers to common questions about MetricsLM, including its features, security measures, integration options, and more.
//               </p>
//             </div>
//           </div>
//         </div>
//         <div data-layername="list" className="flex flex-col flex-1 shrink basis-10 min-w-[360px] max-md:max-w-full">
//           {faqs.map((faq, index) => (
//             <FaqItem
//               key={index}
//               question={faq.question}
//               answer={faq.answer}
//               className={index > 0 ? 'mt-6' : ''}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FaqSection;