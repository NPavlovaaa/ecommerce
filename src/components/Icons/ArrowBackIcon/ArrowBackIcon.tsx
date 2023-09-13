import Icon, {IconProps} from "../Icon";
import React from "react";

const ArrowBackIcon: React.FC<IconProps> = ({ icon: _, width, height, ...restProps }) => {

    return (
        <Icon icon={
            <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...restProps}>
                <g id="vuesax/linear/arrow-right">
                    <g id="arrow-right">
                        <path id="Vector" d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                </g>
            </svg>
        }/>
    )
}
export default ArrowBackIcon;