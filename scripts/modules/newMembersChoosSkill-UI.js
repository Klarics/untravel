import { world } from "mojang-minecraft";
import { ActionFormData } from "mojang-minecraft-ui";
const gui = new ActionFormData()
    .title('§l§6Choose Skill')
    .body('\n  §oSelect the Skill that you want to have\n  And be part of a Faction\n  This will be forever once')
    .button('§bAtlan', "textures/items/prismarine_crystals")
    .button('§eMiner', "textures/items/netherite_pickaxe")
    .button('§dEnder', "textures/items/ender_eye")

world.events.beforeItemUse.subscribe(data => {
    const source = data.source
    if (data.item.id === 'minecraft:compass' && getSkill(source) == 0) {
        gui.show(source).then(result => {
            if (result.isCanceled) {
                source.runCommand(`tellraw @s {"rawtext":[{"text":"§eYou §lshoud §r§eto select a Skill"}]}`)
            }
            if (result.selection === 0) {
                source.runCommand(`scoreboard players set @s Dones 1`)
                source.runCommand(`tellraw @a {"rawtext":[{"text":"§b${source.nameTag} §r§l are now §bAtlantian"}]}`)
                data.item.amount -= 1;
            }
            if (result.selection === 1) {
                source.runCommand(`scoreboard players set @s Dones 3`)
                source.runCommand(`tellraw @a {"rawtext":[{"text":"§b${source.nameTag}§r§l are now §aMiner"}]}`)
                data.item.amount -= 1;
            }
            if (result.selection === 2) {
                source.runCommand(`scoreboard players set @s Dones 2`)
                source.runCommand(`tellraw @a {"rawtext":[{"text":"§b${source.nameTag}§r§l are now §dEnder"}]}`)
                data.item.amount -= 1;
            }
        })
    }
    if (data.item.id === 'minecraft:paper' && data.item.nameTag === '§r§ltest') {
        data.source.runCommand(`give @s ender_pearl`)
        data.item.amount -= 1;
    }
    if (data.item.id === 'minecraft:ender_pearl') {
        data.source.runCommand(`scoreboard players set @s enderClock 1`)
        data.source.runCommand(`effect @s night_vision 10 0 true`)
        data.source.runCommand(`effect @s regeneration 4 2 true`)
    }
})

function getSkill(player) {
    return world.scoreboard.getObjective('Dones').getScore(player.scoreboard);
}