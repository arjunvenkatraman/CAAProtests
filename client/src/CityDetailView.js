import React from 'react';
import {motion, AnimatePresence, useMotionValue} from 'framer-motion';
import {TwitterVideoEmbed} from 'react-twitter-embed';
import { useMediaQuery } from 'react-responsive';
import close from './close.svg'

export function CityDetailView(props) {
    
    const {selectedCity, videoData, onCityDetailClose} = props;
    const isDesktop = useMediaQuery({query: '(min-device-width: 1024px)'})
    const y = useMotionValue(0);

    const variants = {
        open: isDesktop ? {x: 0, opacity: 1}  : {y: 0,opacity: 1},
        close: isDesktop? {x: 300, opacity: 0} : {y: 300, opacity: 0}
    }

    return (
        <AnimatePresence>
          {selectedCity && (
            <motion.div 
                y = {y}
                className="cityDetailView"
                variants = {variants}
                initial = "close"
                animate = "open"
                exit = "close"
                // drag = {isDesktop? false : "y"}
                // dragConstraints={{ top: 20, bottom: 20 }}
                // dragElastic={0.2}
                // onDragEnd = {() => {
                //     if(y.get() < - 20) {

                //     }
                // }} 
            >   
                <div className="cityDetailView_Header">
                    <h1>{selectedCity}</h1>
                    <button className="close_btn" onClick={(e) => onCityDetailClose(e)}>
                        <img src={close} alt="close icon" />
                    </button>
                </div>
                <div className="cityDetailView_videoList">
                    {videoData[selectedCity].videos.map((link, index) => {
                        if(link.indexOf('twitter') !== -1) {
                            let id = link.split(/\/?\//)[4].split('?')[0];
                            console.log(id)
                            return <TwitterVideoEmbed id={id} key={id + index}/>
                        }
                        else {
                            return <a href={link} key={index} target="_blank" style={{display: "block", marginBottom: '8px', color:'#fff'}}>{link} </a>
                        }   
                    })}
                </div>  
              
            </motion.div>
          )}
        </AnimatePresence>
    )
}