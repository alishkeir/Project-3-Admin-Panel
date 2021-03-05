import React, { useState } from "react";
import "../sidebar.css";
import { RiDashboardLine } from "react-icons/ri";
import { TiGroup } from "react-icons/ti";
import { GiBlackBook, GiTeacher } from "react-icons/gi";

import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { Route } from "react-router-dom";

const Sidebar = () => {
  const [istoggled, setIsToggled] = useState(false);
  // const [navOpener, setNavOpener] = useState(false);
  // const windowSizing = () => {
  // 	if (window.innerWidth < 1000) {
  // 		setIsToggled(false);
  // 		setNavOpener(true);
  // 	} else {
  // 		setIsToggled(true);
  // 		setNavOpener(false);
  // 	}
  // };
  // useEffect(() => {
  // 	window.addEventListener("resize", windowSizing);
  // 	windowSizing();
  // 	return () => {
  // 		window.removeEventListener("resize", windowSizing);
  // 	};
  // }, []);
  return (
    <Route 
      render={({ location, history }) => (
        <>
          <SideNav style={{backgroundColor:'#005da3'}}
            expanded={istoggled}
            onToggle={() => {
              setIsToggled(!istoggled);
            }}
            onSelect={(selected) => {
              const to = "/" + selected;
              if (location.pathname !== to) {
                history.push(to);
              }
            }}
          >
            <SideNav.Toggle />
            {/* {navOpener ? <SideNav.Toggle /> : <div className="toggleHolder" />} */}
            <SideNav.Nav defaultSelected="home">
              <NavItem eventKey="">
                <NavIcon>
                  <RiDashboardLine size="2rem" />
                </NavIcon>
                <NavText>Dashboard</NavText>
              </NavItem>
              <NavItem eventKey="admins">
                <NavIcon>
                  <GiTeacher size="2rem" />
                </NavIcon>
                <NavText>Admins</NavText>
              </NavItem>
              <NavItem eventKey="students">
                <NavIcon>
                  <TiGroup size="2rem" />
                </NavIcon>
                <NavText>Students</NavText>
              </NavItem>
              <NavItem eventKey="schools">
                <NavIcon>
                  <GiBlackBook fontSize="1.75rem" />
                </NavIcon>
                <NavText>Schools</NavText>
              </NavItem>
            </SideNav.Nav>
          </SideNav>
        </>
      )}
    />
  );
};

export default Sidebar;
