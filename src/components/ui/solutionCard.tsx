import React from "react";

interface SolutionCardProps {
  icon: string;
  title: string;
  description: string;
  field: string;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({
  icon,
  title,
  description,
  field,
}) => {
  return (
    <article
      data-layername="solutionCard04"
      className="flex flex-col flex-1 shrink justify-center p-8 bg-white sm:py-0 py-12 rounded-xl border border-solid basis-0  px-10 sm:gap-4 gap-10 border-slate-300 min-h-[250px] min-w-[292px] "
    >
      <div data-layername="iconWrapper" className="flex gap-2 items-start  ">
        <img
          loading="lazy"
          src={icon}
          alt=""
          className="object-contain  sm:w-8 w-12 aspect-square"
        />
      </div>
      <div
        data-layername="wrapper"
        className="flex flex-col justify-center gap-8 sm:gap-4  text-start"
      >
        <h3
          data-layername="solutionTitle"
          className="text-xl font-bold leading-none text-neutral-800"
        >
          {title}
        </h3>
        <p
          data-layername="solutionDescr"
          className=" sm:text-sm text-lg font-extralight sm:font-normal leading-6 tracking-wider text-start  text-gray-600 opacity-80 text-ellipsis"
        >
          {description}
        </p>
      </div>
      <p
        data-layername="solutionField"
        className="text-xl sm:text-sm  text-blue-500   tracking-wider  text-ellipsis sm:font-medium font-light"
      >
        {field}
      </p>
    </article>
  );
};
