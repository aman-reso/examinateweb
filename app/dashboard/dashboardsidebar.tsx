'use client'
import { useState } from "react";
import { Home, CreditCard, Activity, BarChart2, FileText, Settings, ArrowRight } from "lucide-react";

const Dashboardsidebar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
    const tabs = [
        'Dashboard',
        'Transactions',
        'Payments',
        'Cards',
        'Vaults',
        'Capital',
        'Reports',
        'Analytics',
        'Activity',
        'Earn',
        'Invoices'
    ];

    return (
        <aside className="w-64 h-screen bg-white shadow-md p-4">
            {tabs.map(tab => (
                <div
                    key={tab}
                    className={`cursor-pointer px-4 py-2 rounded-md mb-2 ${
                        activeTab === tab ? 'bg-green-100 text-green-700 font-semibold' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab}
                </div>
            ))}
        </aside>
    );
};

export default Dashboardsidebar;