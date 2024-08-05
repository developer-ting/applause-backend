// Models
import UserModel from "../model/user.model.js";

// Plugins
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { storeMediaToDB } from "../utils/index.js";
dotenv.config();

/** POST: http://localhost:8080/api/register 
 * @param : {
  "firstname" : "Test3",
  "lastname" : "Test3",
  "password" : "admin123",
  "email": "pogilok26a7@pursip.com",
  "profile" : "",
  "phone": ""
}
*/
export async function register(req, res) {
  try {
    const { firstname, lastname, email, phone, password, profile } = req.body;

    // check for existing email
    const existEmail = UserModel.findOne({ email });

    Promise.all([existEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              async function saveUser() {
                let media = {};

                if (req.files) {
                  if (req.files.profile) {
                    await Promise.all([
                      storeMediaToDB(
                        req.files.profile,
                        "Image",
                        `${firstname}${lastname}`
                      ),
                    ]).then((values) => {
                      console.log(values);
                      media.profile = values[0].media;
                    });
                  }
                }

                const user = new UserModel({
                  firstname,
                  lastname,
                  password: hashedPassword,
                  profile: media?.profile || "",
                  email,
                  phone,
                });

                // return save result as a response
                user
                  .save()
                  .then(async (result) => {
                    // crate jwt token ( json web token )
                    const token = jwt.sign(
                      {
                        userId: result._id,
                        email: result.email,
                      },
                      process.env.JWT_SECRET,
                      { expiresIn: "24h" }
                    );

                    // end return statement
                    res.status(201).send({
                      msg: "User Register Successfully",
                      token: token,
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                    return res.status(500).send({ error });
                  });
              }

              saveUser();
            })
            .catch((error) => {
              return res.status(500).send({
                error: "Enable to hashed password",
              });
            });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
}

/** POST: http://localhost:8080/api/login 
   * @param: {
    "email" : "pogilok267a@pursip.com",
    "password" : "admin123"
  }
  */
export async function login(req, res) {
  const { email, password } = req.body;
  try {
    UserModel.findOne({ email })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck)
              return res.status(400).send({ error: "Don't have password" });

            // Create jwt token ( json web token )
            const token = jwt.sign(
              {
                userId: user._id,
                email: user.email,
              },
              process.env.JWT_SECRET,
              { expiresIn: "24h" }
            );

            return res.status(200).send({
              msg: "Login Successsful...!",
              email: user.email,
              token,
            });
          })
          .catch((error) => {
            return res.status(400).send({ error: "Password does not exists" });
          });
      })
      .catch((error) => {
        return res.status(404).send({ error: "Email not Found" });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
}
