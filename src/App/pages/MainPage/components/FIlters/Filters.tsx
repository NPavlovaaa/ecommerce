import styles from './Filters.module.scss';
import {Option} from "components/MultiDropdown";
import MultiDropdown from "components/MultiDropdown";
import React, {useState} from "react";

const Filters: React.FC = () => {

    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

    // Обработчик изменения выбранных опций
    const handleMultiDropdownChange = (newValue: Option[]) => {
        setSelectedOptions(newValue);
    };

    const OPTIONS = [
        { key: 'msk', value: 'Moscow' },
        { key: 'spb', value: 'Saint Petersburg' },
        { key: 'ekb', value: 'Ekaterinburg' },
    ];

    return (
        <div className={styles.filter_main_block}>
            <MultiDropdown
                options={OPTIONS}
                value={selectedOptions}
                onChange={handleMultiDropdownChange}
                getTitle={(values: Option[]) => `Filters: ${values.map(({ value }) => value).join(', ')}`}
            />

        </div>
    );
}

export default Filters;