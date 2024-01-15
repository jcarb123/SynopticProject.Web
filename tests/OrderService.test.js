import { it, expect, vi } from "vitest";
import axios from "axios";
import {
  authoriseAddToBasket,
  authoriseCompleteOrder,
} from "../services/orderService.js";

vi.mock("axios", () => {
  const mockAxiosInstance = {
    put: vi.fn(),
    post: vi.fn(),
  };

  return {
    default: {
      create: () => mockAxiosInstance,
    },
    create: () => mockAxiosInstance,
  };
});

const mockAxios = axios.create();

describe("orderService function", () => {
  it("authoriseAddToBasket returns true for successful response", async () => {
    mockAxios.put.mockResolvedValue({ status: 200 });

    const result = await authoriseAddToBasket(
      { ORDERS_BASE_URI: "http://example.com/orders" },
      "test-token"
    );
    expect(result).toBe(true);
  });

  it("authoriseAddToBasket returns false on request failure", async () => {
    mockAxios.put.mockRejectedValue(new Error("Request failed"));

    const result = await authoriseAddToBasket(
      { ORDERS_BASE_URI: "http://example.com/orders" },
      "test-token"
    );
    expect(result).toBe(false);
  });

  it("authoriseCompleteOrder returns true for successful response", async () => {
    mockAxios.post.mockResolvedValue({ status: 200 });

    const result = await authoriseCompleteOrder(
      { ORDERS_BASE_URI: "http://example.com/orders" },
      "test-token"
    );
    expect(result).toBe(true);
  });

  it("authoriseCompleteOrder returns false on request failure", async () => {
    mockAxios.post.mockRejectedValue(new Error("Request failed"));

    const result = await authoriseCompleteOrder(
      { ORDERS_BASE_URI: "http://example.com/orders" },
      "test-token"
    );
    expect(result).toBe(false);
  });
});
