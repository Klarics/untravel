execute @e[type=armor_stand,name=§r§r§l§dSave] ~ ~ ~ gamemode s @a[r=100,tag=!Adminer]
execute @e[type=armor_stand,name=§r§r§l§dSave] ~ ~ ~ tp @e[r=2,name=!§r§r§l§dSave] ~ ~-51 ~-28
execute @e[type=armor_stand,name=§r§r§l§dSave] ~ ~ ~ tp @e[type=wither,r=150] 50000 180 50000
execute @e[type=armor_stand,name=§r§r§l§dSave] ~ ~ ~ kill @e[type=ender_pearl,r=60]
execute @e[type=armor_stand,name=§r§r§l§dSave] ~ ~ ~ kill @e[type=tnt,r=70]
execute @e[type=armor_stand,name=§r§r§l§dSave] ~ ~ ~ clear @a[r=600] chorus_fruit
execute @e[type=armor_stand,name=§r§r§l§dSave] ~ ~ ~ effect @s invisibility 10 0 true
execute @e[type=armor_stand,name=§r§r§l§dSave] ~ ~ ~ tag @a[r=100,tag=!InVault] add InVault
execute @e[type=armor_stand,name=§r§r§l§dSave] ~ ~ ~ tag @a[rm=101,r=500000,tag=InVault] remove InVault
execute @e[type=armor_stand,name=§r§r§l§dSave] ~ ~ ~ execute @a[tag=vivo,l=0] ~ ~ ~ tellraw @a {"rawtext":[{"text":"§b§l"},{"selector":"@a[tag=vivo,l=0]"},{"text":" §r§dwas reduced to nothing"}]}
execute @e[type=armor_stand,name=§r§r§l§dSave] ~ ~ ~ tickingarea add circle  ~ ~ ~ 2 Boveda

