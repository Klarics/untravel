effect @a[tag=vivo,l=0,scores={kill=..799}] regeneration 6 3 true
scoreboard players add @a[tag=vivo,l=0] _Death 1
titleraw @a[tag=vivo,l=0] title {"rawtext":[{"text":"§cDeaths: §f"},{"score":{"name":"*","objective":"_Death"}},{"text":"\n §3D: §f"},{"score":{"name":"*","objective":"time_10"}},{"text":"  "},{"score":{"name":"*","objective":"time_11"}},{"text":":"},{"score":{"name":"*","objective":"time_01"}},{"text":":"},{"score":{"name":"*","objective":"time_00"}}]}
give @a[scores={Dones=2},l=0] ender_pearl 1
tellraw @a[tag=vivo,l=0] {"rawtext":[{"text":"§etry not to die again"}]}
xp 1l @a[tag=vivo,l=0]
