import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './pharmacie.css'

const PharmacieList = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const fetchPharmacies = async () => {
    try {
      const response = await axios.get('http://localhost:9071/pharmacies/all');
      setPharmacies(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pharmacies:', error);
    }
  };

  const deletePharmacie = async (id) => {
    try {
      await axios.delete(`http://localhost:9071/pharmacies/deletePharmacie/id=${id}`);
      setPharmacies(pharmacies.filter((pharmacie) => pharmacie.id !== id));
    } catch (error) {
      console.error('Error deleting pharmacie:', error);
    }
  };

  return (
    <div className="pharmacie-list-container">
      <h2 className="pharmacie-list-title">Pharmacies</h2>
      <Link to="/pharmacies/add" className="add-pharmacy-link">Add Pharmacy</Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <table className="pharmacie-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Adresse</th>
                                        <th>Telephone</th>
              </tr>
            </thead>
            <tbody>
              {pharmacies.map((pharmacie) => (
                <tr key={pharmacie.id}>
                  <td>
                    <Link to={`/PharmacieDetails/${pharmacie.id}`} className="pharmacie-name-link">{pharmacie.nom}</Link>
                  </td>
                  <td>{pharmacie.adresse}</td>
                                        <td>{pharmacie.telephone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PharmacieList;
