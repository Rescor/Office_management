import mysql from 'mysql2';

const connection = mysql.createPool({
  host: '127.0.0.1',
  user: '',
  password: '',
  database: 'office',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

export default connection;
