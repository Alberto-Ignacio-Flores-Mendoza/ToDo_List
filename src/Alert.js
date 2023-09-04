import React, {useEffect} from 'react';

const Alert = ({type, msg, removeAlert, list}) => {

    useEffect(()=>{
        const timeout=setTimeout(()=>{
            removeAlert();
        }, 3000)
        return ()=> clearTimeout(timeout)
    }, [list])//everytime list changes we get this effect  

    return(
        <p className={`alert alert-${type}`}>{msg}</p>
    );
}
export default Alert;