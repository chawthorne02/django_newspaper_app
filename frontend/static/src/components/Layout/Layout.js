import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function Layout({ superState, setSuperState, logoutUser }) {
  return (
    <>
      <Header superState={superState} setSuperState={setSuperState} logoutUser={logoutUser} />
      <Outlet />   
      <Footer />
    </>
  );
}

export default Layout;


// An <Outlet> should be used in parent route elements to render their child route elements. This allows nested UI to show up when child routes are rendered. If the parent route matched exactly, it will render a child index route or nothing if there is no index route.