<script lang="ts">
    import { Col, Table, Tooltip } from "sveltestrap";
    import type { Stat, StatDetail } from "../type/index";
    import { MaxStats, StatWeight, round2decimal, getReforgeStats, } from "./stat";
    import { _ } from 'svelte-i18n';

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
    let statList:StatDetail[] = [];
    let isGodItem:boolean = false;
    let message:string = '';

    // $: console.log(statList);
    // $: console.log('statChange', stat);

    const setStatList = (stat:Stat) => {
        const tempStatList:StatDetail[] = [];
        let rollCnt = 0
        let modCnt = 0
        let score = 0
        let maxScore = 0
        let reforgeScore = 0
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
                // console.log(key, 'rollCnt', curRollCnt, 'value', val, 'reforge', getReforgeStats(key, curRollCnt));

                const reforgeMaxVal = maxVal + getReforgeStats(key, 1);
                const reforgeRollCnt = Math.ceil(val/reforgeMaxVal);
                tempStatList.push({
                    name: key,
                    stat: val,
                    maxStat: maxVal * curRollCnt,
                    reforgeStat: getReforgeStats(key, curRollCnt),
                    reforgeMaxStat: reforgeMaxVal * reforgeRollCnt,
                    rollCnt: curRollCnt - 1,
                });
            }
        });
        statList = tempStatList;

        
        let rollCntMessage = '';
        let isInvalid = false;
        
        isGodItem = false;  // Items that bigger than 85 max rolls
        if (modCnt > 4) {
            rollCntMessage = $_('Gear cannot exceed 4 substats');
            isInvalid = true;
        } else if (rollCnt < 3) {
            rollCntMessage = $_('Gear requires more than 3 substats');
            isInvalid = true;
        } else if (rollCnt < 4) {
            rollCntMessage = $_('Based on 85level +0 Heroic gear');
        } else if ( rollCnt === 4) {
            rollCntMessage = $_('Based on 85level +0 Epic or +3 Heroic gear');
        } else if (rollCnt < 10) {
            const modCnt = rollCnt - 4;
            rollCntMessage = $_('Based on 85level +N Epic gear', { values: { roll: modCnt * 3 } });
        } else {
            isGodItem = true;
            rollCntMessage = $_('Based on 90level +15 Epic gear');
        }

        if (isInvalid) message = rollCntMessage;
        else if (score > 84) {
            message = $_('Score is too high. please check the input values');
        } else if (isGodItem) {
            const resultMessage = $_('Result', { values: { score: round2decimal(score), maxScore: 82, percent: round2decimal((score/82)*100) } });
            message = `${rollCntMessage}\n${resultMessage}`;
        } else  {
            const resultMessage = $_('Result', { values: { score: round2decimal(score), maxScore: round2decimal(maxScore), percent: round2decimal((score/maxScore)*100) } });
            const reforgeExpectMessage = $_('Expected reforge result', { values: { score: round2decimal(score + reforgeScore) } });
            message = `${rollCntMessage}\n${resultMessage}\n${reforgeExpectMessage}`;
        }
    }
    
    $: setStatList(stat);
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

<Col md=12 lg={{size:8, offset:2}}>
    <div style="white-space:pre-wrap" class="mt-3">
        {message}
    </div>
    {#if statList.length > 0}
    <Table>
        <thead>
            <tr>
                <th class="border-end">{$_('statName')}</th>
                <th class="border-end">{$_('value/max value')}</th>
                <th class="border-end">{$_('rollCnt')}</th>
                <th>{$_('reforgedValue')}</th>
            </tr>
        </thead>
        <tbody>
            {#each statList as stat}
            <tr>
                <td class="border-end">{$_(`stat.${stat.name}`)}</td>
                <td class="border-end">{stat.stat}/{isGodItem ? stat.reforgeMaxStat : stat.maxStat}</td>
                <td class="border-end">{stat.rollCnt}</td>
                <td>{isGodItem ? '-' : stat.stat + stat.reforgeStat}</td>
            </tr>
            {/each}
        </tbody>
    </Table>
    {$_('** Roll count / Max value may not be accurate')}
    {/if}
</Col>