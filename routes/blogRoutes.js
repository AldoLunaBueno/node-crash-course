import express from "express";
import {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/", blog_index);
router.get("/create", blog_create_get);
router.get("/:id", blog_details);
router.delete("/:id", blog_delete);
router.post("/", blog_create_post);

export default router;
