import React from "react";
import { action } from "@storybook/addon-actions/dist/preview";
import { render } from "@testing-library/react";
import "./InterviewerListItem.scss";

const classNames = require("classnames");
//prettier-ignore
export default function InterviewerListItem(props) {

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  const selectedImageClass = classNames("interviewers__item-image", {
    "interviewers__item-image--selected": props.selected
  
  });

  const displayName = props.selected ? props.name : "" ;



  return (
    <li onClick={props.setInterviewer} className={interviewerClass}>
      <img
        className={selectedImageClass}
        src={props.avatar}
        alt={props.name}
      />
      {displayName}
    </li>
  );
}
