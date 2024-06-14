import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Tabs from "/components/placeholders/Tabs.vue";

describe("TabsComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Tabs, {
      props: {
        tabs: ["Tab 1", "Tab 2"],
        isLocked: false,
      },
    });
  });

  it("renders the correct number of tabs", () => {
    const tabs = wrapper.findAll(".py-5");
    expect(tabs.length).toBe(2);
  });

  it("applies correct class to selected tab", async () => {
    wrapper.vm.selectedTab = 1;
    await wrapper.vm.$nextTick();
    const selectedTab = wrapper.findAll(".py-5").at(1);
    expect(selectedTab.classes()).toContain("text-brand-primary-blue");
  });

  it("applies correct class to non-selected tab", async () => {
    wrapper.vm.selectedTab = 0;
    await wrapper.vm.$nextTick();
    const nonSelectedTab = wrapper.findAll(".py-5").at(1);
    expect(nonSelectedTab.classes()).toContain("text-gray-600");
  });

  it("applies lock icon when isLocked is true", async () => {
    await wrapper.setProps({ isLocked: true });
    const lockIcon = wrapper.find(".fa-lock");
    expect(lockIcon.exists()).toBe(true);
  });

  it("applies unlock icon when isLocked is false", async () => {
    await wrapper.setProps({ isLocked: false });
    const unlockIcon = wrapper.find(".fa-unlock");
    expect(unlockIcon.exists()).toBe(true);
  });

  it("disables clicking on locked tab", async () => {
    await wrapper.setProps({ isLocked: true });
    const lockedTab = wrapper.findAll(".py-5").at(1);
    await lockedTab.trigger("click");
    expect(wrapper.vm.selectedTab).toBe(0);
  });

  it("updates underline style correctly when tab is selected", async () => {
    wrapper.vm.selectedTab = 0;
    await wrapper.vm.$nextTick();
    const underline = wrapper.find(".bg-brand-primary-yellow");
    expect(underline.attributes("style")).toContain("left: 12.5%;");

    wrapper.vm.selectedTab = 1;
    await wrapper.vm.$nextTick();
    expect(underline.attributes("style")).toContain("left: 62.5%;");
  });

  it("applies sticky class when scrolling", async () => {
    const innerDiv = wrapper.find(".relative");
    wrapper.vm.isSticky = true;
    await wrapper.vm.$nextTick();
    expect(innerDiv.classes()).toContain("sticky");
  });

  it("removes sticky class when not scrolling", async () => {
    const innerDiv = wrapper.find(".relative");
    wrapper.vm.isSticky = false;
    await wrapper.vm.$nextTick();
    expect(innerDiv.classes()).not.toContain("sticky");
  });

  it("adds event listener on mount and removes on unmount", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const wrapper = mount(Tabs, {
      props: {
        tabs: ["Tab 1", "Tab 2"],
      },
    });

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );

    wrapper.unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });
});
