import { useState, useMemo, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import UserContext from "./components/UserContext";
import Protected from "./components/Protected";
import cookie from "js-cookie";
import axios from "axios";
import jwt from "jsonwebtoken";
import AllStudents from "./pages/students/AllStudents";
import AddStudent from "./pages/students/AddStudent";
import UpdateStudent from "./pages/students/UpdateStudent";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import styled from "styled-components";
import NavBar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import ViewStudent from "./pages/students/ViewStudent";

const Main = styled.main`
  width: 80%;
  margin: 5rem auto 0;
  padding-left: 4rem;
`;

const App = () => {
  const [token, setToken] = useState(null);
  const providerValue = useMemo(() => ({ token, setToken }), [token, setToken]);
  axios.defaults.headers.common["Authorization"] = "bearer " + token;
  const jwtSecret =
    "D1QlBh7afAFGekXLqhIKBNfMYXV57dSDJfQWJ0mnFlRK5jJQQd54VOoVdH2TjDJi";

  useEffect(() => {
    if (cookie.get("token")) {
      setToken(cookie.get("token"));
    }
  }, []);

  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        cookie.remove("token");
        setToken(null);
      } else {
        if (decoded.iss !== "http://localhost:8000/api/admin/login") {
          cookie.remove("token");
          setToken(null);
        }
      }
    });
  }

  return (
    <UserContext.Provider value={providerValue}>
      <Router>
        <Switch>
          <Route
            exact={true}
            // exact
            path="/login"
            component={(props) => <LoginPage isAuth={token} />}
          />
          <Main>
            <Protected
              isAuth={token}
              exact={true}
              path="/"
              component={(props) => <HomePage />}
            />

            <Protected
              isAuth={token}
              exact={true}
              path="/students"
              component={(props) => <AllStudents />}
            />

            <Protected
              isAuth={token}
              exact={true}
              path="/students/add"
              component={(props) => <AddStudent />}
            />
            <Protected
              isAuth={token}
              exact={true}
              path="/students/edit/:id"
              component={(props) => <UpdateStudent />}
            />

            <Protected
              isAuth={token}
              exact={true}
              path="/students/view/:id"
              component={(props) => <ViewStudent {...props} />}
            />

            <NavBar />
            <Sidebar />
            <Redirect from="/*" to="/" />
          </Main>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
