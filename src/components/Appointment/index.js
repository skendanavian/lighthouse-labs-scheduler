import React, { Fragment } from "react";
import classNames from "classnames";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const { time, interview } = props;
  const style = classNames("appointment", {
    ":last-of-type": props.id === "last",
  });

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className={"appointment"}>
      {mode === EMPTY && (
        <Empty time={props.time} onAdd={() => transition(CREATE)} />
      )}
      {mode === CREATE && (
        <Form
          interviewers={[]}
          onSave={console.log("onSave")}
          onCancel={() => back()}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </article>
  );
}
