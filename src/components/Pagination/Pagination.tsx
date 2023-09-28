import React, {FC} from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from 'utils/pagination.hook.';
import styles from './Pagination.module.scss';
import {observer} from "mobx-react";

type Props = {
    onPageChange: (page: number) => void,
    totalCount: number,
    siblingCount?: number,
    currentPage: number,
    pageSize: number,
    className?: string
}

const Pagination: FC<Props> = observer(({
 onPageChange,
 totalCount,
 siblingCount = 1,
 currentPage,
 pageSize,
 className
}) => {

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if(paginationRange){
        if (currentPage === 0 || paginationRange.length < 2) {
            return null;
        }

        let lastPage = paginationRange[paginationRange.length - 1];
        return (
            <ul className={classnames(styles.pagination_container, className)}>
                <li className={classnames(styles.pagination_item, styles.dots, currentPage === 1 ? styles.disabled : null)}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <div className={classnames(styles.arrow, styles.left)} />
                </li>
                {paginationRange.map(pageNumber => {
                    if (pageNumber === DOTS) {
                        return <li key={pageNumber} className={styles.pagination_item}>&#8230;</li>;
                    }

                    return (
                        <li className={classnames(styles.pagination_item, pageNumber === currentPage ? styles.selected : null)}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </li>
                    );
                })}
                <li className={classnames(styles.pagination_item, styles.dots, currentPage === lastPage ? styles.disabled : null)}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    <div className={classnames(styles.arrow, styles.right)} />
                </li>
            </ul>
        );
    }


})

export default Pagination;
