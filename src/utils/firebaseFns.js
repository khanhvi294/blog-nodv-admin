import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../config/firebaseConfig";
import cutStringFromWord from "./cutStringFromWord";

export const uploadImg = async (file) => {
  const time = new Date().getTime();
  const name = time + file.name;
  const storageRef = ref(storage, `images/${name}`);
  const res = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(res.ref);
  return url;
};

export const deleteImg = async (url) => {
  try {
    const directory = cutStringFromWord(url, "images", "?").replaceAll(
      "%2F",
      "/"
    );
    const storageRef = ref(storage, directory);
    await deleteObject(storageRef);
    return true;
  } catch {
    return false;
  }
};
