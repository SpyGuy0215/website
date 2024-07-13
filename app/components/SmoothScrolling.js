"use client";
import {ReactLenis} from "@studio-freight/react-lenis";
import {isMacOs} from 'react-device-detect';

function SmoothScrolling({children}) {
    if(!isMacOs) {
        return (
            <ReactLenis root options={{lerp: 0.12, smoothWheel: true}}>
                {children}
            </ReactLenis>
        );
    }
    else{
        // disable smooth scrolling on macOS
        return(
            <ReactLenis root options={{lerp: 1, smoothWheel: false}}>
                {children}
            </ReactLenis>
        )
    }
}

export default SmoothScrolling;