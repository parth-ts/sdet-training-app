import Image from "next/image";
import { z } from "zod";

import { columns } from "@/components/examples/tasks/components/columns";
import { DataTable } from "@/components/examples/tasks/components/data-table";
import { UserNav } from "@/components/examples/tasks/components/user-nav";
import { taskSchema } from "@/components/examples/tasks/data/schema";
import TASKS from "@/components/examples/tasks/data/tasks.json";

// Simulate a database read for tasks.
function getTasks() {
  return z.array(taskSchema).parse(TASKS);
}

export default function TaskPage() {
  const tasks = getTasks();

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div>
        {/* date picker */}
        <div> 
          <label htmlFor="task">Date: </label>
          <input type="date" id="task" name="task"/>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
