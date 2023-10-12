import {useDispatch, useSelector} from "react-redux";
import {authActions} from "@/_store";
import { useLocation, useNavigate} from "react-router";


export function TopNavbar() {
    const { user } = useSelector(state => state.auth);

    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) => {
        return currentPath === path ? "bg-blue-700 text-white" : "";
    };

    const isAdmin = user?.role?.includes('admin');
    const isDoctor = user?.role?.includes('doctor');
    const isMember = user?.role?.includes('member');

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogout = () => {
        dispatch(authActions.logout())
            setTimeout(() => {
                navigate("/");  // Using React Router's history to navigate
            }, 2000);
    };


    return (
        <div className="bg-fdbc0e text-white w-full space-x-4 py-4 px-6 fixed top-0 left-0 flex justify-between items-center">
            <a href="#" className="text-3xl font-semibold uppercase hover:text-gray-300">PETSREG</a>

            <nav className="inline-block text-xl space-x-4">
                {isAdmin && (
                    <>
                        <a href="/dashboard" className={`mx-2 py-1.5 px-3 rounded-md transition duration-200 ${isActive('/dashboard') ? 'bg-white text-black' : ''} hover:bg-fdbc0e hover:text-white`}><i className="fas fa-tachometer-alt mr-2"></i>Dashboard</a>
                        <a href="/doctors" className={`mx-2 py-1.5 px-3 rounded-md transition duration-200 ${isActive('/doctors') ? 'bg-white text-black' : ''} hover:bg-fdbc0e hover:text-white`}><i className="fas fa-user-md mr-2"></i>Doctors</a>
                        <a href="/lost-pets" className={`mx-2 py-1.5 px-3 rounded-md transition duration-200 ${isActive('/lost-pets') ? 'bg-white text-black' : ''} hover:bg-fdbc0e hover:text-white`}><i className="fas fa-search mr-2"></i>Lost Pets</a>
                        <a href="/found-pets" className={`mx-2 py-1.5 px-3 rounded-md transition duration-200 ${isActive('/found-pets') ? 'bg-white text-black' : ''} hover:bg-fdbc0e hover:text-white`}><i className="fas fa-paw mr-2"></i>Found Pets</a>
                    </>
                )}

                {(isAdmin || isDoctor) && (
                    <a href="/pets" className={`mx-2 py-1.5 px-3 rounded-md transition duration-200 ${isActive('/pets') ? 'bg-white text-black' : ''} hover:bg-fdbc0e hover:text-white`}><i className="fas fa-paw mr-2"></i>Pets</a>
                )}

                {isDoctor && (
                    <>
                        <a href="/earnings" className={`mx-2 py-1.5 px-3 rounded-md transition duration-200 ${isActive('/earnings') ? 'bg-white text-black' : ''} hover:bg-fdbc0e hover:text-white`}><i className="fas fa-wallet mr-2"></i>Total Earnings</a>
                        <a href="/pet-patients" className={`mx-2 py-1.5 px-3 rounded-md transition duration-200 ${isActive('/pet-patients') ? 'bg-white text-black' : ''} hover:bg-fdbc0e hover:text-white`}><i className="fas fa-notes-medical mr-2"></i>Patients</a>
                    </>
                )}

                {isMember && (
                    <a href="/details" className={`mx-2 py-1.5 px-3 rounded-md transition duration-200 ${isActive('/earnings') ? 'bg-white text-black' : ''} hover:bg-fdbc0e hover:text-white`}><i className="fas fa-wallet mr-2"></i>Total Earnings</a>
                )}
            </nav>

            <div className="flex items-center space-x-4 cursor-pointer">
                <a href="/profile" className="hover:text-gray-300 transition duration-200"><i className="fas fa-user-circle"></i> Profile</a>
                <a href="/settings" className="hover:text-gray-300 transition duration-200"><i className="fas fa-cog"></i> Settings</a>

                {/*<a onClick={ () => {*/}
                {/*    dispatch(authActions.setLogout()).then(() => {*/}
                {/*        setTimeout(()=> {*/}
                {/*            navigate("/")*/}
                {/*        },2000)*/}
                {/*    })*/}
                {/*}}*/}
                {/*   className="hover:text-gray-300 transition duration-200"><i className="fas fa-sign-out-alt"></i> Logout</a>*/}

                <a onClick={handleLogout} className="hover:text-gray-300 transition duration-200">
                    <i className="fas fa-sign-out-alt "></i> Logout
                </a>

            </div>
        </div>
    );
}
