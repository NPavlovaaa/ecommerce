import styles from './Filters.module.scss';
import {Option} from "components/MultiDropdown";
import MultiDropdown from "components/MultiDropdown";
import React, {useEffect} from "react";
import {observer} from "mobx-react";
import rootStore from "store/RootStore/instance";

const Filters: React.FC = observer(() => {

    const handleMultiDropdownChange = (newValue) => {
        rootStore.query.setFilter(newValue)
    };

    useEffect(() => {
        rootStore.query.getCategoryList();
    }, [rootStore.query])

    return (
        <div className={styles.filter_main_block}>
            <MultiDropdown
                options={rootStore.query.categoryList}
                value={rootStore.query.filter}
                onChange={handleMultiDropdownChange}
                getTitle={(value: Option) => `Filter: ${value ? value.name : ''}`}
            />
        </div>
    );
})

export default Filters;