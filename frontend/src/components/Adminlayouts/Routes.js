import React from "react";
import "../../App.css";
import { Admin, Resource } from "react-admin";
import { AdsList, AdsCreate } from "./Ads";
import { UserList } from "./Users";
import authProvider from "./authProvider";
import AddToHomeScreenIcon from "@material-ui/icons/AddToHomeScreen";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import restProvider from "./dataprovider";

const Routes = () => {
  return (
    <Admin authProvider={authProvider} dataProvider={restProvider}>
      <Resource
        name="ads"
        create={AdsCreate}
        list={AdsList}
        icon={AddToHomeScreenIcon}
      />
      <Resource name="users" list={UserList} icon={PeopleAltIcon} />
    </Admin>
  );
};

export default Routes;
