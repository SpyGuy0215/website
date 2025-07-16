import React, {useEffect} from 'react';
import './Footer.css';
import Image from "next/image";
import {database as db} from '../helper/firebase/firebaseConfig';
import {ref, onValue} from "firebase/database";
import '@/app/page.css'

export default function Footer(){

    const [views, setViews] = React.useState(0);

    useEffect(() => {
        let dbRef;
        process.env.NODE_ENV === 'development' ? dbRef = ref(db, 'devViews') : dbRef = ref(db, 'views');
        onValue(dbRef, snapshot => {
            setViews(snapshot.val() || 0);
        })
    }, []);

    return (
        <div id={'footer'} className={'w-full h-fit border-t-1 border-t-gray-800 bg-black overflow-hidden'}>
            <div className={'w-10/12 mt-5 mb-4 mx-auto'}>
                <div className={'flex flex-row justify-between'}>
                    <div id={'links'} className={'font-inter text-gray-300 flex flex-col my-10'}>
                        <h1 className={'font-semibold text-xl mb-2'}>Links</h1>
                        <a href={'/#section-1'}>Home</a>
                        <a href={'/#section-2'}>About Me</a>
                        <a href={'/#section-3'}>Technologies</a>
                        <a href={'/#section-4'}>Projects</a>
                    </div>
                    <div id={'quasar'} className={'font-inter text-gray-300 flex flex-col my-10'}>
                        <h1 className={'font-semibold text-xl mb-2'}>Quasar</h1>
                        <a href={'/quasar'}>Home</a>
                        <a href={'/quasar/support'}>Support</a>
                        <a href={'/quasar/privacy-policy'}>Privacy Policy</a>
                    </div>
                    <div className={'font-inter flex flex-col my-10'}>
                        <h1 className={'text-gray-300 font-semibold text-xl mb-2'}>Views</h1>
                        <p className={'text-4xl text-gray-100'}>{views}</p>
                    </div>
                </div>
                <div className={'flex justify-between text-gray-300 font-inter text-md sm:text-lg'}>
                    <p className={'font-semibold'}>Made by Shashank Prasanna</p>
                    <p className={'text-right'}>© 2025 All rights reserved.</p>
                    <div className={'hidden sm:block'}>
                        <Image src={'/next.svg'} alt={'Next.js Logo'} width={80} height={80} className={'inline-block pr-4 border-r border-r-gray-500 invert'}/>
                        <Image src={'/vercel.svg'} alt={'Vercel Logo'} width={80} height={80} className={'inline-block ml-4 invert'}/>
                    </div>
                </div>
            </div>
        </div>
    )
}