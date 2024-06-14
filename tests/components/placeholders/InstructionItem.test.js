import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import InstructionItem from "/components/placeholders/InstructionItem.vue";

describe("InstructionItem", () => {
  it("renders the component with the given number", () => {
    const wrapper = mount(InstructionItem, {
      props: { number: "72" },
    });

    const numberDiv = wrapper.find("div.flex > div.flex");
    expect(numberDiv.text()).toBe("72");
  });

  it("renders slot content correctly", () => {
    const wrapper = mount(InstructionItem, {
      props: { number: "1" },
      slots: {
        default: "Slot Content",
      },
    });

    const slotDiv = wrapper.find("div.text-lg");
    expect(slotDiv.text()).toBe("Slot Content");
  });

  it("applies the correct classes to the number div", () => {
    const wrapper = mount(InstructionItem, {
      props: { number: "1" },
    });

    const numberDiv = wrapper.find("div.flex > div.flex");
    expect(numberDiv.classes()).toContain("w-10");
    expect(numberDiv.classes()).toContain("h-10");
    expect(numberDiv.classes()).toContain("text-gray-600");
    expect(numberDiv.classes()).toContain("bg-brand-primary-grey");
    expect(numberDiv.classes()).toContain("font-bold");
    expect(numberDiv.classes()).toContain("rounded-full");
    expect(numberDiv.classes()).toContain("mb-2");
    expect(numberDiv.classes()).toContain("border-gray-300");
    expect(numberDiv.classes()).toContain("border-2");
  });

  it("applies the correct classes to the component container", () => {
    const wrapper = mount(InstructionItem, {
      props: { number: "1" },
    });

    const containerDiv = wrapper.find("div.flex");
    expect(containerDiv.classes()).toContain("flex");
    expect(containerDiv.classes()).toContain("flex-col");
    expect(containerDiv.classes()).toContain("items-center");
    expect(containerDiv.classes()).toContain("text-gray-600");
    expect(containerDiv.classes()).toContain("p-2");
    expect(containerDiv.classes()).toContain("rounded-lg");
  });
});
