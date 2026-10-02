import prisma from '../src/config/prisma.js';

const owner = await prisma.user.upsert({
  where: { email: 'owner@registeryourhome.com' },
  update: {},
  create: {
    fullName: 'Amit Sharma',
    email: 'owner@registeryourhome.com',
    phone: '+91 98765 43210',
    role: 'OWNER',
  },
});

const properties = [
  {
    title: 'Maple Heights Apartment',
    description: 'Bright 2 BHK apartment close to the metro and shopping district.',
    address: '12 Maple Avenue',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    listingType: 'RENT',
    propertyType: 'FLAT',
    furnished: 'FULLY_FURNISHED',
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 1200,
    price: 42000,
    isFeatured: true,
  },
  {
    title: 'Sunset Villa',
    description: 'Spacious villa with a garden and parking in a quiet neighborhood.',
    address: '45 Sunset Road',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    listingType: 'SALE',
    propertyType: 'HOUSE',
    furnished: 'SEMI_FURNISHED',
    bedrooms: 4,
    bathrooms: 3,
    areaSqFt: 2400,
    price: 9600000,
    isFeatured: true,
  },
  {
    title: 'Green Park Studio',
    description: 'Compact, budget-friendly studio apartment with natural light.',
    address: '8 Green Park Lane',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    listingType: 'RENT',
    propertyType: 'PG',
    furnished: 'UNFURNISHED',
    bedrooms: 1,
    bathrooms: 1,
    areaSqFt: 650,
    price: 18000,
    isFeatured: false,
  },
  {
    title: 'Market Square Shop',
    description: 'Commercial property suitable for retail or office use.',
    address: '88 Market Square',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    listingType: 'SALE',
    propertyType: 'SHOP',
    furnished: 'SEMI_FURNISHED',
    bedrooms: 0,
    bathrooms: 1,
    areaSqFt: 900,
    price: 14500000,
    isFeatured: false,
  },
];

for (const property of properties) {
  await prisma.property.create({
    data: {
      ...property,
      ownerId: owner.id,
    },
  });
}

console.log(`Seeded 1 owner and ${properties.length} properties.`);
