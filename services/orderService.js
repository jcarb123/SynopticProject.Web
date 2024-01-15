import axios from "axios";

const apiClient = axios.create({});

export async function authoriseAddToBasket(config, token) {
  let url = config.ORDERS_BASE_URI;
  let bearerToken = token;

  try {
    const response = await apiClient.put(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error("Error in PUT request:", error);
    return false;
  }
}

export async function authoriseCompleteOrder(config, token) {
  let url = config.ORDERS_BASE_URI;
  let bearerToken = token;

  try {
    const response = await apiClient.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error("Error in POST request:", error);
    return false;
  }
}
