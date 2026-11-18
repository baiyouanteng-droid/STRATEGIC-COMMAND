let map;
let targetMarker = null;
let missileMarker = null;
let trajectoryLine = null;
let launchSiteMarker = null;
let explosionCircle = null;

const launchSites = {

    jp: {
        name: "JAPAN",
        lat: 35.6764,
        lng: 139.6500
    },

    uk: {
        name: "UNITED KINGDOM",
        lat: 51.5072,
        lng: -0.1276
    },

    sub: {
        name: "SUBMARINE",
        lat: 30.0,
        lng: 150.0
    },
ru: {
    name: "RUSSIA",
    lat: 55.7558,
    lng: 37.6176
},

cn: {
    name: "CHINA",
    lat: 39.9042,
    lng: 116.4074
},

fr: {
    name: "FRANCE",
    lat: 48.8566,
    lng: 2.3522
},

};

let currentDefcon = 5;

setTimeout(() => {

    document.getElementById("boot-screen")
        .style.display = "none";

    document.getElementById("main-screen")
        .style.display = "block";

    initializeMap();
updateDefconDisplay();

}, 2000);

function initializeMap() {

    map = L.map('map').setView([20, 0], 2);

    L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            attribution: '&copy; OpenStreetMap'
        }
    ).addTo(map);

    map.on("click", function(e) {

        if (targetMarker) {
            map.removeLayer(targetMarker);
        }

        targetMarker = L.marker(e.latlng)
            .addTo(map);

        document
            .getElementById("target-status")
            .textContent = "LOCKED";

        document
            .getElementById("target-lat")
            .textContent =
            e.latlng.lat.toFixed(4);

        document
            .getElementById("target-lon")
            .textContent =
            e.latlng.lng.toFixed(4);
 addLog(
    `TARGET LOCKED | LAT:${e.latlng.lat.toFixed(4)} LON:${e.latlng.lng.toFixed(4)}`
);


    });

}

document
.getElementById("defcon-down")
.addEventListener("click", () => {

    if(currentDefcon > 1){

        if(currentDefcon === 2){

            showDefcon1Modal(
                (result) => {

                    if(result){

                        currentDefcon--;

                        updateDefconDisplay();

                        addLog(
                            `DEFCON CHANGED TO ${currentDefcon}`
                        );

                    }

                }
            );

            return;

        }

        const result =
            confirm(
                `CHANGE DEFCON ${currentDefcon} → ${currentDefcon - 1} ?`
            );

        if(result){

            currentDefcon--;

            updateDefconDisplay();

            addLog(
                `DEFCON CHANGED TO ${currentDefcon}`
            );

        }

    }

});document
.getElementById("defcon-up")
.addEventListener("click", () => {

    if(currentDefcon < 5){

        const result =
            confirm(
                `CHANGE DEFCON ${currentDefcon} → ${currentDefcon + 1} ?`
            );

if(result){

    currentDefcon++;

    updateDefconDisplay();

    addLog(
        `DEFCON CHANGED TO ${currentDefcon}`
    );

        }

    }

});
function updateDefconDisplay() {

    const level =
        document.getElementById(
            "defcon-level"
        );

    const banner =
        document.getElementById(
            "alert-banner"
        );

    level.textContent =
        currentDefcon;

    if(currentDefcon === 1){

        banner.classList.add(
            "alert-active"
        );

    } else {

        banner.classList.remove(
            "alert-active"
        );

    }

    switch(currentDefcon){

        case 5:
            level.style.color =
                "#00ff66";
            break;

        case 4:
            level.style.color =
                "#88ff00";
            break;

        case 3:
            level.style.color =
                "#ffff00";
            break;

        case 2:
            level.style.color =
                "#ff8800";
            break;

        case 1:
            level.style.color =
                "#ff0000";
            break;

    }

}

       
document
.getElementById("comms-send")
.addEventListener("click", executeCommand);

function executeCommand() {

    const input =
        document.getElementById("comms-input");

    const output =
        document.getElementById("comms-output");

    const cmd =
        input.value.toLowerCase();

    let response = "";

    switch(cmd){

case "hello":

response =
`
STRATEGIC AI

Welcome back,
Commander.

All systems remain
operational.
`;

break;

case "who are you":

response =
`
STRATEGIC AI

Strategic Operations
Assistant

Version 1.0

Awaiting orders.
`;

break;
case "mission":

response =
targetMarker
?
`
STRATEGIC AI

Target designated.

Awaiting launch order.
`
:
`
STRATEGIC AI

No target assigned.

Awaiting designation.
`;

break;

case "help":

response =
`
AVAILABLE COMMANDS

status

target

launch readiness

defcon

help
`;

break;

case "defcon":

response =
`
CURRENT DEFCON

${currentDefcon}
`;

break;

case "status":

    if(currentDefcon === 1){

        response =
`


MAXIMUM ALERT STATUS

ALL STRATEGIC ASSETS
ON STANDBY

DEFCON : 1

NUCLEAR COMMAND:
READY

SATELLITE:
ONLINE


`;

    } else {

        response =
`
ALL SYSTEMS OPERATIONAL

DEFCON : ${currentDefcon}

SATELLITE : ONLINE

TARGET : ${
targetMarker
    ? "LOCKED"
    : "NONE"
}

MISSILE SYSTEMS :
READY
`;

    }

break;

        case "target":

            response =
                targetMarker
                ? "TARGET LOCKED"
                : "NO TARGET";

            break;

        case "launch readiness":

            response =
`
READY FOR LAUNCH

AUTHORIZATION REQUIRED
`;

            break;

        default:

            response =
                "UNKNOWN COMMAND";

    }

    output.innerHTML +=
`
<div>
&gt; ${cmd}
</div>

<div>
${response}
</div>

<hr>
`;

    input.value = "";

}
loadMissiles();

