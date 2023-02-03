import Context from "./Context.js"
import { useState } from "react"

export default function ContextState(props){
    const [num,setNum]=useState(1);
    return (
        <Context.Provider value={{num,setNum}}>
            {props.children}
        </Context.Provider>
    )
}