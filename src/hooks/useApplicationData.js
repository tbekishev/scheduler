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

useEffect(() => {
  Promise.all([
    axios.get("http://localhost:8001/api/days"),
    axios.get("http://localhost:8001/api/appointments"),
    axios.get("http://localhost:8001/api/interviewers")
  ]).then((all) => {
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
  });
  
}, []);

function bookInterview(id, interview) {

  const interviewList = state.appointments[id];

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

  setState({
    ...state,
    appointments
  });
  return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview});   
};

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

  setState({...state, appointments, days});

  return axios.delete(`http://localhost:8001/api/appointments/${id}`);
}
return { state, setDay, bookInterview, cancelInterview }
}