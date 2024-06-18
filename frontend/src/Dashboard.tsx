import React, {useState, useEffect} from 'react'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const navigate = useNavigate();

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
          navigate("*")
          
      }
  };


  useEffect(() => {
      getUser();
  }, []);
  return (

   
    <>
    <NavBar/>
    <div>Hey man how is life</div>
    </>
  )
}

export default Dashboard