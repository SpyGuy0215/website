'use client';

import Image from "next/image";
import {useEffect, useState} from "react";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

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
        <>
            <div id={'main-header'}
                 className={`fixed top-0 left-0 z-10 w-full px-3 sm:left-[12.5%] flex flex-row backdrop-blur-lg bg-opacity-80 justify-between sm:rounded-full items-center md:w-3/4 h-14 sm:h-16 bg-black font-inter
                 ${scrolled ? 'sm:bg-zinc-900 sm:bg-opacity-80 sm:top-2 sm:border-none' : ''} transition-all duration-500`}>
                <div className={'flex flex-row items-center gap-3 sm:gap-5'}>
                    <Image src={'/images/quasar/appicon.png'} width={32} height={32} alt={'Quasar Logo'}
                           className={'rounded-full'}/>
                    <h1 className={'text-white text-lg sm:text-2xl font-bold'}>Quasar</h1>
                </div>
                <div className={'hidden sm:flex flex-row items-center gap-6 sm:gap-10'}>
                    <a href={'/quasar#news'}
                       className={'text-white text-base sm:text-lg hover:text-blue-500 transition-colors duration-300'}>News</a>
                    <a href={'/quasar#images'}
                       className={'text-white text-base sm:text-lg hover:text-blue-500 transition-colors duration-300'}>Images</a>
                    <a href={'/quasar#data'}
                       className={'text-white text-base sm:text-lg hover:text-blue-500 transition-colors duration-300'}>Data</a>
                    <a href={'/quasar#ai'}
                       className={'text-white text-base sm:text-lg hover:text-blue-500 transition-colors duration-300'}>AI</a>
                    <a href={'/quasar/support'}
                       className={'text-white text-base sm:text-lg hover:text-green-400 transition-colors duration-300'}>Support</a>
                    <a href={'/quasar#download'}
                       className={'ml-2 bg-quasar-dark border border-quasar-dark-border hover:bg-[#161616] py-2 px-4 rounded-full text-white transition-colors duration-300 text-base sm:text-lg'}>Download</a>
                </div>
                {/* Mobile menu button */}
                <div className="sm:hidden flex items-center">
                    <button className="text-white focus:outline-none" onClick={() => setShowMenu(true)}>
                        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>
            </div>
            {/* Mobile menu overlay */}
            {showMenu && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center sm:hidden">
                    <button className="absolute top-6 right-6 text-white" onClick={() => setShowMenu(false)}>
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                    <a href={'/quasar#news'} className={'text-white text-2xl my-4'} onClick={() => setShowMenu(false)}>News</a>
                    <a href={'/quasar#images'} className={'text-white text-2xl my-4'} onClick={() => setShowMenu(false)}>Images</a>
                    <a href={'/quasar#data'} className={'text-white text-2xl my-4'} onClick={() => setShowMenu(false)}>Data</a>
                    <a href={'/quasar#ai'} className={'text-white text-2xl my-4'} onClick={() => setShowMenu(false)}>AI</a>
                    <a href={'/quasar/support'} className={'text-white text-2xl my-4'} onClick={() => setShowMenu(false)}>Support</a>
                    <a href={'/quasar#download'} className={'mt-4 bg-quasar-dark border border-quasar-dark-border hover:bg-[#161616] py-3 px-8 rounded-full text-white transition-colors duration-300 text-2xl'} onClick={() => setShowMenu(false)}>Download</a>
                </div>
            )}
        </>
    );
}