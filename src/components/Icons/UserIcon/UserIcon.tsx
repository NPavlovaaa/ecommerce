import Icon, {IconProps} from "../Icon";
import React from "react";

const UserIcon: React.FC<IconProps> = ({ icon: _, width, height, ...restProps }) => {

    return (
        <Icon icon={
            <svg width={width} height={height} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...restProps}>
                <g id="vuesax/linear/user">
                    <g id="user">
                        <path id="Vector" d="M15 15C18.4518 15 21.25 12.2018 21.25 8.75C21.25 5.29822 18.4518 2.5 15 2.5C11.5482 2.5 8.75 5.29822 8.75 8.75C8.75 12.2018 11.5482 15 15 15Z" stroke="#151411" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path id="Vector_2" d="M25.7374 27.5C25.7374 22.6625 20.9249 18.75 14.9999 18.75C9.07495 18.75 4.26245 22.6625 4.26245 27.5" stroke="#151411" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                </g>
            </svg>
        }/>
    )
}
export default UserIcon;