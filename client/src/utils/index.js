import FileSaver from "file-saver";
import axios from "axios";
import { surpriseMePrompts } from "../constrants";

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}

export async function signup(form) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/signup",
      form
    );
    // Redirect to login page
    const data = response;
    if (data.status === 201) {
      return data;
    } else {
    
      return null;
    }
  } catch (error) {
    alert(error.response.data.message);
    console.log({ error });
  }
}
export async function login(form) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/login",
      form
    );
    const data = response;
    if (data.status === 200) {
      return data;
    } else {
      // Authentication failed, show an alert
      // alert(data.message);
      return null; // Return null to indicate an unsuccessful login
    }
  } catch (error) {
    console.log({ error });
  }
}
