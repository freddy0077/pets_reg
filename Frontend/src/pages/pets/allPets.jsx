import React, {useEffect, useState} from 'react';
import {TopNavbar} from "../../../public/TopNavBar";
import birthdayIcon from '../../../public/img/birthday-cake.svg';
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {paymentActions, petActions, planActions} from "@/_store";
import {Header} from "@/pages/Utils/Common";
import {hasRole} from "@/pages/Utils/helperFunctions"; // Import a birthday icon if you have one

function AllPets() {

    return (
        <div className="h-screen bg-gray-100">
            <TopNavbar />
            <div className="flex flex-col h-full">
                <Header name={"Pets"} />
                <MainContent />

            </div>
        </div>
    );
}


function MainContent({ Pets }) {
    const {payment, paymentVerified} = useSelector(state => state.payment)
    const {user} = useSelector(state => state.auth)
    const {plans} = useSelector(state => state.plan)
    const {pets} = useSelector(state => state.pet)
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedpet, setSelectedpet] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Display 6 Pets per page
    const dispatch = useDispatch()
    const isDoctor = hasRole(user, "doctor")
    const [filter, setFilter] = useState('all'); // Possible values: 'all', 'subscribed', 'unsubscribed'


    const getFilteredPets = () => {
        switch (filter) {
            case 'subscribed':
                return displayedPets?.filter(pet => pet.subscribed);
            case 'unsubscribed':
                return displayedPets?.filter(pet => !pet.subscribed);
            default:
                return displayedPets;
        }
    }

    console.log("Pets", pets)

    useEffect(() => {
        fetchPets()
    }, [])

    const fetchPets = () => {
        dispatch(petActions.getPets())
    }

    const filteredPets = pets?.data?.filter(pet =>
        pet.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.dob?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.sex?.includes(searchTerm) ||
        pet.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.microchip_number.includes(searchTerm)
    );

    const totalPageCount = Math.ceil(filteredPets?.length / itemsPerPage);

    const displayedPets = filteredPets?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const openModal = (pet) => {
        setSelectedpet(pet);
        // setFormData(pet); // Prefill the form with selected pet's data
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedpet(null);
    }


    const [countdowns, setCountdowns] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            const newCountdowns = {};
            filteredPets?.forEach(pet => {
                if (!pet?.dob) return; // skip if dob is not provided

                const [year, month, day] = pet?.dob?.split('-')?.map(Number);

                let nextBirthday = new Date(new Date().getFullYear(), month - 1, day);
                if (new Date() > nextBirthday) {
                    nextBirthday = new Date(new Date().getFullYear() + 1, month - 1, day);
                }

                const diff = nextBirthday - new Date();
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                newCountdowns[pet.id] = { days, hours, minutes, seconds }; // Use pet.id or any unique identifier instead of pet.dob
            });

            setCountdowns(newCountdowns);
        }, 1000);

        return () => clearInterval(interval); // Clear the interval when the component unmounts
    }, [filteredPets]);


    // const isBirthday = (birthday) => {
    //     const [day, month] = birthday && birthday?.split('-')?.map(Number);
    //     const today = new Date();
    //     return today.getDate() === day && today.getMonth() + 1 === month;
    // };

    const isBirthday = (birthday) => {
        if (!birthday) return false;

        const [year, month, day] = birthday.split('-').map(Number);
        const today = new Date();

        return today.getDate() === day && (today.getMonth() + 1) === month;
    };


    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container mx-auto px-6 py-8">
                <h3 className="text-gray-700 text-3xl font-medium mb-6">List of Registered Pets</h3>

                <div className={'mb-3 float-right'}>
                    {isDoctor ?
                        <a href={`/pet-registration?doctor=${user?.id}`}
                           className="bg-e84f25 text-white px-4 py-2 rounded hover:bg-fdbc0e transition duration-300">
                            Add New Pet
                        </a>:

                        <a href={'/pet-registration'}
                           className="bg-e84f25 text-white px-4 py-2 rounded hover:bg-fdbc0e transition duration-300">
                            Add New Pet
                        </a>
                    }

                </div>

                <div className="mb-6">
                    <div className="flex space-x-4">
                        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-e84f25 text-white' : ''}`}>All</button>
                        <button onClick={() => setFilter('subscribed')} className={`px-4 py-2 rounded ${filter === 'subscribed' ? 'bg-e84f25 text-white' : ''}`}>Subscribed</button>
                        <button onClick={() => setFilter('unsubscribed')} className={`px-4 py-2 rounded ${filter === 'unsubscribed' ? 'bg-e84f25 text-white' : ''}`}>Unsubscribed</button>
                    </div>
                </div>

                <div className="mb-6">
                    <input
                        type="text"
                        className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700"
                        placeholder="Search for a pet..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getFilteredPets()?.map((pet, index) => (
                    // {displayedPets?.map((pet, index) => (
                        <div key={index}
                             className={`bg-white rounded-lg shadow-md p-4 relative ${isBirthday(pet?.dob) ? 'bg-yellow-200 border-4 border-yellow-500' : ''}`}>

                            <div className={`${!pet.subscribed ? 'filter blur-sm pointer-events-none' : ''}`}>
                                {/* Image placeholder for pet's profile picture. Replace with actual image if available */}
                                <div className="w-full h-48 bg-gray-300 mb-4 relative">
                                    {isBirthday(pet?.dob) && (
                                        <>
                                            <img src={birthdayIcon} alt="Birthday Icon" className="w-16 h-16 mx-auto mt-16 bg-e84f25"/>
                                            <div className="absolute bottom-2 left-2 text-yellow-600 font-bold">Happy Birthday!</div>
                                        </>
                                    )}
                                </div>
                                <h4 className="text-xl font-semibold mb-2">{pet.pet_name}</h4>
                                <p className="text-gray-600 text-sm mb-2"><strong>DOB:</strong> {pet.dob}</p>
                                <p className="text-gray-600 text-sm mb-2"><strong>Sex:</strong> {pet.sex}</p>
                                <p className="text-gray-600 text-sm mb-2"><strong>Type:</strong> {pet.pet_type}</p>
                                <p className="text-gray-600 text-sm mb-2"><strong>Microchip Number:</strong> {pet.microchip_number}</p>

                                <div className="mt-4 p-2 border border-blue-300 rounded-lg bg-blue-50">
                                    <div className="flex justify-center items-center space-x-2">
                                        <i className="fas fa-birthday-cake text-e84f25"></i> {/* Assuming you are using FontAwesome for icons */}
                                        <div className="text-center">
                                            <p className="text-e84f25 font-semibold">Birthday Countdown</p>
                                            <p className="text-gray-700 font-bold">
                                                {`${countdowns[pet.id]?.days || 0}d ${countdowns[pet.id]?.hours || 0}h ${countdowns[pet.id]?.minutes || 0}m ${countdowns[pet.id]?.seconds || 0}s`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Edit and View buttons */}
                                <div className="mt-4 flex justify-between gap-2">
                                    <button
                                        onClick={() => openModal(pet)}
                                        className="bg-e84f25 text-white px-4 py-2 rounded hover:bg-e84f25 transition duration-300">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {navigate("/medical-form")}}
                                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
                                        Add medical record
                                    </button>
                                    <button className="bg-fdbc0e text-white px-4 py-2 rounded hover:bg-fdbc0e transition duration-300">
                                        View
                                    </button>
                                </div>
                            </div>

                            {!pet.subscribed && (
                                <div className="absolute inset-0 flex justify-center items-center z-10">
                                    <button
                                        onClick={() => {
                                            dispatch(paymentActions.verifyPayment({id: pet?.id }))
                                            fetchPets()
                                        }}
                                        className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">Verify Payment</button>
                                </div>
                            )}

                        </div>
                    ))}
                </div>


                {isModalOpen && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        {/* Modal background */}
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        {/* Modal content */}
                        <div className="relative z-20 mt-10 mx-auto w-11/12 md:w-3/4 lg:w-1/2 bg-white rounded shadow-lg">
                            <div className="p-4">
                                <button onClick={closeModal} className="float-right text-lg font-bold">×</button>
                                <h2 className="text-xl mb-4">Edit pet</h2>
                                <form className="bg-white p-6 rounded shadow-md">
                                    {/* ... Your form fields (like InputField, SelectField) go here */}
                                    {/* Make sure to bind each field to formData and handleChange */}
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-6 flex justify-center">
                    <button
                        className="mx-1 px-4 py-2 bg-e84f25 text-white rounded"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} // Go to previous page
                    >
                        Previous
                    </button>
                    <span className="mx-2">{currentPage} / {totalPageCount}</span>
                    <button
                        className="mx-1 px-4 py-2 bg-e84f25 text-white rounded"
                        disabled={currentPage === totalPageCount}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPageCount))} >
                        Next
                    </button>
                </div>
            </div>
        </main>
    );
}


export default AllPets;

