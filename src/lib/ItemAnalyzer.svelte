<script lang="ts">
    import { Row } from "sveltestrap";
    import type { Stat } from "../type/index";
    import { MaxStats, StatWeight, round2decimal } from "./stat";

    export let stat: Stat;
    const onStatChanged = (st: Stat) => {
        isRankFocused = false;
        isUpgradeFocused = false;
    }
    // 스탯 바뀔때마다 등급/강화횟수 초기화
    $: onStatChanged(stat);

    let rank = 0;
    let isRankFocused = false;
    let upgrade = 0;
    let isUpgradeFocused = false;

    const onRankFocus = () => {
        isRankFocused = true;
    };
    const onUpgradeFocus = () => {
        isUpgradeFocused = true;
    }

    $: calcData = () => {
        let rollCnt = 0;
        let modCnt = 0;
        let score = 0;
        let maxScore = 0;
        Object.keys(stat).forEach((key) => {
            const val = stat[key];
            const maxVal = MaxStats[key];
            const weight = StatWeight[key];
            console.log(key, val);
            if (val > 0) {
                modCnt++;
                const curRollCnt = Math.ceil(val/maxVal);
                rollCnt += curRollCnt;
                score += weight * val;
                maxScore += weight * (maxVal * curRollCnt);
            }
        });

        // TODO rank와 upgrade로 분기 세팅?

        if (modCnt > 5) {
            return 'ERROR 입력된 값이 5개가 넘습니다.';
        }
        let rollCntMessage = '';
        if (rollCnt < 3) {
            return '3개 이상의 옵션을 넣어주세요';
        } else if (rollCnt < 4) {
            rollCntMessage = '85레벨 노강 영웅템 기준';
        } else if ( rollCnt === 4) {
            rollCntMessage = '85레벨 노강 전설템 / 3강 영웅템 기준'
        } else if (rollCnt < 10) {
            const modCnt = rollCnt - 4;
            rollCntMessage = '85렙 ' + (modCnt * 3) + '강 전설템 기준';
        } else {
            rollCntMessage = '85렙 이상 15강 전설템 기준';
        }
        const message = '점수: ' + round2decimal(score) + ' / 최대점수: ' + round2decimal(maxScore) + ' (' + round2decimal((score/maxScore)*100) + '%) 점수의 아이템이에요.';

        return `${rollCntMessage}
        ${message}
        (강화 단계가 다르면 왼쪽에서 조정해주세요)`;
    };

// <Col>
//     <Label for="rank">등급</Label>
//     <Input type="number" name="rank"
//         on:focus={ onRankFocus }
//         bind:value={rank}/>
//     <Label for="upgrade">강화단계</Label>
//     <Input type="number" name="upgrade"
//         on:focus={ onUpgradeFocus }
//         bind:value={upgrade}/>
// </Col>
</script>

<Col>
    <div style="white-space:pre-wrap">
        {calcData()}
    </div>
</Col>