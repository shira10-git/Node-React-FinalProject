const express=require('express')
const router=express.Router()

const userController=require('../controller/userController')
const verifyJWT=require('../middleware/verifyJWT')
router.get('/',verifyJWT,userController.getAllUsers)
router.get('/:id',verifyJWT,userController.getUserById)
router.post('/',verifyJWT,userController.createNewUser)
router.delete('/',verifyJWT,userController.deleteUser)
router.put('/',verifyJWT,userController.updateUser)

module.exports=router