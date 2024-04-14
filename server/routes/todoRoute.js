const express = require("express")
const router = express.Router()
const multer = require("multer")
const verifyJWT=require('../middleware/verifyJWT')

const todoController = require("../controller/todoController");
// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'./uploads')
//     },
//     filename:function(req,file,cb){
//       const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1E9)
//         cb(null,uniqueSuffix)
//     }

// })
const upload = multer({ dest: './uploads' })
// const upload = multer({ storage:storage })
router.get('/:done',verifyJWT,todoController.getTodosByComplete)
router.get('/',verifyJWT,todoController.getTodoByUserId)
router.post('/',  upload.single('imageUrlMan'),verifyJWT,todoController.createNewTodo )
router.delete('/',verifyJWT,todoController.deleteTodo)
router.put('/', upload.single('imageUrlMan') ,verifyJWT,todoController.updateTodo)

module.exports = router