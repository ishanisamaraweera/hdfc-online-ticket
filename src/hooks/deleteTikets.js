import axios from 'axios';

const deleteRecord = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/deleteTicket/${id}`);
        console.log('Deleted successfully');
        // Handle any UI updates or state changes
    } catch (error) {
        console.error('Error deleting record:', error);
        // Handle error, show message, etc.
    }
}

import React from 'react';

const ItemList = ({ items }) => {

    const handleDelete = async (id) => {
        // Call deleteRecord function passing the id
        await deleteRecord(id);
        // Optionally, update state or UI after deletion
    };

    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>
                    {item.name}
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

export default ItemList;

