import { useEffect, useState } from "react"
import Image from "next/image"
import { Box, Button, Affix} from "@mantine/core";
import {BrandGooglePlay} from "tabler-icons-react"

function getWindowDimensions(){
    const{innerWidth: width, innerHeight: height} = window;
    return{
        width,
        height,
    };
}
function BGImage(){
    const [width, setWidth] = useState<number>();
    const [height, setheight] = useState<number>();

    useEffect(() => {
        const {width, height} = getWindowDimensions();

        setWidth(width);
        setheight(height);
    }, []);

    useEffect(() => {
        function handleResize(){
            const {width, height} = getWindowDimensions();

            setWidth(width);
            setheight(height);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if(width && height){
        return( 
            <Box>
                <Image
                    src={'/img/android.jpg'}
                    width={width}
                    height={height}
                />
                <Affix position={{ bottom: 130, right: 470}}>
                    <Button
                        component="a"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://play.google.com/store/search?q=electrolinera&c=apps&hl=es&gl=US"
                        leftIcon={<BrandGooglePlay size={18} />}
                        styles={(theme) => ({
                        root: {
                            backgroundColor: '#0e3bac',
                            border: 0,
                            height: 42,
                            paddingLeft: 20,
                            paddingRight: 20,

                            '&:hover': {
                            backgroundColor: theme.fn.darken('#0e3bac', 0.05),
                            },
                        },

                        leftIcon: {
                            marginRight: 15,
                        },
                        })}
                    >
                        Google Play
                    </Button>  
                </Affix>     
            </Box>
        );
    }

    return null;
}

export default BGImage