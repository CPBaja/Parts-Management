import axios from "axios";

export async function updatePart(part) {
  try {
    const response = await axios.put(
      "http://localhost:5000/part/" + part._id,
      part
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}
