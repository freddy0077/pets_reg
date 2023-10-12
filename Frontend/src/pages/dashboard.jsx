import React from 'react';
import { TopNavbar } from "../../public/TopNavBar";
import { Header } from "@/pages/Utils/Common";
import { FaPaw, FaStethoscope, FaNewspaper, FaSearchDollar, FaSadTear, FaSmileBeam, FaClipboardList } from 'react-icons/fa';  // Icons

function Dashboard() {
    return (
        <div className="h-screen bg-gray-100">
            <TopNavbar />
            <div className="flex flex-col h-full">
                <Header name={"Dashboard"} />
                <MainContent />
            </div>
        </div>
    );
}

function MainContent() {
    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
            <h3 className="text-gray-700 text-3xl font-medium mb-4">Welcome back!</h3>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card title="Total Registered Pets" count="0" Icon={FaPaw} />
                <Card title="Total Registered Doctors" count="0" Icon={FaStethoscope} />
                <Card title="Total Subscriptions" count="0" Icon={FaNewspaper} />
                <Card title="Lost Pets" count="0" Icon={FaSadTear} />
                <Card title="Found Pets" count="0" Icon={FaSmileBeam} />
                <Card title="Total Doctor Earnings" count="$0" Icon={FaSearchDollar} />
                <Card title="Pending Approvals" count="0" Icon={FaClipboardList} />
            </div>

            {/* Further widgets and content */}
        </main>
    );
}

function Card({ title, count, Icon }) {
    return (
        <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-xl transition duration-300">
            <div className="flex items-center mb-4">
                <Icon size={24} className="mr-4 text-indigo-500" />
                <div className="text-gray-700">{title}</div>
            </div>
            <div className="text-2xl font-bold text-indigo-600">{count}</div>
        </div>
    );
}

export default Dashboard;
