export const fetchApi = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const response = await fetch(`${process.env.API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`${response.statusText}`);
  }

  return response.json();
};

