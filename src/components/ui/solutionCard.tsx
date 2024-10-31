import React from 'react';

interface SolutionCardProps {
  icon: string;
  title: string;
  description: string;
  field: string;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({ icon, title, description, field }) => {
  return (
    <article data-layername="solutionCard04" className="flex flex-col flex-1 shrink justify-center p-8 bg-white rounded-xl border border-solid basis-0 border-slate-300 min-w-[292px] max-md:px-5">
      <div data-layername="iconWrapper" className="flex gap-2 items-start w-8">
        <img loading="lazy" src={icon} alt="" className="object-contain w-8 aspect-square" />
      </div>
      <div data-layername="wrapper" className="flex flex-col justify-center mt-4 w-full">
        <h3 data-layername="solutionTitle" className="text-xl font-bold leading-none text-neutral-800">
          {title}
        </h3>
        <p data-layername="solutionDescr" className="mt-1 text-base leading-7 text-gray-600 opacity-80 text-ellipsis">
          {description}
        </p>
      </div>
      <p data-layername="solutionField" className="mt-4 text-sm leading-snug text-blue-500 text-ellipsis">
        {field}
      </p>
    </article>
  );
};