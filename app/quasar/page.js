"use client";

import Image from "next/image";
import RotatingText from "@/app/components/reactbits/RotatingText/RotatingText";
import Header from "@/app/components/quasar/Header";
import Footer from "@/app/components/Footer";
import {LayoutGroup, motion} from "framer-motion";

import '@/app/page.css'
import Link from "next/link";
import ShinyText from "@/app/components/reactbits/ShinyText/ShinyText";

export default function Page() {
    return (
        <div id={'main-div'} className={'bg-black dark flex flex-col'}>
            <Header/>
            <div id={'home'} className={'w-full h-[600px] sm:h-[90vh] relative'}>
                <div id={'image-container'} className={'h-3/4'}>
                    <Image src={'/images/quasar/moon-bg.jpeg'} fill alt={'background'}
                           className={'aspect-video object-cover absolute inset-0'}/>
                </div>
                <div
                    className={'absolute inset-0 flex flex-col text-white font-inter text-5xl sm:text-9xl ' +
                        'font-bold w-full h-full items-center justify-center'}>
                    <div id={'hero-text'} className={'flex flex-row gap-3 sm:gap-7 mb-40 pt-48'}>
                        <LayoutGroup layout>
                            <motion.span layout className={'flex flex-row'}>
                                Space
                            </motion.span>
                            <RotatingText
                                texts={['News', 'Images', 'Data', 'AI']}
                                rotationInterval={2200}
                                staggerDuration={0.025}
                                animatePresenceInitial={true}
                            />
                        </LayoutGroup>

                    </div>
                    <a href={'#download'}
                          className={'bg-quasar-dark border border-quasar-dark-border hover:bg-[#161616] py-4 px-6 rounded-full text-white transition-colors duration-300'}>
                        <h2 className={'text-2xl font-semibold'}>Download Now</h2>
                    </a>
                </div>
            </div>
            <div id={'news'} className={'w-full h-[80vh] bg-black flex flex-row justify-between font-inter text-white'}>
                <div className={'w-[60vw] pl-40 pt-10'}>
                    <h1 className={'font-bold text-8xl'}>News</h1>
                    <p className={'mt-14 text-2xl/9 text-gray-100 '}>
                        Quasar delivers the latest developments in space exploration and astronomy from trusted sources, all within the app.
                        Stay informed with curated news covering topics like NASA missions, SpaceX launches, and astronomical discoveries.
                    </p>
                    <p className={'mt-14 text-2xl/9 text-gray-100'}>
                        Browse through focused categories such as astronomy, commercial spaceflight, and more. Everything you need to stay
                        informed about space, all in one place.
                    </p>
                </div>
                <div className={'w-1/4 flex flex-col items-center justify-center mr-20'}>
                    <div className={'relative w-full h-[95%]'}>
                        <Image src={'/images/quasar/iphone-news-mockup.png'} fill alt={'Quasar News Page'}
                               className={'object-contain'}/>
                    </div>
                </div>
            </div>
            <div id={'images'} className={'w-full h-[80vh] bg-black flex flex-row justify-between font-inter text-white'}>
                <div className={'w-[40vw] flex flex-col items-center justify-center'}>
                    <div className={'relative w-full h-[95%]'}>
                        <Image src={'/images/quasar/galaxy-images-mockup.png'} fill alt={'Quasar Images Page'}
                               className={'object-contain'}/>
                    </div>
                </div>
                <div className={'w-[60vw] pr-40 pt-32'}>
                    <h1 className={'font-bold text-8xl'}>Images</h1>
                    <p className={'mt-14 text-2xl/9 text-gray-100'}>
                        Quasar offers a stunning collection of space images, from breathtaking nebulae to detailed planetary surfaces.
                        Explore the universe through high-resolution images sourced from NASA, ESA, and other space agencies.
                    </p>
                    <p className={'mt-14 text-2xl/9 text-gray-100'}>
                        Whether you're an astronomy enthusiast or just love beautiful visuals, Quasar's image gallery provides a captivating
                        experience of the cosmos.
                    </p>
                </div>
            </div>
            <div id={'data'} className={'w-full h-[80vh] bg-black flex flex-row justify-between font-inter text-white'}>
                <div className={'w-[60vw] pl-40 pt-10'}>
                    <h1 className={'font-bold text-8xl'}>Data</h1>
                    <p className={'mt-14 text-2xl/9 text-gray-100 '}>
                        Quasar provides access to the latest space data from trusted sources like NASA. Dive into a wealth of information,
                        including every currently discovered exoplanet, all from within the app.
                    </p>
                    <p className={'mt-14 text-2xl/9 text-gray-100'}>
                        Our team is currently working on integrating more information into our app, including information on other celestial
                        bodies and live data from space missions, including launches, landings, and more.
                    </p>
                </div>
                <div className={'w-1/4 flex flex-col items-center justify-center mr-20'}>
                    <div className={'relative w-full h-[95%]'}>
                        <Image src={'/images/quasar/pixel-data-mockup.png'} fill alt={'Quasar Data Page'}
                               className={'object-contain'}/>
                    </div>
                </div>
            </div>
            <div id={'ai'} className={'w-full h-[80vh] bg-black flex flex-row justify-between font-inter text-white'}>
                <div className={'w-[40vw] flex flex-col items-center justify-center'}>
                    <div className={'relative w-full h-[95%]'}>
                        <Image src={'/images/quasar/iphone-quasar-ai-mockup.png'} fill alt={'Quasar AI Page'}
                               className={'object-contain'}/>
                    </div>
                </div>
                <div className={'w-[60vw] pr-40 pt-32'}>
                    <ShinyText text={'Quasar AI'} className={'font-bold text-8xl drop-shadow-[0_0_1px_white]'} speed={3}/>
                    <p className={'mt-14 text-2xl/9 text-gray-100'}>
                        Built off of the latest AI models, Quasar AI is your personal space assistant. Ask questions about anything in the
                        universe, from the latest space missions to the composition of distant galaxies. Quasar AI provides accurate and
                        insightful answers, making it a valuable tool for both casual users and space enthusiasts.
                    </p>
                </div>
            </div>
            <div id={'download'} className={'w-full h-[60vh] flex flex-col items-center bg-black text-white font-inter'}>
                <h1 className={'text-5xl font-semibold mt-20'}>Download Quasar</h1>
                <div id={'download-buttons'} className={'flex flex-row w-[45vw] justify-around mt-12'}>
                    <Link href={'https://play.google.com/store/apps/details?id=com.shashankprasanna.quasar'}
                          className={'bg-quasar-dark border border-quasar-dark-border hover:bg-[#161616] py-6 px-8 rounded-full text-white transition-colors duration-300 flex items-center'}>
                        <Image src={'/images/google-play.svg'} width={32} height={32} alt={'Google Play Icon'} />
                        <span className={'ml-4 text-2xl font-semibold'}>Get it on Google Play</span>
                    </Link>
                    <div className={'bg-quasar-dark border border-quasar-dark-border py-6 px-8 rounded-full text-gray-500 flex items-center cursor-not-allowed'}>
                        <Image src={'/images/app-store.svg'} width={32} height={32} alt={'App Store Icon'} />
                        <span className={'ml-4 text-2xl font-semibold'}>iOS Coming Soon</span>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}