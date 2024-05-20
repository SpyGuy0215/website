"use client";

import MainHeader from './components/MainHeader/MainHeader';
import {useState, useRef} from 'react';
import {Canvas, useFrame} from "@react-three/fiber";
import {Instances, Instance, Text3D, Center} from "@react-three/drei";
import {random} from 'mathjs';

import './page.css';

const particleSpeed = 0.5;

const particles = Array.from({length: 24}, () => ({
    xFactor: random(-150, 150),
    zFactor: random(-80, 80),
    xSpeed: random(-1 * particleSpeed, particleSpeed),
    zSpeed: random(-1 * particleSpeed, particleSpeed),
    xRotFactor: random(-2 * 3.14, 2 * 3.14),
}))

export default function Home() {

    return (
        <div className={'flex flex-col min-h-screen border border-green-500'}>
            <MainHeader/>
            <div className={'main-container flex grow'}>
                <div id={'particle-container'} className={'grow w-full'}>
                    <Canvas camera={{position: [0, 0, 100]}}>
                        <ambientLight intensity={1.5}/>
                        <directionalLight position={[0, 0, 5]} intensity={1}/>
                        <Instances range={15}>
                            <boxGeometry args={[15, 15, 0.1]}/>
                            <meshStandardMaterial color={'#ffffff'}/>
                            {particles.map((data, i) => (
                                <Square key={i} {...data}/>
                            ))}
                            <Center>
                                <Text3D font={'/fonts/inter/Inter_Bold.json'} size={30} height={3}
                                        bevelEnabled bevelSize={0.6} bevelSegments={2} letterSpacing={1.1}>
                                    Shashank
                                    <meshNormalMaterial/>
                                </Text3D>
                            </Center>
                        </Instances>
                    </Canvas>
                </div>
            </div>
        </div>
    )
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

    return (
        <group>
            <Instance ref={ref}/>
        </group>
    )
}
