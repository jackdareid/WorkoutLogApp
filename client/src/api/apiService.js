const URL = "http://localhost:3000/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const apiService = {
  login: async (email, password) => {
    const response = await fetch(`${URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return await response.json();
  },
  getPrograms: async () => {
    const response = await fetch(`${URL}/programs`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Program retrieval failed");
    }

    return await response.json();
  },
  removeWorkout: async (programId, workoutId) => {
    const response = await fetch(
      `${URL}/programs/${programId}/workouts/${workoutId}`,
      {
        method: "DELETE",
        headers: getHeaders(),
      },
    );

    if (!response.ok) {
      throw new Error("Workout deletion failed");
    }

    return await response.json();
  },
};
