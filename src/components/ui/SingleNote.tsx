import React, { useEffect, useState } from "react";
import moment from "moment";
import useUserStore from "../../store/userStore";
import { Sheet, SheetTrigger, SheetContent } from "../../components/ui/sheet";
import { Chart, registerables } from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import ReactMarkdown from "react-markdown";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

Chart.register(...registerables);

interface Dataset {
    label: string;
    data: number[];
    borderColor: string[];
    backgroundColor: string[];
}

interface Visualization {
    chartType: "bar_chart" | "line_chart" | "pie_chart";
    data: {
        labels: string[];
        datasets: Dataset[];
    };
}

interface Analysis {
    Traffic: {
        Description: string;
        Traffic_Visualization: Visualization;
    };
    User_Behavior: {
        Description: string;
        Behavior_Visualization: Visualization;
    };
    Engagement: {
        Description: string;
        Engagement_Visualization: Visualization;
    };
}

interface Audit {
    Technical_Aspects: string;
    SEO_Performance: string;
    Accessibility: string;
}

interface ReportData {
    Summary: string;
    Analysis: Analysis;
    Audit: Audit;
    Suggestions: string;
    Visualization: Visualization[];
}

interface SingleNoteProps {
    heading: string;
    content: string;
    indx: number;
    updatedAt: string;
    createdAt: string;
    type: string;
    selectedNotes: boolean[];
    handleNewNoteDisplay: () => void;
    handleToggleNote: (indx: number) => void;
}

