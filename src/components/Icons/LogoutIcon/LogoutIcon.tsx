import Icon, {IconProps} from "../Icon";
import React from "react";

const LogoutIcon: React.FC<IconProps> = ({ icon: _, width, height, ...restProps }) => {

    return (
        <Icon width={width} height={height} icon={
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                {...restProps}
            >
                <path d="M512 62.417v387.166c0 30.756-29.15 55.777-64.98 55.777H309.878a16 16 0 010-32H447.02c17.877 0 32.98-10.888 32.98-23.777V62.417c0-12.888-15.1-23.777-32.98-23.777H309.878a16 16 0 010-32H447.02c35.83 0 64.98 25.022 64.98 55.777zM53.609 272h304.165a16 16 0 000-32H53.609l99.431-103.3a16 16 0 00-23.055-22.192L4.473 244.9a16 16 0 000 22.192l125.512 130.397A16 16 0 10153.04 375.3z"></path>
            </svg>
        }/>
    )
}
export default LogoutIcon;