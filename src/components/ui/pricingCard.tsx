import React from "react";

interface PricingCardProps {
    type: string;
    price: string;
    description: string;
    features: string[];
    buttonText: string;
    isHighlighted?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
    type,
    price,
    description,
    features,
    buttonText,
    isHighlighted = false,
}) => {
    const cardClassName = `flex gap-2.5 items-start p-8 bg-white rounded-3xl min-w-[240px] w-[403px] max-md:px-5 ${
        isHighlighted ? "shadow-xl" : ""
    }`;

    const buttonClassName = `flex flex-col justify-center items-center px-4 py-4 mt-10 max-w-full text-lg leading-tight text-right min-h-[55px] w-[292px] ${
        isHighlighted
            ? "text-white bg-blue-500 rounded"
            : "text-blue-600 rounded border border-blue-600 border-solid"
    }`;

    return (
        <div data-layername="card1" className={cardClassName} id="_price">
            <div className="flex flex-col min-w-[240px] w-[339px]">
                <div className="flex flex-col w-full">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col items-start max-w-full w-[259px]">
                            <p
                                data-layername="top"
                                className="text-base tracking-wide leading-loose text-white whitespace-nowrap rounded-none w-[68px]"
                            >
                                {type}
                            </p>
                            <div
                                data-layername="price"
                                className="flex gap-6 items-end mt-5"
                            >
                                <p
                                    data-layername="00"
                                    className="text-5xl font-bold tracking-tight leading-tight text-slate-900 max-md:text-4xl"
                                >
                                    {price}
                                </p>
                                <p
                                    data-layername="month"
                                    className="text-base tracking-wide leading-loose text-zinc-500"
                                >
                                    / month
                                </p>
                            </div>
                            <p
                                data-layername="basicPlanBilledPerUser"
                                className="self-stretch mt-5 text-base leading-tight text-neutral-600"
                            >
                                {description}
                            </p>
                        </div>
                        <div className="mt-7 w-full min-h-0 border border-blue-300 border-solid" />
                    </div>
                    <div className="flex flex-col self-start mt-8 text-base leading-tight text-neutral-600">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                data-layername={index + 1}
                                className={`flex gap-2 items-center ${
                                    index > 0 ? "mt-4" : ""
                                }`}
                            >
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/39f4b976d34a8dd7212c1f41591f0b78974496f7d943e4908f4a6fa788e7033f?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95"
                                    alt=""
                                    className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                                />
                                <p className="self-stretch my-auto">
                                    {feature}
                                </p>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8bdf9d86b1c5357c8f5186c1f6230f6bea51e6e0b40db6414523d3ebefd4c636?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95"
                                    alt=""
                                    className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    data-layername="buttonPrimaryWithIcon"
                    className={buttonClassName}
                >
                    <a
                        data-layername="buttonName"
                        className="gap-2.5 self-stretch text-center"
                        href={`${buttonText === 'Enterprise - book a call'? 'https://calendar.app.google/pBHL5sBQvYxvcjCg7': '#'}`}
                        target="_blank"
                    >
                        {buttonText}
                    </a>
                </button>
            </div>
        </div>
    );
};
