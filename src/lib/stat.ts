import type { Stat } from "src/type";

export const MaxStats = <Stat>{
    atkPer: 8,
    hpPer: 8,
    defPer: 8,
    atk: 42,
    hp: 202,
    def: 34,
    spd: 5,
    cri: 5,
    criDmg: 7,
    eff: 8,
    res: 8,
}

export const StatWeight = <Stat>{
	atkPer: 1,
	hpPer: 1,
	defPer: 1,
	atk: (3.46 / 39),
	hp: (3.09 / 174),
	def: (4.99 / 31),
	spd: 2,
	cri: 1.6,
	criDmg: (8/7),
	eff: 1,
	res: 1,
}

export const round2decimal = (num: number) => Math.round(num * 100) / 100