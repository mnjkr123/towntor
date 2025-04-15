const categories = [
    { value: '1', label: 'Houses' },
    { value: '2', label: 'Apartment' },
    { value: '3', label: 'Offices' },
    { value: '4', label: 'Townhome' },
];

const price = [
    { value: '1', label: '500' },
    { value: '1', label: '1000' },
    { value: '2', label: '2000' },
    { value: '3', label: '3000' },
    { value: '4', label: '4000' },
    { value: '5', label: '5000' },
    { value: '6', label: '6000' },
    { value: '7', label: '7000' },
];

const houseTypes = [
    { value: 'bungalow', label: 'Bungalow' },
    { value: 'villa', label: 'Villa' },
    { value: 'duplex', label: 'Duplex' },
];

const bedrooms = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
];

const bathrooms = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
];

const parking = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
];

const yearBuilt = Array.from({ length: 24 }, (_, i) => ({
    value: 2000 + i,
    label: (2000 + i).toString(),
}));

const plotSizes = [
    { value: '500', label: '500 sqft' },
    { value: '1000', label: '1000 sqft' },
    { value: '1500', label: '1500 sqft' },
    { value: '2000', label: '2000 sqft' },
    { value: '2500', label: '2500 sqft' },
];

const nearBy = [
    { value: 'mall', label: 'Mall' },
    { value: 'hospital', label: 'Hospital' },
    { value: 'school', label: 'School' },
];

const interiorDesigns = [
    { value: 'modern', label: 'Modern' },
    { value: 'traditional', label: 'Traditional' },
    { value: 'rustic', label: 'Rustic' },
];

const facings = [
    { value: 'north', label: 'North' },
    { value: 'east', label: 'East' },
    { value: 'south', label: 'South' },
    { value: 'west', label: 'West' },
];

const additionalFeatures = [
    { value: 'pool', label: 'Pool' },
    { value: 'garden', label: 'Garden' },
    { value: 'balcony', label: 'Balcony' },
];

export {categories,price,houseTypes,bedrooms,bathrooms,parking,yearBuilt,plotSizes,nearBy,interiorDesigns,facings,additionalFeatures};