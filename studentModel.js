const Joi = require("joi");
const mongoose = require("mongoose");
require('mongoose-type-url')

//Student schema (Mongoose).
const studentSchema = mongoose.Schema({
  firstname: { type: String ,required:[true,'Please enter firstname.']},
  lastname:{type:String,required:[true,'Please enter lastname.']},
  course:{type:String},
  age:{type:Number,min:14,required:[true,'Please enter age.']},
  email:{type:String,unique:true},
  registrationNo:{type:Number,unique:true,required:[true,'Please enter registration number.']}
},
{timestamps:true
}
);
const Student=new mongoose.model('Student',studentSchema);

//Student schema (Joi) for validation.
const validateStudent = (student) => {
  const schema = Joi.object({
    firstname:Joi.string().min(3).max(10).required(),
    lastname:Joi.string().min(3).max(10).required(),
    course:Joi.string().required(),
    age:Joi.number().required(),
    email: Joi.string().email().min(5).max(500).required(),
    registrationNo: Joi.number().min(2).required(),
  })
  return schema.validate(student)
}
module.exports = {
  Student,
  validateStudent,
}