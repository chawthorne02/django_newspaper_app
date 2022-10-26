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