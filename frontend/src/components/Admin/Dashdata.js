import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

export const TotalAds = () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": `${token}`,
    },
  };
  const [cnt, setcnt] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:4000/api/ads", config).then((res) => {
      const a = res.data.length;
      setcnt(a);
    });
  }, []);
  return (
    <Grid item xs={3}>
      <Card>
        <CardContent>
          <Typography variant="h2" component="h2">
            <i className="fas fa-ad"></i>
          </Typography>
          <Typography variant="h5" component="h5">
            Total Ads
          </Typography>
          <Typography variant="h2" component="h2">
            {cnt}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export const TotalUsers = () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": `${token}`,
    },
  };
  const [cnt, setcnt] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:4000/api/users", config).then((res) => {
      const a = res.data.length;
      setcnt(a);
    });
  }, []);
  return (
    <Grid item xs={3}>
      <Card>
        <CardContent>
          <Typography variant="h2" component="h2">
            <i className="fas fa-users"></i>
          </Typography>
          <Typography variant="h5" component="h5">
            Total Users
          </Typography>
          <Typography variant="h2" component="h2">
            {cnt}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export const AdsReview = () => {
  var i = 1;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": `${token}`,
    },
  };
  const [cnt, setcnt] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:4000/api/ads", config).then((res) => {
      const a = res.data;
      setcnt(a);
    });
  }, []);
  return (
    <Grid item xs={3}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h4">
            Ads to Review
          </Typography>
          <List component="nav" aria-label="secondary mailbox folders">
            {cnt.map((data) =>
              data.adstatus === "unapproved" ? (
                <Link to={"/ads/" + data._id}>
                  <ListItem button key={data._id}>
                    <span className="counter">{i++}</span>
                    {data.title}
                  </ListItem>
                </Link>
              ) : null
            )}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};

export const Newuser = () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": `${token}`,
    },
  };
  const [cnt, setcnt] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:4000/api/users", config).then((res) => {
      const a = res.data;
      setcnt(a);
    });
  }, []);
  return (
    <Grid item xs={3}>
      <Card>
        <CardContent>
          <Typography component="h6">New Users</Typography>
          <List>
            {cnt.map((data) =>
              data.usertype === "user" ? (
                <ListItem key={data._id}>
                  <ListItemAvatar>
                    <Avatar alt={data.avatar} src={data.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={data.username}
                    secondary={data.email}
                  />
                </ListItem>
              ) : null
            )}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};
