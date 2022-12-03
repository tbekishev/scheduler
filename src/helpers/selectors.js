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

export function getInterview(state, interview) {
    if (!interview) return null;
    const interviewerId = interview.interviewer;
    const newObj = {student: interview.student, interviewer: state.interviewers[interviewerId]};
  return newObj;
}