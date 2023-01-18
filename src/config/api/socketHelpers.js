import io from "socket.io-client";
import React, { useState } from "react";
const SocketContext = React.createContext(null);

export const SocketContextProvider = (props) => {
  const socket = io.connect("https://api.toethiotravel.com");
  const contextValue = {
    socket: socket,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
