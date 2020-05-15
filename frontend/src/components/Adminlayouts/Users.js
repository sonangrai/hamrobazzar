import React from "react";
import { List, Datagrid, TextField } from "react-admin";

export const UserList = (props) => (
  <List {...props} title="List of Ads">
    <Datagrid>
      <TextField source="id" />
      <TextField source="usertype" />
      <TextField source="username" />
      <TextField source="email" />
    </Datagrid>
  </List>
);
