import React from 'react';

interface DataTableProps {
    data: { price: number; timestamp: string }[]; // Replace with the actual data type if different
    name: string;
}

const DataTable: React.FC<DataTableProps> = ({ data, name }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Price (USD)
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Timestamp
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((entry, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {entry.price.toFixed(3)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {new Date(entry.timestamp).toLocaleTimeString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
