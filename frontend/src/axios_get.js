import axios from "axios";

export async function fetchParts(filters) {
  try {
    const response = await axios.get("http://localhost:5000/catalog", {
      params: filters,
    });
    // TODO: Check status code
    return response.data.parts;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function fetchSubsystems() {
  try {
    const response = await axios.get("http://localhost:5000/subsystems");
    // TODO: Check status code
    return response.data.subsystems;
  } catch (error) {
    console.log(error);
    return false;
  }
}
