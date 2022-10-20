const express=require('express');
const  router=express.Router();
const {validateStudent}=require("../studentModel")
const {getStudents,createStudent,updateStudent,deleteStudent,getStudent} = require('../controllers/studentController');
const validationMiddleware=require("../validators/studentValidator")

router.get('/getStudents',getStudents)
router.get('/getStudent',getStudent)
router.post('/createStudent', [validationMiddleware(validateStudent)], createStudent)
router.post('/updateStudent', updateStudent)
router.delete('/deleteStudent',deleteStudent);

module.exports=router