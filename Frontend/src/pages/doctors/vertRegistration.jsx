import React, {useEffect, useState} from 'react';
import {TopNavbar} from "../../../public/TopNavBar";
import {useDispatch, useSelector} from "react-redux";
import {doctorActions} from "@/_store";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router";
import {InputField, SelectField} from "@/pages/Utils/Inputs";
import {ErrorMessage, SuccessMessage} from "@/pages/Utils/MessagesUtils";
import {Header} from "@/pages/Utils/Common";
import {specializations} from "@/pages/Utils/specialisations";

function VertRegistration() {
    return (
        <div className="h-screen bg-gray-100">
            <TopNavbar />
            <div className="flex flex-col h-full">
                <Header name={"Doctor Registration"} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    <div className="container mx-auto px-6 py-8">
                        <h3 className="text-gray-700 text-3xl font-medium">Please provide your details</h3>
                        <div className="mt-6">
                            <RegistrationForm />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}



function RegistrationForm() {
    const {user} = useSelector(state => state.auth)
    const {doctors, doctor} = useSelector(state => state.doctor)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

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
                <button className="bg-fdbc0e text-white px-6 py-2 rounded-full hover:bg-fdbc0e transition duration-300" type="submit">Register</button>
            </div>
        </form>
    );
}




export default VertRegistration;


