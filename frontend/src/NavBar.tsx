import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
        const [userData, setUserData] = useState({});
        console.log(userData)

        const getUser = async () => {
            try {
                const response = await fetch("http://localhost:6005/login/success", {
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data.user);
                } else {
                    console.log("Failed to fetch user data");
                }
            } catch (error) {
                console.error(error);
            }
        };


        useEffect(() => {
            getUser();
        }, []);

    const handleLogout = ()=>{
        window.location.href= "http://localhost:6005/logout";
    }

    return (
        <div>
            <Link to="/"><li>Home</li></Link>
            {Object.keys(userData).length > 0 ? (
                <>
                <li>{userData.displayName}</li>
                <li>{userData.email}</li>
                    <Link to="/dashboard"><li>Dashboard</li></Link>
                    <button onClick={handleLogout} >Logout</button>
                    <img src={userData.image} alt="User Profile" />
                </>
            ) : (
                <Link to="/login"><li>Login</li></Link>
            )}
        </div>
    );
};

export default NavBar;
