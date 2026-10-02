const formatListingType = (listingType) => {
  const map = {
    RENT: 'Rent',
    SALE: 'Sale',
  }

  return map[listingType] || 'Rent'
}

const formatPropertyType = (propertyType) => {
  const map = {
    FLAT: 'Flat',
    HOUSE: 'House',
    PLOT: 'Plot',
    PG: 'PG',
    SHOP: 'Shop',
  }

  return map[propertyType] || 'Flat'
}

const formatFurnished = (furnished) => {
  const map = {
    UNFURNISHED: 'Unfurnished',
    SEMI_FURNISHED: 'Semi-furnished',
    FULLY_FURNISHED: 'Fully furnished',
  }

  return map[furnished] || 'Unfurnished'
}

const fallbackImage = (title, propertyType) => {
  const normalizedTitle = (title || propertyType || 'property').toLowerCase().replace(/\s+/g, '-')
  return `https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80&sig=${encodeURIComponent(normalizedTitle)}`
}

const formatProperty = (property) => ({
  id: property.id,
  title: property.title,
  type: formatPropertyType(property.propertyType),
  listingType: formatListingType(property.listingType),
  price: Number(property.price),
  bhk: property.bedrooms ?? 0,
  area: property.areaSqFt ?? 0,
  city: property.city,
  location: property.address,
  furnished: formatFurnished(property.furnished),
  image: property.image || fallbackImage(property.title, property.propertyType),
})

export default formatProperty
