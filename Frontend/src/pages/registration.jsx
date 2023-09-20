import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    IconButton,
    Input,
    Textarea,
} from "@material-tailwind/react";
import { UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, contactData, lostAndFoundPetsData } from "@/data";
import SearchBar from "@/widgets/layout/SearchBar";
import {LostAndFoundPetCard} from "@/widgets/layout/LostAndFoundCard";
import PostPetModal from "@/widgets/layout/PostPetModal";
import Pricing from "@/widgets/layout/Pricing";


export default function registration() {
    const petNames = ['Bella', 'Max', 'Charlie'];
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Pricing/>
            <section className="relative bg-blue-gray-50/50 py-24 px-4">
                <div className="container mx-auto">
                    <PageTitle heading="Want to work with us?">
                        Fill out the form below to register your pet.
                    </PageTitle>
                    <form className="mx-auto mt-12 max-w-3xl text-center">
                        <div className="mb-8 grid grid-cols-1">
                            {/*<Input label="Email" variant="outlined" fullWidth />*/}
                            <div className="mb-8 grid grid-cols-1">
                                <label htmlFor="email-select">Email</label>
                                <select id="email-select" className="your-select-css-classes" name="email">
                                    <option value="" disabled selected>Select an email</option>
                                    <option value="example1@example.com">example1@example.com</option>
                                    <option value="example2@example.com">example2@example.com</option>
                                    <option value="example3@example.com">example3@example.com</option>
                                </select>
                            </div>

                        </div>

                        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Input label="Full Name" variant="outlined" fullWidth />
                            <Input label="Email" variant="outlined" fullWidth />
                        </div>

                        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Input label="Full Name" variant="outlined" fullWidth />
                            <Input label="Email" variant="outlined" fullWidth />
                        </div>

                        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Input label="Full Name" variant="outlined" fullWidth />
                            <Input label="Email" variant="outlined" fullWidth />
                        </div>

                        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Input label="Full Name" variant="outlined" fullWidth />
                            <Input label="Email" variant="outlined" fullWidth />
                        </div>

                        <div className="mb-8 grid grid-cols-1 gap-4">
                            <Textarea
                                label="Message"
                                variant="outlined"
                                multiline
                                rows={4}
                                fullWidth
                            />
                        </div>
                        <Button variant="contained" size="large">
                            send message
                        </Button>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    );
}

