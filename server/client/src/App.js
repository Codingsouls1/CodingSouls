import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar/Navbar.js"
import "./App.css"
import { NavbarData } from "./Components/Navbar/NavbarData/NavbarData";
import { Route, Routes } from "react-router-dom"
import Footer from "./Components/Footer/Footer"
import { createContext, useReducer } from "react"
import { initialstate, reducer } from "./Reducer/useReducer";
import Logout from "./Admin/Logout/Logout.js";
import Contact from "../src/Pages/Contact/Contact"
import Error from "../src/Pages/Error"
export const UserContext = createContext();
function App() {
  const [state, dispatch] = useReducer(reducer, initialstate)
  return (
    <>
      <div className="main">


        <UserContext.Provider value={{ state, dispatch }}>
          <Navbar />
          <Routes>
            {NavbarData.map((item, index) => {
              if (item.Dropdown) {
                return (
                  <Route path={item.path} key={index} element={item.element}>
                    {
                      item.Dropdown.map((item1, index) => {
                        return <Route path={item1.path} key={index} element={item1.element} />
                      })
                    }

                  </Route>
                )
              }
              return <Route path={item.path} key={index} element={item.element} />
            })
            }
            <Route path="/contact" element={<Contact/>}/>
            <Route path="admin/logout" element={<Logout/>} />
            <Route path="*" element={<Error/>}/>
          </Routes>
        </UserContext.Provider>
        <Footer />
      </div>
    </>
  );
}

export default App;
