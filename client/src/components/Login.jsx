import { Link ,useNavigate } from "react-router-dom";
import Logo from "../assets/FYJLogo.png";
import React, { useState } from "react";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState(""); 

  const nav=useNavigate();

  const logincheck = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const jsonData = await response.json();
      if (jsonData.token) {
        localStorage.setItem("token", jsonData.token);
        setRedirect(true);
      }
      if(jsonData.success==true)
      {
        window.alert("USER LOGIN SUCCESSFUL");
        nav("/addJob");
      }
      else if(jsonData.success==false)
      {
        document.getElementById('head3').innerText="USER IS NOT VALID. TRY AGAIN";
      }
      console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[83vh]">
      <Card color="transparent" shadow={true} className="p-8 items-center">
        <Typography variant="h4" color="blue-gray">
          Login To
        </Typography>
        <img src={Logo} alt="Logo" className="w-44" />
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"  onSubmit={logincheck}>
          <div className="mb-4 flex flex-col gap-6">
             <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
              label="Email"
            />
            <Input
              value={password}
              onChange={(e) => setPassowrd(e.target.value)}
              type="password"
              size="lg"
              label="Password"
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?
            <Link
              to={"/register"}
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Register
            </Link>
          </Typography>
        </form>
        <h3 id='head3' style={{color:'red'}}></h3>
      </Card>
    </div>
  );
};

export default Login;      
