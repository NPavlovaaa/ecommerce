import React from 'react';
import Icon, { IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = ({icon: _, color, ...restProps}) => {

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
            <svg width="current" height="current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...restProps}>
                <path d="M4 11.6129L9.87755 18L20 7" stroke={localColor} stroke-width="2"/>
            </svg>

        } />
    );
};

export default CheckIcon;