function loadMissiles(){

    const select =
        document.getElementById("missile-select");

    MISSILES.forEach(missile => {

        const option =
            document.createElement("option");

        option.value =
            missile.id;

        option.textContent =
            missile.name;

        select.appendChild(option);

    });

}
document
.getElementById("launch-btn")
.addEventListener("click", launchMissile);
function launchMissile(){

    if(!targetMarker){

        alert(
            "NO TARGET SELECTED"
        );

        return;

    }

    const missile =
        document.getElementById("missile-select");

    const missileName =
        missile.options[
            missile.selectedIndex
        ].text;

    const result =
        confirm(
            `AUTHORIZE ${missileName} LAUNCH ?`
        );

    if(!result){
        return;
    }

    addLog(
        `MISSILE SELECTED : ${missileName}`
);
        const site =

launchSites[
    document.getElementById(
        "launch-site"
    ).value
];

addLog(
    `LAUNCH SITE : ${site.name}`
);

    addLog(
        "LAUNCH AUTHORIZED"
    );

     startCountdown();

}
function startCountdown() {

    let count = 10;

    const status =
        document.getElementById(
            "launch-status"
        );

    status.textContent =
        "LAUNCH SEQUENCE INITIATED";

    const timer = setInterval(() => {

        status.textContent =
            `T-${count}`;

        count--;

        if(count < 0){

            clearInterval(timer);

            status.textContent =
                "MISSILE LAUNCHED";

            addLog(
                "MISSILE LAUNCHED"
            );

             launchAnimation();

        }

    }, 1000);

}
function launchAnimation() {

    if(!targetMarker){
        return;
    }

    const target =
        targetMarker.getLatLng();

const launchSite =
document.getElementById(
    "launch-site"
);

const site =
launchSites[
    launchSite.value
];

const startLat =
site.lat;

const startLng =
site.lng;
if(launchSiteMarker){

    map.removeLayer(
        launchSiteMarker
    );

}

launchSiteMarker =
L.circleMarker(
    [startLat, startLng],
    {
        radius: 8,
        color: "#00ff66",
        fillColor: "#00ff66",
        fillOpacity: 1
    }
).addTo(map);
if(trajectoryLine){

    map.removeLayer(
        trajectoryLine
    );

}

trajectoryLine =
L.polyline(
    [
        [startLat, startLng],
        [target.lat, target.lng]
    ],
    {
        color: "red",
        weight: 3,
        opacity: 0.7

    }
).addTo(map);

    let progress = 0;

    if(missileMarker){
        map.removeLayer(
            missileMarker
        );
    }

const missileIcon =
    L.divIcon({

        className: "",

        html:
`
<div style="
width:12px;
height:12px;
background:red;
border-radius:50%;
box-shadow:0 0 10px red;
"></div>
`
});


   missileMarker =
    L.marker(
        [startLat, startLng],
        {
            icon:
                missileIcon
        }
    ).addTo(map);
    const timer =
        setInterval(() => {

        progress += 0.003;

        const lat =
            startLat +
            (target.lat - startLat)
            * progress;

        const lng =
            startLng +
            (target.lng - startLng)
            * progress;

        missileMarker.setLatLng([
            lat,
            lng
        ]);

      if(progress >= 1){

    clearInterval(timer);

    createExplosion(
        target.lat,
        target.lng
    );

    addLog(
        "TARGET REACHED"
    );

    addLog(
        "MISSION COMPLETE"
    );

    document
        .getElementById(
            "launch-status"
        )
        .textContent =
        "MISSION COMPLETE";

}

function createExplosion(
    lat,
    lng
){

    if(explosionCircle){

        map.removeLayer(
            explosionCircle
        );

    }

    explosionCircle =
        L.circle(
            [lat, lng],
            {
                radius: 5000,
                color: "#ff3300",
                fillColor: "#ff0000",
                fillOpacity: 0.8
            }
        ).addTo(map);

    let size = 1000;

    const shockwave =
        setInterval(() => {

        size += 15000;

        explosionCircle.setRadius(
            size
        );

        if(size > 100000){

            clearInterval(
                shockwave
            );

            map.removeLayer(
                explosionCircle
            );

        }

    }, 50);

}
    }, 50);

}
function showDefcon1Modal(callback){

    const modal =
        document.getElementById(
            "confirm-modal"
        );

    const text =
        document.getElementById(
            "confirm-text"
        );

    text.textContent =
        "CHANGE TO DEFCON 1 ?";

    modal.style.display =
        "block";

    document.getElementById(
        "confirm-yes"
    ).onclick = () => {

        modal.style.display =
            "none";

        callback(true);

    };

    document.getElementById(
        "confirm-no"
    ).onclick = () => {

        modal.style.display =
            "none";

        callback(false);

    };

}