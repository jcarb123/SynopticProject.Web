import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ProductCard from "../components/ProductCard.vue";

describe("ProductCard", () => {
  globalThis.useRuntimeConfig = () => {
    return {
      public: {
        something: "value",
      },
    };
  };

  const product = {
    name: "Test Product",
    description: "This is a test description",
    price: 9.99,
    inStock: true,
    calories: 100,
    imageUrl: "test-image.jpg",
  };

  it("renders correctly", () => {
    const wrapper = mount(ProductCard, {
      props: { product },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it("displays the product data correctly", () => {
    const wrapper = mount(ProductCard, {
      props: { product },
    });

    expect(wrapper.text()).toContain(product.name);
    expect(wrapper.text()).toContain(`${product.calories} kcal`);
    expect(wrapper.text()).toContain(`£${product.price.toFixed(2)}`);
    expect(wrapper.find("img").attributes("src")).toBe(product.imageUrl);
  });

  it("initially does not display the add button", async () => {
    const wrapper = mount(ProductCard, {
      props: { product },
    });

    expect(wrapper.find("button").exists()).toBe(false);
  });
});
