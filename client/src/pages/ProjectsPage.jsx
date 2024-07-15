import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import ListLoader from "../components/ListLoader";
import { getAllProjects } from "../utils/http";

export default function ProjectsPage() {
  const userRole = localStorage.getItem('role');
  const [projects, setProjects] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProjects();
      setProjects(data);
    };
    fetchData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'type', headerName: 'Type', width: 130 },
    { field: 'start', headerName: 'Start Date', width: 130 },
    { field: 'end', headerName: 'End Date', width: 130 },
    { field: 'manager', headerName: 'Manager', width: 200 },
    { field: 'comment', headerName: 'Comment', width: 200 },
    { field: 'status', headerName: 'Status', width: 130 },
    ...(userRole === 'pm' || userRole === 'admin' ? [{
      field: 'actions',
      headerName: 'Action',
      type: 'actions',
      width: 280,
      getActions: (params) => [
        <NavLink to={`${params.id}/employees`} key={params.id}>
          <Button variant="contained" size="small">Open employees</Button>
        </NavLink>
      ],
    }] : [])
  ];

  return <Box sx={{ backgroundColor: 'white', height: '84dvh', padding: '5px' }}>
    {(userRole === 'pm' || userRole === 'admin') && (
      <NavLink to='new' style={{ marginLeft: '10px' }}>
        <Button variant="contained" size="small">Add new project</Button>
      </NavLink>
    )}

    {projects ? <DataGrid
      rows={projects}
      columns={columns}
      disableRowSelectionOnClick
    /> : <ListLoader />}
  </Box>
}
