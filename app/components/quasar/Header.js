'use client';

import Image from "next/image";
import {useEffect, useState} from "react";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); // cleanup event listener
        }
    }, []);

    return (
        <div id={'main-header'}
             className={`fixed top-0 sm:left-[12.5%] z-10 px-5 flex flex-row backdrop-blur-lg bg-opacity-80 justify-between sm:rounded-full items-center md:w-3/4 h-16 bg-black font-inter
             ${scrolled ? 'sm:bg-zinc-900 sm:bg-opacity-80 sm:top-2 sm:border-none w-[2vw]' : 'w-full'} transition-all duration-500`}>
            <div className={'flex flex-row items-center gap-5'}>
                <Image src={'/images/quasar/appicon.png'} width={40} height={40} alt={'Quasar Logo'}
                       className={'rounded-full'}/>
                <h1 className={'text-white text-2xl font-bold'}>Quasar</h1>
            </div>
            <div className={'flex flex-row items-center gap-10'}>
                <a href={'/quasar#news'}
                   className={'text-white text-lg hover:text-blue-500 transition-colors duration-300'}>News</a>
                <a href={'/quasar#images'}
                   className={'text-white text-lg hover:text-blue-500 transition-colors duration-300'}>Images</a>
                <a href={'/quasar#data'}
                   className={'text-white text-lg hover:text-blue-500 transition-colors duration-300'}>Data</a>
                <a href={'/quasar#ai'}
                   className={'text-white text-lg hover:text-blue-500 transition-colors duration-300'}>AI</a>
                <a href={'/quasar#download'}
                   className={'text-white text-lg hover:text-blue-500 transition-colors duration-300'}>Download</a>
                <a href={'/quasar/support'}
                   className={'text-white text-lg hover:text-blue-500 transition-colors duration-300'}>Support</a>
            </div>
        </div>
    )
}