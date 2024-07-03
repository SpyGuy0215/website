"use client";
import {ReactLenis} from "@studio-freight/react-lenis";

function SmoothScrolling({children}) {
    return (
        <ReactLenis root options={{lerp: 0.12, syncTouch: true, smoothWheel: true, infinite: true}}>
            {children}
        </ReactLenis>
    );
}

export default SmoothScrolling;