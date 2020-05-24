import React from "react";
import "./App.css";
import { Admin, Resource } from "react-admin";
import { AdsList, AdsCreate, AdsEdit, AdsShow } from "./components/Ads/Ads";
import {
  UserList,
  UserCreate,
  UserEdit,
  UserShow,
} from "./components/Users/Users";
import authProvider from "./components/Utils/authProvider";
import AddToHomeScreenIcon from "@material-ui/icons/AddToHomeScreen";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import restProvider from "./components/Utils/dataprovider";
import Dashboard from "./components/Admin/Dashboard";

const Routes = () => {
  return (
    <Admin
      dashboard={Dashboard}
      authProvider={authProvider}
      dataProvider={restProvider}
    >
      <Resource
        name="ads"
        create={AdsCreate}
        list={AdsList}
        edit={AdsEdit}
        show={AdsShow}
        icon={AddToHomeScreenIcon}
      />
      <Resource
        name="users"
        create={UserCreate}
        list={UserList}
        edit={UserEdit}
        show={UserShow}
        icon={PeopleAltIcon}
      />
    </Admin>
  );
};

export default Routes;
