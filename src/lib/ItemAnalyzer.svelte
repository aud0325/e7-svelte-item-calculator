<script lang="ts">
    import { Col, Label, Input } from "sveltestrap";
    import type { Stat, StatDetail } from "$type/index";
    import { MaxStats, StatWeight, round2decimal, Rank, Upgrade, getReforgeStats, getStatName } from "./stat";

    export let stat: Stat;
    // const onStatChanged = (st: Stat) => {
    //     isRankFocused = false;
    //     isUpgradeFocused = false;
    // }
    // 스탯 바뀔때마다 등급/강화횟수 초기화
    // $: onStatChanged(stat);

    // let rank = Rank.Legend;
    // let isRankFocused = false;
    // let upgrade = Upgrade["15+"];
    // let isUpgradeFocused = false;

    // const onRankFocus = () => {
    //     console.log('focused!', rank);
    //     isRankFocused = true;
    // };
    // const onUpgradeFocus = () => {
    //     isUpgradeFocused = true;
    // }

    // $: baseModCnt = rank === Rank.Legend ? 4 : 3;
    // $: maxRollCnt = rank === Rank.Legend ? 9 : 8;
    // $: expectRollCnt = baseModCnt + upgrade;

    $: calcData = () => {
        let rollCnt = 0;
        let modCnt = 0;
        let score = 0;
        let maxScore = 0;
        let reforgeScore = 0;
        // let scoreDetailMessage = '';
        let statList:StatDetail[] = [];

        Object.keys(stat).forEach((key) => {
            const val = stat[key];
            const maxVal = MaxStats[key];
            const weight = StatWeight[key];
            if (val > 0) {
                const curRollCnt = Math.ceil(val/maxVal);
                modCnt++;
                rollCnt += curRollCnt;
                score += weight * val;
                maxScore += weight * (maxVal * curRollCnt);
                reforgeScore += weight * getReforgeStats(key, curRollCnt);
                console.log(key, 'rollCnt', curRollCnt, 'value', val, 'reforge', getReforgeStats(key, curRollCnt));

                const reforgeMaxVal = maxVal + getReforgeStats(key, 1);
                const reforgeRollCnt = Math.ceil(val/reforgeMaxVal);
                statList.push({
                    name: key,
                    stat: val,
                    maxStat: maxVal * curRollCnt,
                    reforgeStat: getReforgeStats(key, curRollCnt),
                    reforgeMaxStat: reforgeMaxVal * reforgeRollCnt,
                });
            }
        });

        if (modCnt > 4) {
            return 'ERROR 입력된 값이 4개가 넘습니다.';
        }

        let rollCntMessage = '';
        let isGodItem = false;  // Items that bigger than 85 max rolls
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
            isGodItem = true;
            rollCntMessage = '90렙 15강 전설템 기준';
        }
        
        const detailMessage = statList.reduce((acc, stat) => {
            const reforgeInfo = `  >>  ${stat.stat + stat.reforgeStat}`;
            const maxStat = isGodItem ? stat.reforgeMaxStat : stat.maxStat;
            return `${acc}${getStatName(stat.name)} : ${stat.stat}/${maxStat} ${isGodItem ? '' : reforgeInfo}\n`
        }, '\n스탯 상세\n');

        if (isGodItem) {
            return `${rollCntMessage}
점수: ${round2decimal(score)} / 최대점수: 81 (${round2decimal((score/81)*100)}%)
(아마도) 갓템일지도
${detailMessage}`;
        }

        const message = '점수: ' + round2decimal(score) + ' / 최대점수: ' + round2decimal(maxScore) + ' (' + round2decimal((score/maxScore)*100) + '%)';
        const reforgeMessage = '재련 시 예상 점수: ' + round2decimal(score + reforgeScore);

        return `${rollCntMessage}
        ${message}
        ${reforgeMessage}
        ${detailMessage}
        ** 최대 강화 수치는 틀릴 수도 있습니다`;
    };
</script>
<!-- <Col xs="3">
    <Label for="rank">등급</Label>
    <Input type="checkbox" label="고정"/>
    <Input type="select" name="rank"
        on:focus={ onRankFocus }
        bind:value={rank}>
        <option value="{Rank.Hero}">영웅</option>
        <option value="{Rank.Legend}">전설</option>
    </Input>
    <Label for="upgrade">강화단계
        <Input type="checkbox" label="고정"/></Label>
    <Input type="select" name="upgrade"
        on:focus={ onUpgradeFocus }
        bind:value={upgrade}>
        {#each Object.keys(Upgrade) as key }
            <option value="{Upgrade[key]}">{key}</option>
        {/each}
    </Input>
</Col> -->

<Col>
    <div style="white-space:pre-wrap" class="mt-3">
        {calcData()}
    </div>
</Col>