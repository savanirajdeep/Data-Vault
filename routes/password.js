const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Password = require("../model/passwords");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  "/store",auth,
  async (req, res) => {
    
    const { email, website, password } = req.body;
    const userId=req.user.id;
    passwordSave = new Password({
        userId,
        website,
        email,
        password
      });
        await passwordSave.save((err,result)=>{
          if (err){
            return res.status(400).json({
              message: "Something went wrong" + err
            });
          }
          else{
            return res.status(200).json({
              message: "Password Saved"
            });
          }
        });
    });
      

router.get(
  "/getAllPasswords",
  async (req, res) => {

      let passwordList = await Password.find();
      if (!passwordList)
        return res.status(400).json({
          message: "Password List Not Exist"
        });
        console.log(passwordList);
      return res.status(200).send(passwordList);

  }
);
// router.post(
//   "/getAllPasswords",
//   async (req, res) => {

//     const { email, password } = req.body;
//       let passwordList = await Password.find();
//       if (!passwordList)
//         return res.status(400).json({
//           message: "Password List Not Exist"
//         });
//       return res.status(200).send(passwordList);

//   }
// );

module.exports = router;
