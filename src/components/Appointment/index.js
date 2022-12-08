import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const interviewers = props.interviewers;
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  //save/edit the appointment
  function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING);
      props.bookInterview(props.id, interview)
      .then(()=> transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  //delete the interview
  function deleteInterview() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form
        interviewers={interviewers} 
        onSave={save} 
        onCancel={back} />}
      {mode === SHOW && 
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />}
      {mode === SAVING && <Status message="Saving" /> }
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && 
        <Confirm 
          message="Are you sure you would like to delete?" 
          onConfirm={deleteInterview} 
          onCancel={back} 
        />}
      {mode === EDIT && <Form
       student={props.interview.student}
       interviewer={props.interview.interviewer.id}
       interviewers={interviewers}
       onSave={save}
       onCancel={back}
       />}
      {mode === ERROR_SAVE && <Error message="Could not create/save an appointment :(" onClose={back} />}
      {mode === ERROR_DELETE && <Error message="Could not delete an appointment :(" onClose={back} />}
    </article>
  );
}