const SingleNote: React.FC<SingleNoteProps> = ({
    heading,
    content,
    indx,
    createdAt,
    type,
    selectedNotes,
    handleToggleNote,
    handleNewNoteDisplay,
}) => {
    const [isSheetOpen, setSheetOpen] = useState(false);
    const [reportData, setReportData] = useState<ReportData | null>(null);

    function getIcon(iconType: string) {
        switch (iconType) {
            case "Written Note":
                return "/Edit.svg";
            case "Saved":
                return "/Message.svg";
            case "Report":
                return "/File.svg";
            case "Analytics":
                return "/icon5.svg";
            default:
                return "/icon5.svg";
        }
    }

    const separateTextAndJson = (inputText: string) => {
        const jsonRegex = /```json([\s\S]*?)```/;
        const match = inputText.match(jsonRegex);

        if (match) {
            const extractedJson = match[1].trim();
            const remainingText = inputText.replace(jsonRegex, "").trim();
            let parsedJson;

            try {
                parsedJson = JSON.parse(extractedJson);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                parsedJson = null;
            }

            return { text: remainingText, json: parsedJson };
        }

        return { text: inputText, json: null };
    };

    useEffect(() => {
        if (type === "Report") {
            const response = separateTextAndJson(content);
            // const resp = JSON.parse(response.json);
            setReportData(response.json);
        }
    }, [content]);

    function stripHtml(html: string): string {
        return html.replace(/<[^>]*>/g, ""); // Removes all HTML tags
    }

    const IconComponent = getIcon(type);
    const { setSelectedNote } = useUserStore();

    const handleNoteClick = () => {
        if (type === "Report") {
            setSheetOpen(true);
        } else {
            handleNewNoteDisplay();
            setSelectedNote(indx);
        }
    };

    const renderChart = (
        chartType: "bar_chart" | "line_chart" | "pie_chart",
        data: { labels: string[]; datasets: Dataset[] }
    ): JSX.Element | null => {
        const chartComponents: {
            [key in "bar_chart" | "line_chart" | "pie_chart"]: JSX.Element;
        } = {
            bar_chart: <Bar data={data} />,
            line_chart: <Line data={data} />,
            pie_chart: <Pie data={data} />,
        };
        return chartComponents[chartType] || null;
    };

    const downloadPDF = async () => {
        const doc = new jsPDF("p", "pt", "a4");
        const content = document.getElementById("report-content");
        const downloadButton = document.querySelector(
            "#download_button"
        ) as HTMLElement | null;

        if (!content) {
            alert("Content not found!");
            return;
        }

        if (downloadButton) downloadButton.style.display = "none";

        const canvas = await html2canvas(content, {
            scale: 3,
            width: content.offsetWidth,
        });

        if (downloadButton) downloadButton.style.display = "";

        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const ratio = pdfWidth / imgWidth;
        const scaledHeight = imgHeight * ratio;

        let position = 0;

        while (position < scaledHeight) {
            if (position > 0) doc.addPage();

            doc.addImage(imgData, "PNG", 0, -position, pdfWidth, scaledHeight);

            position += pdfHeight;
        }

        doc.save("report.pdf");
    };

    return type === "Report" ? (
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
                <div
                    className=" w-[350px] max-h-[350px] m-2 bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl cursor-pointer"
                    key={indx}
                >
                    <div className="p-5">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-1">
                                <img
                                    src={IconComponent}
                                    alt="icon"
                                    className="h-5"
                                />
                                <h4 className="text-[#42526E]">{type}</h4>
                                <span className="text-sm text-gray-500 ml-2">
                                    {moment(createdAt).format(" Do MMM")}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    checked={selectedNotes[indx]}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggleNote(indx);
                                    }}
                                />
                            </div>
                        </div>

                        <h3 className="mb-5 text-[#2c342a]">
                            {heading && heading.length > 35 ? `${heading.substring(0, 35)}...`  : heading}
                        </h3>

                        <div className="space-y-6 tracking-wide">
                            <ReactMarkdown className="text-gray-700">
                                {content.length > 330
                                    ? `${content.substring(0, 330)}...`
                                    : content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </SheetTrigger>
            <SheetContent side="left" className="w-[700px] overflow-y-auto">
                <div
                    className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 mt-4"
                    id="report-content"
                >
                    <h2 className="font-bold text-xl">Summary</h2>
                    <p>{reportData?.Summary}</p>

                    <h2 className="font-bold text-xl">Analysis</h2>
                    <div>
                        <h3>Traffic</h3>
                        <p>{reportData?.Analysis?.Traffic?.Description}</p>
                        {reportData &&
                            (() => {
                                const chart = renderChart(
                                    reportData.Analysis?.Traffic
                                        ?.Traffic_Visualization?.chartType,
                                    reportData.Analysis?.Traffic
                                        ?.Traffic_Visualization?.data
                                );

                                return chart ? (
                                    <div className="h-[300px] w-[400px] flex justify-center">
                                        {chart}
                                    </div>
                                ) : null;
                            })()}

                        <h3>User Behavior</h3>
                        <p>
                            {reportData?.Analysis?.User_Behavior?.Description}
                        </p>
                        {reportData &&
                            (() => {
                                const chart = renderChart(
                                    reportData.Analysis?.User_Behavior
                                        ?.Behavior_Visualization?.chartType,
                                    reportData.Analysis?.User_Behavior
                                        ?.Behavior_Visualization?.data
                                );

                                return chart ? (
                                    <div className="h-[300px] w-[400px] flex justify-center">
                                        {chart}
                                    </div>
                                ) : null;
                            })()}

                        <h3>Engagement</h3>
                        <p>{reportData?.Analysis?.Engagement?.Description}</p>
                        {reportData &&
                            (() => {
                                const chart = renderChart(
                                    reportData.Analysis?.Engagement
                                        ?.Engagement_Visualization?.chartType,
                                    reportData.Analysis?.Engagement
                                        ?.Engagement_Visualization?.data
                                );

                                return chart ? (
                                    <div className="h-[300px] w-[400px] flex justify-center">
                                        {chart}
                                    </div>
                                ) : null;
                            })()}
                    </div>

                    {/* Display Audit */}
                    <h2 className="font-bold text-xl">Audit</h2>
                    <div>
                        <h3>Technical Aspects</h3>
                        <p>{reportData?.Audit?.Technical_Aspects}</p>

                        <h3>SEO Performance</h3>
                        <p>{reportData?.Audit?.SEO_Performance}</p>

                        <h3>Accessibility</h3>
                        <p>{reportData?.Audit?.Accessibility}</p>
                    </div>

                    {/* Display Suggestions */}
                    <h2 className="font-bold text-xl">Suggestions</h2>
                    <p>{reportData?.Suggestions}</p>

                    {/* Display Visualizations */}
                    <h2 className="font-bold text-xl">Visualizations</h2>
                    {reportData?.Visualization.map((viz, index) => {
                        const chart = renderChart(viz.chartType, viz.data);
                        return chart ? (
                            <div key={index} className="flex flex-col">
                                <div className="h-[300px] w-[400px] flex justify-center">
                                    {chart}
                                </div>
                            </div>
                        ) : null;
                    })}
                    <div
                        className="flex gap-2 mt-5 justify-center"
                        id="download_button"
                    >
                        <button
                            className="p-3 bg-slate-200 rounded-md flex"
                            onClick={downloadPDF}
                        >
                            <img src={"/download.svg"} />
                            Download
                        </button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    ) : (
        <div
            className=" w-[350px] max-h-[350px] m-2 bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl cursor-pointer"
            key={indx}
            onClick={handleNoteClick}
        >
            <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1">
                        <img src={IconComponent} alt="icon" className="h-5" />
                        <h4
                            className={`${
                                type === "Written Note"
                                    ? "text-[#26AF36]"
                                    : type === "Saved"
                                    ? "text-[#6DA2FF]"
                                    : type === "Report"
                                    ? "text-[#6DA2FF]"
                                    : "text-[#42526E]"
                            }`}
                        >
                            {type}
                        </h4>
                        <span className="text-sm text-gray-500 ml-2">
                            {moment(createdAt).format(" Do MMM")}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="checkbox"
                            checked={selectedNotes[indx]}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleToggleNote(indx);
                            }}
                        />
                    </div>
                </div>

                <h3 className="mb-5 text-[#5F6369]">
                    {heading && heading.substring(0, 20)}
                    {heading && heading.length > 20 ? ".. " : ""}
                </h3>

                <div className="space-y-6 tracking-wide">
                    <ReactMarkdown className="text-gray-700">
                        {stripHtml(content).length > 330
                            ? `${stripHtml(content).substring(0, 330)}...`
                            : stripHtml(content)}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default SingleNote;
