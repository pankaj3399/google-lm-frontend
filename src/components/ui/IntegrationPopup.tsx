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
                toast.error(error.response?.data.message);
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
                toast.error(error.response?.data.message);
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
                toast.error(error.response?.data.message);
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
                toast.error(error.response?.data.message);
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
                        <div className="flex border-t-2">
                            <div className="flex p-2 mt-2 flex-col pr-5 border-r-2">
                                <h2 className="text-xl font-semibold text-[#1a1f36]">
                                    Connect to Google Analytics
                                </h2>
                                <p className="mt-5 text-gray-600 mb-4 text-base">
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
                                    <option value="" disabled selected>
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
                                <h3 className="text-base font-semibold text-[#1a1f36] mb-4 mt-5 text-start">
                                    Your Google Analytics Account is not
                                    working?
                                </h3>
                                <ul className="mt-5 space-y-4 text-gray-600 text-base">
                                    <li className="pt-5 text-start">
                                        Make sure you have a{" "}
                                        <a href="#">Google Analytics</a>{" "}
                                        account.
                                    </li>
                                    <li className="pt-5 text-start">
                                        Make sure you have selected the
                                        analytics account and the respective
                                        properties & apps from the dropdown.
                                    </li>
                                </ul>
                                <p className="text-sm text-gray-500 mt-4 pt-5">
                                    *The app will connect to Google Analytics
                                    once you click allow.
                                </p>
                            </div>
                        </div>
                    )}

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
                                    href="https://platform.openai.com/settings/organization/api-keys"
                                    className="text-blue-500 hover:text-blue-600 mt-4 inline-block text-sm"
                                    target="_blank"
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
