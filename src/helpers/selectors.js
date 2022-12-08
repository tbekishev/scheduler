//array of appointments for the day
export function getAppointmentsForDay(state, day) {

  let appointments = [];
  const result = [];

  state.days.forEach(element => {
    if (element.name === day) 
    appointments = element.appointments;
  });

  appointments.forEach(element => {
    result.push(state.appointments[element])
  });

  return result;
};

//get interview information(student name and the interviewer)
export function getInterview(state, interview) {
    if (!interview) return null;
    const interviewerId = interview.interviewer;
    const newObj = {student: interview.student, interviewer: state.interviewers[interviewerId]};
  return newObj;
}

//array of the interviewers for the day
export function getInterviewersForDay(state, day) {
  let interviewers = [];
  const result = [];

  state.days.forEach(element => {
    if (element.name === day) 
    interviewers = element.interviewers;
  });

  interviewers.forEach(element => {
    result.push(state.interviewers[element])
  });

  return result;
}