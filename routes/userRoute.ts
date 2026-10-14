import {Router} from "express"
import {createUser, updateUser, deleteUser, getAll, getOne} from "../controller/userController"

const router = Router()

router.post('/', createUser)
router.put('/update/:id', updateUser)
router.get('/allUser', getAll)
router.get('/oneUser/:id', getOne)
router.delete('/delete/:id', deleteUser)

export default router