import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import StaffFilter from "/components/staff/StaffFilter.vue";

describe("FilterComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(StaffFilter, {
      props: {
        uniqueRoles: ["Developer", "Designer", "Manager"],
        selectedRole: "",
        showModal: false,
        selectedStaffId: null,
      },
    });
  });

  it("renders the correct unique roles in the select dropdown", () => {
    const options = wrapper.findAll("option");
    expect(options.length).toBe(4);
    expect(options.at(1).text()).toBe("Developer");
    expect(options.at(2).text()).toBe("Designer");
    expect(options.at(3).text()).toBe("Manager");
  });

  it("selects the correct role in the dropdown", async () => {
    await wrapper.setProps({ selectedRole: "Developer" });
    const select = wrapper.find("select");
    expect(select.element.value).toBe("Developer");
  });

  it("emits update:selectedRole event when the select value changes", async () => {
    const select = wrapper.find("select");
    await select.setValue("Designer");
    expect(wrapper.emitted("update:selectedRole")).toBeTruthy();
    expect(wrapper.emitted("update:selectedRole")[0]).toEqual(["Designer"]);
  });

  it("emits update:showModal event when the Add button is clicked", async () => {
    const addButton = wrapper.find("button.bg-brand-primary-blue");
    await addButton.trigger("click");
    expect(wrapper.emitted("update:showModal")).toBeTruthy();
    expect(wrapper.emitted("update:showModal")[0]).toEqual([true]);
  });

  it("emits removeStaff event when the Remove button is clicked", async () => {
    await wrapper.setProps({ selectedStaffId: 1 });
    const removeButton = wrapper.find("button.bg-brand-primary-yellow");
    await removeButton.trigger("click");
    expect(wrapper.emitted("removeStaff")).toBeTruthy();
  });

  it("disables the Remove button when selectedStaffId is null", async () => {
    await wrapper.setProps({ selectedStaffId: null });
    const removeButton = wrapper.find("button.bg-brand-primary-yellow");
    expect(removeButton.attributes("disabled")).toBeDefined();
  });

  it("enables the Remove button when selectedStaffId is not null", async () => {
    await wrapper.setProps({ selectedStaffId: 1 });
    const removeButton = wrapper.find("button.bg-brand-primary-yellow");
    expect(removeButton.attributes("disabled")).toBeUndefined();
  });
});
