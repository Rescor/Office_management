import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import ListLoader from "../components/ListLoader";
import { getAllEmployees } from "../utils/http";

export default function EmployeesPage() {
  const userRole = localStorage.getItem('role');
  const [employees, setEmployees] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      let data = await getAllEmployees();
      setEmployees(data);
    };
    fetchData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'subdivision', headerName: 'Subdivision', width: 130 },
    { field: 'position', headerName: 'Position', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'partner', headerName: 'Partner', width: 200 },
    { field: 'absence_balance', headerName: 'Absence balance', width: 130 },
    ...(userRole === 'hr' || userRole === 'admin' ? [{
      field: 'actions',
      headerName: 'Action',
      type: 'actions',
      width: 280,
      getActions: (params) => [
        <NavLink to={`${params.id}/edit`} key={params.id}>
          <Button variant="contained" size="small">Edit</Button>
        </NavLink>
      ],
    }] : [])
  ];

  return <Box sx={{ backgroundColor: 'white', height: '84dvh', padding: '5px' }}>
    {(userRole === 'hr' || userRole === 'admin') && (
      <NavLink to='new' style={{ marginLeft: '10px' }}>
        <Button variant="contained" size="small">Add new employee</Button>
      </NavLink>
    )}

    {employees ? <DataGrid
      rows={employees}
      columns={columns}
      disableRowSelectionOnClick
    /> : <ListLoader />}
  </Box>
}
