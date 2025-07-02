
create table Users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR (255),
    phone VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR (255)
);

CREATE TABLE Company (
    company_id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    company_location VARCHAR(255),
    owner_id INTEGER,
    FOREIGN KEY (owner_id) REFERENCES Users(user_id) ON DELETE SET NULL
);

#drop Table Todo

CREATE TABLE company_members(
    company_id INTEGER,
    FOREIGN KEY(company_id) REFERENCES Company(company_id) ON DELETE CASCADE,
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    PRIMARY KEY(company_id, user_id)
    user_role VARCHAR (255) CHECK( user_role in ('Owner', 'Admin', 'Member')),
)

CREATE TABLE Project(
    project_id int PRIMARY KEY,
    project_name VARCHAR (255),
    project_description VARCHAR (255),
    company_id INTEGER,
    FOREIGN KEY(company_id) REFERENCES Company(company_id) ON DELETE CASCADE
);

CREATE TABLE user_project(
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    project_id INTEGER,
    FOREIGN KEY(project_id) REFERENCES Project(project_id) ON DELETE CASCADE,
    PRIMARY KEY(user_id, project_id)
);

CREATE TABLE Task(
    task_id int PRIMARY KEY,
    task_name VARCHAR (255),
    task_description VARCHAR (255),
    project_id INTEGER,
    FOREIGN KEY(project_id) REFERENCES Project(project_id) ON DELETE CASCADE
);

CREATE TABLE Todo(
    todo_id int PRIMARY KEY,
    todo_name VARCHAR (255),
    todo_description VARCHAR (255),
    due_date DATE,
    todo_priority VARCHAR (255),
    todo_status VARCHAR (255),
    task_id INTEGER,
    FOREIGN KEY(task_id) REFERENCES Task(task_id) ON DELETE CASCADE
);

ALTER Table user_project
add constraint unique_user UNIQUE(user_id);

CREATE TABLE user_todo(
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES user_project(user_id) ON DELETE CASCADE,
    project_id INTEGER,
    FOREIGN KEY(project_id) REFERENCES Project(project_id) ON DELETE CASCADE,
    todo_id INTEGER,
    FOREIGN KEY(todo_id) REFERENCES Todo(todo_id) ON DELETE CASCADE,
    PRIMARY KEY(user_id, todo_id)
);

ALTER Table company_members
add constraint unique_user_cm UNIQUE(user_id);

CREATE TABLE invited_member(
    invited_id int PRIMARY KEY,
    invited_by_id INTEGER,
    FOREIGN KEY(invited_by_id) REFERENCES company_members(user_id) ON DELETE CASCADE,
    status VARCHAR(255) CHECK (status in('Pending', 'Accepted', 'Rejected'))
);
