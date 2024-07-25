import { Navigate, useRoutes } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../page/AuthGuard/AuthProvider";
import {
    MainLayout,
    MainAuthLayout,
    Login,
    Signup,
    Home,
    Page404,
} from './elements'

export default function Router() {

    const { currentUser } = useContext(AuthContext)

    const LegitUserPage = ({ children }) => {
        return currentUser ? children : <Navigate to='/auth/login' replace />
    }

    return useRoutes ([
        {
            path:'',
            element: <Navigate to="/mainpage/home" replace />
        },
        {
            path: 'auth',
            element: <MainAuthLayout />,
            children: [
                {path: '', element: <Navigate to="/auth/login" replace />},
                {path: 'login', element: <Login />},
                {path: 'signup', element: <Signup />},
            ]
        },
        {
            path: '*',
            element: <Page404 />
        },
        {
            path: '/mainpage',
            element: (
                <LegitUserPage>
                    <MainLayout />
                </LegitUserPage>
            ),
            children: [
                {path: '', element: <Navigate to="/mainpage/home" replace />},
                {path: '*', element: <Page404 />},
                {path: 'home', element: <Home />},
            ]
        }
    ])
}
