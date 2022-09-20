import { world } from "mojang-minecraft";

world.events.tick.subscribe((event) => {
    const player = Array.from(world.getPlayers())
    //const players = world.getPlayers()
    /*
    try {
        world.getDimension("overworld").runCommand(`titleraw @a[scores={depa=0},tag=!Adminer] actionbar {"rawtext":[{"text":" §6     "},{"selector":"*"},{"text":"\n    §6§o§eKills: §f"},{"score":{"name":"*","objective":"kill"}},{"text":"  Skill: §b"},{"score":{"name":"*","objective":"Dones"}},{"text":"   §cDeath: §f"},{"score":{"name":"*","objective":"_Death"}}]}`)
    } catch {

    }
    try {
        world.getDimension("overworld").runCommand(`titleraw @a[scores={depa=1..,kill=0..},tag=!Adminer] actionbar {"rawtext":[{"text":" §6     "},{"selector":"*"},{"text":"    §6§o§eKills: §f"},{"score":{"name":"*","objective":"kill"}},{"text":"  Skill: §b"},{"score":{"name":"*","objective":"Dones"}},{"text":"\n §5$"},{"score":{"name":"*","objective":"_9999"}},{"text":"   §3Home §b"},{"score":{"name":"*","objective":"depa"}},{"text":"   §cDeaths: §f"},{"score":{"name":"*","objective":"_Death"}}]}`)
    } catch {

    }*/
    try {
        world.getDimension("overworld").runCommand(
            `titleraw @a[scores={depa=1..,kill=0..}] actionbar {"rawtext":[{"text":" §6   "},{"selector":"*"},{"text":"   §6§o§eKills: §f"},{"score":{"name":"*","objective":"kill"}},{"text":"  Skill: §b"},{"score":{"name":"*","objective":"Dones"}},{"text":" §d$§6"},{"score":{"name":"*","objective":"_9999"}},{"text":"\n§3Home: §b"},{"score":{"name":"*","objective":"depa"}},{"text":"   §cDeaths: §f"},{"score":{"name":"*","objective":"_Death"}},{"text":"  Online: §a${player.length}"},{"text":"  §f"},{"score":{"name":"*","objective":"time_11"}},{"text":":"},{"score":{"name":"*","objective":"time_01"}},{"text":":"},{"score":{"name":"*","objective":"time_00"}}]}`
        )
        //world.getDimension("overworld").runCommand(
        //    `function actionBar`
        //)
    } catch {
        
    }
})