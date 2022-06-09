import type { Stat } from "src/type";

const KRStatName:Record<string, string> = {
    atkPer: '공격력%',
    hpPer: '생명력%',
    defPer: '방어력%',
    eff: '효적',
    res: '효저',
    atk: '깡공',
    hp: '깡생',
    def: '깡방',
    criDmg: '치피',
    cri: '치확',
    spd: '속도',
}

export const MaxStats = <Stat>{
    atkPer: 8,
    hpPer: 8,
    defPer: 8,
    eff: 8,
    res: 8,
    atk: 28 * 1.67, // 46.76
    hp: 90 * 2.25, // 202.5
    def: 14 * 2.5, // 35
    criDmg: 7,
    cri: 5,
    spd: 4, // Actuall max stat is 5 (low possibility)
}

export const StatWeight = <Stat>{
	atkPer: 1,
	hpPer: 1,
	defPer: 1,
	eff: 1,
	res: 1,
	atk: (3.46 / 39),
	hp: (3.09 / 174),
	def: (4.99 / 31),
	criDmg: (8/7),
	cri: 1.6,
	spd: 2,
}

const reforgeStats = {
    default: [0, 1, 3, 4, 5, 7, 8],
    // cri: [0, 1, 2, 3, 4, 5, 6],
    criDmg: [0, 1, 2, 3, 4, 6, 7],
    spd: [0, 0, 1, 2, 3, 4, 4],
    // atk: [0, 11, 18, 24, 30, 38, 47],
    // def: [0, 9, 14, 20, 25, 29, 34],
    // hp: [0, 59, 81, 112, 147, 173, 202],
}

export const getReforgeStats = (stat: string, roll: number) => {
    if (roll > 6 || roll < 0) return 0;
    switch(stat) {
        case 'cri':
            return roll;
        case 'criDmg':
            return reforgeStats.criDmg[roll];
        case 'spd':
            return reforgeStats.spd[roll];
        case 'atk':
            return roll * 11;
        case 'def':
            return roll * 9;
        case 'hp':
            return roll * 56;
        default:
            return reforgeStats.default[roll];
    }
}

export const Rank = {
    Hero: 0,
    Legend: 1,
}

export const Upgrade:Record<string, number> = {
    '~3': 1,
    '~6': 2,
    '~8': 3,
    '~12': 4,
    '15+': 5,
}

export const getStatName = (stat: string) => {
    return KRStatName[stat];
}

export const round2decimal = (num: number) => Math.round(num * 100) / 100
export const round1decimal = (num: number) => Math.round(num * 10) / 10