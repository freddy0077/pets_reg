import React, { useState } from 'react';

export default function SearchBar({ placeholder, suggestions }) {
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [input, setInput] = useState('');

    const handleChange = (e) => {
        const userInput = e.currentTarget.value;

        // Filter our suggestions that don't contain the user's input
        const newFilteredSuggestions = suggestions.filter(
            (suggestion) =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        setInput(e.currentTarget.value);
        setFilteredSuggestions(newFilteredSuggestions);
    };

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
        setFilteredSuggestions([]);
    };

    return (
        <div className="relative mx-auto text-gray-600">
            <input
                className="w-full h-16 px-6 pr-20 rounded-lg text-lg focus:outline-none border border-blue-300 focus:border-blue-500"
                type="search"
                name="search"
                placeholder={placeholder}
                onChange={handleChange}
                value={input}
            />
            <ul className="absolute w-full mt-2 border border-gray-300 rounded-lg bg-white">
                {filteredSuggestions.map((suggestion, index) => (
                    <li
                        key={index}
                        className="px-6 py-2 hover:bg-gray-100"
                        onClick={() => handleSuggestionClick(suggestion)}
                    >
                        {suggestion}
                    </li>
                ))}
            </ul>
            <button type="submit" className="absolute right-0 top-0 mt-5 mr-6">
                <svg
                    className="text-gray-600 h-8 w-8 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.0"
                    viewBox="0 0 56.966 56.966"
                    width="512px"
                    height="512px"
                >
                    <path
                        d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23 s10.318,23,23,23c4.761,0,9.313-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92 c0.779,0,1.518-0.297,2.096-0.837C56.1,54.982,56.293,52.916,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17 s-17-7.626-17-17S14.61,6,23.984,6z"
                    />
                </svg>
            </button>
        </div>
    );
}
