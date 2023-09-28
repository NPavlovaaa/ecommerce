import React from 'react';
import Icon, { IconProps } from '../Icon';

const ArrowDownIcon: React.FC<IconProps> = ({ icon: _, color, ...restProps }) => {

    const primary: string = "#000000";
    const secondary: string = "#AFADB5";
    const accent: string =  "#518581";

    let localColor: string | undefined
    localColor = color ? color : undefined

    switch (color) {
        case "primary":
            localColor = primary
            break
        case "secondary":
            localColor = secondary
            break
        case "accent":
            localColor = accent
            break
    }

    return (
        <Icon width={24} height={24} icon={
            <svg width="current" height="current" viewBox="0 0 24 24" fill={localColor ? localColor : "#000000"} xmlns="http://www.w3.org/2000/svg" {...restProps}>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z" fill="current"/>
            </svg>
        } />
    );
};

export default ArrowDownIcon;
