import React, { useState } from 'react';
import {TopNavbar} from "../../../public/TopNavBar";

function DoctorsEarnings() {
    const earningsData = [
        { date: '01-01-2023', patient: 'John Doe', service: 'Consultation', amount: 100, status: 'Cleared' },
        //... more data
    ];

    const [withdrawalAmount, setWithdrawalAmount] = useState(0);
    const [bankAccount, setBankAccount] = useState({
        accountNumber: '',
        routingNumber: '',
        accountHolderName: '',
    });

    const handleBankAccountChange = (e) => {
        const { name, value } = e.target;
        setBankAccount({
            ...bankAccount,
            [name]: value,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white p-6 shadow-lg">
                <TopNavbar />

                {/*<h1 className="text-3xl font-semibold">Doctor's Earnings</h1>*/}
            </header>



            <div className="p-8">
                <section className="mb-8 flex items-center space-x-4 bg-white shadow rounded p-6">
                    <img src="/path/to/profile-pic.jpg" alt="Doctor's Profile" className="w-24 h-24 rounded-full border-2 border-blue-600" />
                    <div>
                        <h2 className="text-2xl font-semibold">Dr. Jane Doe</h2>
                        <p className="text-blue-600 text-lg">Specialization: Cardiologist</p>
                    </div>

                </section>

                <section className="mb-8 bg-white shadow-lg rounded p-6">
                    <h3 className="text-2xl font-semibold mb-4">Earnings Summary</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="text-lg"><strong>Total Earnings:</strong> $5000</div>
                        <div className="text-lg"><strong>Pending Earnings:</strong> $500</div>
                        <div className="text-lg"><strong>Withdrawn Earnings:</strong> $4500</div>
                        <div className="text-lg"><strong>Last Payment Date:</strong> 01-01-2023</div>
                    </div>
                </section>


                <section className="mb-8 bg-white shadow-lg rounded p-6">
                    <h3 className="text-2xl font-semibold mb-4">Earnings Breakdown</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-lg text-lg border-collapse border border-gray-300">
                            <thead>
                            <tr>
                                <th className="border p-3">Date/Time</th>
                                <th className="border p-3">Patient</th>
                                <th className="border p-3">Service</th>
                                <th className="border p-3">Amount</th>
                                <th className="border p-3">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {earningsData.map((entry, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="border p-3">{entry.date}</td>
                                    <td className="border p-3">{entry.patient}</td>
                                    <td className="border p-3">{entry.service}</td>
                                    <td className="border p-3">${entry.amount}</td>
                                    <td className="border p-3">{entry.status}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="bg-white shadow-lg rounded p-6">
                    <h3 className="text-2xl font-semibold mb-4">Bank Account Information</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-lg font-semibold">Account Number:</label>
                            <input
                                type="text"
                                name="accountNumber"
                                value={bankAccount.accountNumber}
                                onChange={handleBankAccountChange}
                                className="border-2 p-3 rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold">Routing Number:</label>
                            <input
                                type="text"
                                name="routingNumber"
                                value={bankAccount.routingNumber}
                                onChange={handleBankAccountChange}
                                className="border-2 p-3 rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold">Account Holder Name:</label>
                            <input
                                type="text"
                                name="accountHolderName"
                                value={bankAccount.accountHolderName}
                                onChange={handleBankAccountChange}
                                className="border-2 p-3 rounded w-full"
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-white shadow-lg rounded p-6">
                    <h3 className="text-2xl font-semibold mb-4">Withdraw Funds</h3>
                    <div className="flex space-x-4">
                        <input
                            type="number"
                            value={withdrawalAmount}
                            onChange={(e) => setWithdrawalAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="border-2 p-3 rounded w-1/2"
                        />
                        <button className="bg-blue-600 text-white p-3 px-8 rounded hover:bg-blue-700">Withdraw</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default DoctorsEarnings;
