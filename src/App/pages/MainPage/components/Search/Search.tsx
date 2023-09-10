import styles from './Search.module.scss';
import Text from "components/Text";
import Input from "components/Input";
import Button from "components/Button";
import React from "react";

const Search: React.FC = () => {

    return(
        <div className={styles.main_block}>
            <div className={styles.input_block}>
                <Input placeholder="Search product"/>
            </div>
            <Button>
                <Text children="Find now" view="button"/>
            </Button>
        </div>
    )
}

export default Search;