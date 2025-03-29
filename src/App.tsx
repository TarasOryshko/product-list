import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ProductList from "./pages/ProductList";
import ProductView from "./pages/ProductView";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <CssBaseline />
        <Container>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductView />} />
          </Routes>
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
