import axios from "axios";

const uploadImageToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr");
  data.append("cloud_name", "drzx1amjj")

  try {
    const response = await axios.post(
        "http://api.cloudinary.com/v1_1/drzx1amjj/image/upload",
        data
    );
    const {url} = response.data


    return url
  } catch (error) {
    console.log(error)
  }
};

export default uploadImageToCloudinary;

