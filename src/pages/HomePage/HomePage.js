import React, { useState } from 'react';
import "./HomePage.css";
import image from '../../assets/background-image.jpg';

import LandingPageCardComponent from '../../components/LandingPageCardComponent/LandingPageCardComponent';
import LoginComponent from '../../components/LoginComponent/LoginComponent';
export default function Homepage() {


    async function login(e) {
        e.preventDefault();

        // try {
        //     const activeUser = await UserModel.login(email, pwd);
        //     onLogin(activeUser);
        // } catch (error) {
        //     console.error('Error while logging in user', error);
        //     setShowInvalidLogin(true);
        // }
    }

    return (
        <div className="p-home">
            <div className="p-home-header">
                <div className="p-home-title col-sm-6 col-md-8">
                    <h1 className="display-4">Homeowner Association Management System</h1>
                    <h3>All you need to handle your building </h3>
                </div>
                <LoginComponent login={(e)=>login(e)}/>
            </div>
            <div className="p-home-bg-img">
                <img  className="p-home-img" src={image}></img>
            </div>
            <div className="p-home-footer">
                <LandingPageCardComponent/>
            </div>
        </div>
    )
}
