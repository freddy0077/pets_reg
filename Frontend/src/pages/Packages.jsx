import { useState } from "react";
import {TopNavbar} from "../../public/TopNavBar";
import PetRegistration from "@/pages/pets/petRegistration";

export const Packages = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [packages, setPackages] = useState(['Basic', 'Standard', 'Premium']);
    const [newPackageName, setNewPackageName] = useState("");

    const handlePackageSelect = (packageName) => {
        setSelectedPackage(packageName);
    };

    const handleAddPackage = () => {
        if (newPackageName) {
            setPackages((prevPackages) => [...prevPackages, newPackageName]);
            setNewPackageName(""); // Reset the input field after adding
        }
    };

    return (
        <div className="h-screen bg-gray-100">
            <TopNavbar />
            {selectedPackage ? (
                <PetRegistration packageName={selectedPackage} />
            ) : (
                <div className="container mx-auto p-8">
                    <h2 className="text-2xl font-semibold mb-6">Pricing Packages</h2>

                    <div className="mt-6">
                        <input
                            type="text"
                            placeholder="New Package Name"
                            value={newPackageName}
                            onChange={(e) => setNewPackageName(e.target.value)}
                            className="p-2 border rounded-lg mr-4"
                        />
                        <button
                            onClick={handleAddPackage}
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                        >
                            Add Package
                        </button>
                    </div>

                    <br/>

                    <table className="min-w-full bg-white rounded-lg shadow-md">
                        <thead>
                        <tr className="text-sm leading-normal text-gray-600 uppercase bg-gray-200">
                            <th className="py-4 px-6 text-left">Package Name</th>
                            <th className="py-4 px-6 text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {packages.map(packageName => (
                            <tr className="text-sm text-gray-700" key={packageName}>
                                <td className="py-4 px-6">{packageName}</td>
                                <td className="py-4 px-6 text-center">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
                                        onClick={() => handlePackageSelect(packageName)}
                                    >
                                        Select
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/*<div className="mt-6">*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        placeholder="New Package Name"*/}
                    {/*        value={newPackageName}*/}
                    {/*        onChange={(e) => setNewPackageName(e.target.value)}*/}
                    {/*        className="p-2 border rounded-lg mr-4"*/}
                    {/*    />*/}
                    {/*    <button*/}
                    {/*        onClick={handleAddPackage}*/}
                    {/*        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"*/}
                    {/*    >*/}
                    {/*        Add Package*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            )}
        </div>
    );
}
