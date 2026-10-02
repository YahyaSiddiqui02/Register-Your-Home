import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Register your Home API is running',
  })
})

export default router
