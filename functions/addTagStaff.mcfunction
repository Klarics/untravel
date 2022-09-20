#Adminer
execute @a[tag=Adminer,tag=!staffstatus] ~ ~ ~ tag @s add staffstatus
execute @a[tag=Adminer] ~ ~ ~ tag @s add Rank:§l§6Admin
execute @a[tag=Adminer,tag=Admin] ~ ~ ~ tag @s remove Rank:§l§bAdmin
#Admin
execute @a[tag=Admin,tag=!Adminer] ~ ~ ~ tag @s add Rank:§l§bAdmin
execute @a[tag=Admin,tag=!Moderator] ~ ~ ~ tag @s add Moderator
execute @a[tag=Admin,tag=Moderator] ~ ~ ~ tag @s remove Rank:§l§1Moderator

#Moderator
execute @a[tag=Moderator,tag=!Admin] ~ ~ ~ tag @s add Rank:§l§1Moderator
execute @a[tag=Moderator,tag=!Helper] ~ ~ ~ tag @s add Helper
execute @a[tag=Moderator,tag=Helper] ~ ~ ~ tag @s remove Rank:§l§eHelper

#helper
execute @a[tag=Helper,tag=!Moderator] ~ ~ ~ tag @s add Rank:§l§eHelper
execute @a[tag=Helper,tag=!Ambassador] ~ ~ ~ tag @s add Ambassador
execute @a[tag=Helper,tag=Ambassador] ~ ~ ~ tag @s remove Rank:§l§aAmbassador

#Ambassador
execute @a[tag=Ambassador,tag=!Helper] ~ ~ ~ tag @s add Rank:§l§aAmbassador