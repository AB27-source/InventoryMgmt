import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Layout from "./HOCS/Layout";
import Signup from "./containers/Signup";
import Activate from "./containers/Activate";
import ResetPassword from "./containers/ResetPassword";
import ResetConfirm from "./containers/ResetConfirm";

import {NextUIProvider} from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <Router>
          {/* <Layout> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/password/reset/confirm/:uid/:token" element={<ResetConfirm />} />
            <Route path="/activate/:uid/:token" element={<Activate />} />
            <Route path="/home" element={<Layout><Home /></Layout>} />
          </Routes>
          {/* </Layout> */}
        </Router>
      </main>
      </NextUIProvider>
    </Provider>
  );
};


export default App;
