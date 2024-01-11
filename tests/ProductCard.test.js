import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ProductCard from "../components/ProductCard.vue";

describe("ProductCard", () => {
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
      props: { product, isAuthenticated: false },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("displays the product data correctly", () => {
    const wrapper = mount(ProductCard, {
      props: { product, isAuthenticated: false },
    });
    expect(wrapper.text()).toContain(product.name);
    expect(wrapper.text()).toContain(`${product.calories} kcal`);
    expect(wrapper.text()).toContain(`£${product.price.toFixed(2)}`);
    expect(wrapper.find("img").attributes("src")).toBe(product.imageUrl);
  });

  it("conditionally displays the Add button based on isAuthenticated prop", async () => {
    const wrapper = mount(ProductCard, {
      props: { product, isAuthenticated: false },
    });
    expect(wrapper.find("button").exists()).toBe(false);

    await wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find("button").exists()).toBe(true);
  });
});
