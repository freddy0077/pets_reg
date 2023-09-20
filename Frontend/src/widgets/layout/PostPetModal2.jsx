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
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                            Tell us about it
                        </Dialog.Title>
                        <div className="mt-2">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded mt-2"
                                    placeholder="Pet Name"
                                />

                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded mt-2"
                                    placeholder="Breed"
                                />

                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded mt-2"
                                    placeholder="Colour"
                                />

                               <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded mt-2"
                                    placeholder="Where did you find the pet?"
                                />

                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded mt-2"
                                    placeholder="When did you find it"
                                />


                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded mt-2"
                                    placeholder="Your contact number"
                                />


                                {/* Add other form fields here */}
                                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                                    Submit information
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default PostPetModal;
