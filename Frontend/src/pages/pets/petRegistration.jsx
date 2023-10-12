import React, {useEffect, useState} from 'react';
import {TopNavbar} from "../../../public/TopNavBar";
import { FaGem, FaCrown, FaUser } from 'react-icons/fa';
import {useDispatch, useSelector} from "react-redux";
import {paymentActions, planActions} from "@/_store";
import {Header} from "@/pages/Utils/Common";
import {InputField, PricingSelectField} from "@/pages/Utils/Inputs";
import {useLocation, useNavigate} from "react-router";
import {getQueryParams} from "@/pages/Utils/helperFunctions";
import { FaDog, FaCat, FaDragon } from 'react-icons/fa';



function PetRegistration() {

    return (
        <div className="h-screen bg-gray-100">
            <TopNavbar />
            <div className="flex flex-col h-full">
                <Header name={"Pet Registration"} />
                <MainContent />
            </div>
        </div>
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

const sexes = ["male", "female"];

function RegistrationForm() {
    const {payment, paymentVerified} = useSelector(state => state.payment)
    const {plans} = useSelector(state => state.plan)
    const [errors, setErrors] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);
    const [packages, setPackages] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = getQueryParams(location.search);

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const AnimalIcon = ({ IconType, style }) => {
        return <IconType className="animal-icon" style={style} />;
    };

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
        plan: '',
        doctor_id: queryParams?.doctor || null
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

        // if (!formData.package) {
        //     tempErrors.package = "Package is required.";
        // }

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

    const handlePaid = async (e) => {
        e.preventDefault()
        const payments = await dispatch(paymentActions.verifyPayment({id: payment.reference}))
        console.log("Payment verified", paymentVerified)
        if (payments){
            navigate("/pets")
            // alert(paymentVerified.verified)
        }
    }

    useEffect(() => {
        dispatch(planActions.getPlans())
    }, [])

    useEffect(() => {
        const mappedPackages = plans?.data?.map((item) => {
            return {
                name: item?.name,
                id: item?.id,
                price: item?.price
            }
        })
        setPackages(mappedPackages)
    },[plans])

    return (
        // <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md animal-icons-background">

            <Modal isOpen={isModalOpen} onClose={closeModal} iframeSrc={payment?.url} handlePaid={handlePaid} />
            <PricingSelectField errors={errors} label="Choose package" name="plan" options={packages} value={formData.plan} onChange={handleChange} hasLabels={true} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">



                <InputField errors={errors} label="Pet Name" name="petName" type="text" value={formData.petName} onChange={handleChange} />
                <PricingSelectField errors={errors} label="Pet Type" name="petType" options={petTypes} value={formData.petType} onChange={handleChange} />
                <PricingSelectField errors={errors} label="Sex" name="sex" options={sexes} value={formData.sex} onChange={handleChange} />
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
                <button className="bg-fdbc0e text-white px-6 py-2 rounded-full transition duration-300" type="submit">Pay Membership Fee</button>
            </div>
        </form>
    );
}


const Modal = ({ isOpen, onClose, iframeSrc, handlePaid }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-1/4 h-3/4 overflow-y-auto">
                <button onClick={onClose} className="float-right text-gray-700">&times;</button>
                <iframe src={iframeSrc} width="100%" height="90%" title="Payment Iframe"></iframe>

                <div className="mt-4 flex justify-between">
                    <button onClick={handlePaid} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                        I have paid
                    </button>
                    <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                        Cancel
                    </button>
                </div>
            </div>
        </div>

    );
}


export default PetRegistration;
