import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from '../../utils/pagination.hook.';
import styles from './Pagination.module.scss';

const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul className={classnames(styles.pagination_container, { [className]: className })}>
            <li className={classnames(styles.pagination_item, styles.dots, currentPage === 1 ? styles.disabled : null)}
                onClick={onPrevious}
            >
                <div className={classnames(styles.arrow, styles.left)} />
            </li>
            {paginationRange.map(pageNumber => {
                if (pageNumber === DOTS) {
                    return <li className={styles.pagination_item}>&#8230;</li>;
                }

                return (
                    <li className={classnames(styles.pagination_item, {
                            selected: pageNumber === currentPage
                        })}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li className={classnames(styles.pagination_item, styles.dots, currentPage === lastPage ? styles.disabled : null)}
                onClick={onNext}
            >
                <div className={classnames(styles.arrow, styles.right)} />
            </li>
        </ul>
    );
};

export default Pagination;