import React, {useEffect, useState} from 'react';
import Input from '../Input';
import styles from './MultiDropdown.module.scss';
import styles_input from 'components/Input/Input.module.scss';
import ArrowDownIcon from '../icons/ArrowDownIcon';

export type Option = {
    id: number;
    name: string;
};

export type MultiDropdownProps = {
    className?: string;
    options?: Option[];
    value: Option;
    onChange: (value: Option) => void;
    disabled?: boolean;
    getTitle: (value: Option) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
     className,
     options = [],
     value,
     onChange,
     disabled: initialDisabled,
     getTitle,
     ...props
 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [disabled, setDisabled] = useState(initialDisabled);

    useEffect(() => {
        if (isOpen) {
            setFilteredOptions(options);
        }
    }, [isOpen, options]);

    useEffect(() => {
        setDisabled(initialDisabled);
    }, [initialDisabled]);

    return (
        <div className={`${styles.multi_dropdown} ${className}`}>
            <Input
                placeholder={!value ? getTitle(value) : undefined}
                value={!value ? undefined : getTitle(value)}
                disabled={disabled}
                afterSlot={<ArrowDownIcon color="secondary" onClick={() => setIsOpen(!isOpen)}/>}
                className={styles_input.input}
                {...props}
            />
            {isOpen && !disabled && (
                <ul className={styles.multi_dropdown__ul}>
                    {filteredOptions?.map((option) => (
                        <li
                            key={option.id}
                            className={`${styles.multi_dropdown__li} ${value && value.id === option.id ? styles.selected : ''}`}
                            onClick={() => onChange(option)}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MultiDropdown;