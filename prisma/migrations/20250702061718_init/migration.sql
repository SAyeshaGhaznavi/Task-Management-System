-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT,
    "phone" TEXT,
    "email" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Company" (
    "company_id" SERIAL NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_location" TEXT,
    "owner_id" INTEGER,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "company_members" (
    "company_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "user_role" TEXT NOT NULL,

    CONSTRAINT "company_members_pkey" PRIMARY KEY ("company_id","user_id")
);

-- CreateTable
CREATE TABLE "Project" (
    "project_id" SERIAL NOT NULL,
    "project_name" TEXT NOT NULL,
    "project_description" TEXT,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "user_project" (
    "user_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "user_project_pkey" PRIMARY KEY ("user_id","project_id")
);

-- CreateTable
CREATE TABLE "Task" (
    "task_id" SERIAL NOT NULL,
    "task_name" TEXT NOT NULL,
    "task_description" TEXT,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "todo_id" SERIAL NOT NULL,
    "todo_name" TEXT NOT NULL,
    "todo_description" TEXT,
    "due_date" TIMESTAMP(3),
    "todo_priority" TEXT,
    "todo_status" TEXT,
    "task_id" INTEGER NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("todo_id")
);

-- CreateTable
CREATE TABLE "user_todo" (
    "user_id" INTEGER NOT NULL,
    "todo_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "user_todo_pkey" PRIMARY KEY ("user_id","todo_id")
);

-- CreateTable
CREATE TABLE "invited_member" (
    "invited_id" SERIAL NOT NULL,
    "invited_by_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "invited_member_pkey" PRIMARY KEY ("invited_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_members_user_id_key" ON "company_members"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_project_user_id_key" ON "user_project"("user_id");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_members" ADD CONSTRAINT "company_members_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_members" ADD CONSTRAINT "company_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_project" ADD CONSTRAINT "user_project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_project" ADD CONSTRAINT "user_project_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_todo" ADD CONSTRAINT "user_todo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_todo" ADD CONSTRAINT "user_todo_todo_id_fkey" FOREIGN KEY ("todo_id") REFERENCES "Todo"("todo_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_todo" ADD CONSTRAINT "user_todo_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invited_member" ADD CONSTRAINT "invited_member_invited_by_id_fkey" FOREIGN KEY ("invited_by_id") REFERENCES "company_members"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
