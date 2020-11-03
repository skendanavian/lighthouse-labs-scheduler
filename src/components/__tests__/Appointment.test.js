import React from "react";

import { render } from "@testing-library/react";

import Application from "components/Application";
import Appointment from "components/Application";

// xit("renders without crashing", () => {
//   render(<Application />);
// });

describe("Appointment", () => {
  it.only("renders without crashing", () => {
    render(<Appointment />);
  });
});
