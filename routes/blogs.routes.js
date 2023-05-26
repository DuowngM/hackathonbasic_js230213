const express = require("express");
const router = express.Router();
const database = require("../utils/database");

router.get("/", async (req, res) => {
  try {
    let data = await database.execute("SELECT * FROM blog.blogs");
    let [blogs] = data;
    res.json({
      status: "success",
      blogs,
    });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/", async (req, res) => {
  const { content } = req.body;
  try {
    let data = await database.execute(
      `INSERT INTO blog.blogs (content) VALUES ('${content}')`
    );
    let [blogs] = data;
    res.json({
      status: "success",
      message: "Them thanh cong",
      blogs,
    });
  } catch (error) {
    res.json({ error });
  }
});
router.delete("/:id", async (req, res) => {
  const blogId = req.params.id;
  try {
    let data = await database.execute(
      `DELETE FROM blog.blogs WHERE blogId = ${blogId}`
    );
    res.json({
      status: "success",
      message: `Blog co id: ${blogId} da duoc xoa.`,
    });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
