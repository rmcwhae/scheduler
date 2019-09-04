import React, { useState, useEffect } from "react";

import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "components/DayList";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import axios from "axios";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/interviewers'),
      axios.get('/api/appointments')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, interviewers: all[1].data, appointments: all[2].data }));
    });
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
  const interviewers = getInterviewersForDay(state, state.day);
  
  return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
       <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
