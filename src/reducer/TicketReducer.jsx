const FlightReducer = (state, action) => {
    switch (action.type) {
        case "SET_TICKETS":
            return{
                ...state,
                tickets: action.payload,
            }
        case "MIN_PRICE" :
            return{
                ...state,
                inputMin: action.payload,
            }
        case "MAX_PRICE":
            return{
                ...state,
                inputMax: action.payload,
            }
        default :
            return state;
    }
}

export default FlightReducer