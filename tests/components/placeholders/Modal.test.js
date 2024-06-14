import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Modal from "/components/placeholders/Modal.vue";

describe("Modal", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Modal, {
      props: {
        show: true,
        title: "Test Title",
        applyButtonText: "Confirm",
        isSubmitDisabled: false,
      },
      slots: {
        default: "<p>Modal Content</p>",
      },
    });
  });

  it("renders the component when show is true", () => {
    expect(wrapper.find(".fixed").isVisible()).toBe(true);
  });

  it("does not render the component when show is false", async () => {
    await wrapper.setProps({ show: false });
    expect(wrapper.find(".fixed").exists()).toBe(false);
  });

  it("renders the title correctly", () => {
    const title = wrapper.find("h2");
    expect(title.text()).toBe("Test Title");
  });

  it("renders the slot content correctly", () => {
    const slotContent = wrapper.find(".p-6");
    expect(slotContent.html()).toContain("<p>Modal Content</p>");
  });

  it("emits close event when clicking the close button", async () => {
    await wrapper.find(".bg-gray-200").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("close");
  });

  it("emits apply event when clicking the apply button", async () => {
    await wrapper.find(".bg-brand-primary-blue").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("apply");
  });

  it("disables the apply button when isSubmitDisabled is true", async () => {
    await wrapper.setProps({ isSubmitDisabled: true });
    const applyButton = wrapper.find(".bg-brand-primary-blue");
    expect(applyButton.attributes("disabled")).toBeDefined();
  });

  it("enables the apply button when isSubmitDisabled is false", () => {
    const applyButton = wrapper.find(".bg-brand-primary-blue");
    expect(applyButton.attributes("disabled")).toBeUndefined();
  });

  it("emits close event when clicking on the background overlay", async () => {
    await wrapper.find(".bg-black").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("close");
  });
});
