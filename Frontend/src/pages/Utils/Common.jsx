import React from "react";

export function Header({name}) {
    return (
        <header className="bg-white shadow-sm flex justify-between items-center p-4 mt-12">
            <div className="text-2xl font-semibold text-gray-900 mt-3">{name}</div>
            <div className="space-x-4 mt-5">
                {/*<button className="bg-fdbc0e text-white px-4 py-1.5 rounded hover:bg-blue-700">Logout</button>*/}
            </div>
        </header>
    );
}
