const express = require("express");
const {getUsers, getUserById, deleteUser} = require("../controllers/userController");
const {adminOnly, protect} = require("../middlewares/authMiddleware");


const router = express.Router();

router.get("/",protect, adminOnly, getUsers);
router.get("/:id",protect, adminOnly, getUserById);
router.get("/:id",protect, adminOnly, deleteUser);

module.exports = router;
