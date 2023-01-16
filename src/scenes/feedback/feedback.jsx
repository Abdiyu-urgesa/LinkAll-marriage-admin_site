import { Box, Avatar, Divider } from "@mui/material";
import Header from "../../components/Header";
import Typography from "@mui/material/Typography";

import { useEffect } from "react";
import { useState } from "react";
import { fetchUserFeedBacks } from "../../config/services/quizeService";
import { baseUrl } from "../../config/api/apiHelpers";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';


const AppFeedBack = () => {
  const [userFeedBacks, setUserFeedBacks] = useState([]);
 

  // functions
  useEffect(() => {
    fetchUserFeedBacks().then((res) => {
      console.log(res.data);
      if (res.success && res.data) {
        setUserFeedBacks(res.data);
      } else {
        console.log(res.error);
      }
    });
  }, []);


  return (
    <Box m="20px" sx={{
      overflow: "hidden",
      overflowY: "scroll",
    }}>
      <Header title="App FeedBacks" subtitle="Feedback From App Users" />
      <List marginY="40px" sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {
          userFeedBacks.map((feedBack) => {
            return (
              <Box>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={feedBack.created_by.code_name} src={`${baseUrl}/${feedBack.created_by.avatar}`} />
                </ListItemAvatar>
                <ListItemText
                  primary={feedBack.created_by.code_name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {feedBack.created_by.userId}
                      </Typography>
                      <Typography>
                {feedBack.feedback}
                </Typography>
                    </React.Fragment>
                  }
                />
                
              </ListItem>
              <Divider></Divider>
              </Box>
            )
          })
        }
      </List>

    </Box>
  );
};

export default AppFeedBack;
