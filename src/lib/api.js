import { toast } from "react-toastify";

export const makeApiRequest = async ({ endpoint, method = "GET", body }) => {
  try {
    const response = await fetch(`http://localhost:5003/api${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    });

    const responseData = await response.json();

    if (responseData.message) {
      if (!responseData.success) {
        toast.error(responseData.message);
      } else {
        toast.success(responseData.message);
      }
    }

    return { response: responseData };
  } catch (error) {
    console.log(error);
    toast.error(error);
    return { error };
  }
};
