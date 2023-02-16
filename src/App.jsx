//import { Routes, Route, Router } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,
          RouterProvider, } from 'react-router-dom';

import Login, { action as actionLogin } from './Components/Login/Login';
import Layout, { action as actionLogout, loader as loaderLayout} from './Components/Layout/Layout';
import Profile, { loader as profileLoader } from './Components/Profile/Profile';
import Users, { action as userAction, loader as userLoader } from './Components/Users/Users';
import UserProfile, { action as userProfileAction, loader as userProfileLoader }  from './Components/Users/UserProfile';
import UserProfileDelete, { action as userProfileDeleteAction, loader as userProfileDeleteLoader } from './Components/Users/UserProfileDelete';
import Students, { action as studentAction, loader as studentLoader } from './Components/Students/Students';
import StudentProfile, { action as studentProfileAction, loader as studentProfileLoader } from './Components/Students/StudentProfile';
import StudentProfileDelete, { action as studentProfileDeleteAction, loader as studentProfileDeleteLoader }  from './Components/Students/StudentProfileDelete';
import Signup, { action as signupAction, loader as signupLoader} from './Components/Signup/Signup';
import SignupUser, { action as signupUserAction, loader as signupUserLoader} from './Components/Signup/User/SignupUser';
import SignupTeacher, { action as signupTeacherAction, loader as signupTeacherLoader} from './Components/Signup/Teacher/SignupTeacher';
import SignupStudent, { action as signupStudentAction, loader as signupStudentLoader} from './Components/Signup/Student/SignupStudent';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import Index from './Components/Index/Index';

import ProtectedRoute, { loader as protecredRouteLoader }  from './Components/Auth/ProtecredRoute';


// Array of routes in router
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Login/>,
      errorElement: <ErrorPage/>,
      action: actionLogin,
      
    },
    {
      path: '/layout',
      element: <Layout/>,
      action: actionLogout,
      loader: loaderLayout,
      errorElement: <ErrorPage/>,
      children:
      [
        {
          element: <ProtectedRoute/>,
          errorElement: <ErrorPage/>,
          loader: protecredRouteLoader,
          children:
          [
            // This index path is the main path with no users selected. it will load a default page
            { index: true, element: <Index />}, 
            {
              path: '/layout/profile',
              element: <Profile />,
              loader: profileLoader,
            },
            {
              path: '/layout/users',
              element: <Users />,
              loader: userLoader,
            },
            {
              path: `/layout/users/:userId`,
              element: <UserProfile />,
              loader: userProfileLoader,
              
            },
            {
              path: `/layout/users/:userId/delete`,
              element: <UserProfileDelete />,
              loader: userProfileDeleteLoader,
              action: userProfileDeleteAction,
            },
            {
              path: '/layout/students',
              element: <Students />,
              loader: studentLoader,
            },
            {
              path: `/layout/students/:studentId`,
              element: <StudentProfile />,
              loader: studentProfileLoader,
            },
            {
              path: `/layout/students/:studentId/delete`,
              element: <StudentProfileDelete />,
              loader: studentProfileDeleteLoader,
              action: studentProfileDeleteAction,
            },
            {
              path: `/layout/signup`,
              element: <Signup />,
              loader: signupLoader,

              // children are needed in this exercise for Outlets ( The way to display websites inside a window )
              children:
              [
                {
                  path: `/layout/signup/user`,
                  element: <SignupUser />,
                  loader: signupUserLoader,
                  action: signupUserAction,
                },
                {
                  path: `/layout/signup/teacher`,
                  element: <SignupTeacher />,
                  loader: signupTeacherLoader,
                  action: signupTeacherAction,
                },
                {
                  path: `/layout/signup/student`,
                  element: <SignupStudent />,
                  loader: signupStudentLoader,
                  action: signupStudentAction,
                },
              ]
            },
          ]
        }
      ]
    },
  ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)