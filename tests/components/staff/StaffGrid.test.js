import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import StaffGrid from "/components/staff/StaffGrid.vue";
import RiveAnimation from "/components/placeholders/RiveAnimation.vue";
import StaffCard from "/components/staff/StaffCard.vue";

describe("StaffGrid", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(StaffGrid, {
      props: {
        paginatedStaffList: [],
        selectedStaffId: null,
      },
      global: {
        components: {
          RiveAnimation,
          StaffCard,
        },
      },
    });
  });

  it("displays the no staff message and RiveAnimation component when staff list is empty", () => {
    const noStaffMessage = wrapper.find(".lg\\:hidden.text-center");
    const riveAnimation = wrapper.findComponent(RiveAnimation);
    const lgNoStaffMessage = wrapper.find(".hidden.lg\\:flex");

    expect(noStaffMessage.exists()).toBe(true);
    expect(noStaffMessage.text()).toBe(
      "No staff found. Please try again later."
    );
    expect(riveAnimation.exists()).toBe(true);
    expect(lgNoStaffMessage.exists()).toBe(true);
  });

  it("displays staff cards when the staff list is not empty", async () => {
    await wrapper.setProps({
      paginatedStaffList: [
        { id: 1, name: "John Doe", role: "Developer" },
        { id: 2, name: "Jane Smith", role: "Designer" },
      ],
    });

    const staffCards = wrapper.findAllComponents(StaffCard);
    expect(staffCards.length).toBe(2);
    expect(staffCards.at(0).props("staff")).toEqual({
      id: 1,
      name: "John Doe",
      role: "Developer",
    });
    expect(staffCards.at(1).props("staff")).toEqual({
      id: 2,
      name: "Jane Smith",
      role: "Designer",
    });
  });

  it("emits selectStaff event when a staff card is selected", async () => {
    await wrapper.setProps({
      paginatedStaffList: [{ id: 1, name: "John Doe", role: "Developer" }],
    });

    const staffCard = wrapper.findComponent(StaffCard);
    await staffCard.vm.$emit("select", 1);
    expect(wrapper.emitted("selectStaff")).toBeTruthy();
    expect(wrapper.emitted("selectStaff")[0]).toEqual([1]);
  });
});
