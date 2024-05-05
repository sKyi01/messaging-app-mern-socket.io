import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Homepage from "./pages/Homepage";


function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Homepage />} />
          {/* Add more routes if needed */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
