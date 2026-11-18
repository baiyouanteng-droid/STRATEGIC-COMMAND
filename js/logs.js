function addLog(message) {

    const now = new Date();

    const time =
        now.getHours().toString().padStart(2, "0")
        + ":"
        + now.getMinutes().toString().padStart(2, "0");

    const log = `[${time}] ${message}`;

    let logs =
        JSON.parse(
            localStorage.getItem("logs")
        ) || [];

    logs.unshift(log);

    localStorage.setItem(
        "logs",
        JSON.stringify(logs)
    );

    renderLogs();
}

function renderLogs() {

    const logs =
        JSON.parse(
            localStorage.getItem("logs")
        ) || [];

    const logContainer =
        document.getElementById("logs-container");

    if(!logContainer) return;

    logContainer.innerHTML = "";

    logs.forEach(log => {

        const div =
            document.createElement("div");

        div.textContent = log;

        logContainer.appendChild(div);

    });

}