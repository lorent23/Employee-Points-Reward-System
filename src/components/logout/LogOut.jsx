import React from "react";
import {logout} from "../../store/slices/authSlice";
import {useDispatch} from 'react-redux'

const LogOut = () => {

    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(logout())
    }

    return (
        <div>
            <p onClick={onLogout} type="submit" className="block cursor-pointer">
                Sign Out
            </p>
        </div>
    )

};

export default LogOut;
