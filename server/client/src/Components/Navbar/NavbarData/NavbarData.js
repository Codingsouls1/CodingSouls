import Home from "../../../Pages/Home"
import Team from "../../../Pages/Team/Team"
import Events from "../../../Pages/Event/Events"
import Login from "../../../Admin/Login/Login"
import EventRegi from "../../../Pages/Registration/EventReg"
import MemberRegi from "../../../Pages/Registration/Member"
import EventData from "../../../Admin/AdminMain/EventData"
import MemberData from "../../../Admin/AdminMain/MemberData"
import AdminHome from "../../../Admin/AdminMain/AdminHome"
import Archive from "../../../Pages/Archive/Archive"
import Guidelines from "../../../Pages/Guidelines"
export const NavbarData = [
    {
        name: "Home",
        path: "/",
        element: <Home/>,
    },
    {
        name:"Events",
        path:"/events",
        element:<Events/>
    },
    {
        name:"Team",
        path:"/team",
        element:<Team/>
    },
    {
        name:"Registrations",
        path:"/register",
        Dropdown:[
            {
                name:"Event Registration",
                path:"/register/eventregister",
                element:<EventRegi/>
            },
            {
                name:"Member Registration",
                path:"/register/memberregister",
                element:<MemberRegi/>
            },
        ]

    },{
        name:"Guidelines",
        path:"/guidelines",
        element:<Guidelines/>
    },
    {
        name:"Archive",
        path:"/archive",
        element:<Archive/>

    },
    {
        name:"Admin",
        path:"/admin",
        Dropdown:[
            {
                name:"AdminHome",
                path:"/admin/adminhome",
                element:<AdminHome/>

            },
            {
                name:"EventDetail",
                path:"/admin/eventdata",
                element:<EventData/>

            },
            {
                name:"MemberDetail",
                path:"/admin/memberdata",
                element:<MemberData/>

            },
          {
                name:"Login",
                path:"/admin/login",
                element:<Login/>

          }

        ]
    },
    
]