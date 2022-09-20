#execute @a[scores={enderClock=2}] ~ ~ ~ scoreboard players random @s[scores={enderClock=0}] enderClock 1 10
#execute @a[scores={enderClock=1}] ~ ~ ~ clear @s ender_pearl 
#execute @a[scores={enderClock=1}] ~ ~ ~ scoreboard players set @s enderClock 2 
execute @a[scores={enderClock=1}] ~ ~ ~ give @s[scores={Dones=2}] ender_pearl 1
execute @a[scores={enderClock=1}] ~ ~ ~ scoreboard players set @s enderClock 0
#execute @a[scores={enderClock=6}] ~ ~ ~ scoreboard players set @s enderClock 1

