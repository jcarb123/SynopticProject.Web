import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Pagination from "/components/placeholders/Pagination.vue";

describe("Pagination", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Pagination, {
      props: {
        totalPages: 5,
        currentPage: 1,
      },
    });
  });

  it("renders the correct number of pages", () => {
    const pages = wrapper.findAll(".pagination-circle");
    expect(pages.length).toBe(5);
  });

  it("applies the correct animation class to the current page", () => {
    const currentPage = wrapper.findAll(".pagination-circle").at(0);
    expect(currentPage.classes()).toContain("animate-grow");
  });

  it("applies the correct animation class to non-current pages", () => {
    const nonCurrentPage = wrapper.findAll(".pagination-circle").at(1);
    expect(nonCurrentPage.classes()).toContain("animate-shrink");
  });

  it("emits update:currentPage event when a page is clicked", async () => {
    const page = wrapper.findAll(".pagination-circle").at(2);
    await page.trigger("click");
    expect(wrapper.emitted("update:currentPage")).toBeTruthy();
    expect(wrapper.emitted("update:currentPage")[0]).toEqual([3]);
  });

  it("hides the pagination circles when totalPages is 1", async () => {
    await wrapper.setProps({ totalPages: 1 });
    const pages = wrapper.findAll(".pagination-circle");
    expect(pages.length).toBe(1);
    expect(pages.at(0).isVisible()).toBe(false);
  });
});
