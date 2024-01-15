import { describe, it, expect, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import Hero from "../components/Hero.vue";
import { nextTick } from "vue";

describe("Hero", () => {
  globalThis.useRuntimeConfig = () => {
    return {
      public: {
        something: "value",
      },
    };
  };

  it("renders correctly", () => {
    const wrapper = mount(Hero, {
      global: {
        stubs: ["FontAwesomeIcon"],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("conditionally renders log in button when not authenticated", async () => {
    const wrapper = mount(Hero, {
      global: {
        stubs: ["FontAwesomeIcon"],
      },
      props: { isAuthenticated: false },
    });

    let loginButtonExists = wrapper
      .findAll("button")
      .some((w) => w.text().includes("Log In"));
    expect(loginButtonExists).toBe(true);
  });

  it("emits search event when search term is input", async () => {
    const wrapper = mount(Hero, {
      props: { searchTerm: "" },
    });
    const input = wrapper.find('input[type="search"]');
    await input.setValue("test search");
    await flushPromises();
    expect(wrapper.emitted("search")).toBeTruthy();
  });
});
