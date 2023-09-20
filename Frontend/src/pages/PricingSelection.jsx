export function PricingSelection({ onPackageSelect }) {
    return (
        <div className="container mx-auto p-8">
            <h2 className="text-xl font-semibold mb-6">Choose a Pricing Package</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Basic', 'Standard', 'Premium'].map(packageName => (
                    <div
                        key={packageName}
                        className="border rounded p-6 cursor-pointer hover:bg-gray-100"
                        onClick={() => onPackageSelect(packageName)}
                    >
                        <h3 className="text-lg font-bold mb-4">{packageName} Package</h3>
                        <p>Description of {packageName} package goes here...</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
