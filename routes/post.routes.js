const express = require("express");
const { verifyToken } = require("../middleware/auth.middleware");
const { getPosts, createPost, updatePost, deletePost } = require("../controllers/post.controller");

const router = express.Router();

router.get("/", verifyToken, (req, res, next) => {
    console.log("✅ /posts route hit");
    next();
  },
  getPosts,
);

router.post("/", verifyToken, (req, res, next) => {
    console.log("✅ /posts route hit");
    next();
  },
  createPost,
);

router.put("/:id", verifyToken, (req, res, next) => {
    console.log("✅ /posts/:id route hit");
    next();
  },
  updatePost,
);  

router.delete("/:id", verifyToken, (req, res, next) => {
    console.log("✅ /posts/:id route hit");
    next();
  },
  deletePost,
);

module.exports = router;