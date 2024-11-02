import { BarChart3 } from "lucide-react";

const SingleNote = () => {
    return (
        <div className=" w-[350px] mt-5 bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
            <div className="p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <BarChart3 className="w-6 h-6" />
                        <h4 className="">Google Analytics</h4>
                        <span className="text-sm">23 Sep</span>
                    </div>
                    <input type="checkbox" />
                </div>

                {/* Title */}
                <h3 className="mb-5">Initial Pull Data - Last 30 days</h3>

                {/* Content */}
                <div className="space-y-6 tracking-wide">
                    <p className="text-[#5F6369]">
                        For xyz.com, users are dropping off primarily at key
                        stages such as [sign-up], [checkout], and [after
                        browsing product pages] . Metrics indicate high bounce
                        rates, prolonged time on certain pages without
                        conversion, and increased abandonment at [specific
                        actions] . Further analysis of these areas is needed to
                        improve retention and engagement.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SingleNote;
