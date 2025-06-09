"use client";
import {useState} from "react";

export default function Pathfinding() {
    let [grid, setGrid] = useState(1); // 1 = small, 2 = medium, 3 = large

    return (
        <div className={'bg-black min-h-dvh flex flex-row'}>
            <div id={'param-editor'} className={'border border-green-300 w-1/5'}></div>
            <div id={'runtime-container'} className={'border border-orange-300 w-4/5'}>

            </div>
        </div>
    )
}