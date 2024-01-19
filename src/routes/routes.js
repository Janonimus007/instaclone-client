//Pages
import Error404 from "../pages/Error404/Error404"
import Home from "../pages/Home/Home"
import User from "../pages/User"


const routes = [
    {
        path: "/",
        component: Home,
        exact: true
    },
    {
        path: "/user",
        component: User,
        exact: true
    },
    {
        component: Error404,
    },
]


export default routes;