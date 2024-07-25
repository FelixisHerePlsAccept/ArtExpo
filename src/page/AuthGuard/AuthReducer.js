const AuthReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN":
            return {
                currentUser: action.payload, // expecting user data (JSON)
            }
        case "LOGOUT":
            return {
                currentUser: null,
            }
        default:
            return state
    }
}

export default AuthReducer;