import { UserButton } from "@clerk/clerk-react";

const Navigation = () => {
    return (
        <header
            data-layername="navV3Jira"
            className="flex flex-col pt-4 w-full text-2xl font-bold bg-white max-md:max-w-full"
        >
            <nav className="flex flex-wrap gap-5 justify-between self-center ml-3.5 w-full max-w-[1364px] max-md:max-w-full">
                <div data-layername="metricsLm">
                    Metrics<span>LM</span>
                </div>
                <UserButton />
            </nav>
            <div
                data-layername="shadow"
                className="flex mt-4 w-full min-h-[4px] max-md:max-w-full"
            />
        </header>
    );
};

export default Navigation;
