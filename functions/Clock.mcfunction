scoreboard players add @a[scores={time_01=60..}] time_11 1
scoreboard players set @a[scores={time_01=60..}] time_01 0

scoreboard players add @a[scores={time_00=60..}] time_01 1
scoreboard players set @a[scores={time_00=60..}] time_00 0

#scoreboard players add @a[scores={time_11=24..}] time_10 1
#scoreboard players set @a[scores={time_11=24..}] time_11 0
scoreboard players set @a[scores={enderClock=7..}] enderClock 1
