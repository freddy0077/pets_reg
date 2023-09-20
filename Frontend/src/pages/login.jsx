import React, { useState } from 'react';
import {handleSuccessToast} from "@/_helpers/functions";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {authActions} from "@/_store";

function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('member');
    const [microchip, setMicrochip] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [otpTimer, setOtpTimer] = useState(null);
    const [canResendOtp, setCanResendOtp] = useState(false);

    const startOtpTimer = () => {
        let timeRemaining = 60; // 60 seconds

        const timer = setInterval(() => {
            timeRemaining--;

            if (timeRemaining <= 0) {
                clearInterval(timer);
                setCanResendOtp(true);
                setOtpTimer(null);
            } else {
                setOtpTimer(timeRemaining);
            }
        }, 1000);

        return timer;
    };


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validateMemberLogin = () => {
        const newErrors = {};

        if (!microchip) {
            newErrors.microchip = 'Microchip Number is required.';
        }

        if (showOtp && !otp) {
            newErrors.otp = 'OTP is required.';
        } else if (showOtp && otp.length !== 4) {
            newErrors.otp = 'OTP must be 4 digits.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;  // returns true if no errors
    };

    const validateDoctorLogin = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid.';
        }

        if (!password) {
            newErrors.password = 'Password is required.';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;  // returns true if no errors
    };

    const handleMemberLogin = (e) => {
        e.preventDefault();

        if (!validateMemberLogin()) return;

        if (!showOtp) {
            // Logic to request OTP goes here
            setShowOtp(true);

            const timer = startOtpTimer();
            return () => {
                clearInterval(timer);  // Cleanup timer on unmount
            };
            return;
        }

        // Continue with the actual member login logic here if OTP check has passed
    };

    const handleDoctorLogin = (e) => {
        e.preventDefault();

        if (!validateDoctorLogin()) return;

           dispatch(authActions.login({email, password})).then((res) => {
                console.log("Res", res)
                if (res.type !== "auth/login/rejected") {
                    handleSuccessToast()
                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 2000)
                }else{
                    // setErrorMessage("Unable to login at this time. Try again later!")
                }
            })
    };

    const handleResendOtp = () => {
        // Logic to resend OTP goes here
        setCanResendOtp(false);

        // Restart OTP timer
        const timer = startOtpTimer();
        return () => {
            clearInterval(timer);  // Cleanup timer on unmount
        };
    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div className="text-center">
                    <img className="mx-auto h-20 w-auto mb-4" src="/img/onWhiteLogo.png" alt="Pet Logo" />
                    <h2 className="text-2xl font-extrabold text-gray-900">
                        Welcome to PetReg
                    </h2>
                </div>
                <div className="flex space-x-4 mb-6">
                    <div
                        onClick={() => setRole('member')}
                        className={`flex-1 p-6 border-2 rounded-lg cursor-pointer transition duration-300 ease-in-out ${role === 'member' ? 'border-fdbc0e bg-fdbc0e20' : 'border-gray-300 hover:border-fdbc0e hover:bg-fdbc0e20'}`}>
                        <div className="text-center">
                            <div className="text-2xl">👤</div>
                            <div>Member</div>
                        </div>
                    </div>
                    <div
                        onClick={() => setRole('doctor')}
                        className={`flex-1 p-6 border-2 rounded-lg cursor-pointer transition duration-300 ease-in-out ${role === 'doctor' ? 'border-fdbc0e bg-fdbc0e20' : 'border-gray-300 hover:border-fdbc0e hover:bg-fdbc0e20'}`}>
                        {/*className={`flex-1 p-6 border-2 rounded-lg cursor-pointer transition duration-300 ease-in-out ${role === 'doctor' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-500 hover:bg-indigo-50'}`}>*/}
                        <div className="text-center">
                            <div className="text-2xl">🩺</div>
                            <div>Doctor</div>
                        </div>
                    </div>
                </div>
                    <form className="space-y-6" onSubmit={role === 'member' ? handleMemberLogin : handleDoctorLogin}>
                    {/* Email & Password fields remain the same */}

                    {role === 'member' ? (
                            <div className="mt-4">
                                <label htmlFor="microchip-number" className="block text-gray-700 font-medium mb-2">Microchip Number</label>
                                <div className="relative rounded-md shadow-sm">
                                    <input
                                        id="microchip-number"
                                        type="text"
                                        className="form-input block w-full pr-10 sm:text-sm sm:leading-5 pl-3 pr-10 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:shadow-outline-indigo placeholder-gray-400"
                                        placeholder="Enter microchip number"
                                        value={microchip}
                                        onChange={e => setMicrochip(e.target.value)}
                                    />
                                    {errors.microchip && <p className="mt-1 text-red-500 text-xs italic">{errors.microchip}</p>}
                                </div>
                            </div>

                        ): (
                <>

                    <div className="mt-4">
                        <label htmlFor="email-address" className="block text-gray-700 font-medium mb-2">Email address</label>
                        <div className="relative rounded-md shadow-sm">
                            <input
                                id="email-address"
                                className="form-input block w-full pr-10 sm:text-sm sm:leading-5 pl-3 pr-10 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:shadow-outline-indigo placeholder-gray-400"
                                placeholder="john.doe@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />

                            {errors.email && <p className="mt-1 text-red-500 text-xs italic">{errors.email}</p>}

                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884l8.597 6.431a1 1 0 001.2 0l8.6-6.43A2 2 0 0020 4a2 2 0 00-1-1.724l-9-4a2 2 0 00-2 0l-9 4A2 2 0 000 4a2 2 0 002.003 1.884z" />
                                    <path d="M0 8l9 4 9-4m-9 6l-6.562-3.663 1 1.732L10 15v5l5.562-3.183 1-1.732L10 14l-9-5z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                        <div className="relative rounded-md shadow-sm">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="form-input block w-full pr-10 sm:text-sm sm:leading-5 pl-3 pr-10 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:shadow-outline-indigo placeholder-gray-400"
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="mt-1 text-red-500 text-xs italic">{errors.password}</p>}
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 2a6 6 0 00-5.917 5.17A1.981 1.981 0 012 8a2 2 0 014 0 3.999 3.999 0 014.236 3.76A4.992 4.992 0 0112 10a5 5 0 01-1 9.904V20a2 2 0 114 0v-.076a5.001 5.001 0 01-1-9.925A4.992 4.992 0 0118 10a2 2 0 012 2v-.001a1.98 1.98 0 01-1.21 1.83A6 6 0 0010 2zm-4 8a2 2 0 100-4 2 2 0 000 4zm8 8a2 2 0 100-4 2 2 0 000 4zm2-8a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
</>

                    )}

                    {showOtp && role === 'member' ? (
                        <div className="mt-4 text-center">
                            {otpTimer
                                ? <span>Resend OTP in {otpTimer} seconds</span>
                                : canResendOtp && <button onClick={handleResendOtp} className="text-indigo-600 hover:text-indigo-500">Resend OTP</button>
                            }
                            <label htmlFor="otp" className="block text-gray-700 font-medium mb-2">Enter OTP</label>
                            <div className="relative rounded-md shadow-sm">
                                <input
                                    id="otp"
                                    type="text"
                                    maxLength="4"
                                    className="form-input block w-full pr-10 sm:text-sm sm:leading-5 pl-3 pr-10 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:shadow-outline-indigo placeholder-gray-400"
                                    placeholder="Enter 4-digit OTP"
                                    value={otp}
                                    onChange={e => setOtp(e.target.value)}
                                />
                                {errors.otp && <p className="mt-1 text-red-500 text-xs italic">{errors.otp}</p>}
                            </div>
                        </div>
                    ) : null}

                    {/*<div className="mt-4">*/}
                    {/*    <button*/}
                    {/*        type="submit"*/}
                    {/*        className={`group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} focus:ring-indigo-500`}*/}
                    {/*        disabled={loading}*/}
                    {/*    >*/}
                    {/*        {loading ? (*/}
                    {/*            <span className="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></span>*/}
                    {/*        ) : (*/}
                    {/*            "Sign In"*/}
                    {/*        )}*/}
                    {/*    </button>*/}
                    {/*</div>*/}

                    {role === 'member' && (
                        <button
                            type="submit"
                            // className={`group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${loading ? 'bg-e84f25 cursor-not-allowed' : 'bg-fdbc0e hover:bg-e84f25'} focus:ring-e84f25`}
                            className={`group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${loading ? 'bg-fdbc0e20 cursor-not-allowed' : 'bg-fdbc0e hover:bg-fdbc0e'} focus:ring-fdbc0e`}
                        >
                            {showOtp ? "Submit OTP" : "Sign In"}
                        </button>
                    )}

                    {role === 'doctor' && (
                        <button
                            type="submit"

                            className={`group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${loading ? 'bg-fdbc0e cursor-not-allowed' : 'bg-fdbc0e hover:bg-fdbc0e'} focus:ring-fdbc0e`}
                        >
                            Sign In
                        </button>
                    )}


                </form>
            </div>
        </div>
    );
}

export default LoginComponent;
