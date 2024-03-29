import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const Forgot = Loadable(lazy(() => import('views/pages/authentication/authentication3/Forgot')));
const ResetPassword = Loadable(lazy(() => import('views/pages/authentication/authentication3/ResetPassword')));


// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login/',
      element: <AuthLogin3 />
    },
    {
      path: 'register/',
      element: <AuthRegister3 />
    },
    {
      path: 'forgot-password/',
      element: <Forgot/>
    },
    {
      path: 'reset-password/',
      element: <ResetPassword/>
    }

  ]
};

export default AuthenticationRoutes;
