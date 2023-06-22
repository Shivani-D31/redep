const express = require("express");
const blogRoute = express.Router();
const { BlogModel } = require("../models/BlogModel");

blogRoute.get("/", async (req, res) => {
  const userID = req.body.userID;
  try {
    if (userID) {
      const allBlogs = await BlogModel.find({});
      res.send(allBlogs);
    }
  } catch (error) {
    res.send({ msg: "Error" });
  }
});

blogRoute.get("/myblogs", async (req, res) => {
  const userID = req.body.userID;
  try {
    const allBlogs = await BlogModel.find({ userID });
    res.send(allBlogs);
  } catch (error) {
    res.send({ msg: "Error" });
  }
});

blogRoute.post("/create", async (req, res) => {
  const blog = req.body;
  try {
    const newBlog = new BlogModel(blog);
    await newBlog.save();
    res.send({ msg: "Success" });
  } catch (error) {
    res.send({ msg: "Error" });
  }
});

blogRoute.patch("/update/:id", async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;
  const userID = payload.userID;
  try {
    const findBlog = await BlogModel.find({ _id: Id });
    if (findBlog[0].userID === userID) {
      await BlogModel.findByIdAndUpdate({ _id: Id, payload });
      res.send({ msg: payload });
    } else {
      res.send({ msg: "You are not authorized" });
    }
  } catch (error) {
    res.send({ msg: error });
  }
});

blogRoute.delete("/delete/:id", async (req, res) => {
  const Id = req.params.id;
  const userID = payload.userID;
  try {
    const findBlog = await BlogModel.find({ Id });
    if (findBlog[0].userID === userID) {
      await BlogModel.findByIdAndDelete({ Id });
      res.send({ msg: "Successully deleted" });
    } else {
      res.send({ msg: "You are not authorized" });
    }
  } catch (error) {
    res.send({ msg: error });
  }
});

module.exports = { blogRoute };
