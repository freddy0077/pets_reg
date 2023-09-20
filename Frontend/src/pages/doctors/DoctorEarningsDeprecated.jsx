import React, { useState } from 'react';

function DoctorsEarnings() {
    const commissions = [
        { date: '20-09-2023', description: 'Consultation for patient XYZ', amount: 100 },
        { date: '18-09-2023', description: 'Surgery Assistance', amount: 500 },
        { date: '16-09-2023', description: 'General Checkup for patient ABC', amount: 50 },
        //... more commission data
    ];

    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const totalEarned = commissions.reduce((total, commission) => total + commission.amount, 0);

    return (
        <div className="h-screen bg-gray-100">
            <Header />
            <MainContent commissions={commissions} totalEarned={totalEarned} withdrawAmount={withdrawAmount} setWithdrawAmount={setWithdrawAmount} />
        </div>
    );
}

function Header() {
    return (
        <header className="bg-white shadow-sm flex justify-between items-center p-4 mt-12">
            <div className="text-2xl font-semibold text-gray-900">Doctor's Commission Earnings</div>
            <div className="space-x-4 mt-5">
                <button className="bg-blue-800 text-white px-4 py-1.5 rounded hover:bg-blue-700">Logout</button>
            </div>
        </header>
    );
}

function MainContent({ commissions, totalEarned, withdrawAmount, setWithdrawAmount }) {
    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-gray-700 text-3xl font-medium">Commission List</h3>
                    <div className="text-gray-900 font-bold text-xl">Total Earnings: ${totalEarned}</div>
                </div>

                <div className="bg-white rounded shadow-md p-4 mb-8">
                    <h4 className="text-lg font-semibold mb-3">Withdraw Funds</h4>
                    <div className="flex items-center">
                        <input
                            type="number"
                            placeholder="Enter amount"
                            className="border p-2 rounded mr-4 flex-grow"
                            value={withdrawAmount}
                            onChange={e => setWithdrawAmount(Math.min(Number(e.target.value), totalEarned))}
                        />
                        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
                            Withdraw
                        </button>
                    </div>
                </div>

                <table className="min-w-full leading-normal">
                    <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Description
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Amount ($)
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {commissions.map((commission, index) => (
                        <tr key={index}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{commission.date}</td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{commission.description}</td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">${commission.amount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default DoctorsEarnings;
