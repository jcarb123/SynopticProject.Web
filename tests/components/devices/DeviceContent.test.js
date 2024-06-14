import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import DeviceContent from "/components/devices/DeviceContent.vue";
import DeviceCard from "/components/devices/DeviceCard.vue";

describe("DeviceContent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(DeviceContent, {
      global: {
        components: {
          DeviceCard,
        },
      },
    });
  });

  it("renders the correct number of fridges", () => {
    const fridgeCards = wrapper
      .findAllComponents(DeviceCard)
      .filter((card) => card.props("type") === "Fridge");
    expect(fridgeCards.length).toBe(3);
  });

  it("renders the correct number of tills", () => {
    const tillCards = wrapper
      .findAllComponents(DeviceCard)
      .filter((card) => card.props("type") === "Till");
    expect(tillCards.length).toBe(3);
  });

  it("renders the correct number of hot holds", () => {
    const hotHoldCards = wrapper
      .findAllComponents(DeviceCard)
      .filter((card) => card.props("type") === "Hot Hold");
    expect(hotHoldCards.length).toBe(3);
  });

  it("renders the correct fridge details", () => {
    const fridgeCards = wrapper
      .findAllComponents(DeviceCard)
      .filter((card) => card.props("type") === "Fridge");
    expect(fridgeCards[0].props("number")).toBe(1);
    expect(fridgeCards[0].props("temperature")).toBe(4);
    expect(fridgeCards[1].props("number")).toBe(2);
    expect(fridgeCards[1].props("temperature")).toBe(3);
    expect(fridgeCards[2].props("number")).toBe(3);
    expect(fridgeCards[2].props("temperature")).toBe(5);
  });

  it("renders the correct till details", () => {
    const tillCards = wrapper
      .findAllComponents(DeviceCard)
      .filter((card) => card.props("type") === "Till");
    expect(tillCards[0].props("number")).toBe(1);
    expect(tillCards[0].props("status")).toBe(true);
    expect(tillCards[1].props("number")).toBe(2);
    expect(tillCards[1].props("status")).toBe(false);
    expect(tillCards[2].props("number")).toBe(3);
    expect(tillCards[2].props("status")).toBe(true);
  });

  it("renders the correct hot hold details", () => {
    const hotHoldCards = wrapper
      .findAllComponents(DeviceCard)
      .filter((card) => card.props("type") === "Hot Hold");
    expect(hotHoldCards[0].props("number")).toBe(1);
    expect(hotHoldCards[0].props("temperature")).toBe(65);
    expect(hotHoldCards[1].props("number")).toBe(2);
    expect(hotHoldCards[1].props("temperature")).toBe(70);
    expect(hotHoldCards[2].props("number")).toBe(3);
    expect(hotHoldCards[2].props("temperature")).toBe(68);
  });

  it("updates till status when toggled", async () => {
    const tillCards = wrapper
      .findAllComponents(DeviceCard)
      .filter((card) => card.props("type") === "Till");
    await tillCards[0].vm.$emit("update:status", false);
    expect(wrapper.vm.tills[0].status).toBe(false);
  });
});
