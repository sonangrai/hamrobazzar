import React, { useState, useEffect } from "react";
import Axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

export const Currentuser = () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": `${token}`,
    },
  };
  const [user, setuser] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:4000/api/auth", config).then((res) => {
      const a = res.data;
      setuser(a);
    });
  }, []);

  return (
    <div className="flexer">
      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      <Typography>Name: {user.username}</Typography>
      <Typography>Email: {user.email}</Typography>
    </div>
  );
};
