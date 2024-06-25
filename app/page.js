"use client";

import {useState, useRef, useEffect} from 'react';
import {Canvas, useFrame} from "@react-three/fiber";
import Image from "next/image";
import {Instances, Instance, Text3D, Center, useCursor} from "@react-three/drei";
import {gsap} from "gsap";
import {motion, transform} from "framer-motion";
import {isChrome, isEdge} from "react-device-detect";
import {random} from 'mathjs';

import './page.css';
import {useLenis} from "@studio-freight/react-lenis"
import {useScroll, useTransform} from "framer-motion";
import {rgba} from "color2k";
import {Text} from "@chakra-ui/react";

const particleSpeed = 0.5;

const particles = Array.from({length: 24}, () => ({
    xFactor: random(-150, 150),
    zFactor: random(-80, 80),
    xSpeed: random(-1 * particleSpeed, particleSpeed),
    zSpeed: random(-1 * particleSpeed, particleSpeed),
    xRotFactor: random(-2 * 3.14, 2 * 3.14), //convert to radians
}))

export default function Home() {

    let [squareOpacity, setSquareOpacity] = useState(1);
    const {scrollYProgress} = useScroll();
    const section1Scale = useTransform(scrollYProgress, [0, 0.25], [5 / 6, 1])
    const section1Alpha = useTransform(scrollYProgress, [0, 0.4], [0.3, 1])

    const cursorRef = useRef(null);
    const secondaryCursorRef = useRef(null);

    useEffect(() => {
        // client-side code
        // cursor GSAP init
        gsap.set('#primaryCursor', {xPercent: -50, yPercent: -50})
        gsap.set('#secondaryCursor', {xPercent: -50, yPercent: -50})

        // edit scrollbar styling
        if (isChrome || isEdge) {
            document.body.classList.add('scrollbar-none'); // removes scrollbar on Chrome and Edge
        } // Firefox class is already applied for no scrollbar
    })

    useLenis((lenis) => {
        setSquareOpacity(1 - window.scrollY / window.innerHeight); // 0 to 1
    })

    function updateMouse(e) {
        // set the top and left margins as the mouse coords
        cursorRef.current.style.top = `${e.clientY}px`;
        cursorRef.current.style.left = `${e.clientX}px`;

        gsap.to('#secondaryCursor',{
            duration: 0.5,
            x: e.clientX,
            y: e.clientY
        })
    }

    // noinspection JSSuspiciousNameCombination
    return (
        <div id={'main-div'} className={'flex flex-col'} onMouseMove={updateMouse}>
            <div id={'primaryCursor'} className={'bg-blue-300 fixed h-3 w-3 rounded-full z-20'} ref={cursorRef}/>
            <div id={'secondaryCursor'} className={'border-2 border-blue-400 fixed h-8 w-8 rounded-full z-20'} ref={secondaryCursorRef}/>
            <div className={'section-1 flex grow fixed min-h-screen min-w-full justify-center'}>
                <div id={'particle-container'} className={'grow w-full'}>
                    <Canvas camera={{position: [0, 0, 100]}}>
                        <ambientLight intensity={1.5}/>
                        <directionalLight position={[0, 0, 5]} intensity={1}/>
                        <Instances range={15}>
                            <boxGeometry args={[15, 15, 0.1]}/>
                            <meshStandardMaterial color={'0xffffff'} opacity={squareOpacity} transparent={true}/>
                            {particles.map((data, i) => (<Square key={i} {...data}/>))}
                            <Center>
                                <Text3D font={'/fonts/inter/Inter_Bold.json'} size={30} height={3}
                                        bevelEnabled bevelSize={0.6} bevelSegments={2} letterSpacing={1.1}>
                                    Shashank
                                    <meshNormalMaterial/> {/* possibly replace this with a custom material */}
                                </Text3D>
                            </Center>
                        </Instances>
                    </Canvas>
                </div>
                <div id='short-intro-text'
                     className={'absolute self-start mt-20 backdrop-blur-md px-20 py-5 rounded-2xl'}>
                    <h1 className={'font-inter font-bold text-blue-100 text-5xl'}> Hey, I'm</h1>
                </div>
                <div id={'scroll-down-indicator'}
                     className={'animate-bounce absolute rounded-full border-2 self-end mb-20 backdrop-blur-md'}>
                    <Image src={'/images/down-arrow.svg'} alt={'down arrow'} width={45} height={45} unoptimized
                           className={'invert'} priority={true}/>
                </div>
            </div>
            <div id={'section-1'} className={'section-1 min-h-screen '}>
                {/*Only exists to space out sections since particle container et. al. is absolutely positioned*/}
            </div>
            <motion.div id={'section-2'}
                        className={'section-2 min-w-full mx-auto min-h-screen border-blue-600 border-2 backdrop-blur-md flex flex-col'}
                        style={{scaleX: section1Scale, background: rgba(0, 0, 0, section1Alpha.get())}}>
                <h1 className={'font-inter text-white text-6xl mx-auto mt-10'}>
                    About Me
                </h1>
                <div className={'flex flex-col mt-20 min-h-screen justify-between'}>
                    <p className={'font-inter text-white ml-auto text-5xl mt-20 mr-5'}>
                        Junior in High School
                    </p>
                    <p className={'font-inter text-white ml-auto text-5xl mr-5'}>
                        Fullstack Software Developer
                    </p>
                    <p className={'font-inter text-white ml-auto text-5xl mb-20 mr-5'}>
                        Hardware Enthusiast
                    </p>
                </div>

            </motion.div>
            <motion.div id={'section-3'} className={'w-5/6 min-h-screen mx-auto border border-amber-500'}>

            </motion.div>
        </div>)
}

function Square({xFactor, zFactor, xSpeed, zSpeed, xRotFactor}) {
    const ref = useRef();
    const [isInitState, setIsInitState] = useState(true);

    useFrame((state) => {
        if (isInitState) {
            ref.current.position.x = xFactor;
            ref.current.position.y = zFactor;
            setIsInitState(false);
        }
        const t = state.clock.getElapsedTime();
        ref.current.rotation.z = t / 2 * 3.14 + xRotFactor;

        if (ref.current.position.x > 170) {
            ref.current.position.x = -170;
        } else if (ref.current.position.x < -170) {
            ref.current.position.x = 170;
        }

        if (ref.current.position.y > 90) {
            ref.current.position.y = -90;
        } else if (ref.current.position.y < -90) {
            ref.current.position.y = 90;
        }

        ref.current.position.x += xSpeed;
        ref.current.position.y += zSpeed;
    });

    return (<group>
        <Instance ref={ref}/>
    </group>)
}
