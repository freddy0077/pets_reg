export function LostAndFoundPetCard({ status, petName, breed, color, location, date, contact, img }) {
    return (
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-md">
            <img src={img} alt={`${status} ${breed}`} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2">{petName}</h3>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Status:</span> {status}</p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Breed:</span> {breed}</p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Color:</span> {color}</p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Location:</span> {location}</p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Date:</span> {date}</p>
            <p className="text-gray-600 mb-1"><span className="font-semibold">Contact:</span> {contact}</p>
        </div>
    );
}
