const supabase = require("../config/supabase");

exports.getPosts = async (req, res) => {
  console.log("📝 getPosts controller called");
  const { data, error } = await supabase.from("posts").select("*");

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json(data);
};

exports.createPost = async (req, res) => {
  console.log("📝 createPost controller called");
  const { title, content } = req.body;

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title,
      content,
      owner_id: req.user.userId,
    })
    .select();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(201).json(data);
};

exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  // const userId = req.user.userId;
  const { userId, role } = req.user;

  const { data: post, error: fetchError } = await supabase
    .from("posts")
    .select("owner_id")
    .eq("id", postId)
    .single();

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  // if (post.owner_id !== userId) {
  if (post.owner_id !== userId && role !== "admin") {
    return res.status(403).json({ message: "You do not own this post" });
  }

  const { data, error } = await supabase
    .from("posts")
    .update({ title, content })
    .eq("id", postId)
    .select();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json(data);
};

exports.deletePost = async (req, res) => {
  console.log("📝 deletePost controller called");
  const postId = req.params.id;
  const userId = req.user.userId;

  const { data: post, error: fetchError } = await supabase
    .from("posts")
    .select("owner_id")
    .eq("id", postId)
    .single();

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.owner_id !== userId) {
    return res.status(403).json({ message: "You do not own this post" });
  }
  
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId)
    .select();
  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json(data);
};
