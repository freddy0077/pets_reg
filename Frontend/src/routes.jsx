import { Home, Profile, SignIn, SignUp } from "@/pages";
import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import Registration from "@/pages/registration";
import Dashboard from "@/pages/dashboard";
import VertRegistration from "@/pages/doctors/vertRegistration";
import PetRegistration from "@/pages/pets/petRegistration";
import PaginatedDoctorsTable from "@/pages/doctors/allDoctors";
import AllPets from "@/pages/pets/allPets";
import PetMedicalForm from "@/pages/pets/petMedicalForm";
import LoginComponent from "@/pages/login";
import PrivateRoute from "@/PrivateRoute";
import {MembershipSignUp} from "@/pages/MembershipSignUp";
import AdminLoginComponent from "@/admin-login";
import DoctorEarnings from "@/pages/doctors/DoctorEarnings";
import Patients from "@/pages/pets/patients";

export const routes = [
  {
    icon: HomeIcon,
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    icon: UserCircleIcon,
    name: "profile",
    path: "/profile",
    element: <Profile />,
  },
  {
    icon: ArrowRightOnRectangleIcon,
    name: "Sign In",
    path: "/sign-in",
    element: <SignIn />,
  },

  {
    icon: ArrowRightOnRectangleIcon,
    name: "Log In",
    path: "/login",
    element: <LoginComponent />,
  },

  {
    icon: ArrowRightOnRectangleIcon,
    name: "Admin Log",
    path: "/admin-login",
    element: <AdminLoginComponent />,
  },

  // {
  //   icon: ArrowRightOnRectangleIcon,
  //   name: "Registration",
  //   path: "/registration",
  //   element: <Registration />,
  // },

  {
    icon: ArrowRightOnRectangleIcon,
    name: "Doctors",
    path: "/doctors",
    element: <PrivateRoute><PaginatedDoctorsTable /></PrivateRoute>,
  },

  {
    icon: ArrowRightOnRectangleIcon,
    name: "Pets",
    path: "/pets",
    element: <PrivateRoute><AllPets /></PrivateRoute>,
  },

  {
    icon: ArrowRightOnRectangleIcon,
    name: "Patients",
    path: "/pet-patients",
    element: <PrivateRoute><Patients /></PrivateRoute>,
  },

  {
    icon: ArrowRightOnRectangleIcon,
    name: "Earnings",
    path: "/earnings",
    element: <PrivateRoute><DoctorEarnings /></PrivateRoute>,
  },

  {
    icon: ArrowRightOnRectangleIcon,
    name: "Dashboard",
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,

  },

  {
    icon: ArrowRightOnRectangleIcon,
    name: "Dashboard",
    path: "/vert-registration",
    element: <PrivateRoute><VertRegistration /></PrivateRoute>,
  },

  {
    icon: ArrowRightOnRectangleIcon,
    name: "Pet Registration",
    path: "/pet-registration",
    element: <PrivateRoute><PetRegistration /></PrivateRoute>,
  },

  {
    icon: ArrowRightOnRectangleIcon,
    name: "Pet Medical Form",
    path: "/medical-form",
    element: <PetMedicalForm />,
  },

  {
    icon: ArrowRightOnRectangleIcon,
    name: "Pet Medical Form",
    path: "/packages",
    element: <MembershipSignUp />,
  },

  // {
  //   icon: UserPlusIcon,
  //   name: "Sign Up",
  //   path: "/sign-up",
  //   element: <SignUp />,
  // },
  // {
  //   icon: DocumentTextIcon,
  //   name: "Docs",
  //   href: "https://www.material-tailwind.com/docs/react/installation",
  //   target: "_blank",
  //   element: "",
  // },
];

export default routes;
