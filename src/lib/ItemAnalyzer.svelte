<script lang="ts">
    import type { Stat } from "../type/index";
    import { MaxStats, StatWeight, round2decimal } from "./stat";

    export let stat: Stat;

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
                rollCnt += Math.ceil(val/maxVal);
                score += weight * val;
                maxScore += weight * maxVal;
            }
        });

        if (modCnt > 5) {
            return 'ERROR 입력된 값이 5개가 넘습니다.';
        }
        let rollCntMessage = '';
        if (rollCnt < 4) {
            rollCntMessage = '85레벨 노강 영웅템 기준';
        } else if ( rollCnt === 4) {
            rollCntMessage = '85레벨 노강 전설템 / 3강 영웅템 기준'
        } else if (rollCnt < 10) {
            const modCnt = rollCnt - 4;
            rollCntMessage = '85렙 ' + (modCnt * 3) + '강 전설템 기준';
        } else {
            rollCntMessage = '85렙 이상 15강 전설템 기준';
        }
        const message = round2decimal(score) + '/' + round2decimal(maxScore) + ' (' + round2decimal(score/maxScore) + '%) 점수의 아이템이에요.';

        return `${rollCntMessage}
        ${message}
        (만약 3강이 적게 보인다면, 최대 점수에 8점을 더하세요)`;
    };

</script>

<div style="white-space:pre-wrap">
    {calcData()}
</div>