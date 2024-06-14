import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import DeviceCard from "/components/devices/DeviceCard.vue";
import { VueToggles } from "vue-toggles";

describe("DeviceCard", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(DeviceCard, {
      props: {
        type: "Till",
        number: 1,
        temperature: 25,
        status: true,
        iconClass: "fa-solid fa-cash-register",
        temperatureColorClass: "text-red-500",
      },
      global: {
        components: {
          VueToggles,
        },
      },
    });
  });

  it("renders the correct type and number", () => {
    const header = wrapper.find("h3");
    expect(header.text()).toBe("Till 1");
  });

  it("renders the status indicator for Till type", () => {
    const statusIndicator = wrapper.find(".h-6");
    expect(statusIndicator.exists()).toBe(true);
    expect(statusIndicator.classes()).toContain("bg-[#50d750]");
  });

  it("does not render the status indicator for non-Till type", async () => {
    await wrapper.setProps({ type: "Fridge" });
    const statusIndicator = wrapper.find(".h-6");
    expect(statusIndicator.exists()).toBe(false);
  });

  it("renders the VueToggles component for Till type", () => {
    const toggle = wrapper.findComponent(VueToggles);
    expect(toggle.exists()).toBe(true);
    expect(toggle.props("modelValue")).toBe(true);
  });

  it("does not render the VueToggles component for non-Till type", async () => {
    await wrapper.setProps({ type: "Fridge" });
    const toggle = wrapper.findComponent(VueToggles);
    expect(toggle.exists()).toBe(false);
  });

  it("emits update:status event when toggle is changed", async () => {
    const toggle = wrapper.findComponent(VueToggles);
    await toggle.vm.$emit("update:modelValue", false);
    expect(wrapper.emitted("update:status")).toBeTruthy();
    expect(wrapper.emitted("update:status")[0]).toEqual([false]);
  });

  it("applies the correct icon class", () => {
    const icon = wrapper.find("i");
    expect(icon.classes()).toContain("fa-solid");
    expect(icon.classes()).toContain("fa-cash-register");
  });
});
