## code-live - instructor
code-live is a tool used to help code instructors be able to live sync their code with their students. These live syncing files can be used to compare to the student's code and help prevent bugs/errors.
code-live will run a server in the background and watch the files in the directory that the command was executed. Any file or folder created, changed, moved or deleted will be synced with anyone who has connected to your code-live server.

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

The code-live server will start running in the background on port 5050 and will emit any changes. 

When someone connects to your code-live server, it will notify you in the terminal of the connection by printing `connected: [socket id of the connection]`. 