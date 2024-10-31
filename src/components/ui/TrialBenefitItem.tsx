import React from 'react';

interface TrialBenefitItemProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

export const TrialBenefitItem: React.FC<TrialBenefitItemProps> = ({ icon, title, description, className = "" }) => {
  return (
    <div data-layername="trialBenefitItem" className={`flex gap-3 py-2 pr-5 pl-2 w-full rounded-2xl border border-solid border-white border-opacity-20 ${className}`}>
      <div className="flex gap-2 items-center p-3 w-12 h-full rounded-xl bg-white bg-opacity-10">
        <img loading="lazy" src={icon} alt="" className="object-contain self-stretch my-auto w-6 aspect-square" />
      </div>
      <div data-layername="content" className="flex flex-col flex-1 shrink my-auto text-base basis-6 min-w-[240px]">
        <h4 data-layername="courseName" className="font-semibold text-white">
          {title}
        </h4>
        <p data-layername="text" className="leading-6 text-ellipsis text-white text-opacity-70">
          {description}
        </p>
      </div>
    </div>
  );
};