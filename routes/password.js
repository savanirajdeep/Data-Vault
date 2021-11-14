const express = require("express");
const router = express.Router();

const Password = require("../model/passwords");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  "/store",
  async (req, res) => {
    
    const { email, website, password } = req.body;
    passwordSave = new Password({
        website,
        email,
        password
      });
        await passwordSave.save((err,result)=>{
          if (err){
            return res.status(400).json({
              message: "Something went wrong"
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

    const { email, password } = req.body;
      let passwordList = await Password.find();
      if (!passwordList)
        return res.status(400).json({
          message: "Password List Not Exist"
        });
      return res.status(200).send(passwordList);

  }
);

module.exports = router;
