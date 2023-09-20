import {PricingSelection} from "@/pages/PricingSelection";
import PetRegistration from "@/pages/pets/petRegistration";
import {TopNavbar} from "../../public/TopNavBar";
import {useState} from "react";


export const MembershipSignUp = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);

    const handlePackageSelect = (packageName) => {
        setSelectedPackage(packageName);
    };

    return (
        <div className="h-screen bg-gray-100">
            <TopNavbar />
            {selectedPackage ? (
                <PetRegistration packageName={selectedPackage} />
            ) : (
                <PricingSelection onPackageSelect={handlePackageSelect} />
            )}
        </div>
    );
}
