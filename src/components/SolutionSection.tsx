import React from 'react';
import { SolutionCard } from './ui/solutionCard';

interface SolutionData {
  icon: string;
  title: string;
  description: string;
  field: string;
}

const solutions: SolutionData[] = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d6ba8a9edc9551fdf44a3f1c8592c5832c348cccd047b045c3b95de1945a2498?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95",
    title: "User Behavior Trends",
    description: "Combine heatmaps, and session replays to highlight user behavior, helping enhance engagement and usability.",
    field: "Finance, Retail, E-commerce"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/09a3c6345a17e24c97674683984679be634ca5c929435b3e77947103f4c8f61d?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95",
    title: "Cross-Platform Analysis",
    description: "Integrate data from multiple platforms into one view to simplify decision-making on user behavior and site performance.",
    field: "E-commerce, Retail, Sales"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/76fdc281950fb20bd598c5546ff3bb3d40e2e6aca174def59678268c1e9715a6?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95",
    title: "Campaign Performance",
    description: "Provide campaign insights, enabling teams to adjust strategies quickly based on the most current data.",
    field: "Marketing, Sales, Operations"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c82388837ed748898a43320e86c0206e1de926d8f292c6704396688bf604dbaf?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95",
    title: "CRO",
    description: "Identify funnel issues using data analysis, helping businesses reduce drop-offs and improve conversions efficiently.",
    field: "E-commerce, Logistics, Supply Chain"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/cfbcf5241c3da347bf46b8fa0a4cf6723a4e3fd0a40a394445925fd419673db3?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95",
    title: "Data Consolidation",
    description: "Automate data aggregation across platforms, enabling analysts to focus on insights instead of manual data collection",
    field: "Finance, Healthcare, Legal"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/15750f9cf2eec8085e4fb4c769bfbf10126afc57f2cc02748eba397f5034f0dd?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95",
    title: "Audience Segmentation",
    description: "Create a 360-degree view of customer segments for targeted personalization and improved UX across segments.",
    field: "Design, Development, Project Management"
  }
];

const SolutionSection: React.FC = () => {
  return (
    <section data-layername="solutionSection1" className="flex overflow-hidden flex-col items-center px-8 pt-10 pb-10 w-full bg-white max-md:px-5 max-md:py-24 max-md:max-w-full">
      <div data-layername="container" className="flex flex-col items-center w-full max-w-[1204px] max-md:max-w-full">
        <div data-layername="secitonHeadlingLevel11" className="flex flex-col text-base text-center text-gray-600 max-w-[800px] w-[800px] max-md:max-w-full">
          <div className="flex flex-col items-center w-full max-md:max-w-full">
            <div data-layername="smallEyebrowTagLabelStyle1" className="flex gap-2 items-center px-3 py-2 font-medium leading-relaxed whitespace-nowrap bg-white rounded-3xl border border-solid shadow border-slate-300">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/fca6a06dfd0f3a5211a89604267850cacf9069f1934935456882018489d58572?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95" alt="" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" />
              <p data-layername="content" className="self-stretch my-auto" id='_application'>
                Applications
              </p>
            </div>
            <h2 data-layername="headingWrapper" className="flex-1 shrink gap-2 self-stretch mt-4 w-full text-4xl font-bold leading-none text-neutral-800 max-md:max-w-full">
              Real-world solutions made simple
            </h2>
            <div data-layername="descrWrapper" className="flex gap-2 items-center px-5 mt-4 w-full leading-7 max-w-[820px] max-md:max-w-full">
              <p data-layername="description" className="flex-1 shrink self-stretch my-auto opacity-80 basis-0 max-md:max-w-full">
                Explore advanced business intelligence use cases that streamline operations, predict outcomes, and provide key insights for effective decision-making.
              </p>
            </div>
          </div>
        </div>
        <div data-layername="list" className="flex flex-wrap gap-8 justify-center items-start pb-20 mt-16 w-full max-md:mt-10 max-md:max-w-full">
          <div data-layername="list" className="flex flex-wrap flex-1 shrink gap-8 justify-center items-start w-full basis-0 min-w-[240px] max-md:max-w-full">
            {solutions.map((solution, index) => (
              <SolutionCard
                key={index}
                icon={solution.icon}
                title={solution.title}
                description={solution.description}
                field={solution.field}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;