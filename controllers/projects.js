// Models
import ProjectsSchema from "../model/project.model.js";
import CharactersSchema from "../model/character.model.js";

// Plugins
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

// UTILS
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
    "characters": []
}

*/

// Create Projects
export async function createProjects(req, res) {
  let media = {};
  try {
    const response = req.body;
    const { title } = req.body;

    if (!req.headers.authorization)
      return res.status(500).send({ error: "Please provide correct token" });

    // access authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];

    try {
      const existingProject = await ProjectsSchema.findOne({ title });

      if (existingProject) {
        return res.status(409).json({ error: "Bookmark already exists" });
      }

      // decode token into userId and username
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          // Token verification failed
          console.error(err);
          throw err;
        }

        if (req.files) {
          if (req.files.thumbnail) {
            const result = await storeMediaToDB(req.files.thumbnail);
            media.thumbnail = result.url;
          }
        }

        const data = { ...response, ...media };

        await ProjectsSchema.create(data);
        return res.status(200).json(data);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Something went wrong!", error });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}

// Create Projects Audition
export async function createProjectsAudition(req, res) {
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

// ===================== GET ===================

/** GET: http://localhost:8080/api/project */

// Get project All
export async function getProjects(req, res) {
  try {
    if (!req.headers.authorization)
      return res.status(500).send({ error: "Please provide correct token" });

    // access authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];

    try {
      // decode token into userId and username
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          // Token verification failed
          console.error(err);
          throw err;
        }

        const projects = await ProjectsSchema.find().populate(
          "genre characters"
        );
        return res.status(200).json(projects);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Something went wrong!", error });
    }
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

    if (!req.headers.authorization)
      return res.status(500).send({ error: "Please provide correct token" });

    // access authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];

    try {
      // decode token into userId and username
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          // Token verification failed
          console.error(err);
          throw err;
        }

        const projects = await ProjectsSchema.find()
          .populate("genre")
          .select("title");

        return res.status(200).json({ projects });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Something went wrong!", error });
    }
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

    if (!req.headers.authorization)
      return res.status(500).send({ error: "Please provide correct token" });

    // access authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];

    try {
      // decode token into userId and username
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          // Token verification failed
          console.error(err);
          throw err;
        }

        const projects = await ProjectsSchema.findOne({ title }).populate(
          "genre characters"
        );
        if (!projects) {
          return res.status(404).json({ error: "project not found!" });
        }
        return res.status(200).json({ projects });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Something went wrong!", error });
    }
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
  let media = {};
  const project = await ProjectsSchema.findOne({ title });
  try {
    const { title } = req.params;
    const body = req.body;

    if (!req.headers.authorization)
      return res.status(500).send({ error: "Please provide correct token" });

    // access authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];

    try {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          // Token verification failed
          console.error(err);
          throw err;
        }

        const project = await ProjectsSchema.findOne({ title });
        if (!project) {
          return res
            .status(404)
            .json({ error: "project not found!, Please provide correct Name" });
        }

        if (req.files) {
          if (req.files.thumbnail) {
            const result = await storeMediaToDB(req.files.thumbnail);
            media.thumbnail = result.url;
          }
        }

        const data = { ...body, ...media };

        await ProjectsSchema.updateOne({ title }, data);
        return res.status(200).json({ msg: `Record updated for ${title}` });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Something went wrong!", error });
    }
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

    if (!req.headers.authorization)
      return res.status(500).send({ error: "Please provide correct token" });

    // access authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];

    try {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          // Token verification failed
          console.error(err);
          throw err;
        }

        const project = await ProjectsSchema.findOne({ title });
        if (!project) {
          return res.status(404).json({ error: "project not found!" });
        }

        if (project.thumbnail) {
          await deleteMedia(project.thumbnail);
        }

        await ProjectsSchema.findOne({ title }).deleteOne();

        return res.status(200).json({ msg: `Entry for ${title} is removed` });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Something went wrong!", error });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong 1!", error });
  }
}
