import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const interviewers = props.interviewers;
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
    transition(SAVING);
    transition(SHOW);
  }

  function deleteInterview() {
    props.cancelInterview(props.id);
    transition(DELETE);
    transition(EMPTY);
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form onSave={save} interviewers={interviewers} onCancel={() => back(EMPTY)} />}
      {mode === SHOW && 
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(CREATE)}
        />}
      {mode === SAVING && <Status message="Saving" /> }
      {mode === DELETE && <Status message="Delete" />}
      {mode === CONFIRM && 
        <Confirm 
          message="Are you sure you would like to delete?" 
          onConfirm={deleteInterview} 
          onCancel={() => transition(SHOW)} 
        />}
    </article>
  );
}

