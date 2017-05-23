
const initialState: EntitiesState = {
    reportedCrimes: {}
};

export default function entities(state = initialState, action : any) {
    if (action.payload && action.payload.entities) {
        return { ...state, ...action.payload.entities };
    }
    return state;
};
