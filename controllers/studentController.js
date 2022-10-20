const {Student} = require("../studentModel");
const asyncHandler = require("express-async-handler");

//To get list of all students.
const getStudents = asyncHandler(async (req, res) => {

  try {
    const students = await Student.find();
    if (students) {
      res.status(200).send({ message: "Got students", students });
    }
  } catch (error) {
    res.status(400).send({ error: `${error}` });
  }
});
//To get only one student according to his/her registration number.
const getStudent = asyncHandler(async (req, res) => {
  try {
    const registrationNo = req.query.registrationNo;
    const student = await Student.findOne({ registrationNo });
    if (student) {
      console.log(student);
      res.send({ message: "student Found !", student: student });
    } else {
      res.send.error();
    }
  } catch (error) {
    res.status(400).send({ error: `${error}` });
  }
});
//To add a new student.
const createStudent = asyncHandler(async (req, res, next) => {
  try {
    const { firstname, lastname, age, email, course, registrationNo } =req.body;
    let student= new Student({
      firstname,
      lastname,
      age,
      email,
      course,
      registrationNo,
    })
    student = await student.save()
    if (student) {
      return res.send({
        message: "Saved Succesfully",
        student: {
          _id: student._id,
          firstname: student.firstname,
          lastname: student.lastname,
          age: student.age,
          email: student.email,
          course: student.course,
          registrationNo: student.registrationNo,
        },
      });
    }
  }
   catch (error) {
    next(error);
  }
});
//To update current student details.
const updateStudent = asyncHandler(async (req, res,next) => {
  let { registrationNo,firstname, lastname, age, course } = req.body;
  Student.updateOne({registrationNo}, 
    {firstname,lastname,age,course}, function(err, data) {
        if(err){
          console.log(err)
          res.status(400).send({ message: "Incomplete information given." });
        }
        else{
           res.status(200).send({message:"Student updated!",student:data})
        }
    });  
});
//To delete a existing student data according to his/her registration number.
const deleteStudent = asyncHandler(async (req, res) => {
  try {
    const registrationNo = req.query.registrationNo;
    let student = await Student.findOneAndDelete({ registrationNo });
    if (student) {
      res.send({ message: "Deleted Successfully", student: student });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudent,
};
