import axios from "axios";

export const getNotes = async () => {
  try {
    const response = await axios.get("/api/notes");
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const createNote = async (note) => {
  try {
    const response = await axios.post("/api/notes", note);
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

export const updateNote = async (id, note) => {
  try {
    const response = await axios.put(`/api/notes/${id}`, note);
    return response.data;
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    await axios.delete(`/api/notes/${id}`);
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};
