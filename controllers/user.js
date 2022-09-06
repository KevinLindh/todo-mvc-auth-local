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
      const addingIdAndUserName = {
        _id: newFriend[0].id,
        userName: newFriend[0].userName,
      };
      // console.log(newFriend);

      await User.findByIdAndUpdate(
        { _id: req.user._id },
        { $push: { friends: addingIdAndUserName } }
      );
      console.log("Successfully added");
      res.json({ msg: "Successfully added friend" }).status(200);
    } catch (err) {
      console.log(err);
    }
  },
  deleteFriend: async (req, res) => {
    try {
      const currentUser = await User.find({ _id: req.user._id });
      const newFriendId = await User.find({ _id: req.body.id });

      const newFriendsArr = currentUser[0].friends.filter(
        (val) => val._id !== newFriendId[0]._id.toString()
      );

      // console.log(currentUser[0].friends, newFriendId[0]._id);

      await User.findByIdAndUpdate(req.user._id, { friends: newFriendsArr });
      res.json({ msg: "Successfully removed friend" }).status(200);
    } catch (err) {
      console.log(err);
    }
  },
  pokeFriend: async (req, res) => {
    try {
      const currentUser = await User.find({ _id: req.user._id });
      const newFriend = await User.find({ _id: req.body.id });
      const addingPoke = {
        pokes: currentUser[0]._id,
        userName: currentUser[0].userName,
        //add time
      };
      // console.log(newFriend[0].pokes.length);
      // console.log(req.user.myPokes);

      await User.findByIdAndUpdate(
        { _id: newFriend[0]._id },
        { $push: { pokes: addingPoke } }
      );
      await User.findByIdAndUpdate(
        { _id: req.user._id },
        { $push: { myPokes: newFriend[0].userName } }
      );
      console.log("Successfully poked");
      res.json({ msg: "Successfully poked friend" }).status(200);
    } catch (err) {
      console.log(err);
    }
  },
};
