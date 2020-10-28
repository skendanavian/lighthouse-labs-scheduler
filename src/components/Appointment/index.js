import React, { Fragment } from "react";
import classNames from "classnames";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import "./styles.scss";

export default function Appointment(props) {
  const { time, interview } = props;
  const style = classNames("appointment", {
    ":last-of-type": props.id === "last",
  });

  return (
    <article className={"appointment"}>
      {<Header time={time} />}
      {props.interview ? (
        <Show student={interview.student} interviewer={interview.interviewer} />
      ) : (
        <Empty />
      )}
    </article>
  );
}
