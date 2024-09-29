# Tasks Tracker CLI

This project is one of the beginners backend project in [roadmap.sh](https://roadmap.sh).

See also the [**project description**](https://roadmap.sh/projects/task-tracker).

## How to use

The list of commands and their usage is given below:

```sh
# Adding a new task
node task add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Updating and deleting tasks
node task update 1 "Buy groceries and cook dinner"
node task delete 1

# Marking a task as in progress or done
node task mark-in-progress 1
node task mark-done 1

# Listing all tasks
node task list

# Listing tasks by status
node task list done
node task list todo
node task list in-progress
```
