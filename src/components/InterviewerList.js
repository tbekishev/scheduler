import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function(props) {
  const interviewers = props.interviewers;
  const listInterviewers = interviewers.map((interviewer) =>
    <InterviewerListItem 
      key = {interviewer.id}
      avatar = {interviewer.avatar}
      name = {interviewer.name}
      selected = {props.value === interviewer.id}
      setInterviewer = {() => props.onChange(interviewer.id)}
    />);  
  

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {listInterviewers}
      </ul>
    </section>
  );
}