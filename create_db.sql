CREATE TABLE subdivisions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO subdivisions (name) VALUES 
('IT'),
('Human Resourses'),
('Administration'),
('Finance');


CREATE TABLE employee_statuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(30) NOT NULL
);

INSERT INTO employee_statuses (status) VALUES
('Active'),
('Inactive');


CREATE TABLE request_statuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(30) NOT NULL
);

INSERT INTO request_statuses (status) VALUES
('New'),
('Approved'),
('Rejected'),
('Cancelled');


CREATE TABLE positions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO positions (name) VALUES 
('Employee'),
('HR Manager'),
('Project Manager'),
('Administartor');


CREATE TABLE absence_reasons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reason VARCHAR(40) NOT NULL
);

INSERT INTO absence_reasons (reason) VALUES
('Sickness'),
('Birthday'),
('Vacation'),
('Business trip');


CREATE TABLE project_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(40) NOT NULL
);

INSERT INTO project_types (type) VALUES
('Colonization of Mars'),
('Space exploration'),
('Pet a fox');


CREATE TABLE project_statuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(40) NOT NULL
);

INSERT INTO project_statuses (status) VALUES
('Active'),
('Inactive');


CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    subdivision_id INT NOT NULL,
    position_id INT NOT NULL,
    status_id INT NOT NULL,
    partner_id INT,
    absence_balance INT NOT NULL,
    photo BLOB,
    FOREIGN KEY (subdivision_id) REFERENCES subdivisions(id),
    FOREIGN KEY (position_id) REFERENCES positions(id),
    FOREIGN KEY (status_id) REFERENCES employee_statuses(id),
    FOREIGN KEY (partner_id) REFERENCES employees(id)
);

INSERT INTO employees (name, subdivision_id, position_id, status_id, partner_id, absence_balance) VALUES
('Chloe Ward', 3, 3, 1, 1, 20),
('John Parker', 2, 2, 1, 1, 20),
('Alice Patterson', 1, 1, 1, 1, 20),
('Mike Anderson', 1, 1, 1, 1, 20);


CREATE TABLE leave_requests (
	id INT AUTO_INCREMENT PRIMARY KEY,
	employee_id INT NOT NULL,
	reason_id INT NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	comment TEXT,
	status_id INT NOT NULL DEFAULT 1,
	FOREIGN KEY (employee_id) REFERENCES employees(id),
	FOREIGN KEY (reason_id) REFERENCES absence_reasons(id),
	FOREIGN KEY (status_id) REFERENCES request_statuses(id)
);

CREATE TABLE approval_requests (
	id INT AUTO_INCREMENT PRIMARY KEY,
	approver_id INT NOT NULL,
	request_id INT NOT NULL,
	comment TEXT,
	FOREIGN KEY (approver_id) REFERENCES employees(id),
	FOREIGN KEY (request_id) REFERENCES leave_requests(id)
);

CREATE TABLE projects (
	id INT AUTO_INCREMENT PRIMARY KEY,
	type_id INT NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE,
	manager_id INT NOT NULL,
	comment TEXT,
	status_id INT NOT NULL,
	FOREIGN KEY (type_id) REFERENCES project_types(id),
	FOREIGN KEY (manager_id) REFERENCES employees(id),
	FOREIGN KEY (status_id) REFERENCES project_statuses(id)
);

CREATE TABLE employee_projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
	project_id INT NOT NULL,
	FOREIGN KEY (employee_id) REFERENCES employees(id),
	FOREIGN KEY (project_id) REFERENCES projects(id)
);