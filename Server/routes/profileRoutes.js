const express = require("express");
const router = express.Router();
const{auth} = require("../middlewares/auth");
const{
    updateProfile,
    deleteAccount,
    getAllUserDetails,

}  = require("../controllers/Profile");

// delete user account
router.delete("/deleteProfile",auth, deleteAccount);
router.put("/updateProfile",auth, updateProfile);
router.get("/getAllUserDetails",auth, getAllUserDetails);
router.get("/test", (req, res) => {
    res.send("Profile route is working");
  });
  router.get("/getAllUserDetailsTest", (req, res) => {
    res.json({ success: true, message: "This route works!" });
  });

module.exports = router;