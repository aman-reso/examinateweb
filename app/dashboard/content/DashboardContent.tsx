import {useState} from "react";
import SupportedExamsForm from "@/app/admin/input/exam/SupportedExamFormUi";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";

export default function DashboardContent() {
    const [activeForm, setActiveForm] = useState<string | null>(null);
    const renderForm = () => {
        switch (activeForm) {
            case "supportedExams":
                return <SupportedExamsForm/>;
            case "subject":
                return <SupportedExamsForm/>;
            default:
                return null;
        }
    };

    function closeForm() {
        setActiveForm(null)
    }

    return (
        <div className="space-y-4 relative">
            <Dialog open={!!activeForm} onOpenChange={closeForm}>
                <DialogContent className="max-w-md mx-auto">
                    <DialogHeader>
                        <DialogTitle>{activeForm === "supportedExams" ? "Supported Exams" : "Add Subject"}</DialogTitle>
                    </DialogHeader>
                    {renderForm()}
                </DialogContent>
            </Dialog>

            <div className="text-3xl font-bold text-gray-800">Dashboard</div>
            <div className="text-gray-500">14th Aug 2023</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                <DashboardCard
                    title="Supported Exams"
                    value="Total: 2"
                    subtitle="Manage"
                    bgColor="bg-purple-200"
                    onClick={() => setActiveForm("supportedExams")}
                />
                <DashboardCard
                    title="Subject"
                    value="Add subject"
                    subtitle="Add subject"
                    bgColor="bg-blue-200"
                    onClick={() => setActiveForm("subject")}
                />
                <DashboardCard
                    title="Conversation Rate"
                    value="74.86%"
                    subtitle="+6.04% greater than last month"
                    bgColor="bg-green-200"
                />
                <DashboardCard
                    title="Total Earning"
                    value="242.65K"
                    subtitle="From the running month"
                    bgColor="bg-purple-200"
                />
            </div>
        </div>
    );
}

const DashboardCard = ({
                           title,
                           value,
                           subtitle,
                           bgColor,
                           onClick
                       }: {
    title: string;
    value: string;
    subtitle: string;
    bgColor: string;
    onClick?: () => void;
}) => {
    return (
        <div className={`rounded-xl p-6 ${bgColor} shadow-md`} onClick={onClick}>
            <div className="text-sm font-semibold text-gray-700">{title}</div>
            <div className="text-2xl font-bold text-gray-800 mt-1">{value}</div>
            <div className="text-xs text-gray-600 mt-1">{subtitle}</div>
        </div>
    );
};
