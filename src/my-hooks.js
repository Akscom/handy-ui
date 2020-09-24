// import { useReducer } from "react"
import React from 'react'
const { useReducer } = React

function middleWareLog(store, lastState, nextState){
    console.log('--->lastState', lastState)
    console.log('--->nextState', nextState)
}

{

    const Provider = props =>{
        const [state, dispatch] = useReducer(middleWareReducer, initialState)
        if(!store.dispatch){
            store.dispatch = async function(){
                //堆用户dispatch => useReducer(dispatch)
                dispatch(action)
            }
        }
        return <YdContext.Provider {...props} value={state}></YdContext.Provider>
    }

    return {
        Provider,
        store
    }
}