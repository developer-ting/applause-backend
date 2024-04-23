// Models
import ProjectsSchema from "../model/project.model.js";
import {
  defaultConfig,
  deleteMedia,
  deleteMultipleMedia,
  storeMediaToDB,
} from "../utils/index.js";

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

// All Projects
export async function createProjects(req, res) {
  const data = req.body;
  const { title } = req.body;
  let media = {};
  try {
    const existingProject = await ProjectsSchema.findOne({ title });

    if (existingProject) {
      return res.status(409).json({ error: "Project already exists" });
    }

    if (req.files) {
      if (req.files.thumbnail) {
        const result = await storeMediaToDB(req.files.thumbnail);
        media.thumbnail = result.url;
      }
    }

    await ProjectsSchema.create({ ...data, ...media });

    return res.status(200).json({ ...data, ...media });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}

/** GET: http://localhost:8080/api/project */

// Get project All
export async function getProjects(req, res) {
  try {
    const projects = await ProjectsSchema.find().populate(
      "genre characters.auditions"
    );
    // .populate("characters.auditions");
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

// All project Only Names
export async function getProjectsNameAndId(req, res) {
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
export async function getProject(req, res) {
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

// Update One project
export async function updateOneProject(req, res) {
  const { title } = req.params;
  const data = req.body;
  let media = {};
  const project = await ProjectsSchema.findOne({ title });
  try {
    if (!project) {
      return res
        .status(404)
        .json({ error: "project not found!, Please provide correct Name" });
    }

    if (req.files) {
      if (req.files.thumbnail) {
        await deleteMedia(project.thumbnail);
        const result = await storeMediaToDB(req.files.thumbnail);
        media.thumbnail = result.url;
      }
    }

    await ProjectsSchema.updateOne({ title }, { ...data, ...media });

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

// Delete One project
export async function deleteOneProject(req, res) {
  try {
    const { title } = req.params;

    const project = await ProjectsSchema.findOne({ title });

    if (!project) {
      return res.status(404).json({ error: "project not found!" });
    }

    if (project.thumbnail && project.introVideo) {
      await deleteMultipleMedia([project.thumbnail, project.introVideo]);
    } else if (project.thumbnail) {
      await deleteMedia(project.thumbnail);
    } else if (project.introVideo) {
      await deleteMedia(project.introVideo);
    }

    await ProjectsSchema.findOne({ title }).deleteOne();

    return res.status(200).json({ msg: `Entry for ${title} is removed` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong 1!", error });
  }
}
