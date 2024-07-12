"use client";

import {useState, useRef, useEffect} from 'react';
import Image from "next/image"
import gsap from "gsap";
import {motion} from "framer-motion";
import {isChrome, isEdge} from "react-device-detect";
import {useGlitch} from "react-powerglitch";
import {useRouter} from "next/navigation";

import './page.css';


export default function Home() {

    const [isClient, setIsClient] = useState(false);
    const carouselImageDimensions = 80;
    const primaryCursorRef = useRef();
    const secondaryCursorRef = useRef();
    const mainRef = useRef();
    const glitch = useGlitch({
        "timing": {
            'easing': 'ease-in-out',
            'duration': 5000,
        },
        'slice': {
            hueRotate: true,
        }
    });
    const router = useRouter();
    const slides = [
        {
            icon: <Image src={'/icons/arduino.svg'} alt={'arduino'} className={'invert'} width={carouselImageDimensions}
                         height={carouselImageDimensions}/>
        },
        {
            icon: <Image src={'/icons/js.svg'} alt={'arduino'} className={''} width={carouselImageDimensions}
                         height={carouselImageDimensions}/>
        },
        {
            icon: <Image src={'/icons/python.svg'} alt={'arduino'} className={'invert'} width={carouselImageDimensions}
                         height={carouselImageDimensions}/>
        },
        {
            icon: <Image src={'/icons/react.svg'} alt={'arduino'} className={'invert'} width={carouselImageDimensions}
                         height={carouselImageDimensions}/>
        },
        {
            icon: <Image src={'/icons/tailwind.svg'} alt={'arduino'} className={'invert'}
                         width={carouselImageDimensions} height={carouselImageDimensions}/>
        },
        {
            icon: <Image src={'/icons/framer.svg'} alt={'arduino'} className={'invert'} width={carouselImageDimensions}
                         height={carouselImageDimensions}/>
        },
        {
            icon: <Image src={'/icons/java.svg'} alt={'arduino'} className={'invert'} width={carouselImageDimensions}
                         height={carouselImageDimensions}/>
        },
        {
            icon: <Image src={'/icons/expo.svg'} alt={'arduino'} className={'invert'} width={carouselImageDimensions}
                         height={carouselImageDimensions}/>
        },
        {
            icon: <Image src={'/icons/firebase.svg'} alt={'arduino'} className={'invert'}
                         width={carouselImageDimensions} height={carouselImageDimensions}/>
        },
        {
            icon: <Image src={'/icons/nextjs.svg'} alt={'arduino'} className={'invert'} width={carouselImageDimensions}
                         height={carouselImageDimensions}/>
        },
        {
            icon: <Image src={'/icons/raspberrypi.svg'} alt={'arduino'} className={'invert'}
                         width={carouselImageDimensions}
                         height={carouselImageDimensions}/>
        }
    ];
    const duplicatedSlides = [...slides, ...slides, ...slides];
    const particleInfo = {
        'count': 12,
    }

    useEffect(() => {
        // client-side code
        setIsClient(true);
        // edit scrollbar styling
        if (isChrome || isEdge) {
            document.body.classList.add('scrollbar-none'); // removes scrollbar on Chrome and Edge
        } // Firefox class is already applied for no scrollbar

        // event listener to update custom cursor
        window.addEventListener('mousemove', updateMouse);

    }, [])

    function updateMouse(e) {
        gsap.set('#primaryCursor', {
            x: e.clientX, y: e.clientY,
            xPercent: -50, yPercent: -50
        })
        gsap.to('#secondaryCursor', {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: 'power2.out',
            xPercent: -50,
            yPercent: -50
        });
    }

    function handleHover(hovering, invert = false, invertID = null) {
        if (hovering) {
            primaryCursorRef.current.style.opacity = 0;
            secondaryCursorRef.current.style.backgroundColor = '#60a5fa';
            secondaryCursorRef.current.style.mixBlendMode = 'difference';
            gsap.to('#secondaryCursor', {
                scale: 2.5,
                duration: 0.5,
                ease: 'power2.out'
            })
            if (invert) {
                gsap.to(invertID, {
                    filter: 'invert(1)',
                    duration: 0.5,
                    ease: 'power2.out'
                })
            }
        } else {
            primaryCursorRef.current.style.opacity = 1;
            secondaryCursorRef.current.style.backgroundColor = 'transparent';
            secondaryCursorRef.current.style.mixBlendMode = 'normal';
            gsap.to('#secondaryCursor', {
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            })
            if (invert) {
                gsap.to(invertID, {
                    filter: 'invert(0)',
                    duration: 0.5,
                    ease: 'power2.out'
                })
            }
        }
    }

    // noinspection JSSuspiciousNameCombination,JSValidateTypes
    if (isClient) {
        return (
            <div id={'main-div'} className={'overflow-hidden flex flex-col h-fit cursor-none'}
                 ref={mainRef}>
                <div id={'primaryCursor'} className={'bg-blue-300 fixed h-3 w-3 rounded-full z-30 pointer-events-none'}
                     ref={primaryCursorRef}/>
                <div id={'secondaryCursor'}
                     className={'border-2 border-blue-400 fixed h-8 w-8 rounded-full z-20 pointer-events-none'}
                     ref={secondaryCursorRef}/>
                <div id={'section-1'}
                     className={'section-1 flex min-h-screen w-screen'}>
                    <div className={'absolute -z-10 h-screen w-screen'}>
                    </div>
                    <h1 className={'mx-auto my-auto font-inter font-bold text-blue-500 text-7xl sm:text-9xl lg:text-main-title-xl'}>
                        Shashank
                    </h1>
                    <div id='short-intro-text'
                         className={'absolute self-start mt-20 backdrop-blur-md px-20 py-5 rounded-2xl'}>
                        <h1 className={'font-inter font-bold text-blue-100 text-5xl'}> Hey, I'm</h1>
                    </div>
                </div>
                <div id={'bottom-bar'} className={'flex flex-row absolute w-screen bottom-20 items-center h-[100px]'}>
                    <div id={'bottom-box-1'} className={'basis-1/3 h-full flex items-center justify-center'}>
                        <div id={'titles'} className={'backdrop-blur-md rounded-2xl py-3 px-6 flex text-center'}>
                            <h1 className={'font-inter text-white text-3xl md:text-5xl'} ref={glitch.ref}>Fullstack
                                Developer</h1>
                        </div>
                    </div>
                    <div id={'bottom-box-2'} className={'basis-1/3 h-full flex items-center justify-center invisible sm:visible'}>
                        <div id={'scroll-down-indicator'}
                             className={'animate-bounce rounded-full backdrop-blur-md mx-auto h-fit w-fit p-3'}>
                            <Image src={'/images/mouse.svg'} alt={'down arrow'} width={45} height={45} unoptimized
                                   className={'invert'} priority={true}/>
                        </div>
                    </div>
                    <div id={'bottom-box-3'} className={'basis-1/3 h-full flex items-center justify-center'}>
                        <div id={'socials'}
                             className={'backdrop-blur-md rounded-2xl flex flex-col sm:flex-row scale-90 sm:scale-100'}>
                            <button className={'mx-2 my-2'} onClick={() => {
                                router.push('https://www.github.com/SpyGuy0215')
                            }} onMouseOver={() => {
                                handleHover(true)
                            }} onMouseOut={() => {
                                handleHover(false)
                            }}>
                                <Image src={'/icons/github.svg'} alt={'github'} width={80} height={80}
                                       className={'invert'}
                                       unoptimized/>
                            </button>
                            <button className={'mx-2 my-2'} onClick={() => {
                                router.push('https://www.linkedin.com/in/shashank-prasanna/')
                            }} onMouseOver={() => {
                                handleHover(true)
                            }} onMouseOut={() => {
                                handleHover(false)
                            }}>
                                <Image src={'/icons/linkedin.svg'} alt={'linkedin'} width={80} height={80}
                                       className={'invert'}
                                       unoptimized/>
                            </button>
                            <button className={'mx-2 my-2'} onClick={() => {
                                router.push('mailto:shashankprasanna1@gmail.com')
                            }} onMouseOver={() => {
                                handleHover(true)
                            }} onMouseOut={() => {
                                handleHover(false)
                            }}>
                                <Image src={'/icons/gmail.svg'} alt={'linkedin'} width={80} height={80}
                                       className={'invert'}
                                       unoptimized/>
                            </button>
                        </div>
                    </div>
                </div>
                <div id={'section-2'}
                     className={'section-2 min-w-full flex flex-col'}>
                    <h1 className={'font-bold font-inter text-white text-6xl sm:text-8xl mx-auto mt-10 text-center'}>
                        About Me
                    </h1>
                    <div id={'image-scroller'} className={'relative w-full overflow-hidden mt-10'}>
                        <motion.div className={'flex'} animate={{
                            x: ['-100%', '0%'],
                            transition: {
                                ease: 'linear',
                                duration: 20,
                                repeat: Infinity
                            }
                        }}>
                            {
                                duplicatedSlides.map((slide, i) => (
                                    <div key={i} className="flex-shrink-0">
                                        <div
                                            className="flex flex-col items-center justify-center h-full text-white mx-10">
                                            {slide.icon}
                                        </div>
                                    </div>
                                ))
                            }
                        </motion.div>
                    </div>
                    <div id={'about-me-info'} className={'mt-10 mx-5'}>
                        <div className={'flex flex-row justify-between mb-20'}>
                            <h1 className={'text-white font-inter text-4xl sm:text-5xl w-1/2 font-bold'}>Fullstack Software
                                Developer</h1>
                            <p className={'text-white font-inter w-1/2 text-lg text-right sm:text-left sm:text-3xl leading-10 justify-center'}>
                                I am well-versed in a number of front-end technologies like NextJS and Tailwind, and can
                                connect them to powerful backend solutions built with tools like Python, Java, and
                                Firebase.
                            </p>
                        </div>
                        <div className={'flex flex-row justify-between mb-20'}>
                            <h1 className={'text-white font-inter text-4xl sm:text-5xl w-1/2 font-bold'}>Hardware Enthusiast</h1>
                            <p className={'text-white font-inter w-1/2 text-lg text-right sm:text-left sm:text-3xl leading-10'}>
                                I am knowledgeable on hardware platforms like Arduino and Raspberry Pi, and can create
                                custom
                                solutions linking to the cloud, IoT, Bluetooth, and more. I can integrate these systems
                                into
                                existing or new products that operate seamlessly, supercharging their
                                capabilities.
                            </p>
                        </div>
                        <div className={'flex flex-row justify-between mb-20'}>
                            <h1 className={'text-white font-inter text-4xl sm:text-5xl w-1/2 font-bold'}>Junior in High School</h1>
                            <p className={'text-white font-inter w-1/2 text-lg text-right sm:text-left sm:text-3xl leading-10'}>
                                Motivated learner, taking AP Computer Science A, AP Calculus AB, and AP Biology.
                                Currently
                                have a 4.0 GPA. Plan to further my education in the field of computer science and
                                engineering in college.
                            </p>
                        </div>
                    </div>

                </div>
                <div id={'section-3'} className={'section-3 min-w-full flex flex-col'}>
                    <h1 className={'font-bold font-inter text-white text-6xl sm:text-8xl mx-auto mt-10 mb-20 text-center'}>
                        Check out my blog!
                    </h1>
                    <button id={'blog-link'} onClick={() => {
                        router.push('/blog')
                    }}
                            className={'border border-white w-96 mb-24 mx-auto h-16 flex flex-row justify-center items-center bg-black'}
                            onMouseOver={() => {
                                handleHover(true, true, '#blog-link')
                            }} onMouseOut={() => {
                        handleHover(false, true, '#blog-link')
                    }}>
                        <h3 className={'font-inter text-white text-3xl'}>Visit awesomeness</h3>
                        <Image src={'/icons/link.svg'} height={30} width={30} alt={''} className={'invert ml-4'}/>
                    </button>
                </div>
            </div>

        )
    } else {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
}