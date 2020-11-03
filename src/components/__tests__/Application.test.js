import React from "react";

import {
  getByText,
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  querySelector,
  getByTestId,
  queryByText,
  getByRole,
  getByLabelText,
} from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"))
      .then(() => {
        fireEvent.click(getByText("Tuesday"));
      })
      .then(() => {
        expect(getByText("Leopold Silvers")).toBeInTheDocument();
      });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(container, "Add"));
    fireEvent.change(getByPlaceholderText(container, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    const interviewer = getByAltText(appointment, "Sylvia Palmer");

    fireEvent.click(interviewer);

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument;

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(day).toHaveTextContent(/no spots remaining/i);
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument;

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Cancelling")).toBeInTheDocument;

    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(day).toHaveTextContent(/2 spots remaining/i);
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Edit"));

    expect(getByTestId(appointment, "student-name-input")).toHaveValue(
      "Archie Cohen"
    );

    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument;

    fireEvent.change(getByPlaceholderText(container, /Enter Student Name/i), {
      target: { value: "John Jones" },
    });

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, /saving/i)).toBeInTheDocument;

    await waitForElement(() => getByText(appointment, "John Jones"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(day).toHaveTextContent(/1 spot remaining/i);
  });

  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });
});

// "loads data, cancels an interview and increases the spots remaining for Monday by 1"
// "loads data, edits an interview and keeps the spots remaining for Monday the same"
// "shows the save error when failing to save an appointment"
// "shows the delete error when failing to delete an existing appointment"
