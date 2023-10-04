import Icon, {IconProps} from "../Icon";
import React from "react";

const LoginIcon: React.FC<IconProps> = ({ icon: _, width, height, ...restProps }) => {

    return (
        <Icon width={width} height={height} icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11 0 448 448" {...restProps}>
                <path d="M161.2 355.2l-15.067-15.067L262.266 224 146.133 107.867l15.066-15.066L292.4 224zm0 0"></path>
                <path d="M0 213.332h277.332v21.336H0zm0 0"></path>
                <path d="M362.668 448h-128v-21.332h128c23.465 0 42.664-19.203 42.664-42.668V64c0-23.465-19.2-42.668-42.664-42.668h-128V0h128c35.332 0 64 28.668 64 64v320c0 35.332-28.668 64-64 64zm0 0"></path>
            </svg>
        }/>
    )
}
export default LoginIcon;