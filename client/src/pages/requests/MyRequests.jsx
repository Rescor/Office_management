import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { getMyRequestsData } from "../../utils/http";
import ListLoader from "../../components/ListLoader";

export default function MyRequests() {
  const userId = localStorage.getItem('user_id');
  const [myRequests, setMyRequests] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMyRequestsData(userId);
      setMyRequests(data);
    };
    fetchData();
  }, [userId]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'reason', headerName: 'Reason', width: 130 },
    { field: 'start', headerName: 'Start Date', width: 130 },
    { field: 'end', headerName: 'End Date', width: 130 },
    { field: 'comment', headerName: 'Comment', width: 200 },
    { field: 'status', headerName: 'Status', width: 130 },
    {
      field: 'actions',
      headerName: 'Action',
      type: 'actions',
      width: 280,
      getActions: (params) => {
        if (params.row.status === 'New') {
          return [
            <NavLink to={`/lists/requests/${params.id}/edit`} key={params.id}>
              <Button variant="contained" size="small">Edit</Button>
            </NavLink>
          ];
        }
        return [];
      },
    },
  ];

  return <Box sx={{ backgroundColor: 'white', height: '84dvh', padding: '5px' }}>
    <NavLink to='/lists/requests/new' style={{marginLeft: '10px'}}>
      <Button variant="contained" size="small">New request</Button>
    </NavLink>

    {myRequests ? <DataGrid
      rows={myRequests}
      columns={columns}
      disableRowSelectionOnClick
    /> : <ListLoader />}
  </Box>
}
