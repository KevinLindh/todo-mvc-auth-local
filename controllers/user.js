const User = require("../models/User");
const mongoose = require("mongoose");

// Input
// List of all users
// List of your own friends
// Count of your friends

module.exports = {
  getUserInfo: async (req, res) => {
    // console.log(req.user);
    try {
      const userList = await User.find().populate("friends");
      const friends = req.user.friends;
      res.render("friendList.ejs", {
        userList,
        currentUser: req.user,
        friends,
      });
    } catch (err) {
      console.log(err);
    }
  },

  addFriend: async (req, res) => {
    try {
      const currentUser = await User.find({ _id: req.user._id });
      const newFriend = await User.find({ _id: req.body.id });

      console.log(newFriend);

      await User.findByIdAndUpdate(
        { _id: req.user._id },
        { $push: { friends: newFriend } }
      );
      res.json({ msg: "Successfully added friend" }).status(200);
    } catch (err) {
      console.log(err);
    }
  },
  deleteFriend: async (req, res) => {
    try {
      const currentUser = await User.find({ _id: req.user._id });
      const newFriendId = await User.find({ _id: req.body.id });

      const newFriends = currentUser[0].friends.filter((friend) => {
        return friend._id !== newFriendId._id;
      });

      // const newFriendsArray = newFriends.map(friend => friend._id)

      console.log(currentUser[0]);

      // await User.findByIdAndUpdate(req.user._id, { friends: newFriendsArray });
      // res.json({ msg: "Successfully added friend" }).status(200);
    } catch (err) {
      console.log(err);
    }
  },
};
