import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

function Userlist() {
  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png"
          />
        </ListItemAvatar>
        <ListItemText primary="Sonahang Rai" secondary="Jan 9, 2014" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src="https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807__340.png"
          />
        </ListItemAvatar>
        <ListItemText primary="Anisha kate" secondary="Jan 9, 2014" />
      </ListItem>
    </List>
  );
}

export default Userlist;
