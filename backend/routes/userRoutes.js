const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  authUser,
  allUsers,
  checkPhone,
} = require("../controllers/userControllers");
const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", authUser);
router.get("/checkPhone", checkPhone);

module.exports = router;
