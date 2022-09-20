import { world, Location } from "mojang-minecraft";
import { commandDefinitions, config } from "./commandIndex";

const World = world;
const overworld = World.getDimension("overworld");
const prefix = ".";
let cooldownTimer = new WeakMap();
const settings = {
  tp: "tp",
  bkc: "bkc",
  bkz: "bkz",
  bkv: "bkv",
  bkm: "bkm",
  rbc: "rbc",
  rbz: "rbz",
  rbv: "rbv",
  rbm: "rbm",
  so: "so",
};
//bk = backup, rb = rebuilt.

export const sendMsg = (target, message) => {
  try {
    overworld.runCommand(
      `tellraw ${
        /^ *@[spear]( *\[.*\] *)?$/.test(target)
          ? target
          : JSON.stringify(target)
      } {"rawtext":[{"text":${JSON.stringify(
        Array.isArray(message) ? message.join("\n\u00a7r") : message
      )}}]}`
    );
  } catch {}
};

export const sendMsgToPlayer = (target, message) => {
  try {
    target.runCommand(
      `tellraw @s {"rawtext":[{"text":${JSON.stringify(
        Array.isArray(message) ? message.join("\n\u00a7r") : message
      )}}]}`
    );
  } catch {}
};

function dhms(ms) {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const daysms = ms % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysms / (60 * 60 * 1000));
  const hoursms = ms % (60 * 60 * 1000);
  const minutes = Math.floor(hoursms / (60 * 1000));
  const minutesms = ms % (60 * 1000);
  const sec = Math.floor(minutesms / 1000);
  if (days !== 0) {
    return (
      days +
      " Days : " +
      hours +
      " Hours : " +
      minutes +
      " Minutes : " +
      sec +
      " Seconds"
    );
  }
  if (hours !== 0) {
    return hours + " Hours : " + minutes + " Minutes : " + sec + " Seconds";
  }
  if (minutes !== 0) {
    return minutes + " Minutes : " + sec + " Seconds";
  }
  return sec + " Seconds";
}

//===============================================================================================

