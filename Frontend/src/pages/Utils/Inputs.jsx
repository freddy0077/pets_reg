import React from "react";

export function SelectField({ label, name, options, value, onChange,errors }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
            <select
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            >
                <option value="">Select...</option>
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
        </div>
    );
}


export function InputField({ label, name, type, value, onChange, errors }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
            <input
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700"
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
            />
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
        </div>
    );
}

export function PricingSelectField({ label, name, options, value, onChange, errors, hasLabels }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
            <select
                className={`shadow appearance-none border ${errors[name] ? "border-red-500" : ""} rounded-full w-full py-2 px-3 text-gray-700`}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            >
                {hasLabels ?
                    <>
                        <option value="">Select...</option>
                        {options?.map(opt => (
                            <option key={opt.id} value={opt.id}>{opt.name}-{opt.price}</option>
                        ))}
                    </>:
                    <>

                        <option value="">Select...</option>
                        {options?.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </>
                }

            </select>
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
        </div>
    );
}