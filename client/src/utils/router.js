import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootPage from '../pages/RootPage';
import MainPage from '../pages/MainPage';
import ListsPage from '../pages/ListsPage';
import ErrorPage from '../pages/ErrorPage'
import MyProjectsPage from '../pages/MyProjectsPage';
import MyRequests from '../pages/requests/MyRequests';
import EmployeesPage from "../pages/EmployeesPage";
import ProjectsPage from "../pages/ProjectsPage";
import LeaveRequests from "../pages/requests/LeaveRequests";
import AllRequests from "../pages/requests/AllRequests";
import EditRequestForm from "../components/Forms/EditRequestForm";
import NewEmployeeForm from "../components/Forms/NewEmployeeForm";
import EditEmployeeForm from "../components/Forms/EditEmployeeForm";
import LeaveRequestForm from "../components/Forms/LeaveRequestForm";
import ApprovalRequests from "../pages/requests/ApprovalRequests";
import NewProjectForm from "../components/Forms/NewProjectForm";
import ProjectEmployeesPage from "../pages/ProjectEmployeesPage";
import AddEmployeeToProjectForm from "../components/Forms/AddEmployeeToProjectForm";
import NewRequestForm from "../components/Forms/NewRequestForm";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <Navigate to="/" />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'error', element: <ErrorPage /> },
      { path: 'lists', element: <ListsPage />, children: [
        { path: 'my_projects', element: <MyProjectsPage /> },
        { path: 'requests/my', element: <MyRequests /> },
        { path: 'requests/new', element: <NewRequestForm /> },
        { path: 'requests/leave', element: <LeaveRequests /> },
        { path: 'requests/leave/:id/open', element: <LeaveRequestForm /> },
        { path: 'requests/approval', element: <ApprovalRequests /> },
        { path: 'requests/all', element: <AllRequests /> },
        { path: 'requests/:id/edit', element: <EditRequestForm /> },
        { path: 'employees', element: <EmployeesPage /> },
        { path: 'employees/new', element: <NewEmployeeForm /> },
        { path: 'employees/:id/edit', element: <EditEmployeeForm /> },
        { path: 'projects', element: <ProjectsPage /> },
        { path: 'projects/new', element: <NewProjectForm /> },
        { path: 'projects/:id/employees', element: <ProjectEmployeesPage /> },
        { path: 'projects/:id/employees/add', element: <AddEmployeeToProjectForm /> }
      ] },
    ],
  }
])
