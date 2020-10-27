import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map((item) => {
    const isSelected = item.interviewer === item.id ? "selected" : "";
    return (
      <InterviewerListItem
        id={item.id}
        name={item.name}
        avatar={item.avatar}
        selected={props.interviewer === item.id}
        setInterviewer={props.setInterviewer}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>

      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}
