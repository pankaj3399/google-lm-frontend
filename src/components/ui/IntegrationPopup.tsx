import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { Check } from "lucide-react";
import apiClient, { setAuthToken } from "../../api/axiosClient";
import { useAuth } from "@clerk/clerk-react";
import useUserStore from "../../store/userStore";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface IntegrationPopupProps {
    handlePopup: () => void;
}

interface Integration {
    name: string;
    icon: string;
}

interface Account {
    id: string;
    name: string;
}

interface Property {
    account: string;
    createTime: string;
    currencyCode: string;
    displayName: string;
    name: string;
    parent: string;
    propertyType: string;
    serviceLevel: string;
    timeZone: string;
    updateTime: string;
}

const integrations: Integration[] = [
    { name: "ChatGPT", icon: "+" },
    { name: "Google Analytics", icon: "+" },
];

const IntegrationPopup: React.FC<IntegrationPopupProps> = ({ handlePopup }) => {
    const [apiKey, setApiKey] = useState("");
    const {
        googleAnalytics,
        openAiKey,
        propertyId,
        setOpenAiKey,
        setGoogleAnalytics,
        setPropertyId,
        setWorkspace,
    } = useUserStore();
    const [selectedIntegration, updateSelectedIntegration] = useState(-1);
    const { user } = useUser();
    const { getToken } = useAuth();
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [properties, setProperties] = useState<Property[]>([]);
    const [showProperty, setShowProperty] = useState(false);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        if (!googleAnalytics) {
            return;
        }
        try {
            const token = await getToken();
            setAuthToken(token);

            const response = await apiClient.get(
                `${API_URL}/api/users/analytics/accounts`,
                {
                    params: { clerkId: user?.id },
                }
            );

            const filtered: Account[] = response.data.map(
                ({
                    name,
                    displayName,
                }: {
                    name: string;
                    displayName: string;
                }) => ({
                    id: name,
                    name: displayName,
                })
            );

            setAccounts(filtered);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const statusCode = error.response?.status;
                if (statusCode === 410) {
                    toast.error(
                        "Your Google Analytics token has expired. Please link your account again."
                    );
                    setGoogleAnalytics(false);
                    setPropertyId(false);
                } else {
                    toast.error(
                        error.response?.data?.message ||
                            "An error occurred while fetching accounts."
                    );
                }
            } else {
                console.error(error);
                toast.error("An unexpected error occurred.");
            }
        }
    };

    const saveApiKey = async (clerkId: string): Promise<void> => {
        try {
            const token = await getToken();
            setAuthToken(token);

            const response = await apiClient.post(
                `${API_URL}/api/users/saveApiKey/${clerkId}`,
                {
                    api_key: apiKey,
                }
            );

            toast.success(response.data.message);
            setOpenAiKey(response.data.api);
            setGoogleAnalytics(response.data.googleAnalytics);
            setPropertyId(response.data.propertyId);
            setApiKey("");
            handlePopup();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.status);
                console.error(error.response);
                toast.error(
                    error.response?.data.message || "Something went wrong"
                );
            } else {
                console.error(error);
            }
        }
    };

    const startGoogleAnalyticsOAuth = () => {
        const clientId = import.meta.env.VITE_API_CLIENT_ID;
        const redirectUri = `${API_URL}/api/users/oauth/google-analytics/callback`;
        const scope = "https://www.googleapis.com/auth/analytics.readonly";
        const state = {
            clerkId: user?.id,
        };
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline&prompt=consent`;

        window.location.href = `${authUrl}&state=${encodeURIComponent(
            JSON.stringify(state)
        )}`;
    };

    const handleCheck = async (indx: number) => {
        try {
            switch (indx) {
                case 1: {
                    if (!googleAnalytics) startGoogleAnalyticsOAuth();
                    break;
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.status);
                console.error(error.response);
                toast.error(
                    error.response?.data.message || "Something went wrong"
                );
            } else {
                console.error(error);
            }
        }
    };

    const fetchProperties = async (accountId: string) => {
        try {
            const token = await getToken();
            setAuthToken(token);
            const response = await apiClient.get(
                `${API_URL}/api/users/analytics/properties`,
                {
                    params: { accountId, clerkId: user?.id },
                }
            );
            setShowProperty(true);
            console.log(response.data);
            setProperties(response.data.properties);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.status);
                console.error(error.response);
                toast.error(
                    error.response?.data.message || "Something went wrong"
                );
            } else {
                console.error(error);
            }
        }
    };

    const fetchReport = async (propertyId: string) => {
        try {
            const token = await getToken();
            setAuthToken(token);
            const response = await apiClient.get(
                `${API_URL}/api/users/analytics/report`,
                {
                    params: { propertyId, clerkId: user?.id },
                }
            );
            setPropertyId(response.data.propertyId);
            setWorkspace(response.data.workspace);
            handlePopup();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.status);
                console.error(error.response);
                toast.error(
                    error.response?.data.message || "Something went wrong"
                );
            } else {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-3xl w-full max-w-4xl p-8 relative">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-2 ">
                            <h2 className="text-2xl flex font-semibold gap-x-2 items-center text-[#1a1f36] font-pops">
                                Add Integrations <span> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_374_8637)">
<path d="M7.99992 14.6654C11.6818 14.6654 14.6666 11.6806 14.6666 7.9987C14.6666 4.3168 11.6818 1.33203 7.99992 1.33203C4.31802 1.33203 1.33325 4.3168 1.33325 7.9987C1.33325 11.6806 4.31802 14.6654 7.99992 14.6654Z" stroke="#1B2559" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 10.6667V8" stroke="#1B2559" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 5.33203H8.00583" stroke="#1B2559" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_374_8637">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg></span>

                            </h2>
                        </div>
                        <button
                            onClick={() => {
                                handlePopup();
                                updateSelectedIntegration(-1);
                            }}
                            className="text-black text-xl top-0 font-bold hover:text-gray-700 transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Integrations Grid */}
                    <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {integrations.map((integration, indx) => (
                            <button
                                key={integration.name}
                                className={`aspect-square rounded-2xl border-2 border-solid border-gray-200 hover:border-gray-400 transition-colors p-6 flex flex-col items-center justify-center gap-4 
                                ${
                                    selectedIntegration === indx
                                        ? "border-blue-400"
                                        : "border"
                                }
                                        
                                `}
                                onClick={() => {
                                    updateSelectedIntegration(indx);
                                    handleCheck(indx);
                                }}
                            >
                                <span className="text-4xl text-gray-400">
                                    {(integration.name === "ChatGPT" &&
                                        openAiKey) ||
                                    (integration.name === "Google Analytics" &&
                                        propertyId) ? (
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

                    {selectedIntegration === 1 && googleAnalytics && (
                        <div className="flex     border-t-2 ">
                            <div className="flex  items-center justify-center p-2 mt-2 flex-col pr-5 border-r-2">
            <h2 className="text-2xl font-bold text-[#1B2559] mb-4 font-sans text-center inline-block">
                                                    Connect to Google Analytics
                                </h2>
                                <p className="mt-5 text-[#718096] mb-4 text-base font-sfpro font-medium text=[16px] ">
                                    Connect and allow access to your Google
                                    Analytics. Once it’s done, select your
                                    website below.
                                </p>

                                <select
                                    className="relative p-4 border-2 rounded-3xl appearance-none outline-none"
                                    onChange={(e) =>
                                        fetchProperties(e.target.value)
                                    }
                                >
                                    <option value="" disabled selected className="font-sfpro text-[#718096] text-[14px]">
                                        Select Analytics Account
                                    </option>
                                    {accounts.map((account, indx) => (
                                        <option key={indx} value={account.id}>
                                            {account.name}
                                        </option>
                                    ))}
                                </select>

                                <br />
                                <select
                                    disabled={properties.length === 0}
                                    onChange={(e) =>
                                        fetchReport(e.target.value)
                                    }
                                    className="p-4 border-2 rounded-3xl appearance-none outline-none"
                                >
                                    <option disabled selected>
                                        Select Property
                                    </option>
                                    {showProperty &&
                                        properties.map((property, index) => (
                                            <option
                                                key={index}
                                                value={property.name}
                                            >
                                                {property.displayName}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div className="p-5">
                                <h3 className="text-base font-semibold  mb-4 mt-5 text-start font-sfpro text-[#718096]">
                                    Your Google Analytics Account is not
                                    working?
                                </h3>
                                <ul className="mt-5 space-y-4  text-base font-sfpro list-disc ml-5 font-medium text-[#16px] text-[#718096]">
                                    <li className="pt-5 text-start">
                                        Make sure you have a{" "}
                                        <a href="#">Google Analytics</a>{" "}
                                        account.
                                    </li>
                                    <li className="pt-5 text-start font-pops">
                                        Make sure you have selected the
                                        analytics account and the respective
                                        properties & apps from the dropdown.
                                    </li>
                                </ul>
                                <p className="text-sm text-gray-500 mt-4 pt-5 font-pops">
                                    *The app will connect to Google Analytics
                                    once you click allow.
                                </p>
                            </div>
                        </div>
                    )}

{selectedIntegration === 0 && (
    <div className="flex flex-col lg:flex-row gap-8 border-t-2 pt-8">
        {/* Left Section */}
        <div className="flex-1 pr-5 ">
            <h3 className="text-2xl font-bold text-[#1B2559] mb-4 font-sans text-center">
                Enter your OpenAI API Key
            </h3>
            <p className="text-[#718096] mb-4 text-center font-medium font-sfpro text-sm  ">
                You need an OpenAI API Key to use MetricsLM. <p className="inline-block text-sm">Your API Key is stored
                locally on your browser and never</p>  <p className="text-center">sent anywhere else.</p> 
            </p>
            <div className="flex gap-2 justify-evenly">
                <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxx"
                    className=" px-4 py-2 border w-64   border-gray-300 rounded-3xl text-sm text-[#718096] font-regular font-sfpro "
                />
                <button
                    className="py-2 px-6 w-24 bg-[#0052CC] rounded-sm text-white  hover:bg-blue-600 transition-colors text-sm mb-2 text-center mt-2 font-bold font-sfpro"
                    onClick={() => saveApiKey(user?.id as string)}
                >
                    Save
                </button>
            </div>
            <a
                href="https://platform.openai.com/settings/organization/api-keys"
                className="text-[#0052CC] text-center ml-10 underline hover:text-blue-600 mt-4 inline-block text-sm font-semibold font-sfpro"
                target="_blank"
            >
                Get your API key from Open AI Dashboard
            </a>
        </div>
          <div className=" border "></div>
        {/* Right Section */}
        <div className="flex-1">
            <h3 className="text-sm  font-bold text-[#718096]ah  text-start font-sfpro">
                Your API Key is not working?
            </h3>
            <ul className="space-y-4 text-[#718096] text-base font-medium font-sfpro list-disc pl-5">
                <li className="pt-5 text-start">
                    Make sure you have an OpenAI account and a valid API key to use ChatGPT. We don't sell API keys.
                </li>
                <li className="pt-5 text-start">
                    Make sure you have your billing info added in OpenAI Billing page. Without billing info, your API key will not work.
                </li>
            </ul>
            <p className="text-sm text-[#718096] mt-4 pt-5 font-medium font-sfpro">
                *The app will connect to OpenAI API server to check if your API Key is working properly.
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
