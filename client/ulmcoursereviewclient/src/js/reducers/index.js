const initialState = {
    professors: [],
    courses: [],
    myreviews: [],
    loading: false,
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "UPDATE_PROFESSORS":
            return {
                ...state,
                professors: action.payload
            };
        case "UPDATE_COURSES":
            return {
                ...state,
                courses: action.payload
            };
        case "UPDATE_MYREVIEWS":
            return {
                ...state,
                myreviews: action.payload
            };
        case "LOADING":
            return {
                ...state,
                loading: true,
            }
        case "NOT_LOADING":
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}

export default rootReducer;