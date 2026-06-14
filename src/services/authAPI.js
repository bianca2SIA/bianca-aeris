import axios from "axios";

const AUTH_URL = "https://eqearafhxqzupmoewskm.supabase.co/auth/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxZWFyYWZoeHF6dXBtb2V3c2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMjM1ODAsImV4cCI6MjA5Njc5OTU4MH0.06dvNbdBFdXwqcYcdh4WFt007BBtQGuYOmJJz-qpCuE";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const authAPI = {
  async register({ email, password, name }) {
    const response = await axios.post(
      `${AUTH_URL}/signup`,
      {
        email,
        password,
        data: {
          name,
        },
      },
      { headers }
    );

    return response.data;
  },

  async login({ email, password }) {
    const response = await axios.post(
      `${AUTH_URL}/token?grant_type=password`,
      {
        email,
        password,
      },
      { headers }
    );

    localStorage.setItem("token", response.data.access_token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken() {
    return localStorage.getItem("token");
  },
};