import "./chatfilter2"
import "./players"
import "./newMembersChoosSkill-UI";
//import "./items.js"
//import "./paradise.js";

import { system } from "mojang-minecraft"

system.events.beforeWatchdogTerminate.subscribe(event => {
    event.cancel = true
})