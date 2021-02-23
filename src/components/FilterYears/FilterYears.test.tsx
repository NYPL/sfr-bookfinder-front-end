import React from "react";
import FilterYears from "./FilterYears";
import { mount, shallow } from "enzyme";

describe("Filter Years with no apply button", () => {
  const dateChange = jest.fn();

  test("Renders filter years input", () => {
    const wrapper = shallow(
      <FilterYears
        dateFilters={{ start: 2000, end: 3000 }}
        onDateChange={dateChange}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("The inputs are prepopulated with passed-in numbers", () => {
    const wrapper = mount(
      <FilterYears
        dateFilters={{ start: 2000, end: 3000 }}
        onDateChange={dateChange}
      />
    );
    expect(wrapper.find("#date-filter-from").hostNodes().props().value).toEqual(
      2000
    );
    expect(wrapper.find("#date-filter-to").hostNodes().props().value).toEqual(
      3000
    );
  });
  test("Calls dateChange function when input changes", () => {
    const wrapper = mount(
      <FilterYears
        dateFilters={{ start: 2000, end: 3000 }}
        onDateChange={dateChange}
      />
    );
    wrapper.find("#date-filter-from").hostNodes().simulate("change", 2001);
    expect(dateChange).toHaveBeenCalledTimes(1);
    wrapper.find("#date-filter-to").hostNodes().simulate("change", 2001);
    expect(dateChange).toHaveBeenCalledTimes(2);
  });
});

describe("Filter Years with apply button", () => {
  const dateChange = jest.fn();
  const submit = jest.fn();

  test("Renders Filter Years with Apply button", () => {
    const wrapper = shallow(
      <FilterYears
        dateFilters={{ start: 30000, end: 2000 }}
        onDateChange={dateChange}
        onSubmit={submit}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("Calls submit without validation when apply button is clicked", () => {
    const wrapper = mount(
      <FilterYears
        dateFilters={{ start: 30000, end: 2000 }}
        onDateChange={dateChange}
        onSubmit={submit}
      />
    );
    expect(wrapper.exists("#year-filter-button")).toBeTruthy();

    wrapper.find("#year-filter-button").hostNodes().simulate("click");
    expect(submit).toBeCalledTimes(1);
    expect(wrapper.find({ isError: true }).length).toEqual(0);
  });
});

describe("Filter Years with error", () => {
  const spy = jest.spyOn(console, "warn");
  test("Shows error message with passed string", () => {
    const wrapper = mount(
      <FilterYears
        dateFilters={{ start: 2000, end: 3000 }}
        onDateChange={jest.fn()}
        dateRangeError="error"
        onSubmit={jest.fn}
      />
    );
    expect(wrapper.find({ isError: true }).text()).toEqual("error");
  });

  test("Throws warning when dateRangeError is passed without onSubmit", () => {
    shallow(
      <FilterYears
        dateFilters={{ start: 2000, end: 3000 }}
        onDateChange={jest.fn()}
        dateRangeError="error"
      />
    );
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
