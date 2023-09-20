import React, { useState } from 'react';
import {TopNavbar} from "../../../public/TopNavBar";
import { FaStar } from 'react-icons/fa';
import { FaGem, FaCrown, FaUser } from 'react-icons/fa';
import {useDispatch, useSelector} from "react-redux";
import {paymentActions} from "@/_store"; // Assuming you're using 'react-icons'


function PetRegistration() {

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
            <div className="text-2xl font-semibold text-gray-900">Pet Registration</div>
        </header>
    );
}

function MainContent() {
    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container mx-auto px-6 py-8">
                <h3 className="text-gray-700 text-3xl font-medium">Fill in the required fields</h3>
                <div className="mt-6">
                    <RegistrationForm />
                </div>
            </div>
        </main>
    );
}

const petTypes = [
    "Dog",
    "Cat",
    "Bird",
    "Rabbit",
    "Fish",
    "Reptile",
    "Rodent",
    "Other"
];


const sexes = ["Male", "Female"];

const packages = ["ORDINARY MEMBERSHIP", "GOLD MEMBERSHIP", "VIP MEMBERSHIP"];

function RegistrationForm() {
    const {payment} = useSelector(state => state.payment)
    const [errors, setErrors] = useState({});
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch()

    console.log("Payment", payment)

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const [formData, setFormData] = useState({
        petName: '',
        dob: '',
        sex: '',
        petType: '',
        breed: '',
        specialMark: '',
        ownerFullName: '',
        primaryPhone: '',
        secondaryPhone: '',
        location: '',
        ownerAddress: '',
        ownerEmail: '',
        age: '',
        color: '',
        weight: '',
        microchipNumber: '',
        specialNotes: '',
        profilePicture: null, // Profile Picture
        termsAccepted: false,
        package: '',
    });


    const validateFields = () => {
        let tempErrors = {};

        // Validate petName
        if (!formData.petName.trim()) {
            tempErrors.petName = "Pet Name is required.";
        }

        // Validate dob
        if (!formData.dob) {
            tempErrors.dob = "Date of Birth is required.";
        }

        // Validate sex
        if (!formData.sex) {
            tempErrors.sex = "Sex is required.";
        }

        if (!formData.package) {
            tempErrors.package = "Package is required.";
        }

        if (!formData.petType) {
            tempErrors.petType = "Pet type is required.";
        }

        if (!formData.breed) {
            tempErrors.breed = "Breed is required.";
        }

        if (!formData.microchipNumber) {
            tempErrors.microchipNumber = "Microchip number is required.";
        }

        if (!formData.color) {
            tempErrors.color = "Colour is required.";
        }

        // Validate termsAccepted
        if (!formData.termsAccepted) {
            tempErrors.termsAccepted = "You must accept the terms and conditions.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0; // return true if no errors
    };


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            profilePicture: e.target.files[0]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateFields()) {
            console.log(formData);
            // Here, you can send the formData to the backend or any other necessary actions
            dispatch(paymentActions.createPayment(formData))
            openModal()
        } else {
            console.log("Validation errors:", errors);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">

            {/*<Modal isOpen={isModalOpen} onClose={closeModal} iframeSrc="https://checkout.paystack.com/n0c2pc30hqk2o49" />*/}
            <Modal isOpen={isModalOpen} onClose={closeModal} iframeSrc={payment} />

            <PricingSelection
                selectedPackage={selectedPackage}
                onPackageSelect={packageName => {
                    setFormData({ ...formData, package: packageName });
                    setSelectedPackage(packageName);
                }}
            />

            <SelectField errors={errors} label="Choose package" name="package" options={packages} value={formData.package} onChange={handleChange} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField errors={errors} label="Pet Name" name="petName" type="text" value={formData.petName} onChange={handleChange} />
                <SelectField errors={errors} label="Pet Type" name="petType" options={petTypes} value={formData.petType} onChange={handleChange} />
                <SelectField errors={errors} label="Sex" name="sex" options={sexes} value={formData.sex} onChange={handleChange} />
                <InputField errors={errors} label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
                <InputField errors={errors} label="Breed" name="breed" type="text" value={formData.breed} onChange={handleChange} />
                <InputField errors={errors} label="Special Mark" name="specialMark" type="text" value={formData.specialMark} onChange={handleChange} />
                <InputField errors={errors} label="Colour" name="color" type="text" value={formData.color} onChange={handleChange} />
                <InputField errors={errors} label="Weight (kg)" name="weight" type="text" value={formData.weight} onChange={handleChange} />
                <InputField errors={errors} label="Microchip Number" name="microchipNumber" type="text" value={formData.microchipNumber} onChange={handleChange} />
                <InputField errors={errors} label="Special Notes" name="specialNotes" type="text" value={formData.specialNotes} onChange={handleChange} />
                <InputField errors={errors} label="Profile Picture" name="profilePicture" type="file" onChange={handleFileChange} />

                <br/>
                <br/>
                <br/>
                <InputField errors={errors} label="Owner Full Name" name="ownerFullName" type="text" value={formData.ownerFullName} onChange={handleChange} />
                <InputField errors={errors} label="Primary Phone Number" name="primaryPhone" type="text" value={formData.primaryPhone} onChange={handleChange} />
                <InputField errors={errors} label="Secondary Phone Number" name="secondaryPhone" type="text" value={formData.secondaryPhone} onChange={handleChange} />
                <InputField errors={errors} label="Location" name="location" type="text" value={formData.location} onChange={handleChange} />
                <InputField errors={errors} label="Owner Address" name="ownerAddress" type="text" value={formData.ownerAddress} onChange={handleChange} />
                <InputField errors={errors} label="Owner Email Address" name="ownerEmail" type="email" value={formData.ownerEmail} onChange={handleChange} />
            </div>

            <div className="mb-4">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={() => setFormData({ ...formData, termsAccepted: !formData.termsAccepted })}
                    />

                    <span className="ml-2 text-sm text-gray-700">
                        I accept the <a href="#" className="text-blue-600 underline">terms and conditions</a>.
                    </span>

                </label>

                {errors["termsAccepted"] && <p className="text-red-500 text-xs mt-1">{errors["termsAccepted"]}</p>}

            </div>

            <div className="flex items-center justify-center mt-4">
                {/*<button className="bg-blue-800 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300" type="button" onClick={openModal}>Pay Membership Fee</button>*/}

                <button className="bg-blue-800 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300" type="submit">Pay Membership Fee</button>
            </div>
        </form>
    );
}

