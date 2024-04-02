// Models
import ProjectsSchema from "../model/project.model.js";

export async function createProjects(req, res) {
  try {
    const response = req.body;
    await ProjectsSchema.create(response);
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "message not delivered" });
  }
}

export async function fetchProjects(req, res) {
  try {
    const projects = await ProjectsSchema.find().populate("genre");
    return res.status(200).json({ projects });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to retrieve genres" });
  }
}
