import styles from './Filters.module.scss';
import {Option} from "components/MultiDropdown";
import MultiDropdown from "components/MultiDropdown";
import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import rootStore from "store/RootStore/instance";

const Filters: React.FC = observer(({setNewFilters}) => {
    const [filters, setFilters] = useState(rootStore.query.selectedFilters);

    const handleMultiDropdownChange = (newValue) => {
        setFilters(newValue)
        rootStore.query.setFilters(newValue)
        setNewFilters(newValue)
    };

    useEffect(() => {
        rootStore.query.getCategoryList();
    }, [rootStore.query])

    return (
        <div className={styles.filter_main_block}>
            <MultiDropdown
                options={rootStore.query.categoryList}
                value={filters}
                onChange={(handleMultiDropdownChange)}
                getTitle={(values: Option[]) => `Filters: ${values.map(({ name }) => name).join(', ')}`}
            />
        </div>
    );
})

export default Filters;