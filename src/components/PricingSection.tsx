import React from 'react';
import { PricingCard } from './ui/pricingCard';

interface PricingPlan {
  type: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isHighlighted?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    type: "Personal",
    price: "$00",
    description: "Basic plan • Billed per user",
    features: [
      "3 accounts",
      "1 analytics integration",
      "2 sources per Workspace",
      "1 Workspace per user",
      "Organisation account"
    ],
    buttonText: "Get 7 days free trial"
  },
  {
    type: "Personal",
    price: "$00",
    description: "Pro plan • Billed per user",
    features: [
      "5 accounts",
      "2 analytics integrations",
      "4 sources per Workspace",
      "5 Workspace per user",
      "Organization account"
    ],
    buttonText: "Get 14 days free trial",
    isHighlighted: true
  },
  {
    type: "Personal",
    price: "$00",
    description: "Enterprise plan • Billed per user",
    features: [
      "Unlimited accounts",
      "3 analytics integrations",
      "10 sources per Workspace",
      "Unlimited Workspaces",
      "Organization account"
    ],
    buttonText: "Enterprise - book a call"
  }
];

const PricingSection: React.FC = () => {
  return (
    <section data-layername="pricing" className="flex flex-col justify-center items-center py-10 w-full bg-slate-50 max-md:py-24 max-md:max-w-full">
    <div data-layername="container" className="flex flex-col items-center max-w-full w-[1280px]">
      <div data-layername="secitonHeadlingLevel11" className="flex flex-col text-base text-center max-w-[800px] w-[800px] max-md:max-w-full">
        <div className="flex flex-col items-center w-full max-md:max-w-full">
          <div data-layername="smallEyebrowTagLabelStyle1" className="flex gap-2 items-center px-8 py-4 font-medium leading-relaxed text-gray-600 whitespace-nowrap bg-white rounded-full border border-solid shadow border-slate-300">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/fca6a06dfd0f3a5211a89604267850cacf9069f1934935456882018489d58572?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95" alt="" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" />
            <p data-layername="content" className="self-stretch my-auto text-2xl">
              Pricing
            </p>
          </div>
          <h2 data-layername="headingWrapper" className="flex-1 shrink gap-2 self-stretch mt-4 w-full text-4xl font-bold leading-10 text-neutral-800 max-md:max-w-full">
            Simple, easy pricing plan <br className='hidden sm:inline-block'/> for your BI analysts and managers
          </h2>
          <p data-layername="descrWrapper" className="flex-1 shrink gap-2 pb-10 self-stretch px-24 text-xl sm:px-5 mt-4 w-full leading-7 text-gray-400 max-w-[820px] max-md:max-w-full">
            Transparent pricing tailored for teams—no hidden fees, just straightforward value for your business intelligence needs.
          </p>
        </div>
      </div>
      <div data-layername="contentWrapper" className="flex gap-10 items-center w-full">
        <div data-layername="content" className="flex flex-col justify-between items-center self-stretch my-auto min-h-[718px] min-w-[240px] w-[1280px] max-md:max-w-full">
          <div data-layername="priceing" className="flex flex-wrap gap-8 justify-between items-start w-full max-w-[1273px] max-md:max-w-full">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                {...plan}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default PricingSection;