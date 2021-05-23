import React, { useContext } from 'react'
import { Redirect } from 'react-router';
import ActiveUserContext from '../../shared/ActiveUserContext'
export default function DashboardPage() {
    const activeUser = useContext(ActiveUserContext);

    if(!activeUser){
       return <Redirect to='/'/>
    }
    return (
        <div>
            Dashboard
        </div>
    )
}
