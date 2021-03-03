
import React from 'react';

export default function LordIcon({ src, altsrc, trigger = "loop", delay = "2500" }) {
    if (typeof window !== `undefined`) {
        const lordiconelement = require('lord-icon-element');
        const lottie = require('lottie-web');
        lordiconelement.defineLordIconElement(lottie.loadAnimation);
        return (
            <lord-icon trigger={trigger} delay={delay} src={src}></lord-icon>
        )
    }
    return <img className="project-card-gif" src={altsrc} alt="Turning gears" />
}