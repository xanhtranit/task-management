const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//@desc Get all users (Admin only)
//@route Get /api/users
// @access  Private(Admin)
const getUsers = async (req, res) => {
    try {
        const users = await User.find({role: 'member'}).select('-password');

        //Add  task counts to each user
        const userWithTaskCounts = await Promise.all(
            users.map(async (user) => {
                const pendingTasks = await Task.countDocuments({
                    assignedTo: user._id,
                    status: "Pending",
                });
                const inProgressTasks = await Task.countDocuments({
                    assignedTo: user._id,
                    status: "In Progress",
                })
                const completedTasks = await Task.countDocuments({
                    assignedTo: user._id,
                    status: "Completed",
                });
                return {
                    ...user._doc,
                    pendingTasks,
                    inProgressTasks,
                    completedTasks,
                };
            })
        )
        res.json(userWithTaskCounts)

    }catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};
//@desc    Get user by ID
// @route   GET /api/users/:id
//@access   Private
const getUserById = async (req,res) => {
    try {

    }catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};


//@desc   delete a user (Admin only)
//@route   Delete /api/users/:id
// @access   Private(Admin)
const deleteUser = async (req,res ) => {
    try {

    }catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
}

module.exports = {getUsers, getUserById, deleteUser};
