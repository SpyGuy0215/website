'use client'

import './MainHeader.css';
import {useState} from "react";
import Image from "next/image";
import Lottie from "react-lottie-player";

import menuAnimation from '../../../public/icons/menu.json';

export default function MainHeader() {
    let [showContacts, setShowContacts] = useState(false);
    let [showMenu, setShowMenu] = useState(false);
    let [playState, setPlayState] = useState(false);
    let [playDirection, setPlayDirection] = useState(1); //1 for forward, -1 for reverse
    let [isAnimComplete, setIsAnimComplete] = useState(true);

    function handleMouseHoverEvent() {
        setShowContacts(!showContacts);
    }

    function handleMenuMouseDownEvent() {
        if (isAnimComplete) {
            setShowMenu(!showMenu);
            setPlayState(true); //start playing the animation
            setIsAnimComplete(false);
        }
    }

    function handleLottieComplete() {
        setIsAnimComplete(true);
        if (showMenu) {
            setPlayDirection(-1);
            setPlayState(false);
        } else {
            setPlayDirection(1);
            setPlayState(false);
        }
    }

    // TODO: Show the Contact Me items under the Contact Me text when the user clicks over it for better UX
    return (
        <div className='header-div'>
            <div className='header-element' onMouseDown={handleMenuMouseDownEvent}>
                <Lottie animationData={menuAnimation} play={playState} segments={[0, 12]}
                        loop={false} className={'invert'} onComplete={handleLottieComplete} direction={playDirection}/>
            </div>
            <div className='header-element'>
                {
                    showContacts ?
                        <div>
                            <p className={'header-text font-inter font-bold'}>
                                Contact Me
                            </p>
                            <div className={'flex'} onMouseLeave={handleMouseHoverEvent}>
                                <a target={'_blank'} rel={"noopener noreferrer"} href={'https://github.com/SpyGuy0215'}>
                                    <Image className={'invert header-icon'} src={'/icons/github.svg'} width={50}
                                           height={50}
                                           alt="github"/>
                                </a>
                                <a target={'_blank'} rel={"noopener noreferrer"}
                                   href={'https://www.linkedin.com/in/shashank-prasanna/'}>
                                    <Image className={'invert header-icon'} src={'/icons/linkedin.svg'} width={50}
                                           height={50}
                                           alt="linkedin"/>
                                </a>
                                <a target={'_blank'} rel={"noopener noreferrer"}
                                   href={'mailto:shashankprasanna1@gmail.com'}>
                                    <Image className={'invert header-icon'} src={'/icons/gmail.svg'} width={50}
                                           height={50}
                                           alt="mail"/>
                                </a>
                            </div>
                        </div>
                        :
                        <p className={'header-text font-inter font-bold'}>
                            Contact Me
                        </p>
                }
            </div>
        </div>
    )
}