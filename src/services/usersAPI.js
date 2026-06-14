import axios from "axios";

const API_URL = "https://eqearafhxqzupmoewskm.supabase.co/rest/v1/users";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxZWFyYWZoeHF6dXBtb2V3c2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMjM1ODAsImV4cCI6MjA5Njc5OTU4MH0.06dvNbdBFdXwqcYcdh4WFt007BBtQGuYOmJJz-qpCuE";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

export const usersAPI = {
  async fetchUsers() {
    const response = await axios.get(`${API_URL}?select=*&order=id.asc`, {
      headers,
    });

    return response.data;
  },

  async createUser(data) {
    const response = await axios.post(API_URL, data, {
      headers,
    });

    return response.data;
  },

  async updateUser(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, {
      headers,
    });

    return response.data;
  },

  async deleteUser(id) {
    const response = await axios.delete(`${API_URL}?id=eq.${id}`, {
      headers,
    });

    return response.data;
  },
};