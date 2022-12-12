import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

const setDay = day => setState({ ...state, day });
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});

//get days, appointments and interviewers from the api-server
useEffect(() => {
  const daysUrl = "/api/days";
  const appointmentsUrl = "/api/appointments";
  const interviewersUrl = "/api/interviewers"; 
  Promise.all([
    axios.get(daysUrl),
    axios.get(appointmentsUrl),
    axios.get(interviewersUrl)
  ]).then((all) => {
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
  });
  
}, []);

// book/edit the appointment
function bookInterview(id, interview) {

  const interviewList = state.appointments[id];

  //if interview is just created decrease the amount of spots
  if(!interviewList.interview)
  for(let element of state.days) {
    if(element.name === state.day) {
      element.spots--;
    }
  }

  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  
  //send the new appointment and update the state with the new appointment
  return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(() => setState({
      ...state,
      appointments
    }));
};

// cancel the interview
function cancelInterview(id) {

  for(let element of state.days) {
    if(element.name === state.day) {
      element.spots++;
    }
  }

  const appointment = {
    ...state.appointments[id],
    interview: null
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const days = state.days;

  //send "delete" request to the api server and update the state
  return axios.delete(`http://localhost:8001/api/appointments/${id}`)
  .then(() => setState({...state, appointments, days}));
}
return { state, setDay, bookInterview, cancelInterview }
}