import React, { useEffect, useRef } from 'react';
import { Container, Grid, GridColumn } from 'semantic-ui-react';
import './video-overlay.less';

const VideoOverlay = ({ sourceMP4, sourceWebm, sourceOGV, content, darken = false, poster }) => {
    const videoParentRef: any = useRef();
    let vh = 100;
    const isSSR = typeof window === 'undefined';
    if (!isSSR) {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    useEffect(() => {
        // check if user agent is safari and we have the ref to the container <div />
        if (videoParentRef.current) {
            // obtain reference to the video element
            const player = videoParentRef.current.children[0];

            // if the reference to video player has been obtained
            if (player) {
                // set the video attributes using javascript as per the
                // webkit Policy
                player.controls = false;
                player.playsinline = true;
                player.muted = true;
                player.setAttribute("muted", ""); // leave no stones unturned :)
                player.autoplay = true;

                // Let's wait for an event loop tick and be async.
                setTimeout(() => {
                    // player.play() might return a promise but it's not guaranteed crossbrowser.
                    const promise = player.play();
                    // let's play safe to ensure that if we do have a promise
                    if (promise.then) {
                        promise
                            .then(() => { })
                            .catch(() => {
                                // if promise fails, hide the video and fallback to <img> tag
                                videoParentRef.current.style.display = "none";
                            });
                    }
                }, 0);
            }
        }
    }, []);


    return (
        <div className="header-overlay header-overlay-video">
            <video autoPlay loop muted={true} playsInline poster={poster} preload="auto" ref={videoParentRef}>
                <source src={sourceWebm} type="video/webm; codecs=vp8,vorbis"></source>
                <source src={sourceMP4} type="video/mp4; codecs=avc1.42E01E,mp4a.40.2"></source>
                <source src={sourceOGV} type="video/ogg; codecs=theora,vorbis"></source>
                Video unsupported
            </video>
            <Container className="header-overlay-container header-overlay-container-absolute">
                <Grid className={`header-overlay-container-desktop responsive-desktop-container`}>
                    <GridColumn width={16}>
                        <div
                            data-sal="slide-down"
                            data-sal-delay="0"
                            data-sal-duration="300"
                            data-sal-easing="ease"
                        >
                            {content}
                        </div>
                    </GridColumn>
                </Grid>
                <div className={`responsive-mobile-container ${true ? 'header-overlay-container-mobile-top' : 'header-overlay-container-mobile'}`}>
                    <div
                        data-sal="slide-down"
                        data-sal-delay="0"
                        data-sal-duration="300"
                        data-sal-easing="ease"
                    >
                        {content}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default VideoOverlay;
