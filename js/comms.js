const COMMANDS = {
  status: `
ALL SYSTEMS OPERATIONAL

SATELLITE : ONLINE
DEFCON : 4
TARGET : READY
`,
  target: `
TARGET LOCKED

LAT : UNKNOWN
LON : UNKNOWN
`,
  "launch readiness": `
READY FOR LAUNCH

AUTHORIZATION REQUIRED
`
};

function executeCommand(command) {
  return COMMANDS[command.toLowerCase()] || "UNKNOWN COMMAND";
}