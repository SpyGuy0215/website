"use client";

import Image from "next/image";
import {useRouter} from "next/navigation";

export default function Experiences(){

    const router = useRouter();

    return (
        <div className={'bg-black min-h-dvh'}>
            <h1 className={'font-inter text-7xl text-white text-center pt-16'}>Experiences</h1>
            <div id={'experience-container'} className={'mx-16 mt-12'}>
                <div id={'pathfinding-playground'}
                     className={'border border-blue-400 rounded-2xl h-fit w-fit hover:scale-105 transition-transform'}
                    onClick={() => {
                        router.push('/experiences/pathfinding')
                    }}>
                    <h2 className={'text-3xl text-white font-inter text-center mt-5'}>Pathfinding Playground</h2>
                    <div className={'flex justify-center h-[25rem] w-[37.5rem] bg-amber-200 mx-10 my-10'}></div>
                </div>
            </div>
        </div>
    )
}