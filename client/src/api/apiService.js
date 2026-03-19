// apiService.js
const URL = "http://localhost:3000/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handleResponse = (response) => {
  if (response.status == 401) {
    localStorage.removeItem("token");
    window.location.reload();
  }
  return response;
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
    handleResponse(response);

    if (!response.ok) {
      throw new Error("Program retrieval failed");
    }

    return await response.json();
  },
  getWorkouts: async (programId) => {
    const response = await fetch(`${URL}/programs/${programId}/workouts`, {
      method: "GET",
      headers: getHeaders(),
    });
    handleResponse(response);

    if (!response.ok) {
      throw new Error("Program workouts retreival failed");
    }

    return await response.json();
  },
  getWorkoutExercises: async (programId, workoutId) => {
    const response = await fetch(
      `${URL}/programs/${programId}/workouts/${workoutId}`,
      {
        method: "GET",
        headers: getHeaders(),
      },
    );
    handleResponse(response);

    if (!response.ok) {
      throw new Error("Workout exercise retrieval failed");
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
    handleResponse(response);

    if (!response.ok) {
      throw new Error("Workout deletion failed");
    }

    return await response.json();
  },
};
