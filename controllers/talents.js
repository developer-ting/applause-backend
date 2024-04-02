// Models
import TalentModel from "../model/talent.model.js";
import LanguageModel from "../model/language.model.js";
import { defaultConfig } from "../utils/index.js";

// ===================== GET ===================

/** GET: http://localhost:8080/api/talents 
 * @param : {
  "limit" : 10,
  "skip" : 0,
  "language": "English",
  "gender": "Female",
  "height": "5-6"
}
*/
export async function fetchAllTalents(req, res) {
  try {
    const { limit, skip, language, projects, gender, height } = req.query;
    let query = {};

    if (language) {
      const languageArr = language.split(",");
      // Fetch language document by title
      const selectedLanguages = await LanguageModel.find({
        title: { $in: languageArr },
      });

      if (!selectedLanguages) {
        return res.status(404).json({ msg: "Language not found" });
      }

      const languageIds = selectedLanguages.map((language) => language._id);

      // Add condition to the query object to filter talents by languageIds
      if (languageIds.length > 0) {
        query.languageSpoken = { $in: languageIds };
      }
    }

    if (gender) {
      query.gender = gender;
    }

    if (height) {
      const heightRange = height.split("-");

      if (heightRange.length === 1) {
        query.height = Number(heightRange[0]);
      } else {
        query.height = {
          $gte: Number(heightRange[0]),
          $lte: Number(heightRange[1]),
        };
      }
    }

    if (projects) {
      query.projects = projects;
    }

    const talents = await TalentModel.find(query)
      .limit(limit || defaultConfig.fetchLimit)
      .skip(skip || 0);

    return res.status(200).json({ talents });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to retrieve talents" });
  }
}

/** GET: http://localhost:8080/api/talentfilters 
 * @param : {
  "limit" : 10,
  "skip" : 0,
}
*/
export async function fetchAllTalentsOnlyNameAndId(req, res) {
  try {
    const { limit, skip } = req.query;
    const talents = await TalentModel.find()
      .limit(limit || defaultConfig.fetchLimit)
      .skip(skip || 0)
      .select("name");

    return res.status(200).json({ talents });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to retrieve talents" });
  }
}

/** GET: http://localhost:8080/api/talents/asd2d
 * @param : {}
 */
export async function fetchOneTalent(req, res) {
  try {
    const { name } = req.params;

    const talent = await TalentModel.findOne({ name });

    if (!talent) {
      return res.status(404).json({ error: "Talent not found!" });
    }

    return res.status(200).json({ talent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to retrieve talents" });
  }
}

// ===================== POST ===================

/** POST: http://localhost:8080/api/talents 
 * @body : {
    "name": "test",
    "birthYear": 1980,
    "thumbnail": "thumbnail.com/img",
    "introVideo": "introVideo.com/intro",
    "gender": "Female",
    "height": 5.1,
    "email": "test@gmail.com",
    "phone": "1234567890"
}
*/
export async function createTalent(req, res) {
  try {
    const data = req.body;

    const { name } = req.body;

    const existingTalent = await TalentModel.findOne({ name });

    if (existingTalent) {
      return res.status(409).json({ error: "Talent already exists" });
    }

    await TalentModel.create(data);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}

// ===================== PUT ===================

/** PUT: http://localhost:8080/api/talents/asd1d
 * @body : {
    "name": "test",
    "birthYear": 1980,
    "thumbnail": "thumbnail.com/img",
    "introVideo": "introVideo.com/intro",
    "gender": "Female",
    "height": 5.1,
    "email": "test@gmail.com",
    "phone": "1234567890"
}
*/
export async function updateOneTalent(req, res) {
  try {
    const { name } = req.params;
    const data = req.body;

    const talent = await TalentModel.findOne({ name });

    if (!talent) {
      return res
        .status(404)
        .json({ error: "Talent not found!, Please provide correct Name" });
    }

    await TalentModel.updateOne({ name }, data);

    return res.status(200).json({ msg: `Record updated for ${name}` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}

// ===================== DELETE ===================

/** DELETE: http://localhost:8080/api/talents/asd1d
 * @param : {}
 */
export async function deleteOneTalent(req, res) {
  try {
    const { name } = req.params;

    const talent = await TalentModel.findOne({ name });

    if (!talent) {
      return res.status(404).json({ error: "Talent not found!" });
    }

    await TalentModel.findOne({ name }).deleteOne();

    return res.status(200).json({ msg: `Entry for ${name} is removed` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong!", error });
  }
}
