// Models
import ProjectsSchema from "../model/project.model.js";

// ===================== POST ===================

/** POST: http://localhost:8080/api/project 
 * @param : {
    "title": "Your Project Title 1",
    "thumbnail": "URL to thumbnail image",
    "description": "Your project description",
    "imdbUrl": "URL to IMDb page",
    "releaseDate": "2024-03-30T00:00:00.000Z", // Date should be in ISO format
    "cencorRating": "PG-13",
    "producers": "Producer Name",
    "directors": "Director Name",
    "cast": "Cast Name",
    "castingDirector": "Casting Director Name",
    "contactNo": 1234567890,
    "email": "example@example.com",
    "genre":["660bad767c1d747f9fc7fb1d"],
    "characters": [
        {
            "name": "Character Name",
            "type": "Character Type"
        },
        {
            "name": "Another Character Name",
            "type": "Another Character Type"
        }
    ]
}

*/

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

/** GET: http://localhost:8080/api/project */

export async function fetchProjects(req, res) {
  try {
    const projects = await ProjectsSchema.find().populate("genre");
    return res.status(200).json({ projects });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to retrieve genres" });
  }
}

/** GET: http://localhost:8080/api/projectfilters 
 * @param : {
  "limit" : 10,
  "skip" : 0,
}
*/
export async function fetchAllProjectsOnlyNameAndId(req, res) {
  try {
    // const { title } = req.query;
    const projects = await ProjectsSchema.find()
      .populate("genre")
      .select("title");

    return res.status(200).json({ projects });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to retrieve projects" });
  }
}

/** GET: http://localhost:8080/api/project/Rupesh
 * @param : {}
 */
export async function fetchProject(req, res) {
  try {
    const { title } = req.params;

    const projects = await ProjectsSchema.findOne({ title }).populate("genre");

    if (!projects) {
      return res.status(404).json({ error: "project not found!" });
    }

    return res.status(200).json({ projects });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to retrieve project" });
  }
}

// ===================== PUT ===================

/** PUT: http://localhost:8080/api/project/Rupesh
 * @param : {
    "title": "Rupesh",
    "thumbnail": "URL to thumbnail image",
    "description": "Your project description",
    "imdbUrl": "URL to IMDb page",
    "releaseDate": "2024-03-30T00:00:00.000Z", // Date should be in ISO format
    "cencorRating": "PG-13",
    "producers": "Producer Name",
    "directors": "Director Name",
    "cast": "Cast Name",
    "castingDirector": "Casting Director Name",
    "contactNo": 1234567890,
    "email": "example@example.com",
    "genre":["660bad767c1d747f9fc7fb1d"],
    "characters": [
        {
            "name": "Character Name",
            "type": "Character Type"
        },
        {
            "name": "Another Character Name",
            "type": "Another Character Type"
        }
    ]
}

*/
export async function updateOneProject(req, res) {
  try {
    const { title } = req.params;
    const data = req.body;

    const project = await ProjectsSchema.findOne({ title });

    if (!project) {
      return res
        .status(404)
        .json({ error: "project not found!, Please provide correct Name" });
    }

    await ProjectsSchema.updateOne({ title }, data);

    return res.status(200).json({ msg: `Record updated for ${title}` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}

// ===================== DELETE ===================

/** DELETE: http://localhost:8080/api/project/asd1d
 * @param : {}
 */
export async function deleteOneProject(req, res) {
  try {
    const { title } = req.params;

    const project = await ProjectsSchema.findOne({ title });

    if (!project) {
      return res.status(404).json({ error: "project not found!" });
    }

    await ProjectsSchema.findOne({ title }).deleteOne();

    return res.status(200).json({ msg: `Entry for ${title} is removed` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}
