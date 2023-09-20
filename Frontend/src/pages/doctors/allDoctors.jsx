import React, {useEffect, useState} from 'react';
import {TopNavbar} from "../../../public/TopNavBar";
import {useDispatch, useSelector} from "react-redux";
import {authActions, doctorActions} from "@/_store";
import {useNavigate} from "react-router";

function AllDoctors() {

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
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <header className="bg-white shadow-sm flex justify-between items-center p-4 mt-12">
            <div className="text-2xl font-semibold text-gray-900">Doctors</div>
            <div className="space-x-4 mt-5">
                <button
                    onClick={() => {
                        dispatch(authActions.logout())
                        setTimeout(() => {
                            navigate(0)

                        },3000)

                    }}
                    className="bg-blue-800 text-white px-4 py-1.5 rounded hover:bg-blue-700">Logout</button>
            </div>
        </header>
    );
}


function MainContent() {

    const {doctors} = useSelector(state => state.doctor)
    console.log("doctors", doctors)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Display 6 doctors per page
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(doctorActions.getDoctors())
    },[])


    const filteredDoctors = doctors?.data?.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.phone.includes(searchTerm) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.license.includes(searchTerm)
    );

    const totalPageCount = Math.ceil(filteredDoctors?.length / itemsPerPage);

    const displayedDoctors = filteredDoctors?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const openModal = (doctor) => {
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDoctor(null);
    }

    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container mx-auto px-6 py-8">
                <h3 className="text-gray-700 text-3xl font-medium mb-6">List of Registered Veterinary Doctors</h3>

                <div className={'mb-3 float-right'}>
                    <a href={'/vert-registration'}
                       className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                        Add New Doctor
                    </a>
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700"
                        placeholder="Search for a doctor..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedDoctors?.map((doctor, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-4">
                            {/* Image placeholder for doctor's profile picture. Replace with actual image if available */}
                            <div className="w-full h-48 bg-gray-300 mb-4 rounded-lg"></div>
                            <h4 className="text-xl font-semibold mb-2">{doctor?.name}</h4>
                            <p className="text-gray-600 text-sm mb-2"><strong>Email:</strong> {doctor.email}</p>
                            <p className="text-gray-600 text-sm mb-2"><strong>Phone:</strong> {doctor.phone}</p>
                            <p className="text-gray-600 text-sm mb-2"><strong>Specialization:</strong> {doctor.specialization}</p>
                            <p className="text-gray-600 text-sm mb-2"><strong>License:</strong> {doctor.license}</p>

                            {/* Edit and View buttons */}
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => openModal(doctor)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                                    Edit
                                </button>
                                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
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
                                <h2 className="text-xl mb-4">Edit Doctor</h2>
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
                        className="mx-1 px-4 py-2 bg-blue-800 text-white rounded"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} // Go to previous page
                    >
                        Previous
                    </button>
                    <span className="mx-2">{currentPage} / {totalPageCount}</span>
                    <button
                        className="mx-1 px-4 py-2 bg-blue-800 text-white rounded"
                        disabled={currentPage === totalPageCount}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPageCount))} // Go to next page
                    >
                        Next
                    </button>
                </div>
            </div>
        </main>
    );
}



export default AllDoctors;

