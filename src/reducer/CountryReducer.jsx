const CountryReducer = (state, action) => {
    switch(action.type){
        case'FETCH_COUNTRY':
            return{
                ...state,
                countrys: action.payload,
            }
    }
}

export default CountryReducer;