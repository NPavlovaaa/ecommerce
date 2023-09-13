import Icon, {IconProps} from "../Icon";
import React from "react";

const CartIcon: React.FC<IconProps> = ({ icon: _, width, height, ...restProps }) => {

    return (
        <Icon icon={
            <svg width={width} height={height} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...restProps}>
                <rect width="30" height="30" fill="#F5F5F5"/>
                <g id="Product Page">
                    <rect width="1440" height="2674" transform="translate(-1256 -30)" fill="#FAFAFA"/>
                    <g id="Navbar">
                        <path d="M-1256 -30H184V60H-1256V-30Z" fill="white"/>
                        <g id="bag-2">
                            <g id="vuesax/linear/bag-2">
                                <g id="bag-2_2">
                                    <path id="Vector" d="M9.375 9.58751V8.37501C9.375 5.56251 11.6375 2.80001 14.45 2.53751C17.8 2.21251 20.625 4.85001 20.625 8.13751V9.86251" stroke="#151411" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path id="Vector_2" d="M11.25 27.5H18.75C23.775 27.5 24.675 25.4875 24.9375 23.0375L25.875 15.5375C26.2125 12.4875 25.3375 10 20 10H10C4.66253 10 3.78753 12.4875 4.12503 15.5375L5.06253 23.0375C5.32503 25.4875 6.22503 27.5 11.25 27.5Z" stroke="#151411" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path id="Vector_3" d="M19.3694 15H19.3806" stroke="#151411" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path id="Vector_4" d="M10.6181 15H10.6294" stroke="#151411" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                            </g>
                        </g>
                        <path d="M184 59H-1256V61H184V59Z" fill="#F3F3F3"/>
                    </g>
                </g>
            </svg>
        }/>
    )
}
export default CartIcon;