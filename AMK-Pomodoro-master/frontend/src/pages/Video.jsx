import { Box, Typography } from "@mui/material";
 import { reducer as voxeetReducer } from "@voxeet/react-components";
 import thunkMidleware from "redux-thunk";
 import { combineReducers, createStore, applyMiddleware } from "redux";
 import { ConferenceRoom, VoxeetProvider } from "@voxeet/react-components";
 import "@voxeet/react-components/dist/voxeet-react-components.css";
 import React from "react";

 function Video() {
   const settings = {
     consumerKey: 'poArKhlY7Vv9FUPM3Iorrw==',
     consumerSecret: '9RonGCXmumcdMl9JrbwBwvcil70qas0VBhNDLEsLTIU=',
     conferenceAlias: 'Welcome-to-Dolby-Interactivity'

   };

 const reducers = combineReducers({
        voxeet: voxeetReducer,
  });

  const configureStore = () =>
     createStore(reducers, applyMiddleware(thunkMidleware));

   return (
    <Box>
       <VoxeetProvider store={configureStore()}>
         <ConferenceRoom
           autoJoin
           consumerKey={settings.consumerKey}
           consumerSecret={settings.consumerSecret}
           conferenceAlias={settings.conferenceAlias}
         />
       </VoxeetProvider>   
     </Box>
   );
 }
export default Video;
