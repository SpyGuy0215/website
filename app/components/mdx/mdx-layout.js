import {motion, useScroll, useSpring} from "framer-motion";

import Footer from "./Footer";

export default function MdxLayout({children}) {
    const {scrollYProgress} = useScroll();
    const scaleX = useSpring(scrollYProgress, {stiffness: 400, damping: 90, mass: 0.2})

    return (
        <>
            <motion.div className={'h-2 w-screen bg-blue-400 fixed origin-left'} style={{scaleX: scaleX}}/>
            <div className="bg-slate-100 pt-10 min-h-screen pb-10">
                <div className={'w-10/12 md:w-7/12 mx-auto'}>
                    {children}
                </div>
            </div>
            <Footer/>
        </>
    )
}