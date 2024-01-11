import { describe, it, expect, vi } from "vitest";
import { fetchProducts } from "../services/productService";

describe("fetchProducts", () => {
  it("constructs the correct URL with a search term", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: 1, name: "Test Product" }]),
      })
    );

    const config = { PRODUCTS_BASE_URI: "http://example.com/products" };
    await fetchProducts("test", config);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://example.com/products/search?SearchTerm=test"
    );
  });

  it("returns data on successful fetch", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: 1, name: "Test Product" }]),
      })
    );

    const products = await fetchProducts("", {
      PRODUCTS_BASE_URI: "http://example.com/products",
    });
    expect(products).toEqual([{ id: 1, name: "Test Product" }]);
  });

  it("handles fetch errors", async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error("Network error")));

    const products = await fetchProducts("", {
      PRODUCTS_BASE_URI: "http://example.com/products",
    });
    expect(products).toEqual([]);
  });

  it("returns an empty array when the response is not ok", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: "Not Found",
      })
    );

    const products = await fetchProducts("", {
      PRODUCTS_BASE_URI: "http://example.com/products",
    });
    expect(products).toEqual([]);
  });
});
