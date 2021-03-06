
export interface Stat {
	[index:string]: number
	atkPer: number
	hpPer: number
	defPer: number
	atk: number
	hp: number
	def: number
	spd: number
	cri: number
	criDmg: number
	eff: number
    res: number
}

export interface StatDetail {
	name: string
	stat: number
	maxStat: number
	reforgeStat: number
	reforgeMaxStat: number
	rollCnt: number
}