const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Password = require("../model/passwords");
const blockchain = require('../blockchain/block');
/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
async function storeInDb(userId, chain,res) {
  let password = new Password({
    userId: userId,
    blockchain: JSON.stringify(chain)
  })
  await password.save().then(doc => {
    console.log('saved ' + doc)
    res.send( { message: "ok" })
  })
  // res.send( { message: "error" })
}
async function updateInDb(id, userId, chain,res) {
  let password = {
    userId: userId,
    blockchain: JSON.stringify(chain)
  }
  await Password.findOneAndUpdate({
    _id
      : id
  }, password).then(doc =>{
    console.log("doneeee")
    res.send( { message: "ok" })
  })
  // console.log("lollll")
  // res.send( { message: "error" })
}
router.post(
  "/store", auth,
  async (req, res) => {

    const { email, website, password } = req.body;
    const userId = req.user.id;
    await Password.findOne({userId: userId}).then(  docs => {
      if (!docs) {
        let chain = [];
        chain.push(blockchain.createGenesisBlock());
        blockchain.addBlock(chain, new blockchain.Block(new Date().getTime(), { email: email, password: password, website: website }, '0'));
        storeInDb(userId, chain,res)
      }
      else {
        let chain = JSON.parse(docs.blockchain);
        blockchain.addBlock(chain, new blockchain.Block(new Date().getTime(), { email: email, password: password, website: website }, '0'));
        updateInDb(docs._id,userId,chain,res)
      }
    })
  });


router.post(
  "/getAllPasswords",auth,
  async (req, res) => {

    const { email, password } = req.body;
      let passwordList = await Password.find({userId:req.user.id});
      if (!passwordList)
        return res.status(400).json({
          message: "Password List Not Exist"
        });
      return res.status(200).send(passwordList);

  }
);

module.exports = router;
