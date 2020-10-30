import React, { Fragment } from "react";
import classNames from "classnames";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment({
  bookInterview,
  cancelInterview,
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
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  function cancel(id) {
    console.log("delete got called");
    transition(DELETING);
    cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => {
        console.error(err);
      });
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
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => confirmDelete()}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Cancelling" />}
      {mode === CONFIRM && (
        <Confirm onConfirm={() => cancel(id)} onCancel={() => back()} />
      )}
    </article>
  );
}
