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
}