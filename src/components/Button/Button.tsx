import React from 'react';
import './Button.module.scss'
import classNames from 'classnames';
import Loader from "../Loader";
import Text from "../Text";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({loading, children, className, ...props}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!loading && !props.disabled && props.onClick) {
      props.onClick(e);
    }
  };

  return (
      <button
          className={classNames(className, loading && !props.disabled ? "loading-only" : null)}
          {...props}
          onClick={handleClick}
          disabled={props.disabled || loading}
      >
        {loading ? <Loader size="s" color="#ffffff"/> : null}
        <Text view="button">{children}</Text>
      </button>
  );
};

export default Button;
