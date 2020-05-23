import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Axios from "axios";
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
  Filter,
  ReferenceInput,
} from "react-admin";

const validateAdStatus = choices(["approved", "unapproved"], "Must select one");
const validateNegotaition = choices(["yes", "no"], "Must select one");

const PostTitle = ({ record }) => {
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <ReferenceInput label="Ads" source="id" reference="ads" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);

export const AdsList = (props) => (
  <List
    {...props}
    title="List of Ads"
    bulkActionButtons={false}
    filters={<PostFilter />}
  >
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

function Gallery(source) {
  var id = source.record._id;
  const [img, setimg] = useState([]);
  useEffect(() => {
    Axios.get(`http://localhost:4000/api/gallery/${id}`).then((res) => {
      const a = res.data;
      if (res.status !== 200) {
        setimg(null);
      } else {
        setimg(a);
      }
    });
  }, []);
  return (
    <Card>
      {img.length === 0 ? (
        <h3>No Gallery</h3>
      ) : (
        <CardContent>
          <div className="card-columns">
            {img.map((image) => (
              <div className="card">
                <img key={image._id} src={"/uploads/img/" + image.photo} />
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

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
      <Gallery source="id" />
    </SimpleShowLayout>
  </Show>
);
