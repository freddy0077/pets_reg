export function PricingSelection({ onPackageSelect }) {
    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-semibold mb-6">Choose a Pricing Package</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { name: 'Basic', color: 'from-blue-400 to-blue-500', icon: '🌟' },
                    { name: 'Standard', color: 'from-green-400 to-green-500', icon: '🚀' },
                    { name: 'Premium', color: 'from-purple-400 to-purple-500', icon: '💎' },
                ].map((packageInfo) => (
                    <div
                        key={packageInfo.name}
                        className={`border rounded p-6 cursor-pointer hover:shadow-lg transform transition-all duration-300 hover:scale-105 bg-gradient-to-br ${packageInfo.color}`}
                        onClick={() => onPackageSelect(packageInfo.name)}
                    >
                        <h3 className="text-lg font-bold mb-4 text-white">{packageInfo.icon} {packageInfo.name} Package</h3>
                        <p className="text-white opacity-80">Description of {packageInfo.name} package goes here...</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
