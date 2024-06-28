"use client";

import {useState, useRef, useEffect} from 'react';
import {Canvas, useFrame} from "@react-three/fiber";
import Image from "next/image"
import {
    Instances,
    Instance,
    Text3D,
    Center, Scroll,
} from "@react-three/drei";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {motion, useScroll, useTransform} from "framer-motion";
import {isChrome, isEdge} from "react-device-detect";
import {random} from 'mathjs';
import {useLenis} from "@studio-freight/react-lenis"
import {rgba} from "color2k";

import './page.css';
import {useRouter} from "next/navigation";
import SmoothScrolling from "@/app/components/SmoothScrolling";

const particleSpeed = 0.5;

const particles = Array.from({length: 24}, () => ({
    xFactor: random(-150, 150),
    zFactor: random(-80, 80),
    xSpeed: random(-1 * particleSpeed, particleSpeed),
    zSpeed: random(-1 * particleSpeed, particleSpeed),
    xRotFactor: random(-2 * 3.14, 2 * 3.14), //convert to radians
}))

export default function Home() {

    let primaryCanvasRef = useRef(null);

    const cursorRef = useRef(null);
    const secondaryCursorRef = useRef(null);
    const carouselImageDimensions = 80;
    const projectRef = useRef();
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


    useGSAP(() => {
        if(window === undefined) return;
        gsap.registerPlugin(ScrollTrigger);

        // cursor GSAP init
        gsap.set('#primaryCursor', {xPercent: -50, yPercent: -50})
        gsap.set('#secondaryCursor', {xPercent: -50, yPercent: -50})

        // fades out section 1 while section 2 is moving up
        gsap.to('#section-1', {
            opacity: 0.15,
            scrollTrigger: {
                trigger: '#section-1',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                markers: false // true in dev
            }
        })

        // moves section 2 up while pinning section 1
        gsap.fromTo('#section-2', {
            y: () => 0,
        }, {
            y: () => -window.innerHeight,
            scrollTrigger: {
                trigger: '#section-2',
                start: 'top bottom',
                end: 'bottom bottom',
                pin: '#section-1',
                markers: true // true in dev
            }
        })

        gsap.fromTo('#section-3', {
            x: 0
        }, {
            x: () => -window.innerWidth*3,
            scrollTrigger: {
                trigger: '#section-3',
                start: 'top top',
                end: '+=200%',
                markers: true,
                scrub: true,
                pin: true
            }
        })

    })

    useEffect(() => {
        // client-side code
        if(document === undefined) return;
        // edit scrollbar styling
        if (isChrome || isEdge) {
            document.body.classList.add('scrollbar-none'); // removes scrollbar on Chrome and Edge
        } // Firefox class is already applied for no scrollbar


        ScrollTrigger.refresh();
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

    if(window === undefined) return;
    // noinspection JSSuspiciousNameCombination,JSValidateTypes
    return (
        <div id={'main-div'} className={''} onMouseMove={updateMouse}>
            <div id={'primaryCursor'} className={'bg-blue-300 fixed h-3 w-3 rounded-full z-30'} ref={cursorRef}/>
            <div id={'secondaryCursor'} className={'border-2 border-blue-400 fixed h-8 w-8 rounded-full z-30'}
                 ref={secondaryCursorRef}/>
            <div id={'section-1'} className={'section-1 flex min-h-dvh w-screen justify-center top-0'}>
                    <Canvas camera={{position: [0, 0, 100]}} ref={primaryCanvasRef}>
                        <ambientLight intensity={1.5}/>
                        <directionalLight position={[0, 0, 5]} intensity={1}/>
                        <Instances range={15}>
                            <boxGeometry args={[15, 15, 0.1]}/>
                            <meshStandardMaterial color={'#ffffff'}/>
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
            <div id={'section-2'} className={'section-2 min-w-full max-h-screen mx-auto backdrop-blur-md flex flex-col absolute z-10'}>
                <h1 className={'font-bold font-inter text-white text-8xl mx-auto mt-10'}>
                    About Me
                </h1>
                {/*<div id={'image-scroller'} className={'relative w-full overflow-hidden mt-10'}>*/}
                {/*    <motion.div className={'flex'} animate={{*/}
                {/*        x: ['-100%', '0%'],*/}
                {/*        transition: {*/}
                {/*            ease: 'linear',*/}
                {/*            duration: 20,*/}
                {/*            repeat: Infinity*/}
                {/*        }*/}
                {/*    }}>*/}
                {/*        {*/}
                {/*            duplicatedSlides.map((slide, i) => (*/}
                {/*                <div key={i} className="flex-shrink-0" style={{width: `${100 / slides.length}%`}}>*/}
                {/*                    <div*/}
                {/*                        className="flex flex-col items-center justify-center h-full text-6xl text-white">*/}
                {/*                        {slide.icon}*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            ))*/}
                {/*        }*/}
                {/*    </motion.div>*/}
                {/*</div >*/}
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

            </div>
            <div id={'section-3'} className={'h-screen bg-black flex'}>
                <div className={'h-full border w-fit flex flex-row'} ref={projectRef}>
                    <div id={'featured-project-1'} className={'w-screen'}>
                        <Image src={'/images/personal-website-cover.png'} alt={'this website!'}
                               width={window.innerWidth - 400} height={500} className={''}/>
                    </div>
                    <div id={'featured-project-2'} className={'w-screen'}>
                        <Image src={'/images/personal-website-cover.png'} alt={'this website!'}
                               width={window.innerWidth - 400} height={500} className={''}/>
                    </div>
                    <div id={'featured-project-3'} className={'w-screen'}>
                        <Image src={'/images/personal-website-cover.png'} alt={'this website!'}
                               width={window.innerWidth - 400} height={500} className={''}/>
                    </div>
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