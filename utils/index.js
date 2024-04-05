// Plugins
import { v2 as cloudinary } from "cloudinary";

export const defaultConfig = {
  fetchLimit: 99999,
};

cloudinary.config({
  cloud_name: "di6se6av1",
  api_key: "929558667891945",
  api_secret: "8HyKQoZ1XZjAPipO_H6aD81Lrbc",
});

export async function storeMediaToDB(media) {
  const imgObj = media;
  const base64Data = imgObj.data.toString("base64");
  const dataUri = `data:${imgObj.mimetype};base64,${base64Data}`;
  const result = await cloudinary.uploader.upload(dataUri);
  return result;
}
