import React, { Fragment } from "react";
import classNames from "classnames";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment({
  bookInterview,
  id,
  time,
  interview,
  interviewers,
}) {
  const style = classNames("appointment", {
    ":last-of-type": id === "last",
  });

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    bookInterview(id, interview);
    console.log(interview);
    transition(SHOW);
  }

  return (
    <article className={"appointment"}>
      {mode === EMPTY && <Empty time={time} onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SHOW && (
        <Show student={interview.student} interviewer={interview.interviewer} />
      )}
    </article>
  );
}
