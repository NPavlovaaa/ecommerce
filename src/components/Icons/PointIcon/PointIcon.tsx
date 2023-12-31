import React from "react";
import Icon, {IconProps} from "../Icon";


const PointIcon: React.FC<IconProps> = ({ icon: _, width, height, ...restProps }) => {

    return (
        <Icon width={width} height={height} icon={
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="512"
                height="512"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                {...restProps}
            >
                <path d="M17.987 2.28a9.032 9.032 0 00-7.05-2.218C6.943.52 3.644 3.736 3.091 7.708a9.01 9.01 0 002.939 8.013A5.913 5.913 0 018 20.152v.348c0 1.93 1.57 3.5 3.5 3.5h1c1.93 0 3.5-1.57 3.5-3.5v-.353c0-1.686.752-3.309 2.118-4.571A8.99 8.99 0 0021 9a9.014 9.014 0 00-3.013-6.72zM15 20.5c0 1.378-1.121 2.5-2.5 2.5h-1A2.503 2.503 0 019 20.5v-.348A7 7 0 008.896 19h6.213c-.066.378-.109.76-.109 1.147v.353zm2.439-5.658c-.987.912-1.695 1.993-2.086 3.158H8.662a6.84 6.84 0 00-1.969-3.027 8.011 8.011 0 01-2.612-7.126c.491-3.528 3.422-6.384 6.969-6.792A8.45 8.45 0 0112.012 1a7.91 7.91 0 015.311 2.027A8.016 8.016 0 0120.001 9c0 2.24-.909 4.315-2.561 5.842zM16 12.374A2.629 2.629 0 0113.374 15H12.5v1.5a.5.5 0 01-1 0V15h-.926a2.757 2.757 0 01-2.382-1.375.5.5 0 01.866-.5c.312.54.894.875 1.517.875h2.8c.896 0 1.626-.729 1.626-1.626 0-.803-.575-1.478-1.368-1.605l-3.422-.55a2.616 2.616 0 01-2.21-2.593A2.629 2.629 0 0110.627 5h.874V3.5a.5.5 0 011 0V5h.926a2.76 2.76 0 012.382 1.375.498.498 0 01-.183.683.502.502 0 01-.683-.183A1.757 1.757 0 0013.426 6h-2.8C9.73 6 9 6.729 9 7.626c0 .803.575 1.478 1.368 1.605l3.422.55A2.616 2.616 0 0116 12.374z"></path>
            </svg>
        }/>
    )
}
export default PointIcon;