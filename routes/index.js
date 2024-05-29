const Router = require('express')
const router = new Router()
const favoriteRouter = require('./favoriteRouter')
const userRouter = require('./userRouter')
const pictureRouter = require('./pictureRouter')
const autorRouter = require('./authorRouter')
const joinRouter = require('./joinRouter')

router.use('/user', userRouter)
router.use('/favorite', favoriteRouter)
router.use('/picture', pictureRouter)
router.use('/author', autorRouter)
router.use('/join', joinRouter)

module.exports = router