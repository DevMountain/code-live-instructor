module.exports = {
    connected(socket) {
      console.log("\033[34m", "[connection]:", "\033[37m", `${socket.id}`);
    },
    syncOnPort(port) {
      console.log("\033[37m", `Syncing on port ${port}`);
    },
    allMessage() {
      console.log(
        "\033[35m",
        `[sync_all]:`,
        "\033[37m",
        "Syncing all files to connected user files..."
      );
    },
    syncComplete() {
      console.log("\033[35m", "[sync_all]:", "\033[37m", "Sync complete");
    },
    syncFile(data) {
      console.log(
        "\033[35m",
        "[sync_file]:",
        "\033[37m",
        `Syncing file: '${data}'`
      );
    },
    connectionsClosed() {
      console.log(
        "\033[35m",
        "[close_all]:",
        "\033[37m",
        "All student connections closed"
      );
    },
    help() {
      console.log(
        "\033[35m",
        "[help]:",
        "\033[36m",
        "\n file [filepath]",
        "\033[37m",
        "sync individual file",
        "\033[36m",
        "\n all",
        "\033[37m",
        "sync all files",
        "\033[36m",
        "\n end",
        "\033[37m",
        "close all socket connections to server",
        "\033[36m",
        "\n command",
        "\033[37m",
        "student command for starting code-live"
      );
    },
    studentCommand(ipaddress) {
      console.log(
        "\033[35m",
        `[student_command]:`,
        "\x1b[0m",
        `code-live ${ipaddress}`
      );
    },
    default() {
      console.log(
        "\033[31m",
        "[error]:",
        "\033[37m",
        "Command not recognized. Type 'help' command to view commands."
      );
    },
    incorrectPath(srcPath) {
      console.log(
        "\033[31m",
        "[error]:",
        "\033[37m",
        srcPath
          ? `Incorrect file path --> '${srcPath}'. Type in command 'help' for a list of valid commands.`
          : "You must include the source path of the file you want to sync. Type in command 'help' for a list of valid commands."
      );
    }
  };
  