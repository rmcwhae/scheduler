import React, { useEffect } from "react";

import "./styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => { // listener for changes to props.interview, transition, or mode (updated via sockets)
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
     transition(EMPTY);
    }
   }, [props.interview, transition, mode]);


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
    };
    
    
    function deleteApt() {
      transition(DELETING);
      props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment" data-testid="appointment">
    <Header time={props.time}></Header>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
    )}
    {mode === CREATE && (
        <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={() => back()}
        />
    )}
    {mode === EDIT && (
        <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={() => back()}
        />
    )}
    {mode === SAVING && (
        <Status
        message="Saving"
        />
    )}
    {mode === DELETING && (
        <Status
        message="Deleting"
        />
    )}
    {mode === CONFIRM && (
        <Confirm
        message="Are you sure you would like to delete?"
        onCancel={() => back()}
        onConfirm={deleteApt}
        />
    )}
    {mode === ERROR_SAVE && (
        <Error
        message="Could not save appointment."
        onClose={() => back()}
        />
    )}
    {mode === ERROR_DELETE && (
        <Error
        message="Could not cancel appointment."
        onClose={() => back()}
        />
    )}
    </article>
  );
}