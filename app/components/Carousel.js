import React, {useCallback, useEffect, useState} from "react";
import useEmblaCarousel from "embla-carousel-react";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

export default function Carousel({slides}) {
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: true});
    const [selectedIndex, setSelectedIndex] = useState(0);

    const updateCurrent = () => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }

    const onSelect = useCallback(() => {
        if(!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi])

    const handlePrevious = () => {
        emblaApi?.scrollPrev();
        updateCurrent();
    }

    const handleNext = () => {
        emblaApi?.scrollNext();
        updateCurrent();
    }

    const handleDotClick = (index) => {
        if (!emblaApi) return;
        emblaApi.scrollTo(index);
        updateCurrent();
    }

    useEffect(() => {
        if (!emblaApi) return;
        updateCurrent();
        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        }
    }, [emblaApi, onSelect]);

    let imageOptionsClassStr = '';
    if(slides.imageOptions){
        imageOptionsClassStr = ' ' + slides.imageOptions
    }

    return (
        <div className={'relative font-inter w-full'}>
            <div className='overflow-hidden w-full mr-10' ref={emblaRef}>
                <div className={'flex'}>
                    {slides.map((slide, index) => (
                        <div className={'flex flex-row flex-[0_0_97%] sm:flex-[0_0_60%] aspect-[1.5/1] sm:aspect-video mx-16 border border-zinc-800 rounded-2xl bg-zinc-900'} key={index}>
                            <div className='flex flex-col items-center w-1/2 mx-4 sm:mx-6'>
                                <h3 className='text-center text-2xl sm:mt-6 sm:text-4xl font-bold text-white mt-5 mb-4'>{slide.title}</h3>
                                <p className='text-[12px] sm:text-lg text-gray-300'>{slide.description}</p>
                            </div>
                            <img src={slide.image} alt={slide.title} className={'h-full aspect-video object-cover object-top duration-500 hover:object-bottom w-1/2 rounded-r-2xl' + imageOptionsClassStr}/>
                        </div>))}
                </div>
            </div>
            <div id={'controller-box'} className={'flex flex-row'}>
                <div className={'flex flex-row w-2/12 ml-6 sm:ml-10 mt-8'}>
                    <button className={'border-3 border-gray-800 rounded-full p-3 mr-5'} onClick={handlePrevious}>
                        <FaChevronLeft className={'text-lg sm:text-3xl dark:text-white mr-auto'}/>
                    </button>
                    <button className={'border-3 border-gray-800 rounded-full p-3'} onClick={handleNext}>
                        <FaChevronRight className={'text-lg sm:text-3xl dark:text-white mx-auto'}/>
                    </button>
                </div>
                <div className={'flex flex-row justify-center w-4/12 sm:w-2/12 ml-auto mr-4 sm:mr-10 mt-6'}>
                    {slides.map((slide, index) => (<button key={index}
                                                           className={`w-7 h-7 mx-2 my-auto rounded-full ${index === selectedIndex ? "bg-slate-100" : "bg-slate-800"}`}
                                                           onClick={() => {
                                                               handleDotClick(index)
                                                           }}>
                        <span className='sr-only'>go to slide {index + 1}</span>
                    </button>))}
                </div>
            </div>

        </div>

    )
}