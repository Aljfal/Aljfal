import React from 'react';

export default function TableOfUsers({ data }) {
    return (
        <table className="w-full border-collapse border">
            <thead>
                <tr>
                    <th className="border p-2 bg-gray-200">Name</th>
                    <th className="border p-2 bg-gray-200">Address</th>
                    <th className="border p-2 bg-gray-200">Phone</th>
                    <th className="border p-2 bg-gray-200">Gender</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td className="border p-2">{row.name}</td>
                        <td className="border p-2">{row.address}</td>
                        <td className="border p-2">{row.phone}</td>
                        <td className="border p-2">{row.gender}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
