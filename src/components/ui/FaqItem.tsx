// import React, { useState } from "react";

// interface FaqItemProps {
//   question: string;
//   answer: string;
//   className?: string;
// }

// export const FaqItem: React.FC<FaqItemProps> = ({
//   question,
//   answer,
//   className = "",
// }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div
//       data-layername="faqItemStyle2"
//       className={`flex overflow-hidden flex-col w-full border-b border-slate-300 max-md:max-w-full ${className}`}
//     >
//       <button
//         type='button' // Fixes the type attribute issue
//         data-layername="titleBlock"
//         className="flex flex-wrap gap-4 items-start pr-5 pb-6 w-full max-md:max-w-full"
//         onClick={() => setIsOpen(!isOpen)}
//         aria-expanded={isOpen ? "true" : "false"} // Explicitly sets aria-expanded as a string boolean
//       >
//         <div className="flex gap-2.5 self-stretch py-1.5 w-1 h-full">
//           <div
//             data-layername="line"
//             className="flex flex-1 shrink w-full bg-blue-500 rounded-sm basis-0 min-h-[16px]"
//           />
//         </div>
//         <h3
//           data-layername="faqTitle"
//           className="flex-1 shrink text-xl font-bold leading-none basis-0 text-neutral-800 max-md:max-w-full"
//         >
//           {question}
//         </h3>
//         <div
//           data-layername="iconWrapper"
//           className="flex gap-2 items-start pt-0.5 w-6"
//         >
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/e0b6b1f290e63f0c0adaf757cb9d43ed151093126542de9f0c3b0b2f36671dbc?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95"
//             alt=""
//             className="object-contain w-6 aspect-square"
//           />
//         </div>
//       </button>
//       {isOpen && (
//         <div
//           data-layername="content"
//           className="flex-1 shrink gap-2.5 px-5 pb-5 w-full text-base leading-7 text-gray-600 max-md:max-w-full"
//         >
//           {answer}
//         </div>
//       )}
//     </div>
//   );
// };
