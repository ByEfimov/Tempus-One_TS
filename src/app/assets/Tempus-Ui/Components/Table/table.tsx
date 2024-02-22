import Styles from './table.module.scss';
import { useState } from 'react';

type SortConfig = {
    key?: string;
    direction: directions;
};

type DataItem = {
    [key: string]: string | number;
};

enum directions {
    ascending = 'ascending',
    descending = 'descending',
}

const Table = ({ Array }: { Array: DataItem[] }) => {
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        direction: directions.ascending,
    });

    const requestSort = (key: string) => {
        let direction = directions.ascending;
        if (
            sortConfig.key === key &&
            sortConfig.direction === directions.ascending
        ) {
            direction = directions.descending;
        }
        setSortConfig({ key, direction });
    };

    const sortedData = [...Array].sort((a, b) => {
        if (sortConfig.direction === directions.ascending) {
            return a[sortConfig.key as string] > b[sortConfig.key as string]
                ? 1
                : -1;
        } else {
            return a[sortConfig.key as string] < b[sortConfig.key as string]
                ? 1
                : -1;
        }
    }) as DataItem[];

    return (
        <table className={Styles.Table}>
            <thead>
                <tr>
                    {Object.keys(Array[0]).map((th, index: number) => (
                        <th
                            scope="col"
                            key={index}
                            onClick={() => requestSort(th)}
                        >
                            <div className={Styles.th}>
                                {th}
                                <div className={Styles.direction}>
                                    {sortConfig.key === th &&
                                    sortConfig.direction ===
                                        directions.ascending
                                        ? '>'
                                        : '<'}
                                </div>
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {sortedData.map((row: DataItem, index: number) => (
                    <tr key={index}>
                        {Object.values(row).map((data, index: number) => (
                            <td key={index}>{data}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default Table;
