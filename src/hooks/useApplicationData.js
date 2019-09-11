import {
  useReducer,
  useEffect
} from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData(props) {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({
    type: SET_DAY,
    day
  });

  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    socket.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      if (eventData.type === SET_INTERVIEW) {
        dispatch({
          type: SET_INTERVIEW,
          id: eventData.id,
          interview: eventData.interview
        });
      }
    }

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/interviewers'),
      axios.get('/api/appointments')
    ]).then((all) => {
      const days = all[0].data;
      const interviewers = all[1].data;
      const appointments = all[2].data;
      dispatch({
        type: SET_APPLICATION_DATA,
        days: days,
        interviewers: interviewers,
        appointments: appointments
      });
    });
  }, []);

  function bookInterview(id, interview) {
    return axios.put('/api/appointments/' + id, {
        interview
      })
      .then(response => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview
        });
      });
  }

  function cancelInterview(id) {
    return axios.delete('/api/appointments/' + id)
      .then(response => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview: null
        });
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}