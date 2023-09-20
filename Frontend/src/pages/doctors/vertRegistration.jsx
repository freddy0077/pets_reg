import React, {useEffect, useState} from 'react';
import {TopNavbar} from "../../../public/TopNavBar";
import {useDispatch, useSelector} from "react-redux";
import {doctorActions} from "@/_store";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router";

function VertRegistration() {
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
            <div className="text-2xl font-semibold text-gray-900">Doctor registration</div>
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
                <h3 className="text-gray-700 text-3xl font-medium">Please provide your details</h3>
                <div className="mt-6">
                    <RegistrationForm />
                </div>
            </div>
        </main>
    );
}

const specializations = [
    "Anesthesiology",
    "Behavioral Medicine",
    "Cardiology",
    "Clinical Pathology",
    "Dentistry",
    "Dermatology",
    "Emergency and Critical Care",
    "Endocrinology",
    "Equine Medicine",
    "Feline Medicine",
    "Gastroenterology",
    "Internal Medicine",
    "Microbiology",
    "Neurology",
    "Nutrition",
    "Oncology",
    "Ophthalmology",
    "Orthopedic Surgery",
    "Parasitology",
    "Radiology",
    "Reproduction",
    "Surgery",
    "Toxicology",
    "Zoological Medicine"
];


function RegistrationForm() {
    const {user} = useSelector(state => state.auth)
    const {doctors, doctor} = useSelector(state => state.doctor)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    console.log("Doctor from Auth", doctors)
    console.log("Doctor from Auth", doctor)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        qualification: '',
        experience: '',
        // previousWorkplace: '',
        emergencyContact: '',
        workAvailability: '',
        bio: '',
        specialization: '',
        license: '',
        password: '',
        profilePicture: null, // Profile Picture
    });

    const validate = () => {
        let tempErrors = {};

        if (!formData.name.trim()) tempErrors.name = "Name is required.";
        if (!formData.email.trim()) tempErrors.email = "Email is required.";
        if (!formData.phone.trim()) tempErrors.phone = "Phone is required.";
        if (!formData.address.trim()) tempErrors.address = "Address is required.";
        if (!formData.qualification.trim()) tempErrors.qualification = "Qualification is required.";
        if (!formData.emergencyContact.trim()) tempErrors.emergencyContact = "Emergency contact is required.";
        // if (!formData.workAvailability.trim()) tempErrors.workAvailability = "Work availability is required.";
        // if (!formData.bio.trim()) tempErrors.bio = "Bio is required.";
        if (!formData.specialization.trim()) tempErrors.specialization = "Specialisation is required.";
        if (!formData.license.trim()) tempErrors.license = "License is required.";
        if (!formData.password.trim()) tempErrors.password = "Password is required.";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0; // returns true if no errors
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

    const clearFormData = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
            // dob: '',
            qualification: '',
            experience: '',
            previousWorkplace: '',
            emergencyContact: '',
            workAvailability: '',
            bio: '',
            specialization: '',
            license: '',
            password: '',
            profilePicture: null,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(doctorActions.createDoctor(formData))
                .then((response) => {
                    console.log("Res", response)
                    if (response.type === "doctors/createDoctor/fulfilled"){
                        clearFormData();
                        setSuccessMessage("You have successfully registered!");
                        setErrorMessage(null); // Clear any previous error messages
                        setTimeout(() => {
                            navigate("/doctors")
                        }, 2000)
                    } else if(response.type === "doctors/createDoctor/rejected"){
                        console.log("Failed to register:");
                        setSuccessMessage(null); // Clear any previous success messages
                        setErrorMessage("Failed to register. Please try again.");
                    }
                })
                .catch(error => {
                    console.error("Error during registration:", error);
                    setErrorMessage("An unexpected error occurred. Please try again.");
                });
        }
    };



    useEffect(() => {
        dispatch(doctorActions.getDoctors())
    },[])
    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
            {successMessage && <SuccessMessage message={successMessage} />}
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <ToastContainer />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField errors={errors} label="Full Name" name="name" type="text" value={formData.name} onChange={handleChange} />
                <InputField errors={errors} label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} />
                <InputField errors={errors} label="Phone Number" name="phone" type="text" value={formData.phone} onChange={handleChange} />
                {/*<InputField errors={errors} label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />*/}
                <InputField errors={errors} label="Educational Qualification" name="qualification" type="text" value={formData.qualification} onChange={handleChange} />
                <InputField errors={errors} label="Years of Experience" name="experience" type="number" value={formData.experience} onChange={handleChange} />
                <SelectField
                    errors={errors}
                    label="Specialization"
                    name="specialization"
                    options={specializations}
                    value={formData.specialization}
                    onChange={handleChange}
                />
                {/*<InputField errors={errors} label="Previous Workplace" name="previousWorkplace" type="text" value={formData.previousWorkplace} onChange={handleChange} />*/}
                <InputField errors={errors} label="Address" name="address" type="text" value={formData.address} onChange={handleChange} />
                <InputField errors={errors} label="License Number" name="license" type="text" value={formData.license} onChange={handleChange} />
                <InputField errors={errors} label="Emergency Contact" name="emergencyContact" type="text" value={formData.emergencyContact} onChange={handleChange} />
                {/*<InputField errors={errors} label="Work Availability" name="workAvailability" type="text" value={formData.workAvailability} onChange={handleChange} />*/}
                <InputField errors={errors} label="Brief Bio or Description" name="bio" type="text" value={formData.bio} onChange={handleChange} />
                {/*<InputField errors={errors} label="Profile Picture" name="profilePicture" type="file" value={formData.profilePicture} onChange={handleFileChange} />*/}
            </div>

            <InputField errors={errors} label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />

            <div className="flex items-center justify-center mt-4">
                <button className="bg-blue-800 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300" type="submit">Register</button>
            </div>
        </form>
    );
}

function InputField({ label, name, type, value, onChange, errors }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
            <input
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700"
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

function SelectField({ label, name, options, value, onChange,errors }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
            <select
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700"
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

export default VertRegistration;

function SuccessMessage({ message }) {
    return (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 flex items-center" role="alert">
            <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>{message}</span>
        </div>
    );
}

function ErrorMessage({ message }) {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex items-center error-modal" role="alert">
            <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 8a1 1 0 012 0v4a1 1 0 01-2 0V8zm1 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <span>{message}</span>
        </div>
    );
}

