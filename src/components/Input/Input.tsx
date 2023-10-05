import React from 'react';
import styles from "./Input.module.scss";
import classNames from "classnames";

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
    > & {
    /** Значение поля */
    value?: string;
    /** Callback, вызываемый при вводе данных в поле */
    onChange: (value: string) => void;
    /** Слот для иконки справа */
    afterSlot?: React.ReactNode;
    disabled?: boolean;
    className?: string,
    placeholder?: string
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({
       value,
       onChange,
       afterSlot,
       disabled = false,
       className,
       placeholder,
       ...props
     }) => {

      function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const currentValue = event?.target.value
        onChange(currentValue)
      }

      return (
          <div className={classNames(styles.bg_block, className)}>
            <input placeholder={placeholder} className={styles.input} type="text" value={value} disabled={disabled} onChange={handleChange} {...props}/>
            <label className={styles.label}>{afterSlot ? afterSlot : null}</label>
          </div>
      );
    });

export default Input;
