import React from "react";
import { action } from "@storybook/addon-actions/dist/preview";
import { render } from "@testing-library/react";
import "./InterviewerListItem.scss";

const classNames = require("classnames");
//prettier-ignore
export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected, 
  });

  return (
    <li className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>
  );
}
