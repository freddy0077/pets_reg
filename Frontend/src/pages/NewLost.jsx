import React, { useState } from 'react';
import { TopNavbar } from "../../public/TopNavBar";
import { ToastContainer } from "react-toastify";

function AddToLostAndFound() {
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
            <div className="text-2xl font-semibold text-gray-900">Add to Lost And Found</div>
            <div className="space-x-4 mt-5">
                <button className="bg-fdbc0e text-white px-4 py-1.5 rounded hover:bg-blue-700">Logout</button>
            </div>
        </header>
    );
}

function MainContent() {
    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container mx-auto px-6 py-8">
                <h3 className="text-gray-700 text-3xl font-medium"> Details Of Pet</h3>
                <div className="mt-6">
                    <ItemForm />
                </div>
            </div>
        </main>
    );
}

// Assuming you have the required imports like React, useState, etc.

function ItemForm() {
    const [formData, setFormData] = useState({
        itemName: '',
        description: '',
        dateLostOrFound: '',
        location: '',
        contactInfo: '', // Email or phone to reach out
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = () => {
        let tempErrors = {};

        if (!formData.itemName.trim()) tempErrors.itemName = "Item name is required.";
        if (!formData.description.trim()) tempErrors.description = "Description is required.";
        if (!formData.dateLostOrFound.trim()) tempErrors.dateLostOrFound = "Date when the item was lost or found is required.";
        if (!formData.location.trim()) tempErrors.location = "Location where the item was lost or found is required.";
        if (!formData.contactInfo.trim()) tempErrors.contactInfo = "Contact information is required.";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) return;

        try {
            // Assuming you have a redux action or an API call to save the data
            // await someAction(formData);
            setSuccessMessage('Successfully added the item.');
        } catch (error) {
            setErrorMessage('There was an error adding the item.');
        }
    };

    const SuccessMessage = ({ message }) => {
        return (
            <div className="mb-4 text-white bg-green-500 p-4 rounded">
                {message}
            </div>
        );
    }

    const ErrorMessage = ({ message }) => {
        return (
            <div className="mb-4 text-white bg-red-500 p-4 rounded">
                {message}
            </div>
        );
    }


    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
            {successMessage && <SuccessMessage message={successMessage} />}
            {errorMessage && <ErrorMessage message={errorMessage} />}
            {/*... Add the ToastContainer if needed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField errors={errors} label="Item Name" name="itemName" type="text" value={formData.itemName} onChange={handleChange} />
                <InputField errors={errors} label="Description" name="description" type="text" value={formData.description} onChange={handleChange} />
                <InputField errors={errors} label="Date Lost/Found" name="dateLostOrFound" type="date" value={formData.dateLostOrFound} onChange={handleChange} />
                <InputField errors={errors} label="Location" name="location" type="text" value={formData.location} onChange={handleChange} />
                <InputField errors={errors} label="Contact Info" name="contactInfo" type="text" value={formData.contactInfo} onChange={handleChange} />
            </div>

            <div className="flex items-center justify-center mt-4">
                <button className="bg-fdbc0e text-white px-6 py-2 rounded-full hover:bg-fdbc0e transition duration-300" type="submit">Add Item</button>
            </div>
        </form>
    );
}


function InputField({ label, name, type, value, onChange }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
            <input className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700" id={name} name={name} type={type} value={value} onChange={onChange} />
        </div>
    );
}

export default AddToLostAndFound;
