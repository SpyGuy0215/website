import Image from 'next/image'

export default function Footer() {
    return (
        <div className={'w-screen h-24 border-t flex flex-row bg-slate-50'}>
            <div className={'w-1/2 border-r h-full flex'}>
                <p className={'self-center mx-auto text-center font-inter'}>©2024 Shashank Prasanna. All Rights Reserved.</p>
            </div>
            <div className={'w-1/2 h-full flex'}>
                <div className={'mx-auto w-fit h-full flex flex-row'}>
                    <a href={'https://www.linkedin.com/in/shashank-prasanna/'}
                       className={'self-center mx-2 hover:scale-125'}>
                        <Image src={'/icons/linkedin.svg'} width={50} height={50}
                               alt={'linkedin'}/>
                    </a>
                    <a href={'https://www.github.com/SpyGuy0215'} className={'self-center mx-2 hover:scale-125'}>
                        <Image src={'/icons/github.svg'} width={50} height={50}
                               alt={'linkedin'}/>
                    </a>
                </div>
            </div>
        </div>
    )
}