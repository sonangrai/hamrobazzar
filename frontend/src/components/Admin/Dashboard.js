import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Title } from "react-admin";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Userlist from "./Users/Userlist";
import { Currentuser } from "./Users/Currentuser";
import { TotalAds, TotalUsers, AdsReview } from "./Dashdata";

export default () => (
  <Grid container spacing={3}>
    <Title title="Welcome to the Admin Dashboard" />
    <TotalAds />
    <TotalUsers />
    <AdsReview />
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
