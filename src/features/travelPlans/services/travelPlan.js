const API_BASE_URL =

// reads the backend URL from an environment
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:4000/api/v1";

export const createTravelPlan = async (
  payload,
  { signal } = {},
) => {
  const response = await fetch(
    `${API_BASE_URL}/plans`,
    {

 // post Create a new travel plan o data to backend 
 // send new
      method: "POST",

// tells the backend request body contains JSON data
      headers: {
        "Content-Type": "application/json",
      },

// converting payload to JSON
      body: JSON.stringify(payload),

// request cancellation support AbortController
      signal,
    },
  );

  if (!response.ok) {
    throw new Error(
      "The travel plan could not be created.",
    );
  }

  return response.json();
};