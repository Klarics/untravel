
//import { ctl } from "./ctl"
//import { sendMsg, sendMsgToPlayer } from "./chatfilter2";

export const config = {modules: {
    setHome: {
        enabled: true,
        max: 5,
    },
    goHome: {
        seconds: 0,
        minutes: 5,
        hours: 0,
        days: 0,
    },
    chatranks: {
        enabled: true,
    },
    encryption: {
        password: "!#7231",
    }
}}

export const commandDefinitions = {
    ctl: "ctl",
    spawn: "spawn",
    vault: "vault",
    gmc: "gmc",
    sethome: "sethome",
    gohome: "gohome",
    listhome: "listhome",
    delhome: "delhome",
    gms: "gmv",
    tpr: "tpr"
}



