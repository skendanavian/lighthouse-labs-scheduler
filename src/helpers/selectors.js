export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;

  if (!days.length) {
    return [];
  }

  const apptId = days.find((e) => e.name === day);
  if (!apptId) {
    return [];
  }
  const apptNums = apptId.appointments;

  if (apptId === undefined || !apptNums.length) {
    return [];
  }

  const appts = apptNums.map((id) => {
    return appointments[id];
  });

  return appts;
}
