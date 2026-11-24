export const handleRequest = async (apiCall) => {
  try {
    const res = await apiCall();
    if (!res) return null;
    return res.data;
  } catch (error) {
    if (
      error?.name === "CanceledError" ||
      error?.code === "ERR_CANCELED" ||
      error?.message === "canceled"
    ) {
      return null;
    }
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
