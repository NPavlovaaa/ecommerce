import styles from './Filters.module.scss';
import {Option} from "components/MultiDropdown";
import MultiDropdown from "components/MultiDropdown";
import React, {useEffect} from "react";
import {observer} from "mobx-react";
import FilterStore from "store/FilterStore";

const Filters: React.FC = observer(() => {

    const handleMultiDropdownChange = (newValue: Option[]) => {
        FilterStore.changeActiveCategory(newValue)
    };

    useEffect(() => {
        FilterStore.getCategoriesList();
    }, [FilterStore])

    return (
        <div className={styles.filter_main_block}>
            <MultiDropdown
                options={FilterStore.categoriesList}
                value={FilterStore.activeCategory}
                onChange={(handleMultiDropdownChange)}
                getTitle={(values: Option[]) => `Filters: ${values.map(({ name }) => name).join(', ')}`}
            />
        </div>
    );
})

export default Filters;