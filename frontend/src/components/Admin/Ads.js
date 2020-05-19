import React from "react";
import {
  List,
  Datagrid,
  TextField,
  Create,
  Edit,
  EditButton,
  SimpleForm,
  TextInput,
  choices,
  required,
  SelectInput,
  Show,
  SimpleShowLayout,
  ShowButton,
} from "react-admin";

const validateAdStatus = choices(["approved", "unapproved"], "Must select one");
const validateNegotaition = choices(["yes", "no"], "Must select one");

const PostTitle = ({ record }) => {
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

export const AdsList = (props) => (
  <List {...props} title="List of Ads" bulkActionButtons={false}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="price" />
      <TextField source="title" />
      <TextField source="description" />
      <TextField source="adstatus" />
      <TextField source="condition" />
      <TextField source="pricenegotiable" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);

export const AdsEdit = (props) => (
  <Edit {...props} undoable={false} title={<PostTitle />}>
    <SimpleForm redirect="show">
      <TextInput disabled label="Id" source="id" />
      <TextInput source="title" validate={required()} />
      <SelectInput
        label="Ad Status"
        source="adstatus"
        choices={[
          { id: "approved", name: "Approved" },
          { id: "unapproved", name: "Unapproved" },
        ]}
      />
      <SelectInput
        label="Price Negotaible"
        source="pricenegotiable"
        choices={[
          { id: "yes", name: "Yes" },
          { id: "no", name: "No" },
        ]}
      />
      <TextInput source="description" stripTags validate={required()} />
      <TextInput source="price" validate={required()} />
      <TextInput source="condition" validate={required()} />
    </SimpleForm>
  </Edit>
);

export const AdsCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="title" validate={required()} />
      <SelectInput
        label="Ad Status"
        source="adstatus"
        choices={[
          { id: "approved", name: "Approved" },
          { id: "unapproved", name: "Unapproved" },
        ]}
        validate={validateAdStatus}
      />
      <SelectInput
        label="Price Negotaible"
        source="pricenegotiable"
        choices={[
          { id: "yes", name: "Yes" },
          { id: "no", name: "No" },
        ]}
        validate={validateNegotaition}
      />
      <TextInput source="description" validate={required()} />
      <TextInput source="price" validate={required()} />
      <TextInput source="condition" validate={required()} />
    </SimpleForm>
  </Create>
);

export const AdsShow = (props) => (
  <Show {...props} title={<PostTitle />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="price" />
      <TextField source="title" />
      <TextField source="description" />
      <TextField source="adstatus" />
      <TextField source="condition" />
      <TextField source="pricenegotiable" />
    </SimpleShowLayout>
  </Show>
);
