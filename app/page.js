"use client";

import {useState, useRef, useEffect} from 'react';
import Image from "next/image"
import gsap from "gsap";
import {motion, useAnimationFrame} from "framer-motion";
import {isChrome, isEdge, isMobile} from "react-device-detect";
import {useRouter} from "next/navigation";

import './page.css';
import {Card, CardBody, CardHeader, CircularProgress, Tab, Tabs} from "@heroui/react";

export default function Home() {

    const [isClient, setIsClient] = useState(false);
    const primaryCursorRef = useRef();
    const secondaryCursorRef = useRef();
    const mainRef = useRef();
    const router = useRouter();
    const rawParticleCount = isMobile ? 4 : 10; // number of particles (per type)
    const particleCount = Array.from({length: rawParticleCount}, (x, idx) => idx)

    useEffect(() => {
        // client-side code
        setIsClient(true);
        // edit scrollbar styling
        if (isChrome || isEdge) {
            document.body.classList.add('scrollbar-none'); // removes scrollbar on Chrome and Edge
        } // Firefox class is already applied for no scrollbar

        // event listener to update custom cursor (on desktop)
        if (!isMobile) {
            window.addEventListener('mousemove', updateMouse);
        }
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
        if (hovering && !isMobile) {
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
            <div id={'main-div'} className={'overflow-hidden flex flex-col h-fit cursor-none overflow-x-hidden dark'}
                 ref={mainRef}>
                <div id={'primaryCursor'} className={'invisible md:visible bg-blue-300 fixed h-3 w-3 rounded-full z-30 pointer-events-none'}
                     ref={primaryCursorRef}/>
                <div id={'secondaryCursor'}
                     className={'invisible md:visible border-2 border-blue-400 fixed h-8 w-8 rounded-full z-20 pointer-events-none'}
                     ref={secondaryCursorRef}/>

                <div id={'section-1 '}
                     className={'flex flex-col h-svh w-full overflow-x-hidden'}>
                    <div id={'shape-canvas'} className={'absolute z-10 h-screen w-full overflow-hidden'}>
                        {
                            particleCount.map(idx => <Shape type={'square'} key={idx} height={16} width={16}/>)
                        }
                        {
                            particleCount.map(idx => <Shape type={'triangle'} key={idx} height={16} width={16}/>)
                        }
                    </div>
                    <div id='short-intro-text'
                         className={'z-20 mx-auto mt-10 px-20 py-5 mix-blend-difference'}>
                        <h1 className={'font-inter font-bold text-white text-5xl'}> Hey, I'm</h1>
                    </div>
                    <h1 className={'z-20 mx-auto font-inter my-auto font-extrabold text-blue-500 text-7xl sm:text-9xl lg:text-main-title-xl'}>
                        Shashank
                    </h1>
                    <div id={'bottom-bar'}
                         className={'z-40 flex flex-row w-full mb-16 items-center h-[100px] mix-blend-difference'}>
                        <div id={'bottom-box-1'} className={'z-20 basis-1/3 h-full flex items-center justify-center mx-2 mix-blend-difference'}>
                            <div id={'titles'} className={'z-20 rounded-2xl py-3 px-6 flex text-center'}>
                                <h1 className={'z-20 font-inter text-white text-3xl md:text-5xl'}>Fullstack
                                    Developer</h1>
                            </div>
                        </div>
                        <div id={'bottom-box-2'} className={' basis-1/3 h-full flex items-center justify-center invisible sm:visible'}>
                            <div id={'scroll-down-indicator'}
                                 className={'animate-bounce mx-auto h-fit w-fit p-3 backdrop-blur-md mix-blend-difference rounded-full'}>
                                <Image src={'/images/mouse.svg'} alt={'down arrow'} width={45} height={45} unoptimized
                                       className={'invert'} priority={true}/>
                            </div>
                        </div>
                        <div id={'bottom-box-3'} className={'basis-1/3 h-full flex items-center justify-center mix-blend-difference'}>
                            <div id={'socials'}
                                 className={'rounded-2xl flex flex-col sm:flex-row scale-75 sm:scale-110'}>
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
                </div>
                <div id={'section-2'} className={'flex min-h-screen w-full flex-row overflow-x-hidden'}>
                    <div id={'about-me'} className={'my-auto ml-10 sm:w-7/12 h-fit p-5 rounded-2xl bg-gray-950'}>
                        <h1 className={'font-inter font-bold text-blue-500 text-5xl sm:text-7xl'}>About Me</h1>
                        <p className={'font-inter font-normal text-gray-400 text-2xl/8 mt-10'}>
                            I'm a fullstack developer with a passion for building
                            <span className={'text-white font-semibold'}> powerful applications</span> and
                            <span className={'text-white font-semibold'}> exploring new technologies</span>.
                            I have experience with many <a
                            className={'text-white font-semibold underline decoration-blue-500 hover:decoration-[0.19rem] py-3'}
                            href={'#section-3'}>
                            programming languages and frameworks</a>,
                            and I enjoy learning new skills to enhance my development abilities.
                            <br/><br/>
                            I also enjoy working with
                            <span className={'text-white font-semibold'}> hardware and electronics</span>, designing and building projects
                            that
                            combine software and hardware. Some of my projects include an object-following robot and
                            an <a
                            className={'text-white font-semibold underline decoration-blue-500 hover:decoration-[0.19rem] py-3'}
                            href={'https://www.hackster.io/spyguy/automated-greenhouse-51dc4a'}>
                            automated greenhouse</a>
                            <br/><br/>
                        </p>
                    </div>
                    <div id={'me-image'} className={'w-4/12'}>

                    </div>
                </div>
                <div id={'section-3'} className={'flex h-screen w-full flex-row'}>
                    <div id={'tech-display'} className={'flex flex-wrap justify-around h-screen w-full mx-auto pt-2'}>
                        <div id={'tab-switch-bar'} className={'w-full'}>
                            <Tabs className={'font-inter mb-12'} size={'lg'} variant={'underlined'} color={'primary'}
                            classNames={{
                                base: "flex flex-col w-7/12 w-full align-middle mb-6",
                                tabList: "w-7/12 mx-auto",
                                tab: "text-xl font-inter font-semibold text-white",
                                cursor: "bg-blue-400",
                                tabContent: "group-data-[selected=true]:text-blue-400 text-3xl mb-2"
                            }}>
                                <Tab key={1} title={'Frontend'}>
                                    <div className={'grid grid-cols-4 gap-6 gap-y-12 mx-10'}>
                                        <TechDisplay title={'React'} icon={'./icons/color/react.svg'} years={3}/>
                                        <TechDisplay title={'Javascript'} icon={'./icons/color/javascript.svg'} years={5}/>
                                        <TechDisplay title={'HTML'} icon={'./icons/color/html.svg'} years={5}/>
                                        <TechDisplay title={'Tailwind'} icon={'./icons/color/tailwind.svg'} years={2}/>
                                        <TechDisplay title={'NextJS'} icon={'./icons/nextjs.svg'} years={2}/>
                                        <TechDisplay title={'React Native'} icon={'./icons/react.svg'} years={3} invert/>
                                    </div>
                                </Tab>
                                <Tab key={2} title={'Backend'}>
                                    <div className={'grid grid-cols-4 gap-6 gap-y-12 mx-10'}>
                                        <TechDisplay title={'Python'} icon={'./icons/color/python.svg'} years={6}/>
                                        <TechDisplay title={'Flask'} icon={'./icons/color/flask.svg'} years={2} invert/>
                                        <TechDisplay title={'Java'} icon={'./icons/color/java.svg'} years={1}/>
                                        <TechDisplay title={'React Native'} icon={'./icons/react.svg'} years={3} invert/>
                                        <TechDisplay title={'Expo'} icon={'./icons/expo.svg'} years={2} invert/>
                                        <TechDisplay title={'NodeJS'} icon={'./icons/color/nodejs.svg'} years={4}/>

                                    </div>
                                </Tab>
                                <Tab key={3} title={'Hardware'}>
                                    <div className={'grid grid-cols-4 gap-6 gap-y-12 mx-10'}>
                                        <TechDisplay title={'Arduino'} icon={'./icons/color/arduino.svg'} years={6}/>
                                        <TechDisplay title={'Raspberry Pi'} icon={'./icons/color/raspberry-pi.svg'} years={4}/>
                                    </div>
                                </Tab>
                                <Tab key={4} title={'Software'}>
                                    <div className={'grid grid-cols-4 gap-6 gap-y-12 mx-10'}>
                                        <TechDisplay title={'Git'} icon={'./icons/color/git.svg'} years={4}/>
                                        <TechDisplay title={'Docker'} icon={'./icons/color/docker.svg'} years={2}/>
                                        <TechDisplay title={'Firebase'} icon={'./icons/color/firebase.svg'} years={5}/>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>

        )
    } else {
        return (
            <div className={'w-screen h-screen'}>
                <CircularProgress className={'mx-auto'} label={'loading'} size={'md'} color={'primary'}/>
            </div>
        )
    }
}

function Shape({type}) {
    const ref = useRef();
    let xPos = Math.random() * (window.innerWidth - 1);
    let yPos = Math.random() * (window.innerHeight - 1);
    let rot = Math.random() * 360;

    let maxMoveSpeed = 3;
    let maxRotSpeed = 1.5; // degrees per frame

    const xVelocity = Math.random() * (maxMoveSpeed + maxMoveSpeed) - maxMoveSpeed;
    const yVelocity = Math.random() * (maxMoveSpeed + maxMoveSpeed) - maxMoveSpeed;
    const rotationVelocity = Math.random() * (maxRotSpeed + maxRotSpeed) - maxRotSpeed;

    useAnimationFrame((time, delta) => {
        xPos += xVelocity;
        yPos += yVelocity;
        if (type !== 'circle') {
            rot += rotationVelocity;
        }

        // bounds checking
        xPos > window.innerWidth + 100 ? xPos = -100 : null;
        xPos < -100 ? xPos = window.innerWidth + 100 : null;
        yPos > window.innerHeight + 100 ? yPos = -100 : null;
        yPos < -100 ? yPos = window.innerHeight + 100 : null;

        ref.current.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${rot}deg`
    })

    if (type === 'square') {
        return (
            <div ref={ref} className={`h-24 w-24 bg-white absolute`}/>
        )
    } else if (type === 'circle') {
        return (
            <div ref={ref} className={`h-24 w-24 bg-white rounded-full absolute`}/>
        )
    } else if (type === 'triangle') {
        return (
            <div ref={ref} className={`triangle`}/>
        )
    }
}

function TechDisplay({title, icon, years, invert=false}) {
    const invertStr = invert ? 'invert' : '';
    return (
        <Card className={''}>
            <CardBody className={'flex flex-row'}>
                <Image src={icon} alt={title} width={100} height={125} className={invertStr}/>
                <div className={'ml-8'}>
                    <CardHeader className={'flex flex-col'}>
                        <text className={'font-inter font-semibold text-white text-3xl mr-auto'}>{title}</text>
                        <text className={'font-inter font-normal text-gray-400 text-xl mr-auto'}>{years} {years === 1 ? "year" : "years"}</text>
                    </CardHeader>
                </div>
            </CardBody>

        </Card>
    )
}