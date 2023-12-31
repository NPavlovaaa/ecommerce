import styles from './Search.module.scss';
import Text from "components/Text";
import Input from "components/Input";
import Button from "components/Button";
import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import rootStore from 'store/RootStore/instance';

const Search: React.FC = observer(() => {
    const [search, setSearch] = useState(rootStore.query.searchQuery);
    const urlSearchParams = new URLSearchParams(window.location.search);

    const handleClick = () => {
        rootStore.query.setSearchQuery(search);
        rootStore.query.setPage(1);
    }

    useEffect(() => {
        if (urlSearchParams.get("search")) {
            const searchParam = urlSearchParams.get("search");
            const searchString = searchParam !== null ? searchParam : "";
            setSearch(searchString);
        }
    }, [])

    return(
        <div className={styles.main_block}>
            <div className={styles.input_block}>
                <Input value={search} onChange={setSearch} placeholder="Search product"/>
            </div>
            <Button onClick={handleClick}>
                <Text children="Find now" view="button"/>
            </Button>
        </div>
    )
})

export default Search;