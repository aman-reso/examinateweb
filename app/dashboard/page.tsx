'use client';
import Dashboardsidebar from "@/app/dashboard/dashboardsidebar";
import {useState} from "react";
import DashboardContent from "@/app/dashboard/content/DashboardContent";

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const renderTab = () => {
        switch (activeTab) {
            case 'Dashboard':
                return <DashboardContent/>;
            case 'Transactions':
                return <DashboardContent/>;
            case 'Payments':
                return <DashboardContent/>;
            default:
                return <DashboardContent/>;
        }
    };
    return (
        <div className="flex">
            <Dashboardsidebar activeTab={activeTab} setActiveTab={setActiveTab}/>
            <main className="flex-1 p-6">
                {renderTab()}
            </main>
        </div>
    );
}
