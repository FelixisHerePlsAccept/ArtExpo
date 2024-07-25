import { lazy, Suspense } from "react";

const FallBacker = (Component) => (props) => (
    <Suspense fallback = {<LoadingScreen />}>
        <Component {...props} />
    </Suspense>
)


// Layouts
export const MainAuthLayout = FallBacker(lazy(() => import('../page/Layout/MainAuthLayout')));
export const MainLayout = FallBacker(lazy(() => import('../page/Layout/MainLayout')));

// Children

// Auth
export const Login = FallBacker(lazy(() => import('../page/login')));
export const Signup = FallBacker(lazy(() => import('../page/signup')));

// Mainpage
export const Home = FallBacker(lazy(() => import('../page/Outlet/Home')));

//Not Found
export const Page404 = FallBacker(lazy(() => import('../page/Outlet/Page404')));

function LoadingScreen() {
    return (
        <div> Loading ... </div>
    )
}