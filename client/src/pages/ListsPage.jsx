import { Outlet, useLocation } from "react-router-dom";
import Background from "../components/Background/Background";
import Header from "../components/Header/Header";
import Welcome from "../components/Welcome/Welcome";
import ListsNav from "../components/ListsNav/ListsNav";

export default function ListsPage() {
  const location = useLocation();
  const user_role = localStorage.getItem('role')
  const employee = localStorage.getItem('employee')

  return <>
    <Background url='/assets/bg2.jpg'/>
    <Header/>
    <ListsNav role={user_role}/>
    {location.pathname === '/lists' && <Welcome name={employee}/>}
    <div style={{ margin: '10px 15px', borderRadius: '15px', overflow: 'hidden' }}>
      <Outlet/>
    </div>
  </>
}
