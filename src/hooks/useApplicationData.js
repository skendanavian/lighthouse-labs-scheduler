import { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    const dailyAppts = getAppointmentsForDay(state, state.day);
    const emptySpots = dailyAppts.filter((appt) => !appt.interview);
    const dayObj = state.days.map((day) => {
      if (day.name === state.day) {
        day.spots = emptySpots.length;
      }
      return day;
    });
    setState((prev) => ({ ...prev, days: dayObj }));
  }, [state.appointments]);

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("api/days")),
      Promise.resolve(axios.get("api/appointments")),
      Promise.resolve(axios.get("api/interviewers")),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`api/appointments/${id}`, appointments[id]).then(() => {
      setState({ ...state, appointments });
    });
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
