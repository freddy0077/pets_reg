import React, { useState } from 'react';
import {TopNavbar} from "../../../public/TopNavBar";

function PetMedicalForm() {
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
    return (
        <header className="bg-white shadow-sm flex justify-between items-center p-4 mt-12">
            <div className="text-2xl font-semibold text-gray-900">Pet Medical Form</div>
        </header>
    );
}

function MainContent() {
    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container mx-auto px-6 py-8">
                <h3 className="text-gray-700 text-3xl font-medium">Please provide your pet's medical details</h3>
                <div className="mt-6">
                    <MedicalForm />
                </div>
            </div>
        </main>
    );
}

function MedicalForm() {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        petName: '',
        dob: '',
        sex: '',
        petType: '',
        breed: '',
        allergies: [{ value: '', date: '', doctor: '', doctorsNotes: '' }],
        chronicConditions: [{ value: '', date: '', doctor: '', doctorsNotes: '' }],
        surgeries: [{ value: '', date: '', doctor: '', doctorsNotes: '' }],
        medications: [{ value: '', date: '', doctor: '', doctorsNotes: '' }],
        vaccinations: [{ vaccineName: '', dateAdministered: '', nextDueDate: '', doctor: '', doctorsNotes: '' }],

    });

    const handleFieldChange = (field, index, e) => {
        const newFieldData = [...formData[field]];
        newFieldData[index][e.target.name] = e.target.value;
        setFormData({
            ...formData,
            [field]: newFieldData,
        });
    };

    const addFieldEntry = (field) => {
        const newFieldData = [...formData[field]];
        // if (field === 'vaccinations') {
        //     newFieldData.push({ vaccineName: '', dateAdministered: '', nextDueDate: '', doctor: '' });
        // } else {
        //     newFieldData.push({ value: '', date: '', doctor: '' });
        // }

        if (field === 'vaccinations') {
            newFieldData.push({ vaccineName: '', dateAdministered: '', nextDueDate: '', doctor: '', doctorsNotes: '' });
        } else {
            newFieldData.push({ value: '', date: '', doctor: '', doctorsNotes: '' });
        }

        setFormData({
            ...formData,
            [field]: newFieldData
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (validateFields()) {
        //     console.log(formData);
        // } else {
        //     console.log("Validation errors:", errors);
        // }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
            {/* Allergies */}
            {formData.allergies.map((entry, index) => (
                <div key={index} className="mb-4">
                    <h4 className="text-gray-700 font-bold mb-2">Allergy Entry #{index + 1}</h4>
                    <InputField errors={errors} label="Allergy" name="value" type="text" value={entry.value} onChange={e => handleFieldChange('allergies', index, e)} />
                    <InputField errors={errors} label="Date" name="date" type="date" value={entry.date} onChange={e => handleFieldChange('allergies', index, e)} />
                    <InputField errors={errors} label="Doctor" name="doctor" type="text" value={entry.doctor} onChange={e => handleFieldChange('allergies', index, e)} />
                    <InputField errors={errors} label="Doctor's Notes" name="doctorsNotes" type="textarea" value={entry.doctorsNotes} onChange={e => handleFieldChange('allergies', index, e)} />

                </div>
            ))}
            <button type="button" onClick={() => addFieldEntry('allergies')} className="mb-4 bg-fdbc0e text-white px-4 py-2 rounded transition duration-300">Add Another Allergy Entry</button>

            {/* Chronic Conditions */}
            {formData.chronicConditions.map((entry, index) => (
                <div key={index} className="mb-4">
                    <h4 className="text-gray-700 font-bold mb-2">Chronic Condition Entry #{index + 1}</h4>
                    <InputField errors={errors} label="Condition" name="value" type="text" value={entry.value} onChange={e => handleFieldChange('chronicConditions', index, e)} />
                    <InputField errors={errors} label="Date" name="date" type="date" value={entry.date} onChange={e => handleFieldChange('chronicConditions', index, e)} />
                    <InputField errors={errors} label="Doctor" name="doctor" type="text" value={entry.doctor} onChange={e => handleFieldChange('chronicConditions', index, e)} />
                    <InputField errors={errors} label="Doctor's Notes" name="doctorsNotes" type="textarea" value={entry.doctorsNotes} onChange={e => handleFieldChange('allergies', index, e)} />
                </div>
            ))}
            <button type="button" onClick={() => addFieldEntry('chronicConditions')} className="mb-4 bg-fdbc0e text-white px-4 py-2 rounded transition duration-300">Add Another Chronic Condition Entry</button>

            {/* Surgeries */}
            {formData.surgeries.map((entry, index) => (
                <div key={index} className="mb-4">
                    <h4 className="text-gray-700 font-bold mb-2">Surgery Entry #{index + 1}</h4>
                    <InputField errors={errors} label="Surgery" name="value" type="text" value={entry.value} onChange={e => handleFieldChange('surgeries', index, e)} />
                    <InputField errors={errors} label="Date" name="date" type="date" value={entry.date} onChange={e => handleFieldChange('surgeries', index, e)} />
                    <InputField errors={errors} label="Doctor" name="doctor" type="text" value={entry.doctor} onChange={e => handleFieldChange('surgeries', index, e)} />
                    <InputField errors={errors} label="Doctor's Notes" name="doctorsNotes" type="textarea" value={entry.doctorsNotes} onChange={e => handleFieldChange('allergies', index, e)} />

                </div>
            ))}
            <button type="button" onClick={() => addFieldEntry('surgeries')} className="mb-4 bg-fdbc0e text-white px-4 py-2 rounded transition duration-300">Add Another Surgery Entry</button>

            {/* Medications */}
            {formData.medications.map((entry, index) => (
                <div key={index} className="mb-4">
                    <h4 className="text-gray-700 font-bold mb-2">Medication Entry #{index + 1}</h4>
                    <InputField errors={errors} label="Medication" name="value" type="text" value={entry.value} onChange={e => handleFieldChange('medications', index, e)} />
                    <InputField errors={errors} label="Date" name="date" type="date" value={entry.date} onChange={e => handleFieldChange('medications', index, e)} />
                    <InputField errors={errors} label="Doctor" name="doctor" type="text" value={entry.doctor} onChange={e => handleFieldChange('medications', index, e)} />
                    <InputField errors={errors} label="Doctor's Notes" name="doctorsNotes" type="textarea" value={entry.doctorsNotes} onChange={e => handleFieldChange('allergies', index, e)} />

                </div>
            ))}
            <button type="button" onClick={() => addFieldEntry('medications')} className="mb-4 bg-fdbc0e text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">Add Another Medication Entry</button>

            {/* Vaccinations */}
            {formData.vaccinations.map((entry, index) => (
                <div key={index} className="mb-4">
                    <h4 className="text-gray-700 font-bold mb-2">Vaccination Entry #{index + 1}</h4>
                    <InputField errors={errors} label="Vaccine Name" name="vaccineName" type="text" value={entry.vaccineName} onChange={e => handleFieldChange('vaccinations', index, e)} />
                    <InputField errors={errors} label="Date Administered" name="dateAdministered" type="date" value={entry.dateAdministered} onChange={e => handleFieldChange('vaccinations', index, e)} />
                    <InputField errors={errors} label="Next Due Date" name="nextDueDate" type="date" value={entry.nextDueDate} onChange={e => handleFieldChange('vaccinations', index, e)} />
                    <InputField errors={errors} label="Doctor" name="doctor" type="text" value={entry.doctor} onChange={e => handleFieldChange('vaccinations', index, e)} />
                    <InputField errors={errors} label="Doctor's Notes" name="doctorsNotes" type="textarea" value={entry.doctorsNotes} onChange={e => handleFieldChange('allergies', index, e)} />

                </div>
            ))}
            <button type="button" onClick={() => addFieldEntry('vaccinations')} className="mb-4 bg-fdbc0e text-white px-4 py-2 rounded transition duration-300">Add Another Vaccination Entry</button>

            {/* Submit Button */}
            <div className="flex items-center justify-center mt-4">
                <button className="bg-e84f25 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300" type="submit">Submit</button>
            </div>
        </form>
    );
}

function InputField({ label, name, type, value, onChange, errors }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
            {type === "textarea" ? (
                <textarea
                    className={`shadow appearance-none border ${errors[name] ? "border-red-500" : ""} rounded w-full py-2 px-3 text-gray-700`}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    rows="4"
                ></textarea>
            ) : (
                <input
                    className={`shadow appearance-none border ${errors[name] ? "border-red-500" : ""} rounded-full w-full py-2 px-3 text-gray-700`}
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                />
            )}
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
        </div>
    );
}


export default PetMedicalForm;
