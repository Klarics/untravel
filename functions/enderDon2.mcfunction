#execute @e[type=ender_pearl] ~ ~ ~ effect @a[r=3,scores={Dones=2}] night_vision 10 0 true
#execute @e[type=ender_pearl] ~ ~ ~ effect @a[r=3,scores={Dones=2}] regeneration 4 2 true
#execute @a[scores={Dones=2}] ~ ~ ~ scoreboard players random @s[scores={enderClock=0}] enderClock 1 10
execute @e[type=enderman] ~ ~ ~ effect @a[r=5,scores={Dones=2}] health_boost 180 4
tag @a[scores={Dones=2}] add EnderDon
tag @a[scores={Dones=!2}] remove EnderDon