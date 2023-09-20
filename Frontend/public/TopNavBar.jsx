import {useLocation} from "react-router";
import {useSelector} from "react-redux";

export function TopNavbar() {
    const { user } = useSelector(state => state.auth)

    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) => {
        return currentPath === path ? "bg-blue-700 text-white" : "";
    };

    const isAdmin = user?.role?.includes('admin');
    const isDoctor = user?.role?.includes('doctor');

    return (
        <div className="bg-fdbc0e text-white w-full space-x-4 py-4 px-6 fixed top-0 left-0">
            <a href="#" className="text-3xl font-semibold uppercase hover:text-gray-300">PETSREG</a>
            <nav className="inline-block text-xl">
                {isAdmin && (
                    <>
                        <a href="/dashboard" className={`mx-2 py-1.5 px-3 rounded-md transition duration-200 ${isActive('/dashboard') ? 'bg-white text-black' : ''} hover:bg-fdbc0e hover:text-white`}>Dashboard</a>
                        <a href="/doctors" className={`mx-2 py-1.5 px-3 rounded-md transition duration-200 ${isActive('/doctors') ? 'bg-white text-black' : ''} hover:bg-fdbc0e hover:text-white`}>Doctors</a>
                        <a href="/packages" className={`mx-2 py-1.5 px-3 rounded-md transition duration-200 ${isActive('/packages') ? 'bg-white text-black' : ''} hover:bg-fdbc0e hover:text-white`}>Packages</a>
                        <a href="/lost" className={`mx-2 py-1.5 px-3 rounded-md transition duration-200 ${isActive('/lost') ? 'bg-white text-black' : ''} hover:bg-fdbc0e hover:text-white`}>Lost And Found</a>
                    </>
                )}
                {(isAdmin || isDoctor) && (
                    <a href="/pets" className={`mx-2 py-1.5 px-3 rounded-md transition duration-200 ${isActive('/pets') ? 'bg-white text-black' : ''} hover:bg-fdbc0e hover:text-white`}>Pets</a>
                )}
                {isDoctor && (
                    <>
                        <a href="/earnings" className={`mx-2 py-1.5 px-3 rounded-md transition duration-200 ${isActive('/earnings') ? 'bg-white text-black' : ''} hover:bg-fdbc0e hover:text-white`}>Total Earnings</a>
                        <a href="/pet-patients" className={`mx-2 py-1.5 px-3 rounded-md transition duration-200 ${isActive('/pet-patients') ? 'bg-white text-black' : ''} hover:bg-fdbc0e hover:text-white`}>Patients</a>
                    </>

                )}
            </nav>
        </div>
    );
}
