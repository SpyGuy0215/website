"use client";
import {ReactLenis} from "@studio-freight/react-lenis";

function SmoothScrolling({children}) {
    return (
        <ReactLenis root options={{lerp: 0.12}} syncTouch smoothWheel>
            {children}
        </ReactLenis>
    );
}

export default SmoothScrolling;