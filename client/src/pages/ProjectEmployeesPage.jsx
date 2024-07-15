import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import ListLoader from "../components/ListLoader";
import BackButton from "../components/BackButton";
import { getProjectEmployees, removeEmployeeFromProject } from "../utils/http";

export default function ProjectEmployeesPage() {
  const params = useParams();
  const [employees, setEmployees] = useState(undefined);

  async function removeEmployee(id) {
    await removeEmployeeFromProject(params.id, {id});
    // We make the assumption that everything is fine and update the list immediately
    setEmployees(prev => prev.filter(employee => employee.id !== id));
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProjectEmployees(params.id);
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
    {
      field: 'actions',
      headerName: 'Action',
      type: 'actions',
      width: 280,
      getActions: (params) => [
        <Button variant="contained" size="small" onClick={() => removeEmployee(params.id)} key={params.id}>Remove</Button>
      ],
    }
  ];

  return <Box sx={{ backgroundColor: 'white', height: '84dvh', padding: '5px' }}>
    <BackButton path='./../../' />

    <NavLink to='add' style={{marginLeft: '10px'}} key={params.id}>
      <Button variant="contained" size="small">Add employee to the project</Button>
    </NavLink>

    {employees ? <DataGrid
      rows={employees}
      columns={columns}
      disableRowSelectionOnClick
    /> : <ListLoader />}
  </Box>
}
