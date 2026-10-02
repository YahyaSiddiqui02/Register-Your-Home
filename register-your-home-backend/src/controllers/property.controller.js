import { Prisma } from '@prisma/client'
import prisma from '../config/prisma.js'
import formatProperty from '../utils/formatProperty.js'

const normalizeEnumValue = (value, fallback) => {
  if (!value) return fallback
  return value.trim()
}

const parseNumber = (value, fallback) => {
  if (value === undefined || value === null || value === '') return fallback
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const allowedPropertyTypes = ['FLAT', 'HOUSE', 'PLOT', 'PG', 'SHOP']
const allowedListingTypes = ['RENT', 'SALE']
const allowedFurnished = ['UNFURNISHED', 'SEMI_FURNISHED', 'FULLY_FURNISHED']

const validatePropertyPayload = (payload) => {
  const { title, price, city, address, listingType, propertyType, furnished, bedrooms, areaSqFt } = payload

  if (!title || !city || !address) {
    return 'title, city, and address are required'
  }

  if (!listingType || !allowedListingTypes.includes(listingType.toUpperCase())) {
    return 'listingType must be RENT or SALE'
  }

  if (!propertyType || !allowedPropertyTypes.includes(propertyType.toUpperCase())) {
    return 'propertyType is invalid'
  }

  if (!furnished || !allowedFurnished.includes(furnished.toUpperCase())) {
    return 'furnished must be UNFURNISHED, SEMI_FURNISHED, or FULLY_FURNISHED'
  }

  if (!price || Number(price) <= 0) {
    return 'price must be a positive number'
  }

  if (bedrooms !== undefined && bedrooms !== null && bedrooms !== '' && (Number(bedrooms) < 0 || Number.isNaN(Number(bedrooms)))) {
    return 'bedrooms must be a valid non-negative number'
  }

  if (areaSqFt !== undefined && areaSqFt !== null && areaSqFt !== '' && (Number(areaSqFt) < 0 || Number.isNaN(Number(areaSqFt)))) {
    return 'areaSqFt must be a valid non-negative number'
  }

  return null
}

export const getProperties = async (req, res, next) => {
  try {
    const listingType = normalizeEnumValue(req.query.listingType, null)
    const propertyType = normalizeEnumValue(req.query.propertyType, null)
    const search = normalizeEnumValue(req.query.search, '')
    const minPrice = parseNumber(req.query.minPrice, null)
    const maxPrice = parseNumber(req.query.maxPrice, null)
    const bhk = parseNumber(req.query.bhk, null)
    const sort = normalizeEnumValue(req.query.sort, 'newest').toLowerCase()

    const where = {}

    if (listingType) {
      where.listingType = listingType.toUpperCase() === 'RENT' ? 'RENT' : 'SALE'
    }

    if (propertyType) {
      where.propertyType = propertyType.toUpperCase()
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (minPrice !== null || maxPrice !== null) {
      where.price = {}
      if (minPrice !== null) where.price.gte = minPrice
      if (maxPrice !== null) where.price.lte = maxPrice
    }

    if (bhk !== null) {
      where.bedrooms = bhk
    }

    let orderBy = { createdAt: 'desc' }

    if (sort === 'low-high') {
      orderBy = { price: 'asc' }
    } else if (sort === 'high-low') {
      orderBy = { price: 'desc' }
    } else if (sort === 'newest') {
      orderBy = { createdAt: 'desc' }
    }

    const properties = await prisma.property.findMany({
      where,
      orderBy,
    })

    const formatted = properties.map(formatProperty)

    res.status(200).json({
      success: true,
      count: formatted.length,
      data: formatted,
    })
  } catch (error) {
    next(error)
  }
}

export const getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id || id === 'undefined') {
      return res.status(400).json({
        success: false,
        message: 'Property id is required',
      })
    }

    const property = await prisma.property.findUnique({
      where: { id },
    })

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: formatProperty(property),
    })
  } catch (error) {
    if (error.code === 'P2023') {
      return res.status(400).json({
        success: false,
        message: 'Invalid property id format',
      })
    }

    return next(error)
  }
}

