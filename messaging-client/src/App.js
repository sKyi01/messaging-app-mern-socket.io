import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";


function App() {
  return (
    <ChakraProvider>
    
        <Routes>
        <Route path="/" element={<Homepage />} />
          {/* Add more routes if needed */}
          <Route path="/chats" element={<ChatPage/>} />
        </Routes>
   
    </ChakraProvider>
  );
}

export default App;
