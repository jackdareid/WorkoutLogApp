// apiService.js
const URL = "http://localhost:3000/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handleResponse = async (response, defaultMessage) => {
  if (response.status == 401) {
    localStorage.removeItem("token");
    window.location.reload();
  }
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || defaultMessage);
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

    await handleResponse(response, "Login failed");

    return await response.json();
  },
  createProgram: async ({ name, notes }) => {
    const response = await fetch(`${URL}/programs/create`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ name, notes }),
    });
    await handleResponse(response, "Program creation failed");

    return await response.json();
  },
  getPrograms: async () => {
    const response = await fetch(`${URL}/programs`, {
      method: "GET",
      headers: getHeaders(),
    });
    await handleResponse(response, "Program retrieval failed");

    return await response.json();
  },
  getWorkouts: async (programId) => {
    const response = await fetch(`${URL}/programs/${programId}/workouts`, {
      method: "GET",
      headers: getHeaders(),
    });
    await handleResponse(response, "Program workouts retrieval failed");

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
    await handleResponse(response, "Workout exercise retrieval failed");

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
    await handleResponse(response, "Workout deletion failed");

    return await response.json();
  },
  removeProgram: async (programId) => {
    const response = await fetch(`${URL}/programs/${programId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    await handleResponse(response, "Program deletion failed");

    return await response.json();
  },
};
