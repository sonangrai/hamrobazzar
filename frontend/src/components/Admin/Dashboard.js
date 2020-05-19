import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Title } from "react-admin";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Userlist from "./Userlist";
import { Currentuser } from "./Currentuser";

export default () => (
  <Grid container spacing={3}>
    <Title title="Welcome to the Admin Dashboard" />
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
            1200
          </Typography>
        </CardContent>
      </Card>
    </Grid>
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
            105
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={3}>
      <Card>
        <CardContent>
          <Typography variant="h2" component="h2">
            <i className="fas fa-ad"></i>
          </Typography>
          <Typography variant="h5" component="h5">
            Recent Ads
          </Typography>
          <Typography variant="h2" component="h2">
            18
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={3}>
      <Card>
        <CardContent>
          <Typography variant="h2" component="h2">
            <i className="fas fa-user-plus"></i>
          </Typography>
          <Typography variant="h5" component="h5">
            Recent User
          </Typography>
          <Typography variant="h2" component="h2">
            1200
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={3}>
      <Card>
        <CardContent>
          <Typography component="h6">New Users</Typography>
          <Userlist />
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={3}>
      <Card>
        <CardContent>
          <Typography component="h5">Profile</Typography>
          <Currentuser />
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);
