const initialState = {
    global_data: null,
    country_data: null,
    loadedGlobal: false,
    loadedCountry: false,
    searchValue: null,
    totalGraphLoaded: false,
    listLoaded: false,
    list: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADED_GLOBAL_TRUE':
            return {
                ...state,
                loadedGlobal: true
            }
        case 'SET_GLOBAL':
            return {
                ...state,
                global_data: action.value
            }
        case 'LOADED_COUNTRY_TRUE':
            return {
                ...state,
                loadedCountry: true
            }
        case 'LOADED_COUNTRY_FALSE':
            return {
                ...state,
                loadedCountry: false
            }
        case 'SET_COUNTRY':
            return {
                ...state,
                country_data: action.value
            }
        case 'SEARCH':
            return {
                ...state,
                searchValue: action.value
            }
        case 'TOTAL_GRAPH_LOADED':
            return {
                ...state,
                totalGraphLoaded: true
            }
        case 'LIST_LOADED':
            return {
                ...state,
                listLoaded: true
            }
        case 'SET_LIST':
            return {
                ...state,
                list: action.value
            }

        default:
            return state;
    }
}

export default reducer;