World.events.beforeChat.subscribe((msg) => {
  let message = msg.message;
  let player = msg.sender;
  if (msg.sender.hasTag("tpr") && msg.message.toLowerCase().includes("yes")) {
    msg.cancel = true;
    for (let player of World.getPlayers()) {
        if (player.hasTag("tpr:" + msg.sender.name)) {
            /**
             * Check if timer has expired for past pending requests.
             * If timer has expired then we will clear the requester and requestee
             * to allow a request be sent and recieved.
             */
            let cooldownCalc;
            // Get original time in milliseconds
            let cooldownVerify = cooldownTimer.get(player);
            // Convert config settings to milliseconds so we can be sure the countdown is accurate
            let msSettings = config.modules.tpr.days * 24 * 60 * 60 * 1000 + config.modules.tpr.hours * 60 * 60 * 1000 + config.modules.tpr.minutes * 60 * 1000 + config.modules.tpr.seconds * 1000;
            if (cooldownVerify !== undefined) {
                // Determine difference between new and original times in milliseconds
                let bigBrain = new Date().getTime() - cooldownVerify;
                // Subtract realtime clock from countdown in configuration to get difference
                cooldownCalc = msSettings - bigBrain;
            }
            else {
                // First time executed so we default to configuration in milliseconds
                cooldownCalc = msSettings;
            }
            // If timer doesn't exist or has expired then deny request
            if (cooldownCalc === msSettings || cooldownCalc <= 0) {
                player.removeTag("tpr:" + msg.sender.name);
                msg.sender.removeTag("tpr");
                continue;
            }
            else {
                sendMsgToPlayer(player, `§a Hello ${player.name}! ${msg.sender.name} has approved your request to teleport to their location!`);
                sendMsgToPlayer(msg.sender, `§a You have approved a teleport request from ${player.name}!`);
                player.teleport(msg.sender.location, msg.sender.dimension, 0, 0);
                player.removeTag("tpr:" + msg.sender.name);
                msg.sender.removeTag("tpr");
                break;
            }
        }
    }
}
else if (msg.sender.hasTag("tpr") && msg.message.toLowerCase().includes("no")) {
    msg.cancel = true;
    for (let player of World.getPlayers()) {
        if (player.hasTag("tpr:" + msg.sender.name)) {
            /**
             * Check if timer has expired for past pending requests.
             * If timer has expired then we will clear the requester and requestee
             * to allow a request be sent and recieved.
             */
            let cooldownCalc;
            // Get original time in milliseconds
            let cooldownVerify = cooldownTimer.get(player);
            // Convert config settings to milliseconds so we can be sure the countdown is accurate
            let msSettings = config.modules.tpr.days * 24 * 60 * 60 * 1000 + config.modules.tpr.hours * 60 * 60 * 1000 + config.modules.tpr.minutes * 60 * 1000 + config.modules.tpr.seconds * 1000;
            if (cooldownVerify !== undefined) {
                // Determine difference between new and original times in milliseconds
                let bigBrain = new Date().getTime() - cooldownVerify;
                // Subtract realtime clock from countdown in configuration to get difference
                cooldownCalc = msSettings - bigBrain;
            }
            else {
                // First time executed so we default to configuration in milliseconds
                cooldownCalc = msSettings;
            }
            // If timer doesn't exist or has expired then deny request
            if (cooldownCalc === msSettings || cooldownCalc <= 0) {
                player.removeTag("tpr:" + msg.sender.name);
                msg.sender.removeTag("tpr");
                continue;
            }
            else {
                sendMsgToPlayer(player, `§a Hello ${player.name}! ${msg.sender.name} has denied your request to teleport to their location!`);
                sendMsgToPlayer(msg.sender, `§a You have denied a teleport request from ${player.name}!`);
                player.removeTag("tpr:" + msg.sender.name);
                msg.sender.removeTag("tpr");
                break;
            }
        }
    }
}
  if (!message.startsWith(prefix)) {
    // Kill their broadcast if muted
    if (player.hasTag("isMuted")) {
      sendMsgToPlayer(
        player,
        `§r§4[§bUntravel§eMx§4]§r You are currently muted.`
      );
      msg.cancel = true;
      return;
    }
    let tags = player.getTags();
    let rank;
    for (const tag of tags) {
      if (tag.startsWith("Rank:")) {
        rank = tag.replace("Rank:", "");
        rank = rank.replaceAll("--", "§r§7][§r");
      }
    }
    if (!rank) {
      rank = "";
    }
    //let nametag = `§4[§6${rank}§4]§r §7${player.name}§r`;
    //player.nameTag = nametag;
    if (!msg.cancel) {
      // if (rcbrBoolean)
      //     sendMsg("RealmBot", "RB_COMMAND" + `{content:'§r§7${player.name} §r§7[§3${rank}§r§7] >> §r${message}'}`);
      sendMsg("@a", `§r§7§o${player.name} §r§7[§3${rank}§r§7] >> §r${message}`);
      msg.cancel = true;
      return;
    } else {
      let message = msg.message;
      let player = msg.sender;
      //     if (rcbrBoolean)
      //         sendMsg("RealmBot", "RB_COMMAND" + `{content:'${player.name}: ${message}'}`);
      sendMsg("@a", `${player.name}::: ${message}`);
      msg.cancel = true;
    }
  }

  //=================================================================================================================================

  if (message.startsWith(prefix)) {
    let args = message.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    let args2 = message.slice(prefix.length).split(/\s+/g);
    const subCommand = args2[0].toString();
    //const filter = args2.shift().toLowerCase();
    if (!Object.values(commandDefinitions).includes(commandName)) {
      sendMsgToPlayer(
        player,
        `§a The command §l${prefix}${commandName}§r§a does not exist. Try again!`
      );
      msg.cancel = true;
      return;
    }
    if (Object.values(commandDefinitions).includes(commandName)) {
      // Tp to control
      if (commandName == "ctl") {
        msg.cancel = true;
        let player = msg.sender;
        if (!player.hasTag("Adminer")) {
          sendMsgToPlayer(
            player,
            `§a You need to be §eServer-Op§a to use this command.`
          );
          return;
        }
        if (args.length > 1) {
          sendMsgToPlayer(player, `§a No spaces after commands please!`);
          return;
        }
        if (!Object.values(settings).includes(subCommand)) {
          sendMsgToPlayer(
            player,
            `§e The control command '§l§6${prefix}${commandName} ${typeof subCommand}§r§e' needs other arguments. Try again[${typeof args2}]-[${subCommand}]!`
          );
          msg.cancel = true;
          return;
        }
        if (Object.values(settings).includes(args[0].toString())) {
          // Tp to control
          if (args[0].toString() == "tp") {
            msg.cancel = true;
            let player = msg.sender;
            sendMsgToPlayer(player, `§a Tp to control!`);
            sendMsg(
              "@a[tag=Adminer]",
              `§6 ${player.nameTag}§e was tp to Control.`
            );
            player.runCommand(`tp @s 50018 202 50006`);
            return;
          }
          if (subCommand == "bkc") {
            msg.cancel = true;
            let player = msg.sender;
          }
        }
      }
      // Tp to spawn
      if (commandName == "spawn") {
        msg.cancel = true;
        let player = msg.sender;
        if (player.hasTag("InCombat")) {
          sendMsgToPlayer(player, [`§cYou can't leave during a Fight `]);
          return;
        }
        if (player.hasTag("InSpawn")) {
          sendMsgToPlayer(player, `§cYou are already here! `);
          return;
        }
        sendMsgToPlayer(player, [`§aGoing to spawn`]);
        player.runCommand(`tp @s @e[type=armor_stand,name=§r§l§o§5Untravel]`);
      }
      // Tp to vault
      if (commandName == "vault") {
        msg.cancel = true;
        let player = msg.sender;
        if (player.hasTag("InCombat")) {
          sendMsgToPlayer(player, [`§cYou can't leave during a Fight `]);
          return;
        }
        if (player.hasTag("InVault")) {
          sendMsgToPlayer(player, `§cYou are already here! `);
          return;
        }
        sendMsgToPlayer(player, [`§aGoing to Vault`]);
        player.runCommand(`tp @s @e[type=armor_stand,name=§r§r§l§dSave]`);
      }
      // Gamemode c only server admin
      if (commandName == "gmc") {
        msg.cancel = true;
        let player = msg.sender;
        if (!player.hasTag("Adminer")) {
          sendMsgToPlayer(
            player,
            `§a You need to be §6Server-Op§a to use this command.`
          );
          return;
        } else if (player.hasTag("Adminer") && !player.hasTag("gmc")) {
          sendMsgToPlayer(player, `§a Gamemode Creative §bOn!`);
          sendMsg("@a[tag=Adminer]", `§6 ${player.nameTag}§e is on gamemode C`);
          player.runCommand(`gamemode c @s`);
          player.runCommand(
            `effect @s[tag=Adminer] night_vision 100000 5 true`
          );
          player.addTag("gmc");
          player.removeTag("gms");
        } else if (player.hasTag("Adminer") && player.hasTag("gmc")) {
          sendMsgToPlayer(player, `§a Gamemode Creative §cOFF!`);
          sendMsg("@a[tag=Adminer]", `§6 ${player.nameTag}§e is on gamemode S`);
          player.removeTag("gmc");
          player.runCommand(`effect @s clear`);
          player.runCommand(`gamemode s @s`);
        }
      }
      // set home
      if (commandName == "sethome") {
        msg.cancel = true;
        let player = msg.sender;
        if (player.hasTag("InSpawn")) {
          sendMsgToPlayer(player, `§cYou can't do this here! `);
          return;
        }
        if (player.hasTag("InVault")) {
          sendMsgToPlayer(player, `§cYou can't do this here! `);
          return;
        }
        // Get current location
        let { x, y, z } = player.location;
        let homex = x.toFixed(0);
        let homey = y.toFixed(0);
        let homez = z.toFixed(0);
        let currentDimension;
        if (args.length > 1) {
          sendMsgToPlayer(player, `§a No spaces in names please!`);
          return;
        }
        let verify = false;
        let counter = 0;
        let tags = player.getTags();
        let premium = ["End1", "End2", "End3", "End4", "End5"];
        for (let i = 0; i < tags.length; i++) {
          if (tags[i].startsWith(args[0].toString() + " X", 13)) {
            verify = true;
            sendMsgToPlayer(
              player,
              `§a Home with name §6'${args[0]}'§a already exists!`
            );
            break;
          }
          if (tags[i].startsWith("LocationHome:")) {
            counter = ++counter;
          }
          if (
            counter >= config.modules.setHome.max &&
            config.modules.setHome.enabled
          ) {
            verify = true;
            sendMsgToPlayer(
              player,
              `§a You can only have §6${config.modules.setHome.max}§a saved locations at a time!`
            );
            break;
          }
        }
        if (verify === true) {
          return;
        }
        // Save which dimension they were in
        if (player.dimension.id === "minecraft:overworld") {
          currentDimension = "overworld";
        }
        if (player.dimension.id === "minecraft:nether") {
          currentDimension = "nether";
        }
        if (
          player.dimension.id === "minecraft:the_end" &&
          player.hasTag("End1")
        ) {
          currentDimension = "the_end";
          return;
        }
        if (
          player.dimension.id === "minecraft:the_end" &&
          player.hasTag("End2")
        ) {
          currentDimension = "the_end";
          return;
        }
        if (
          player.dimension.id === "minecraft:the_end" &&
          player.hasTag("End3")
        ) {
          currentDimension = "the_end";
          return;
        }
        if (
          player.dimension.id === "minecraft:the_end" &&
          player.hasTag("End4")
        ) {
          currentDimension = "the_end";
          return;
        }
        if (
          player.dimension.id === "minecraft:the_end" &&
          player.hasTag("End5")
        ) {
          currentDimension = "the_end";
          return;
        }
        if (
          player.dimension.id === "minecraft:the_end" &&
          (!player.hasTag("End1") ||
            !player.hasTag("End2") ||
            !player.hasTag("End3") ||
            !player.hasTag("End4") ||
            !player.hasTag("End5"))
        ) {
          sendMsgToPlayer(
            player,
            `§a Not allowed to set home in this dimension! buy one!`
          );
          return;
        }
        // Store their new home coordinates
        player.addTag(
          `LocationHome:${args[0]} X:${homex} Y:${homey} Z:${homez} Dimension:${currentDimension}`
        );
        sendMsgToPlayer(
          player,
          `§a Home §6'${args[0]}'§a has been set at ${homex} ${homey} ${homez} in ${currentDimension}!`
        );
      }
      // go to home
      if (commandName == "gohome") {
        msg.cancel = true;
        let player = msg.sender;
        if (player.hasTag("InCombat")) {
          sendMsgToPlayer(player, [`§cYou can't leave during a Fight `]);
          return;
        }
        let homex;
        let homey;
        let homez;
        let dimension;
        let coordinatesArray;
        let tags = player.getTags();
        for (let i = 0; i < tags.length; i++) {
          if (tags[i].startsWith(args[0].toString() + " X", 13)) {
            // Split string into array
            coordinatesArray = tags[i].split(" ");
            break;
          }
        }
        for (let i = 0; i < coordinatesArray.length; i++) {
          // Get their location from the array
          if (coordinatesArray[i].includes("X:")) {
            homex = parseInt(coordinatesArray[i].replace("X:", ""));
          }
          if (coordinatesArray[i].includes("Y:")) {
            homey = parseInt(coordinatesArray[i].replace("Y:", ""));
          }
          if (coordinatesArray[i].includes("Z:")) {
            homez = parseInt(coordinatesArray[i].replace("Z:", ""));
          }
          if (coordinatesArray[i].includes("Dimension:")) {
            dimension = coordinatesArray[i].replace("Dimension:", "");
          }
        }
        if (!homex || !homey || !homez || !dimension) {
          sendMsgToPlayer(player, `§a Home §6'${args[0]}'§a does not exist!`);
        } else {
          let cooldownCalc;
          let activeTimer;
          // Get original time in milliseconds
          let cooldownVerify = cooldownTimer.get(player);
          // Convert config settings to milliseconds so we can be sure the countdown is accurate
          let msSettings =
            config.modules.goHome.days * 24 * 60 * 60 * 1000 +
            config.modules.goHome.hours * 60 * 60 * 1000 +
            config.modules.goHome.minutes * 60 * 1000 +
            config.modules.goHome.seconds * 1000;
          if (cooldownVerify !== undefined) {
            // Determine difference between new and original times in milliseconds
            let bigBrain = new Date().getTime() - cooldownVerify;
            // Subtract realtime clock from countdown in configuration to get difference
            cooldownCalc = msSettings - bigBrain;
            // Convert difference to clock format D : H : M : S
            activeTimer = dhms(cooldownCalc);
          } else {
            // First time executed so we default to configuration in milliseconds
            cooldownCalc = msSettings;
          }
          // If timer doesn't exist or has expired then grant permission to teleport and set the countdown
          if (cooldownCalc === msSettings || cooldownCalc <= 0) {
            player.runCommand(`scoreboard players set @s teleport 25`);
            player.teleport(
              new Location(homex, homey, homez),
              World.getDimension(dimension),
              0,
              0
            );
            sendMsgToPlayer(player, `§a Welcome back to ${args[0]}!`);

            // Delete old key and value
            cooldownTimer.delete(player);
            // Create new key and value with current time in milliseconds
            cooldownTimer.set(player, new Date().getTime());
          } else {
            // Teleporting to fast
            sendMsgToPlayer(
              player,
              `§a Too fast! Please wait for §6${activeTimer}§a before going home.`
            );
          }
        }
      }
      if (commandName == "listhome") {
        msg.cancel = true;
        let player = msg.sender;
        let tags = player.getTags();
        let counter = 0;
        let verify = false;
        for (let i = 0; i < tags.length; i++) {
          if (tags[i].startsWith("LocationHome:")) {
            let coordinatesArray = tags[i].split(" ");
            let home;
            let homex;
            let homey;
            let homez;
            let dimension;
            counter = ++counter;
            for (let i = 0; i < coordinatesArray.length; i++) {
              //Get their location from the array
              if (coordinatesArray[i].includes("LocationHome:")) {
                home = coordinatesArray[i].replace("LocationHome:", "");
                //    sendMsgToPlayer(player, `${home} set name`)
              }
              if (coordinatesArray[i].includes("X:")) {
                homex = parseInt(coordinatesArray[i].replace("X:", ""));
                //    sendMsgToPlayer(player, `${homex}set X`)
              }
              if (coordinatesArray[i].includes("Y:")) {
                homey = parseInt(coordinatesArray[i].replace("Y:", ""));
                //    sendMsgToPlayer(player, `${homey}set Y`)
              }
              if (coordinatesArray[i].includes("Z:")) {
                homez = parseInt(coordinatesArray[i].replace("Z:", ""));
                //    sendMsgToPlayer(player, `${homez} set Z`)
              }
              if (coordinatesArray[i].includes("Dimension:")) {
                dimension = coordinatesArray[i].replace("Dimension:", "");
                //    sendMsgToPlayer(player, `${dimension} set Dimension`)
              }
              if (!homex || !homey || !homez || !dimension) {
                continue;
              } /*
                            if (homex && homey && homez && !dimension) {
                                sendMsgToPlayer(player, ` | something was WRONG¡ §b-§f${home}§b-§r §d=>§r ${homex} ${homey} ${homez} §d<=§r §b-§f${dimension}§b-§r`);
                                continue;
                            }*/ else {
                verify = true;
                if (counter == 1) {
                  sendMsgToPlayer(player, `§l-§6List Of Homes§r§l-§r`);
                }
                sendMsgToPlayer(
                  player,
                  ` §a| §l§b[§r§f${home}§b§l]§r §d=>§r §e${homex} ${homey} ${homez} §d<=§r §b§l-§r§f${dimension}§b§l-§r`
                );
                continue;
              }
            }
            continue;
          }
          continue;
        }
        if (verify === false) {
          sendMsgToPlayer(player, `§aYou have none saved locations.`);
        }
      }
      if (commandName == "delhome") {
        msg.cancel = true;
        let player = msg.sender;
        if (args.length > 1) {
          sendMsgToPlayer(player, `§a No spaces in names please!`);
        }
        let verify = false;
        let tags = player.getTags();
        for (let i = 0; i < tags.length; i++) {
          if (tags[i].startsWith(args[0].toString() + " X", 13)) {
            verify = true;
            player.removeTag(tags[i]);
            sendMsgToPlayer(
              player,
              `§a Successfully deleted home '§6${args[0]}§a'!`
            );
            break;
          }
        }
        if (verify === true) {
          return;
        } else {
          sendMsgToPlayer(player, `§a Home '§6${args[0]}§a' does not exist!`);
        }
      }
      if (commandName == "gmv") {
        msg.cancel = true;
        let player = msg.sender;
        if (!player.hasTag("Helper")) {
          sendMsgToPlayer(
            player,
            `§a You need to be §6Server-Staff§a to use this command.`
          );
          return;
        } else if (player.hasTag("Helper") && !player.hasTag("gms")) {
          sendMsgToPlayer(player, `§a Gamemode Spectator §bON!`);
          sendMsg(
            "@a[tag=Moderator]",
            `§6 ${player.nameTag}§e is on gamemode Spectator`
          );
          player.runCommand(`gamemode 6 @s`);
          player.runCommand(`effect @s[tag=Helper] night_vision 100000 5 true`);
          player.runCommand(`effect @s[tag=Helper] invisibility 100000 5 true`);
          player.addTag("gms");
          player.removeTag("gmc");
        } else if (player.hasTag("Helper") && player.hasTag("gms")) {
          sendMsgToPlayer(player, `§a Gamemode Spectator §cOFF!`);
          sendMsg(
            "@a[tag=Moderator]",
            `§6 ${player.nameTag}§e is on gamemode S`
          );
          player.removeTag("gms");
          player.runCommand(`effect @s clear`);
          player.runCommand(`gamemode s @s`);
        }
      }
      if (commandName == "tpr") {
        msg.cancel = true;
        let player = msg.sender;
        if (player.hasTag("InCombat")) {
          sendMsgToPlayer(player, [`§cYou can't use this command during a Fight `]);
          return;
        }
        if (argCheck && args[0].toLowerCase() === "block") {
          player.addTag("tprblock");
          return sendMsgToPlayer(
            player,
            `§a You have blocked all future teleport requests!`
          );
        } else if (argCheck && args[0].toLowerCase() === "unblock") {
          player.removeTag("tprblock");
          return sendMsgToPlayer(
            player,
            `§a You have unblocked all future teleport requests!`
          );
        }
        let member;
        if (args.length) {
          for (let pl of World.getPlayers()) {
            if (
              pl.nameTag
                .toLowerCase()
                .includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))
            ) {
              member = pl;
            }
          }
        }
        if (!member) {
          return sendMsgToPlayer(player, `§a Couldnt find that player!`);
        }
        if (member.hasTag("tprblock")) {
          return sendMsgToPlayer(
            player,
            `§a This player has all teleport requests blocked!`
          );
        }
        if (player.name === member.name) {
          return sendMsgToPlayer(
            player,
            `§a You cannot send a teleport request to yourself! Try again.`
          );
        }
        if (member.hasTag("tpr")) {
          let cooldownCalc;
          let cooldownVerify = cooldownTimer.get(member);
          let msSettings =
            config.modules.tpr.days * 24 * 60 * 60 * 1000 +
            config.modules.tpr.hours * 60 * 60 * 1000 +
            config.modules.tpr.minutes * 60 * 1000 +
            config.modules.tpr.seconds * 1000;
          if (cooldownVerify !== undefined) {
            let bigBrain = new Date().getTime() - cooldownVerify;
            cooldownCalc = msSettings - bigBrain;
          } else {
            cooldownCalc = msSettings;
          }
          if (cooldownCalc === msSettings || cooldownCalc <= 0) {
            // Delete old key and value
            cooldownTimer.delete(member);
            // Create new key and value with current time in milliseconds
            cooldownTimer.set(member, new Date().getTime());
            // Set up the request
            if (!player.hasTag("tpr:" + member.name)) {
              player.addTag("tpr:" + member.name);
            }
            sendMsgToPlayer(
              player,
              `§a Hello ${player.name}! Your teleport request has been sent to ${member.name}.`
            );
            sendMsgToPlayer(
              member,
              `§a Hello ${member.name}! ${player.name} is requesting to teleport to your location! Type yes or no.`
            );
            return;
          } else {
            return sendMsgToPlayer(
              player,
              `§a ${member.name} is pending a request. Try again later.`
            );
          }
        } else {
          member.addTag("tpr");
          player.addTag("tpr:" + member.name);
          sendMsgToPlayer(
            player,
            `§a Hello ${player.name}! Your teleport request has been sent to ${member.name}.`
          );
          sendMsgToPlayer(
            member,
            `§a Hello ${member.name}! ${player.name} is requesting to teleport to your location! Type yes or no.`
          );
          return;
        }
      }
    } else {
      let message = msg.message;
      let player = msg.sender;
      sendMsg("@a", `${player.name}::: ${message}`);
      msg.cancel = true;
      return;
    }
  } else {
    let message = msg.message;
    let player = msg.sender;
    sendMsg("@a", `${player.name}$$$ ${message}`);
    msg.cancel = true;
  }
});
