gamemode s @a[m=1,tag=!Adminer]
scoreboard players set @a[tag=Adminer] trash 0
scoreboard players set @a[m=1,tag=!Adminer] trash 1
#gamemode a @a[scores={trash=1..}]
#execute @e[type=creeper] ~ ~ ~ effect @a[r=3] nausea 60 0 true
#execute @e[type=phantom] ~ ~ ~ effect @a[r=3] blindness 5 2 true
tp @e[type=zombie_pigman,tag=!Pigman] ~ ~-400 ~
#gamemode a @a[m=6,tag=!staffstatus]
execute @e[type=warden] ~ ~ ~ effect @a[r=5] blindness 5 4 true