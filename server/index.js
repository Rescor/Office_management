import express from "express";
import cors from 'cors';
import requestsRoutes from './routes/requests.js';
import projectsRoutes from './routes/projects.js';
import employeesRoutes from './routes/employees.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/requests', requestsRoutes);
app.use('/projects', projectsRoutes);
app.use('/employees', employeesRoutes);

app.listen(port, () => {
  console.log(`Server has been started on port ${port}...`)
});
