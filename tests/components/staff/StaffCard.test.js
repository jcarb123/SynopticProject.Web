import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import StaffCard from "/components/staff/StaffCard.vue";

describe("StaffCard", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(StaffCard, {
      props: {
        staff: { id: 1, name: "John Doe", role: "Developer" },
        selectedStaffId: null,
      },
    });
  });

  it("renders the correct staff information", () => {
    expect(wrapper.find(".text-2xl.font-bold").text()).toBe("John Doe");
    expect(wrapper.find(".text-xl").text()).toBe("Developer");
  });

  it("computes initials correctly", () => {
    expect(wrapper.vm.initials).toBe("JD");
  });

  it("applies correct classes when not selected", () => {
    const container = wrapper.find(".p-4");
    const initialsDiv = wrapper.find(".h-24");

    expect(container.classes()).not.toContain("border-brand-primary-blue");
    expect(initialsDiv.classes()).toContain("bg-brand-primary-grey");
    expect(initialsDiv.classes()).not.toContain("bg-brand-primary-blue");
  });

  it("applies correct classes when selected", async () => {
    await wrapper.setProps({ selectedStaffId: 1 });

    const container = wrapper.find(".p-4");
    const initialsDiv = wrapper.find(".h-24");

    expect(container.classes()).toContain("border-brand-primary-blue");
    expect(initialsDiv.classes()).toContain("bg-brand-primary-blue");
    expect(initialsDiv.classes()).toContain("text-white");
  });

  it("emits select event with staff id when not selected", async () => {
    await wrapper.trigger("click");
    expect(wrapper.emitted("select")).toBeTruthy();
    expect(wrapper.emitted("select")[0]).toEqual([1]);
  });

  it("emits select event with null when already selected", async () => {
    await wrapper.setProps({ selectedStaffId: 1 });
    await wrapper.trigger("click");
    expect(wrapper.emitted("select")).toBeTruthy();
    expect(wrapper.emitted("select")[0]).toEqual([null]);
  });
});
