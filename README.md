# code-live-instructor
code-live is a tool used to help instructors live sync their code with their students. These live syncing files can be used to compare to the student's code and help prevent bugs/errors.

code-live will run a server in the background and watch the files in the directory that the command was executed. Any file or folder created, changed, moved or deleted will be synced with anyone who has connected to your code-live server.

This package only works when paired with `code-live-student`.

## Installation
Using npm:

```

npm i -g code-live-instructor

```

## Usage
Navigate to the directory that will hold the code files and folders that you want to be synced and run:

```

code-live-start

```

The code-live server will start running in the background on port 5050 and will emit any changes. Immediately, you will see `[student-command]: code-live *your ip address*`. This is the command that the students need to run to connect to your server.

When someone connects to your code-live server, it will notify you in the terminal of the connection by printing `connected: [socket id of the connection]`. 

### Helpful commands:

* `file [filepath]` will sync an individual file to all student connections. Example: `file ./functions.js`
* `all` will sync all folders and files with students.
* `end` will close all student connections to your server.
* `command` will give you the student command to connect to your server.
* `help` will display all the above commands in the terminal.
