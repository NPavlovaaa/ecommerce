import React from 'react';
import styles from "./Icon.module.scss";
import classNames from 'classnames';

export type IconProps = {
    className?: string;
    width?: number;
    height?: number;
    color?: string;
    icon?: React.ReactNode;
    onClick?: React.MouseEventHandler;
};

const Icon: React.FC<IconProps> = ({
   className,
   width,
   height,
   color = 'inherit',
   icon,
   onClick
}) => {

    return (
        <div onClick={() => onClick} className={classNames(styles.block, className)} style={{ width, height, color }}>
            {icon}
        </div>
    );
};

export default Icon;