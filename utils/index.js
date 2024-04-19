// Plugins
import { v2 as cloudinary } from "cloudinary";

// config for cloudinary
cloudinary.config({
  cloud_name: "dgzcwv7h7",
  api_key: "145267533977774",
  api_secret: "SNbZL2xU_5HMxYenm8nak2klFXM",
});

// default settings
export const defaultConfig = {
  fetchLimit: 99999,
};

// function to store media into database
export async function storeMediaToDB(media) {
  const imgObj = media;
  const base64Data = imgObj.data.toString("base64");
  const dataUri = `data:${imgObj.mimetype};base64,${base64Data}`;
  const result = await cloudinary.uploader.upload(dataUri);
  return result;
}

// function to delete single media into database
export async function deleteMedia(media) {
  try {
    const mediaID = media.split("/")[media.split("/").length - 1].split(".")[0];

    await cloudinary.uploader.destroy(`${mediaID}`, function (result) {
      console.log(result);
    });
  } catch (error) {
    throw Error;
  }
}

// function to delete multiple media into database
export async function deleteMultipleMedia(media) {
  try {
    const mediaIDs = media.map((item) => {
      const mediaID = item.split("/")[item.split("/").length - 1].split(".")[0];
      return mediaID;
    });

    await cloudinary.api
      .delete_resources(mediaIDs)
      .then((result) => console.log(result));
  } catch (error) {
    throw Error;
  }
}
