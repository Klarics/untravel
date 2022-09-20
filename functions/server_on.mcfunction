tag @s add Adminer
tag @s add staffstatus
tellraw @a {"rawtext":[{"text":"§bSe asignaron los permisos de Server (§d1§f/§d10§b)!"}]}
tickingarea add circle 0 ~ 0 2 Base
tickingarea add circle 50000 ~ 50000 2 Control
tellraw @a {"rawtext":[{"text":"§bTickingAreas agregados (§d2§f/§d10§b)!"}]}
structure load Zero000 -10 61 -10
structure load Control000 50000 200 50000
structure load airControl 50000 200 50000
tellraw @a {"rawtext":[{"text":"§bEstructuras de Control instaladas (§d3§f/§d10§b)!"}]}
gamerule sendcommandfeedback false
gamerule commandblockoutput false
gamerule  mobgriefing false
tellraw @a {"rawtext":[{"text":"§bGameRules Activados (§d4§f/§d10§b)!"}]}
scoreboard objectives add Dones dummy §eGifts
scoreboard objectives add enderClock dummy E-Clock
scoreboard objectives add time_00 dummy §l§o§eSeconds
scoreboard objectives add time_01 dummy §l§o§eMinutes
scoreboard objectives add time_11 dummy §l§o§eHours
scoreboard objectives add time_10 dummy §l§o§eDays
scoreboard objectives add _9999 dummy Banco
scoreboard objectives add _0000 dummy §bSaldo
scoreboard objectives add propiedad dummy
scoreboard objectives add server dummy §dUntravel§eMx
scoreboard objectives add prote dummy
scoreboard objectives add depa dummy §l§o§bDepartment
scoreboard objectives add trash dummy §eTrashPeople
scoreboard objectives add ooo6 dummy §dDBEnder
scoreboard objectives add rank_status dummy §l§o§eRangos
scoreboard objectives add kill dummy §l§o§cKills
scoreboard objectives add _Death dummy §l§o§cMuertes
scoreboard objectives add off dummy §l§o§binactivo
scoreboard objectives add on dummy §l§o§bactivo
scoreboard objectives add omega dummy §l§o§cTecutli-Omega
scoreboard objectives setdisplay belowname kill
tellraw @a {"rawtext":[{"text":"§bScores instaladas con exito (§d5§f/§d10§b)!"}]}
setblock -2 62 5 air
tellraw @a {"rawtext":[{"text":"§bProtecciones Activadas (§d6§f/§d10§b)!"}]}
tellraw @a {"rawtext":[{"text":"§bBelowName Activado (§d7§f/§d10§b)!"}]}
scoreboard objectives add Mana dummy
tellraw @a {"rawtext":[{"text":"§bSistema de maná Activado (§d8§f/§d10§b)!"}]}
scoreboard objectives add wither_Arena dummy
tellraw @a {"rawtext":[{"text":"§bScores for Coliseo Added (§d9§f/§d10§b)!"}]}
structure load Control000 50000 200 50000
tellraw @a {"rawtext":[{"text":"§bDoned - Todo Listo! (§d10§f/§d10§b)!"}]}
gamerule sendcommandfeedback true