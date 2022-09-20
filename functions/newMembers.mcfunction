effect @s[tag=!vivo] regeneration 6 3 true
give @s[tag=!vivo] compass
xp 1l @s[tag=!vivo]
tellraw @s[tag=!vivo] {"rawtext":[{"text":"§b§l"},{"selector":"*"},{"text":" §ewelcome to Untravel, the world limit is 4000 blocks and the spawn is to eliminate players if you absorb their xp, good luck \n §aFollow the path y see the Temple spawn .. go back there and take a Skill inside the pressure plate \n §b Remember that to get title and title range effects you must get kills in spawn.. so kills and absorb xp in spawn"}]}
execute @s[tag=!vivo] ~ ~ ~ tellraw @a {"rawtext":[{"text":"§l§aNew Member"}]} 
tag @a[tag=!vivo] add vivo