const CustomerReducer = (state, action) =>{
    switch(action.type){
        case "SET_CUSTOMER":
            return{
                ...state,
                customers: action.payload,
            }
    }
}

export default CustomerReducer;