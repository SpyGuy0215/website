"use client";

import {useState, useRef, useEffect} from 'react';
import {Canvas, useFrame} from "@react-three/fiber";
import Image from "next/image"
import {
    Instances,
    Instance,
    Text3D,
    Text as R3Text,
    Center,
    Image as R3Image,
    Environment,
    Backdrop,
    Stage,
    Grid, TransformControls, Stars, Billboard, RoundedBox, MeshTransmissionMaterial, Html, PerspectiveCamera
} from "@react-three/drei";
import {gsap} from "gsap";
import {motion, useScroll, useTransform} from "framer-motion";
import {isChrome, isEdge} from "react-device-detect";
import {random} from 'mathjs';
import {useLenis} from "@studio-freight/react-lenis"
import {rgba} from "color2k";

import './page.css';
import * as Three from "three/src/math/MathUtils";

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
    const section1Scale = useTransform(scrollYProgress, [0, 0.2], [5 / 6, 1])
    const section1Alpha = useTransform(scrollYProgress, [0, 0.7], [0.3, 1])

    const cursorRef = useRef(null);
    const secondaryCursorRef = useRef(null);
    const carouselImageDimensions = 80;
    const projectRef = useRef();
    const projectCameraRef = useRef();

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

        gsap.to('#secondaryCursor', {
            duration: 0.5,
            x: e.clientX,
            y: e.clientY,
            ease: 'power2.out'
        })
    }

    function handleRotateProjects(direction){
        if(direction === 'left'){
            console.log('moving left')
            projectCameraRef.current.rotation.y += (Math.PI / 2);
        }
        else if(direction === 'right'){
            console.log('moving right')
            projectCameraRef.current.rotation.y -= (Math.PI / 2);
        }
    }

    // noinspection JSSuspiciousNameCombination,JSValidateTypes
    return (
        <div id={'main-div'} className={'flex flex-col'} onMouseMove={updateMouse}>
            <div id={'primaryCursor'} className={'bg-blue-300 fixed h-3 w-3 rounded-full z-30'} ref={cursorRef}/>
            <div id={'secondaryCursor'} className={'border-2 border-blue-400 fixed h-8 w-8 rounded-full z-30'}
                 ref={secondaryCursorRef}/>
            <div id={'rotate-projects-buttons'}
                className={'h-10 w-20 border border-amber-500 fixed right-1/2 top-3/4 backdrop-blur-md bg-gray-200 rounded-xl flex flex-row justify-between z-40'}>
                <button type={'button'} onClick={() => {
                    handleRotateProjects('left')
                }} className={'border border-green-500'}>
                    <Image id={'rot-left-button'} src={'/images/down-arrow.svg'} alt={'left arrow'} width={30} height={30}
                           className={'invert rotate-90'}/>
                </button>
                <button type={'button'} onClick={() => {
                    handleRotateProjects('right')
                }}>
                    <Image id={'rot-right-button'} src={'/images/down-arrow.svg'} alt={'left arrow'} width={30} height={30}
                           className={'invert -rotate-90'}/>
                </button>
            </div>
            <div className={'section-1 flex grow fixed min-h-screen min-w-full justify-center -z-10'}>
                <div id={'particle-container'} className={'grow w-full'}>
                    <Canvas camera={{position: [0, 0, 100]}}>
                        <ambientLight intensity={1.5}/>
                        <directionalLight position={[0, 0, 5]} intensity={1}/>
                        <Instances range={15}>
                            <boxGeometry args={[15, 15, 0.1]}/>
                            <meshStandardMaterial color={'#ffffff'} opacity={squareOpacity} transparent={true}/>
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
                     className={'animate-bounce absolute rounded-full self-end mb-20 backdrop-blur-md p-3'}>
                    <Image src={'/images/mouse.svg'} alt={'down arrow'} width={45} height={45} unoptimized
                           className={'invert'} priority={true}/>
                </div>
            </div>
            <div id={'section-1'} className={'section-1 min-h-screen'}>
                {/*Only exists to space out sections since particle container et. al. is absolutely positioned*/}
            </div>
            <motion.div id={'section-2'}
                        className={'section-2 min-w-full mx-auto min-h-screen backdrop-blur-md flex flex-col'}
                        style={{scaleX: section1Scale, background: rgba(0, 0, 0, section1Alpha.get())}}>
                <h1 className={'font-bold font-inter text-white text-8xl mx-auto mt-10'}>
                    About Me
                </h1>
                <div className={'relative w-full overflow-hidden mt-10'}>
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
                                <div key={i} className="flex-shrink-0" style={{width: `${100 / slides.length}%`}}>
                                    <div
                                        className="flex flex-col items-center justify-center h-full text-6xl text-white">
                                        {slide.icon}
                                    </div>
                                </div>
                            ))
                        }
                    </motion.div>
                </div>
                <div className={'mt-10 mx-5'}>
                    <div className={'flex flex-row justify-between mb-20'}>
                        <h1 className={'text-white font-inter text-5xl w-1/2 font-bold'}>Fullstack Software
                            Developer</h1>
                        <p className={'text-white font-inter w-1/2 text-3xl leading-10'} align={'right'}>
                            I am well-versed in a number of front-end technologies like NextJS and Tailwind, and can
                            connect them to powerful backend solutions built with tools like Python, Java, and Firebase
                        </p>
                    </div>
                    <div className={'flex flex-row justify-between mb-20'}>
                        <h1 className={'text-white font-inter text-5xl w-1/2 font-bold'}>Hardware Enthusiast</h1>
                        <p className={'text-white font-inter w-1/2 text-3xl leading-10'} align={'right'}>
                            I am knowledgable on hardware platforms like Arduino and Raspberry Pi, and can create custom
                            solutions linking to the cloud, IoT, Bluetooth, and more. I can integrate these systems into
                            existing or new products that operate seamlessly, supercharging a product's capabilities.
                        </p>
                    </div>
                    <div className={'flex flex-row justify-between mb-20'}>
                        <h1 className={'text-white font-inter text-5xl w-1/2 font-bold'}>Junior in High School</h1>
                        <p className={'text-white font-inter w-1/2 text-3xl leading-10'} align={'right'}>
                            Motivated learner, taking AP Computer Science A, AP Calculus AB, and AP Biology. Currently
                            have a 4.0 GPA. Plan to further my education in the field of computer science and
                            engineering in college.
                        </p>
                    </div>
                </div>

            </motion.div>
            <div id={'section-3'} className={'min-h-screen bg-black border border-green-500 static  '}>
                <div id={'project-canvas-container'} className={'h-screen border border-red-600'}>
                    <Canvas className={''} ref={projectRef}>
                        <PerspectiveCamera makeDefault position={[0, 0, 0]} ref={projectCameraRef}/>
                        <ambientLight intensity={0.1}/>
                        <directionalLight position={[0, 0, 5]}/>
                        <R3Image url={'https://placehold.co/1920x1080'} position={[0, 0.2, -1]} scale={0.7}/>
                        <R3Image url={'https://placehold.co/1920x1080'} position={[-1, 0.2, 0]} rotation={[0, Math.PI/2, 0]} scale={0.7}/>
                        <R3Image url={'https://placehold.co/1920x1080'} position={[1, 0.2, 0]} rotation={[0, Math.PI/2, 0]} scale={0.7}/>
                        <R3Image url={'https://placehold.co/1920x1080'} position={[-1, 0.2, 0]} rotation={[0, Math.PI/2, 0]} scale={0.7}/>
                        <Grid position={[0, -3, -2]} infiniteGrid/>
                    </Canvas>
                </div>
            </div>
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