export const SET_DAY = 'SET_DAY';
export const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
export const SET_INTERVIEW = 'SET_INTERVIEW';

export default function reducer(state, action) {
	switch (action.type) {
		case SET_DAY:
			return {
				...state,
				day: action.day
			};
		case SET_APPLICATION_DATA:
			return {
				...state,
				appointments: action.appointments,
				days: action.days,
				interviewers: action.interviewers
			};
		case SET_INTERVIEW: {
			const newAppoint = state['appointments'];
			const newDays = state.days.map((item) => {
				if (item.appointments.includes(action.id)) {
					if (!state.appointments[action.id].interview && action.interview) {
						// case 1: brand new appointment
						return {
							...item,
							spots: item.spots - 1
						};
					} else if (state.appointments[action.id].interview && !action.interview) {
						// case 2: deleting appointment
						return {
							...item,
							spots: item.spots + 1
						};
					} //implied case 3: editing appointment doesn't change newSpots
				}
				// Leave every other item unchanged
				return item;
			});
			newAppoint[action.id]['interview'] = action.interview; // set new interview
			return {
				...state,
				appointments: newAppoint,
				days: newDays
			};
		}
		default:
			throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
	}
}
