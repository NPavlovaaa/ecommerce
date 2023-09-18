import styles from './Search.module.scss';
import Text from "components/Text";
import Input from "components/Input";
import Button from "components/Button";
import React, {useState} from "react";
import SearchStore from "store/SearchStore";
import {observer} from "mobx-react";

const Search: React.FC = observer(() => {
    const [search, setSearch] = useState('');

    const handleClick = () => {
        SearchStore.setSearch(search)
    }

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