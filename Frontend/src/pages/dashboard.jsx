// App.js
import React from 'react';
import {TopNavbar} from "../../public/TopNavBar";
// import './App.css';


function Dashboard() {
    return (
        <div className="h-screen bg-gray-100">
            <TopNavbar />
            <div className="flex flex-col h-full">
                <Header />
                <MainContent />
            </div>
        </div>
    );
}


function Header() {
    return (
        <header className="bg-white shadow-sm flex justify-between items-center p-4 mt-12">
            <div className="text-2xl font-semibold text-gray-900">Dashboard</div>
            <div className="space-x-4 mt-5">
                <button className="bg-blue-800 text-white px-4 py-1.5 rounded hover:bg-blue-700">Logout</button>
            </div>
        </header>
    );
}

function MainContent() {

    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container mx-auto px-6 py-8">
                <h3 className="text-gray-700 text-3xl font-medium">Welcome back!</h3>
                <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <Card title="Total Registered Pets" count="0" />
                    <Card title="Total Registered Doctors" count="0" />
                    <Card title="Total Subscriptions" count="0" />
                </div>
            </div>
        </main>
    );
}

function Card({ title, count }) {
    return (
        <div className="bg-white px-4 py-6 shadow rounded-md hover:shadow-lg transition duration-300">
            <div className="text-gray-700 mb-2">{title}</div>
            <div className="text-xl font-bold">{count}</div>
        </div>
    );
}

export default Dashboard;
