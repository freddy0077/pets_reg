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
import {TopNavbar} from "../../public/TopNavBar";
import {useNavigate} from "react-router";


export function Home() {
  const petNames = ['Bella', 'Max', 'Charlie'];
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate()

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleLoginClick = () => {
    // Navigate to login route or open a login modal
    navigate("/login")
  };

  const handleSignUpClick = () => {
    // Navigate to sign up route or open a sign up modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
      <>
        <div className="absolute top-0 right-0 z-50 p-6"> {/* Use z-50 to ensure it's above other elements */}
          <Button variant="outlined" color="green" onClick={handleLoginClick} className="transition-transform transform hover:scale-105">
            Login
          </Button>
          {/*<Button variant="contained" color="primary" onClick={handleSignUpClick} className="ml-4 transition-transform transform hover:scale-105">*/}
          {/*  Sign Up*/}
          {/*</Button>*/}
        </div>

        <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
          <div className="absolute top-0 h-full w-full bg-[url('/img/home-image.jpg')] bg-cover bg-center" />
          <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
          <div className="max-w-8xl container relative mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                <Typography
                    variant="h1"
                    color="white"
                    className="mb-6 font-black"
                >
                  Register your pet with us.
                </Typography>
                <Typography variant="lead" color="white" className="opacity-80">
                  Welcome to our pet registration portal. Ensure the safety and well-being of your pet by registering them. It's simple, fast, and secure.
                </Typography>

                <div className="mt-10">
                  <SearchBar placeholder="Search by name or microchip number" suggestions={petNames} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="-mt-32 bg-gray-50 px-4 pb-20 pt-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuresData.map(({ color, title, icon, description }) => (
                  <FeatureCard
                      key={title}
                      color={color}
                      title={title}
                      icon={React.createElement(icon, {
                        className: "w-5 h-5 text-white",
                      })}
                      description={description}
                  />
              ))}
            </div>

            <div className="typography-container">
              <Typography
                  variant="h1"
                  color="black"
                  className="mb-6 font-black ml-8 centered-typo"
              >
                Choose your package
              </Typography>
            </div>


            <Pricing />

          </div>
        </section>

        <section className="px-4 pt-20 pb-48">
          <div className="container mx-auto">
            <PageTitle heading="Lost and Found">

              <p className="text-center text-gray-700 mt-4">
                Have you lost or found a pet? Post the details here to help each other out. Let's reunite pets with their families!
              </p>
              {/*Our team consists of dedicated professionals who are passionate about animals and their well-being. We work tirelessly to ensure the safety of your pets and provide top-notch services.*/}
            </PageTitle>

            <div className="mt-16 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-3">
              {lostAndFoundPetsData.map(({ id, status, petName, breed, color, location, date, contact, img }) => (
                  <LostAndFoundPetCard
                      key={id}
                      status={status}
                      petName={petName}
                      breed={breed}
                      color={color}
                      location={location}
                      date={date}
                      contact={contact}
                      img={img}
                  />
              ))}
            </div>
            <div className="mt-24 text-center">
              <Button variant="contained" color="primary" onClick={openModal}>
                Found a lost pet?
              </Button>
            </div>

            <PostPetModal isOpen={isModalOpen} onClose={closeModal} />

          </div>
        </section>

        <section className="relative bg-blue-gray-50/50 py-24 px-4">
          <div className="container mx-auto">
            <PageTitle heading="Get Started">
              Register your pet with us and ensure their safety and well-being. Join our community and make a difference in the life of your pet.
            </PageTitle>
            <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
              {contactData.map(({ title, icon, description }) => (
                  <Card
                      key={title}
                      color="transparent"
                      shadow={false}
                      className="text-center text-blue-gray-900"
                  >
                    <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-white shadow-lg shadow-gray-500/20">
                      {React.createElement(icon, {
                        className: "w-5 h-5",
                      })}
                    </div>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      {title}
                    </Typography>
                    <Typography className="font-normal text-blue-gray-500">
                      {description}
                    </Typography>
                  </Card>
              ))}
            </div>
            <PageTitle heading="Want to work with us?">
              Fill out the form below and we will get back to you as soon as possible.
            </PageTitle>
            <form className="mx-auto mt-12 max-w-3xl text-center">
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

