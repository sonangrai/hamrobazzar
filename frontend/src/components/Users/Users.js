import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Axios from "axios";
import {
  List,
  Datagrid,
  TextField,
  PasswordInput,
  Edit,
  SimpleShowLayout,
  TextInput,
  SelectInput,
  required,
  Create,
  Show,
  SimpleForm,
  choices,
  email,
  ShowButton,
  EditButton,
  ImageField,
} from "react-admin";

const PostTitle = ({ record }) => {
  return <span>Post {record ? `"${record.username}"` : ""}</span>;
};

export const UserList = (props) => (
  <List {...props} title="List of Users" bulkActionButtons={false}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="usertype" />
      <TextField source="email" />
      <ImageField source="avatar" title="Avatar" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);

export const UserEdit = (props) => (
  <Edit {...props} undoable={false} title={<PostTitle />}>
    <SimpleForm redirect="show">
      <TextInput source="username" validate={required()} />
      <SelectInput
        label="User Type"
        source="usertype"
        choices={[
          { id: "admin", name: "Admin" },
          { id: "user", name: "User" },
        ]}
        validate={validateUser}
      />
      <TextInput source="email" validate={(required(), validateEmail)} />
    </SimpleForm>
  </Edit>
);

const validateUser = choices(["admin", "user"], "Must select one");
const validateEmail = email();

export const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="username" validate={required()} />
      <SelectInput
        label="User Type"
        source="adstatus"
        choices={[
          { id: "admin", name: "Admin" },
          { id: "user", name: "User" },
        ]}
        validate={validateUser}
      />
      <TextInput source="email" validate={(required(), validateEmail)} />
      <PasswordInput source="password" validate={required()} />
    </SimpleForm>
  </Create>
);

const useStyles = makeStyles({
  btit: {
    fontSize: "24px",
  },
  ftit: {
    textTransform: "capitalize",
    fontSize: "16px",
    fontWeight: "400",
  },
});

function Profile(source) {
  const classes = useStyles();
  var id = source.record._id;
  const [datas, setdatas] = useState([]);
  useEffect(() => {
    Axios.get(`http://localhost:4000/api/profile/${id}`).then((res) => {
      const a = res.data;
      if (res.status !== 200) {
        setdatas(null);
      } else {
        setdatas(a);
      }
    });
  }, []);
  return (
    <Card>
      {datas.length === 0 ? (
        <h3>No Profile</h3>
      ) : (
        <CardContent>
          <h1 className={classes.btit}>User Profile</h1>
          <h4 className={classes.ftit}>Full Name: {datas.fullname}</h4>
          <span>{datas.phone}</span>
          <span>{datas.city}</span>
          <span>{datas.area}</span>
        </CardContent>
      )}
    </Card>
  );
}

export const UserShow = (props) => (
  <Show {...props} title={<PostTitle />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="email" />
      <Profile source="id" />
    </SimpleShowLayout>
  </Show>
);
