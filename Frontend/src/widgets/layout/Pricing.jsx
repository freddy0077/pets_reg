import React from 'react';
// import './Pricing.css';

 function Pricing() {
    return (
        <div className="pricing-container">
            {packages.map((pkg) => (
                <div className="pricing-card">
                    <h5>{pkg.name}</h5>
                    <div className="price">GHS{pkg.price}</div>
                    <ul className="features">
                        {pkg.features.map((feature) => (
                            <li>{feature}</li>
                        ))}
                    </ul>
                    <button className="purchase-btn">Become a Member</button>
                </div>
            ))}
        </div>
    );
}

const packages = [
    {
        name: 'ORDINARY MEMBERSHIP',
        price: '70',
        features: ['Free Microchip', 'Free Health Screening', 'Free Rabis Vaccination'],
    },
    {
        name: 'GOLD MEMBERSHIP',
        price: '120',
        features: ['Free Microchip', 'Free Health Screening', 'Free Rabis Vaccination', 'Digital Health Proofile', 'Birthday Notification'],

    },
    {
        name: 'VIP MEMBERSHIP',
        price: '270',
        features: ['Free Microchip', 'Free Health Screening', 'Free Rabis Vaccination', 'Digital Health Proofile', 'Birthday Notification', 'Social Media Post for Lost Pet'],

    },
];

export default Pricing;
