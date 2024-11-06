import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { Check } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

interface IntegrationPopupProps {
    handlePopup: () => void;
}

interface Integration {
    name: string;
    icon: string;
}

const integrations: Integration[] = [
    { name: "ChatGPT", icon: "+" },
    { name: "Google Analytics", icon: "+" },
    { name: "Microsoft Clarity", icon: "+" },
    { name: "Hotjar", icon: "+" },
];

const IntegrationPopup: React.FC<IntegrationPopupProps> = ({ handlePopup }) => {
    const [apiKey, setApiKey] = useState("");
    const [selectedIntegration, updateSelectedIntegration] = useState(-1);
    const { user } = useUser();

    useEffect(() => {
        fetchApiKey();
    }, []);

    const fetchApiKey = async () => {
        try {
            const resp = await axios.get(
                `${API_URL}/api/users/getAiKey/${user?.id}`
            );
            setApiKey(resp.data.api);
        } catch (err) {
            toast.error("Something went wront please try after some time!!");
            console.log(err);
        }
    };

    const saveApiKey = async (clerkId: string): Promise<void> => {
        try {
            const response = await axios.post(
                `${API_URL}/api/users/saveApiKey/${clerkId}`,
                {
                    api_key: apiKey,
                }
            );

            toast.success(response.data.message);
            setApiKey("");
            handlePopup()
        } catch (error) {
            let errorMessage = "Something went wrong. Please try again later.";
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (
                axios.isAxiosError(error) &&
                error.response?.data?.message
            ) {
                errorMessage = error.response.data.message;
            }

            toast.error(`Error saving settings: ${errorMessage}`);
            console.error(error);
        }
    };

    return (
        <div>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-3xl w-full max-w-4xl p-8 relative">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-semibold text-[#1a1f36]">
                                Add Integrations
                            </h2>
                            <span className="text-gray-500">ⓘ</span>
                        </div>
                        <button
                            onClick={() => {
                                handlePopup();
                                updateSelectedIntegration(-1);
                            }}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Integrations Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {integrations.map((integration, indx) => (
                            <button
                                key={integration.name}
                                className={`aspect-square rounded-2xl border-2 border-gray-200 hover:border-gray-400 transition-colors p-6 flex flex-col items-center justify-center gap-4 
                                ${
                                    selectedIntegration === indx
                                        ? "border-black"
                                        : "none"
                                }
                                        
                                `}
                                onClick={() => updateSelectedIntegration(indx)}
                            >
                                <span className="text-4xl text-gray-400">
                                    {integration.name === "ChatGPT" &&
                                    apiKey !== "" ? (
                                        <Check className="text-green-500" />
                                    ) : (
                                        integration.icon
                                    )}
                                </span>
                                <span className="text-[#1a1f36] text-base">
                                    {integration.name}
                                </span>
                            </button>
                        ))}
                    </div>

                    {selectedIntegration === 0 && (
                        <div className="flex flex-col lg:flex-row gap-8 border-t-2 pt-10">
                            <div className="flex-1 pr-5 border-r-2">
                                <h3 className="text-xl font-semibold text-[#1a1f36] mb-4">
                                    Enter your OpenAI API Key
                                </h3>
                                <p className="text-gray-600 mb-4 text-base">
                                    You need an OpenAI API Key to use MetricsLM.
                                    Your API Key is stored locally on your
                                    browser and never sent anywhere else.
                                </p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={apiKey}
                                        onChange={(e) =>
                                            setApiKey(e.target.value)
                                        }
                                        placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxx"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                    <button
                                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                        onClick={() =>
                                            saveApiKey(user?.id as string)
                                        }
                                    >
                                        Save
                                    </button>
                                </div>
                                <a
                                    href="#"
                                    className="text-blue-500 hover:text-blue-600 mt-4 inline-block text-sm"
                                >
                                    Get your API key from Open AI Dashboard
                                </a>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-base font-semibold text-[#1a1f36] mb-4 text-start">
                                    Your API Key is not working?
                                </h3>
                                <ul className="space-y-4 text-gray-600 text-base">
                                    <li className="pt-5 text-start">
                                        Make sure you have an OpenAI account and
                                        a valid API key to use ChatGPT. We don't
                                        sell API keys.
                                    </li>
                                    <li className="pt-5 text-start">
                                        Make sure you have your billing info
                                        added in OpenAI Billing page. Without
                                        billing info, your API key will not
                                        work.
                                    </li>
                                </ul>
                                <p className="text-sm text-gray-500 mt-4 pt-5">
                                    *The app will connect to OpenAI API server
                                    to check if your API Key is working
                                    properly.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IntegrationPopup;
