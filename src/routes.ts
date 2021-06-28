import Account from "./components/Accounts";
import Login from "./components/Login";
import Register from "./components/Register";

interface IRoute {
    path: string
    Component: any
}
export const routes: Array<IRoute> = [
    { path: "/register", Component: Register },
    { path: "/", Component: Login },
    { path: "/login", Component: Login },
    { path: "/accounts", Component: Account }
]