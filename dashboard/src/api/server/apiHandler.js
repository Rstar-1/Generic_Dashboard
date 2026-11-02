export const handleRequest = async (apiCall) => {
  try {
    const res = await apiCall();
    return res.data;
  } catch (error) {
    const err = {
      message:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
      status: error.response?.status || 500,
    };

    console.error("API Error:", err);
    throw err;
  }
};
