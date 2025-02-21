'use strict'

//* express.router()
const router= express.Router()

router.get('/', (req,res)=> res.send({message:'home page'}))
router.get('/about', (req,res)=> res.send({message:'about page'}))
router.get('/user/:id', (req,res)=> res.send({message:'req.params.id'}))

app.use(router)