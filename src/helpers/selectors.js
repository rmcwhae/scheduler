

// const getAppointmentsForDay = function(stateArg, dayArg) {
export function getAppointmentsForDay(state, day) {
  const thisDay = state.days.find(weekday => weekday.name === day);
  // console.log('thisDay.appointments', thisDay.appointments);
  if (!thisDay) {
    return []
  }
  let appointmentsOnThisDay = []
  thisDay.appointments.forEach(appointmentID => {
    const appmtObject = state.appointments[appointmentID];
    appmtObject && appointmentsOnThisDay.push(appmtObject);
  });
  return appointmentsOnThisDay;
};

// console.log(getAppointmentsForDay(state, "Tuesday"));