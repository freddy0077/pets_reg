import React from 'react';
import { Dialog, Transition } from '@headlessui/react';

function PostPetModal({ isOpen, onClose }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission here
    };

    return (
        <Transition appear show={isOpen} as={React.Fragment}>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
                <div className="min-h-screen px-4 text-center">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-6">
                            Tell us about it
                        </Dialog.Title>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petName">
                                        Pet Name
                                    </label>
                                    <input
                                        type="text"
                                        id="petName"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Pet Name"
                                    />

                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petName">
                                        Breed
                                    </label>
                                    <input
                                        type="text"
                                        id="petName"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Breed of dog"
                                    />

                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petName">
                                        Colour
                                    </label>
                                    <input
                                        type="text"
                                        id="petName"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Colour of dog"
                                    />

                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petName">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        id="petName"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Where did you find the dog?"
                                    />

                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petName">
                                        Your contact number
                                    </label>
                                    <input
                                        type="text"
                                        id="petName"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="How to reach you"
                                    />

                                </div>



                                {/* ... other fields ... */}
                                <div className="mt-6">
                                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Submit Information
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default PostPetModal;
