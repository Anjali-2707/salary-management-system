import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

import {
  describe,
  expect,
  test,
  vi,
} from "vitest";

import EmployeeForm from "./EmployeeForm";

const formData = {
  employeeId: "EMP001",
  firstName: "Rahul",
  lastName: "Sharma",
  email: "rahul.sharma@acme.com",
  department: "Engineering",
  designation: "Software Engineer",
  country: "India",
  currency: "INR",
  annualSalary: "1500000",
  joiningDate: "2025-01-10",
};

describe("EmployeeForm", () => {
  test("renders employee form fields", () => {
    render(
      <EmployeeForm
        formData={formData}
        onChange={() => {}}
        onSubmit={() => {}}
        saving={false}
        submitLabel="Create Employee"
      />
    );

    expect(
      screen.getByRole("textbox", {
        name: /employee id/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: /first name/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: /last name/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: /email/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("spinbutton", {
        name: /annual salary/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /create employee/i,
      })
    ).toBeInTheDocument();
  });

  test("calls onChange when a field changes", () => {
    const handleChange = vi.fn();

    render(
      <EmployeeForm
        formData={formData}
        onChange={handleChange}
        onSubmit={() => {}}
        saving={false}
        submitLabel="Create Employee"
      />
    );

    fireEvent.change(
      screen.getByRole("textbox", {
        name: /first name/i,
      }),
      {
        target: {
          name: "firstName",
          value: "Amit",
        },
      }
    );

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("calls onSubmit when the form is submitted", () => {
    const handleSubmit = vi.fn(
      (event) => {
        event.preventDefault();
      }
    );

    render(
      <EmployeeForm
        formData={formData}
        onChange={() => {}}
        onSubmit={handleSubmit}
        saving={false}
        submitLabel="Save Changes"
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /save changes/i,
      })
    );

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test("disables submit button while saving", () => {
    render(
      <EmployeeForm
        formData={formData}
        onChange={() => {}}
        onSubmit={() => {}}
        saving={true}
        submitLabel="Save Changes"
      />
    );

    expect(
      screen.getByRole("button", {
        name: /saving/i,
      })
    ).toBeDisabled();
  });
});