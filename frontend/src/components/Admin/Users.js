import React from "react";
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
} from "react-admin";

const PostTitle = ({ record }) => {
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

export const UserList = (props) => (
  <List {...props} title="List of Ads">
    <Datagrid>
      <TextField source="id" />
      <TextField source="usertype" />
      <TextField source="username" />
      <TextField source="email" />
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

export const UserShow = (props) => (
  <Show {...props} title={<PostTitle />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="email" />
    </SimpleShowLayout>
  </Show>
);