export const getMyProperties = async (req, res, next) => {
  try {
    const properties = await prisma.property.findMany({
      where: { ownerId: req.user.id },
      orderBy: { createdAt: 'desc' },
    })

    return res.status(200).json({
      success: true,
      count: properties.length,
      data: properties.map(formatProperty),
    })
  } catch (error) {
    return next(error)
  }
}

export const createProperty = async (req, res, next) => {
  try {
    const payload = req.body || {}
    const validationError = validatePropertyPayload(payload)

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      })
    }

    const property = await prisma.property.create({
      data: {
        title: payload.title,
        description: payload.description || '',
        address: payload.address,
        city: payload.city,
        state: payload.state || 'Not specified',
        country: payload.country || 'India',
        listingType: payload.listingType.toUpperCase(),
        propertyType: payload.propertyType.toUpperCase(),
        furnished: payload.furnished.toUpperCase(),
        bedrooms: payload.bedrooms !== undefined && payload.bedrooms !== null && payload.bedrooms !== '' ? Number(payload.bedrooms) : null,
        bathrooms: payload.bathrooms !== undefined && payload.bathrooms !== null && payload.bathrooms !== '' ? Number(payload.bathrooms) : null,
        areaSqFt: payload.areaSqFt !== undefined && payload.areaSqFt !== null && payload.areaSqFt !== '' ? Number(payload.areaSqFt) : null,
        price: new Prisma.Decimal(Number(payload.price)),
        isFeatured: Boolean(payload.isFeatured),
        ownerId: req.user.id,
      },
    })

    return res.status(201).json({
      success: true,
      data: formatProperty(property),
    })
  } catch (error) {
    return next(error)
  }
}

export const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params
    const existing = await prisma.property.findUnique({ where: { id } })

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      })
    }

    if (existing.ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own property',
      })
    }

    const payload = req.body || {}
    const validationError = validatePropertyPayload({
      ...existing,
      ...payload,
    })

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      })
    }

    const updated = await prisma.property.update({
      where: { id },
      data: {
        title: payload.title ?? existing.title,
        description: payload.description ?? existing.description,
        address: payload.address ?? existing.address,
        city: payload.city ?? existing.city,
        state: payload.state ?? existing.state,
        country: payload.country ?? existing.country,
        listingType: (payload.listingType ?? existing.listingType).toUpperCase(),
        propertyType: (payload.propertyType ?? existing.propertyType).toUpperCase(),
        furnished: (payload.furnished ?? existing.furnished).toUpperCase(),
        bedrooms: payload.bedrooms !== undefined ? Number(payload.bedrooms) : existing.bedrooms,
        bathrooms: payload.bathrooms !== undefined ? Number(payload.bathrooms) : existing.bathrooms,
        areaSqFt: payload.areaSqFt !== undefined ? Number(payload.areaSqFt) : existing.areaSqFt,
        price: payload.price !== undefined ? new Prisma.Decimal(Number(payload.price)) : existing.price,
        isFeatured: payload.isFeatured !== undefined ? Boolean(payload.isFeatured) : existing.isFeatured,
      },
    })

    return res.status(200).json({
      success: true,
      data: formatProperty(updated),
    })
  } catch (error) {
    if (error.code === 'P2023') {
      return res.status(400).json({
        success: false,
        message: 'Invalid property id format',
      })
    }

    return next(error)
  }
}

export const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params
    const property = await prisma.property.findUnique({ where: { id } })

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      })
    }

    if (property.ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own property',
      })
    }

    await prisma.property.delete({ where: { id } })

    return res.status(200).json({
      success: true,
      message: 'Property deleted successfully',
    })
  } catch (error) {
    if (error.code === 'P2023') {
      return res.status(400).json({
        success: false,
        message: 'Invalid property id format',
      })
    }

    return next(error)
  }
}
