"use client";

import React from "react";
import Footer from "@/app/components/Footer";
import '../../page.css';
import Header from "@/app/components/quasar/Header";

export default function Page() {
    return (
        <div className={'overflow-x-hidden h-screen flex flex-col'}>
            <div className={'bg-black w-screen text-center flex-grow'}>
                <Header />
                <h1 className={'font-inter text-6xl text-white font-semibold pt-20'}>Quasar Support</h1>
                <h2 className={'font-inter text-2xl text-gray-100 mt-20'}>To get in contact with the Quasar development & support team,
                    please
                    email us at&nbsp;
                    <a href={"mailto:quasar_support@shashp.dev"} className={
                        'font-inter text-2xl text-blue-500 mt-20 hover:text-blue-700 transition-colors duration-300'
                    }>quasar_support@shashp.dev</a>
                </h2>
            </div>
            <Footer/>
        </div>
    );
}