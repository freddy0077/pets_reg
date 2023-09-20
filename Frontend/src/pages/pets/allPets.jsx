import React, {useEffect, useState} from 'react';
import {TopNavbar} from "../../../public/TopNavBar";
import birthdayIcon from '../../../public/img/birthday-cake.svg';
import {useNavigate} from "react-router";
import {useSelector} from "react-redux"; // Import a birthday icon if you have one

function AllPets() {
    const Pets = [
        {
            name: 'Pet 1',
            dob: '14-09-2000',
            birthday:'14-09',
            sex: 'male',
            type: 'Dog',
            tattooNumber: '625625353232'
        },

        {
            name: 'Pet 2',
            dob: '01-01-2000',
            birthday:'15-09',
            sex: 'female',
            type: 'Dog',
            tattooNumber: '625625353232'
        },

        {
            name: 'Pet 3',
            dob: '01-01-2000',
            birthday:'16-09',
            sex: 'male',
            type: 'Dog',
            tattooNumber: '625625353232'
        },


    ];

    return (
        <div className="h-screen bg-gray-100">
            <TopNavbar />
            <div className="flex flex-col h-full">
                <Header />
                <MainContent Pets={Pets} />

            </div>
        </div>
    );
}


function Header() {
    return (
        <header className="bg-white shadow-sm flex justify-between items-center p-4 mt-12">
            <div className="text-2xl font-semibold text-gray-900">Pets</div>
            <div className="space-x-4 mt-5">
                <button className="bg-blue-800 text-white px-4 py-1.5 rounded hover:bg-blue-700">Logout</button>
            </div>
        </header>
    );
}


function MainContent({ Pets }) {
    const {user} = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedpet, setSelectedpet] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Display 6 Pets per page

    const filteredPets = Pets.filter(pet =>
        pet.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.dob?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.sex?.includes(searchTerm) ||
        pet.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.tattooNumber.includes(searchTerm)
    );

    const totalPageCount = Math.ceil(filteredPets.length / itemsPerPage);

    const displayedPets = filteredPets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const openModal = (pet) => {
        setSelectedpet(pet);
        // setFormData(pet); // Prefill the form with selected pet's data
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedpet(null);
    }

    const getBirthdayCountdown = (birthdayStr) => {
        const today = new Date();
        const [day, month] = birthdayStr.split('-').map(Number);
        let year = today.getFullYear();

        const birthdayThisYear = new Date(year, month - 1, day);
        let nextBirthday = birthdayThisYear;

        if (today > birthdayThisYear) {
            // If the birthday for this year has already passed, set nextBirthday to the next year.
            nextBirthday = new Date(year + 1, month - 1, day);
        }

        const difference = nextBirthday - today;

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
    };

    const [countdowns, setCountdowns] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            const newCountdowns = {};
            Pets.forEach(pet => {
                const [day, month] = pet.birthday.split('-').map(Number);
                let nextBirthday = new Date(new Date().getFullYear(), month - 1, day);
                if (new Date() > nextBirthday) {
                    nextBirthday = new Date(new Date().getFullYear() + 1, month - 1, day);
                }

                const diff = nextBirthday - new Date();
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                newCountdowns[pet.birthday] = { days, hours, minutes, seconds };
            });
            setCountdowns(newCountdowns);
        }, 1000);

        return () => clearInterval(interval); // Clear the interval when the component unmounts
    }, [Pets]);

    const isBirthday = (birthday) => {
        const [day, month] = birthday.split('-').map(Number);
        const today = new Date();
        return today.getDate() === day && today.getMonth() + 1 === month;
    };


    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container mx-auto px-6 py-8">
                <h3 className="text-gray-700 text-3xl font-medium mb-6">List of Registered Pets</h3>

                <div className={'mb-3 float-right'}>
                    <a href={'/pet-registration'}
                        className="bg-e84f25 text-white px-4 py-2 rounded hover:bg-fdbc0e transition duration-300">
                        Add New Pet
                    </a>
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
                    {displayedPets.map((pet, index) => (
                        <div key={index}
                             className={`bg-white rounded-lg shadow-md p-4 ${isBirthday(pet.birthday) ? 'bg-yellow-200 border-4 border-yellow-500' : ''}`}>
                            {/* Image placeholder for pet's profile picture. Replace with actual image if available */}
                            <div className="w-full h-48 bg-gray-300 mb-4 relative">
                                {isBirthday(pet.birthday) && (
                                    <>
                                        <img src={birthdayIcon} alt="Birthday Icon" className="w-16 h-16 mx-auto mt-16 bg-e84f25"/>
                                        <div className="absolute bottom-2 left-2 text-yellow-600 font-bold">Happy Birthday!</div>
                                    </>
                                )}
                            </div>
                            <h4 className="text-xl font-semibold mb-2">{pet.name}</h4>
                            <p className="text-gray-600 text-sm mb-2"><strong>DOB:</strong> {pet.dob}</p>
                            <p className="text-gray-600 text-sm mb-2"><strong>Sex:</strong> {pet.sex}</p>
                            <p className="text-gray-600 text-sm mb-2"><strong>Type:</strong> {pet.type}</p>
                            <p className="text-gray-600 text-sm mb-2"><strong>Tattoo Number:</strong> {pet.tattooNumber}</p>

                            <div className="mt-4 p-2 border border-blue-300 rounded-lg bg-blue-50">
                                <div className="flex justify-center items-center space-x-2">
                                    <i className="fas fa-birthday-cake text-e84f25"></i> {/* Assuming you are using FontAwesome for icons */}
                                    <div className="text-center">
                                        <p className="text-e84f25 font-semibold">Birthday Countdown</p>
                                        <p className="text-gray-700 font-bold">
                                            {`${countdowns[pet.birthday]?.days || 0}d ${countdowns[pet.birthday]?.hours || 0}h ${countdowns[pet.birthday]?.minutes || 0}m ${countdowns[pet.birthday]?.seconds || 0}s`}
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
                                    onClick={() => {
                                        navigate("/medical-form")
                                    }}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">

                                    Add medical record
                                </button>

                                <button className="bg-fdbc0e text-white px-4 py-2 rounded hover:bg-fdbc0e transition duration-300">
                                    View
                                </button>
                            </div>
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

