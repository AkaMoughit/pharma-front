import './style.css';
import React, { useState, useEffect } from 'react';

const Card = ({ onSave, onUpdate, updateValue, setUpdateValue }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    onSave(inputValue);
    setInputValue('');
  };

  const handleUpdate = () => {
    onUpdate(updateValue, inputValue);
    setInputValue('');
    setUpdateValue('');
  };

  return (
    <div className="card">
      <h2 className="card-title">Add City</h2>
      <input
        type="text"
        value={inputValue || updateValue}
        onChange={handleInputChange}
        placeholder="Enter city name"
        className="card-input"
      />
      {updateValue ? (
        <button onClick={handleUpdate} className="card-update-button">Update</button>
      ) : (
        <button onClick={handleSave} className="card-save-button">Save</button>
      )}
    </div>
  );
};

const ListView = ({ items, onDelete, onUpdate, setUpdateValue }) => {
  return (
    <div className="card">
      <h2 className="list-view-title">All Cities</h2>
      <ul className="list-view-items">
        {items.map((item) => (
          <li key={item.id} className="list-view-item">
            {item.nom}
            <button onClick={() => onDelete(item.id)} className="list-view-delete-button">Delete</button>
            <button onClick={() => onUpdate(item)} className="list-view-update-button">Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

function Ville() {
  const [listItems, setListItems] = useState([]);
  const [updateValue, setUpdateValue] = useState('');

  useEffect(() => {
    fetch('http://localhost:9071/villes/all')
      .then((response) => response.json())
      .then((data) => {
        setListItems(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSaveItem = (item) => {
    fetch('http://localhost:9071/villes/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nom: item }),
    })
      .then((response) => response.json())
      .then((data) => {
        setListItems([...listItems, data]);
      })
      .catch((error) => {
        console.error('Error adding city:', error);
      });
  };

  const handleDeleteItem = (itemId) => {
    fetch(`http://localhost:9071/villes/deleteVille/id=${itemId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setListItems(listItems.filter((item) => item.id !== itemId));
      })
      .catch((error) => {
        console.error('Error deleting city:', error);
      });
  };

  const handleUpdateItem = (item) => {
    setUpdateValue(item.nom);
  };

  const handlePerformUpdate = (item, newValue) => {
    const updatedCity = { ...item, nom: newValue }; // Update the city name

    fetch(`http://localhost:9071/villes/updateVille/id=${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCity),
    })
      .then((response) => response.json())
      .then((updatedItem) => {
        setListItems((prevItems) =>
          prevItems.map((prevItem) =>
            prevItem.id === updatedItem.id ? updatedItem : prevItem
          )
        );
        setUpdateValue('');
      })
      .catch((error) => {
        console.error('Error updating city:', error);
      });
  };

  return (
    <div className="app">
      <Card
        onSave={handleSaveItem}
        onUpdate={handlePerformUpdate}
        updateValue={updateValue}
        setUpdateValue={setUpdateValue}
      />
      <ListView
        items={listItems}
        onDelete={handleDeleteItem}
        onUpdate={handleUpdateItem}
        setUpdateValue={setUpdateValue}
      />
    </div>
  );
}

export default Ville;