function InputField({ label, name, type, value, onChange, errors }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
            <input
                className={`shadow appearance-none border ${errors[name] ? "border-red-500" : ""} rounded-full w-full py-2 px-3 text-gray-700`}
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
            />
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
        </div>
    );
}

function SelectField({ label, name, options, value, onChange, errors }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
            <select
                className={`shadow appearance-none border ${errors[name] ? "border-red-500" : ""} rounded-full w-full py-2 px-3 text-gray-700`}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            >
                <option value="">Select...</option>
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
        </div>
    );
}

const packageDetails = {
    'ORDINARY MEMBERSHIP': {
        bgColor: 'bg-gradient-to-br from-gray-100 to-gray-200',
        textColor: 'text-gray-700',
        icon: <FaUser size={32}
        />,
        description: "GHS70"
    },
    'GOLD MEMBERSHIP': {
        bgColor: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
        textColor: 'text-white',
        icon: <FaCrown size={32} />,
        description: "GHS120"
    },
    'VIP MEMBERSHIP': {
        bgColor: 'bg-gradient-to-br from-gray-100 to-gray-200',
        textColor: 'text-gray-700',
        icon: <FaGem size={32} />,
        description: "GHS270"
    }
};

function PricingSelection({ selectedPackage, onPackageSelect }) {
    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-semibold mb-6">Choose a Pricing Package</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.keys(packageDetails).map(packageName => {
                    const { bgColor, textColor, icon, description } = packageDetails[packageName];
                    const isSelected = selectedPackage === packageName;

                    return (
                        <div
                            key={packageName}
                            className={`transform transition-transform duration-300 ease-in-out 
                            border-2 ${isSelected ? 'border-blue-500' : ''} rounded-xl shadow-lg 
                            ${isSelected ? 'shadow-xl' : ''} ${bgColor} cursor-pointer hover:scale-105`}
                            onClick={() => onPackageSelect(packageName)}
                        >
                            <div className="p-6 flex flex-col items-center">
                                {icon}
                                <h3 className={`mt-4 text-lg font-bold ${textColor}`}>{packageName}</h3>
                                <p className={`mt-2 ${textColor}`}><strong>{description}</strong></p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const Modal = ({ isOpen, onClose, iframeSrc }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-1/4 h-3/4 overflow-y-auto">
                <button onClick={onClose} className="float-right text-gray-700">&times;</button>
                <iframe src={iframeSrc} width="100%" height="90%" title="Payment Iframe"></iframe>
            </div>
        </div>
    );
}


export default PetRegistration;
