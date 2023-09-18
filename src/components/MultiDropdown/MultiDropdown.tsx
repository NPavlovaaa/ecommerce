import React, {useEffect, useRef, useState} from 'react';
import Input from '../Input';
import styles from './MultiDropdown.module.scss';
import styles_input from 'components/Input/Input.module.scss';
import ArrowDownIcon from '../icons/ArrowDownIcon';

export type Option = {
    id: string;
    name: string;
};

export type MultiDropdownProps = {
    className?: string;
    options?: Option[];
    value: Option[];
    onChange: (value: Option[]) => void;
    disabled?: boolean;
    getTitle: (value: Option[]) => string;
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
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [isFocused, setIsFocused] = useState(false);



    useEffect(() => {
        if (isOpen) {
            setFilteredOptions(options);
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }, [isOpen, options]);

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    // Обновляем состояние disabled при изменении пропса
    useEffect(() => {
        setDisabled(initialDisabled);
    }, [initialDisabled]);


    const handleInputChange = (newValue: string) => {
        if (disabled) {
            return;
        }
        const filtered = options.filter((option) =>
            option.name.toLowerCase().includes(newValue.toLowerCase())
        );
        setFilteredOptions(filtered);
    };

    const handleOptionClick = (clickedOption: Option) => {
        const isSelected = value.some((option) => option.id === clickedOption.id);
        if (isSelected) {
            onChange(value.filter((option) => option.id !== clickedOption.id));
        } else {
            onChange([...value, clickedOption]);
        }
    };

    const handleDocumentClick = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
            setIsFocused(false);
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
        setTimeout(() => {
            setIsOpen(true);
        }, 0);
    };

    return (
        <div className={`${styles.multi_dropdown} ${className}`} ref={dropdownRef}>
            <Input
                ref={inputRef}
                placeholder={value.length === 0 ? getTitle(value) : undefined}
                value={value.length === 0 ? undefined : getTitle(value)}
                onChange={handleInputChange}
                onFocus={handleFocus}
                disabled={disabled}
                afterSlot={<ArrowDownIcon color="secondary"/>}
                className={isFocused ? `${styles.focused} ${styles_input.input}` : styles_input.input}
                {...props}
            />
            {isOpen && !disabled && (
                <ul className={styles.multi_dropdown__ul}>
                    {filteredOptions?.map((option) => (
                        <li
                            key={option.id}
                            className={`${styles.multi_dropdown__li} ${value.some((selected) => selected.id === option.id)
                                    ? styles.selected
                                    : ''
                            }`}
                            onClick={() => handleOptionClick(option)}
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