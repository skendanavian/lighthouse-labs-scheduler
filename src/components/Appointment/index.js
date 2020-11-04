import React from "react";
import classNames from "classnames";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Header from "./Header";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
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
  const EDIT = "EDIT";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";

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
        transition(ERROR_SAVE, true);
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
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => {
        transition(ERROR_DELETE, true);
        console.error(err);
      });
  }

  return (
    <article data-testid="appointment" className={"appointment"}>
      <Header time={time} />
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

      {mode === ERROR_SAVE && (
        <Error
          message={
            "The appointment was not successfully saved. Please try again."
          }
          onClose={() => back()}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          message={
            "The appointment was not successfully deleted. Please try again."
          }
          onClose={() => back()}
        />
      )}
    </article>
  );
}
