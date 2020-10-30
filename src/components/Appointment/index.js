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

  console.log("interview from index", interview);

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

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

  function editForm() {
    transition(EDIT);
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
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
          name={interview.student}
          interviewer={interview.interviewer.id}
        />
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => confirmDelete()}
          onEdit={() => editForm()}
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
