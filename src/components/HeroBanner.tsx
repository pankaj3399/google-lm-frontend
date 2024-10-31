import React from 'react';
import { TrialBenefitItem } from './ui/TrialBenefitItem';

interface BenefitData {
  icon: string;
  title: string;
  description: string;
}

const benefits: BenefitData[] = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c1e8a93abcfd33fed81fcbf20d7b248a31c1f13a037c7a064c3e5321837d84da?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95",
    title: "Instant Access",
    description: "Begin exploring MetricsLM's full suite of features immediately"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5e390e69dbc7f6d8e480264503b5a3bb07e320362863dd5fb29ded125dbadb9f?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95",
    title: "No Commitments",
    description: "Automated analysis is not for you? No problem, you can cancel anytime."
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2e84f83f5a7e7f9ba529ae5f9c623b0dc5ea670aac2db51ffa40f3a4ce6652b5?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95",
    title: "Multi-platform support",
    description: "Connect multiple analytics platforms as your integrations in seconds."
  }
];

const HeroBanner: React.FC = () => {
  return (
    <section data-layername="heroBanner03" className="flex flex-col items-center px-8 pt-28 pb-20 w-full bg-white max-md:px-5 max-md:pt-24 max-md:max-w-full">
      <div data-layername="container" className="flex flex-col items-center w-full max-w-[1204px] max-md:max-w-full">
        <div data-layername="contentWrapper" className="flex flex-col text-base text-center text-gray-600 max-w-[860px] w-[860px] max-md:max-w-full">
          <div className="flex flex-col w-full max-md:max-w-full">
            <div data-layername="smallEyebrowTagLabelStyle1" className="flex gap-2 items-center self-center px-3 py-2 font-medium leading-relaxed bg-white rounded-3xl border border-solid shadow border-slate-300 max-md:max-w-full">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/461ce54fb3ec87478556ef6b821789b1e72375948174a5d5032f531ed101b8b6?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95" alt="" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" />
              <p data-layername="content" className="self-stretch my-auto">
                Next-Gen analytics intelligence for BI data experts
              </p>
            </div>
            <h2 data-layername="aiPoweredAnalyticsSimplified" className="mt-5 text-5xl font-bold leading-none text-neutral-800 max-md:max-w-full max-md:text-4xl">
              AI-powered analytics, simplified
            </h2>
            <div data-layername="descrWrapper" className="flex gap-2 items-start px-20 mt-5 w-full leading-7 max-md:px-5 max-md:max-w-full">
              <p data-layername="sayGoodbyeToDataOverloadTurnScatteredMetricsIntoClearActionableInsightsThatDriveEfficientDecisionMakingYouCanTrust" className="flex-1 shrink opacity-80 basis-0 max-md:max-w-full">
                Say goodbye to data overload—turn scattered metrics into clear, actionable insights that drive efficient decision-making you can trust.
              </p>
            </div>
          </div>
        </div>
        <div data-layername="container" className="flex overflow-hidden relative flex-col p-16 mt-16 w-full bg-blue-500 rounded-[32px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div data-layername="heading" className="flex z-0 flex-wrap gap-10 items-start w-full max-md:max-w-full">
            <div data-layername="l" className="flex flex-col flex-1 shrink font-bold text-white basis-0 min-w-[360px] max-md:max-w-full">
              <h3 data-layername="title" className="text-5xl leading-[56px] max-md:max-w-full max-md:text-4xl max-md:leading-[52px]">
                Transform your business intelligence experience with MetricsLM
              </h3>
              <button data-layername="buttonText" className="flex overflow-hidden justify-center items-center self-start px-8 py-4 mt-10 text-base leading-none rounded-xl max-md:px-5">
                <span data-layername="text" className="overflow-hidden self-stretch px-2 my-auto min-h-[24px]">
                  Start your free trial
                </span>
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff5f3c2f38c7488e478b3bd0b4fc258a66495360d8867fad0c6abf1c458ec895?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95" alt="" className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square" />
              </button>
            </div>
            <div data-layername="r" className="flex flex-col min-w-[360px] w-[381px]">
              {benefits.map((benefit, index) => (
                <TrialBenefitItem
                  key={index}
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                  className={index > 0 ? "mt-5" : ""}
                />
              ))}
            </div>
          </div>
          <div data-layername="themeColorOverlayTransition" className="flex absolute inset-0 z-0 w-full bg-blue-500 bg-opacity-10 min-h-[424px]" />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;