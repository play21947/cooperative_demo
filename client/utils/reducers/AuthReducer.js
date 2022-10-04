const initialState = {
    token: '',
    loaded: false,
    pinned: false
}


const AuthReducer=(state = initialState, action)=>{
    if(action.type === "LOGIN"){
        return {
            ...state,
            token: action.payload
        }
    }else if(action.type === "LOAD"){
        return{
            token: action.payload,
            loaded: true
        }
    }else if(action.type === 'LOGOUT'){
        return{
            ...state,
            pinned: false,
            token: ''
        }
    }else if(action.type === 'PINNED'){
        return{
            ...state,
            pinned: true
        }
    }else{
        return state
    }
}


export default AuthReducer