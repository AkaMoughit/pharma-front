import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PharmacieList from './Pharmacie';
import "./pharmaciegarde.css"

const BackendIntegrationComponent = () => {
    const [formData, setFormData] = useState({
        dateDebut: '',
        dateFin: '',
        pharmacieId: '',
        gardeId: '',
    });
    const [pharmaciesDeGarde, setPharmaciesDeGarde] = useState([]);
    const [pharmacies, setPharmacies] = useState([]);
    const [gardes, setGardes] = useState([]);

    useEffect(() => {
        fetchPharmaciesDeGarde();
        fetchPharmacies();
        fetchGardes();
    }, []);

    const fetchPharmaciesDeGarde = async () => {
        try {
            const response = await axios.get('http://localhost:9071/pharmaciesDeGarde/all');
            setPharmaciesDeGarde(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPharmacies = async () => {
        try {
            const response = await axios.get('http://localhost:9071/pharmacies/all');
            setPharmacies(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchGardes = async () => {
        try {
            const response = await axios.get('http://localhost:9071/gardes/all');
            setGardes(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `http://localhost:9071/pharmaciesDeGarde/add/${formData.dateDebut}/${formData.dateFin}`,
                {
                    pharmacie: {
                        id: formData.pharmacieId,
                    },
                    garde: {
                        idGarde: formData.gardeId,
                    },
                }
            );
            setFormData({
                dateDebut: '',
                dateFin: '',
                pharmacieId: '',
                gardeId: '',
            });
            fetchPharmaciesDeGarde();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Add Pharmacie de Garde</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="dateDebut">Date Début:</label>
                        <input
                            type="date"
                            id="dateDebut"
                            name="dateDebut"
                            value={formData.dateDebut}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateFin">Date Fin:</label>
                        <input
                            type="date"
                            id="dateFin"
                            name="dateFin"
                            value={formData.dateFin}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pharmacieId">Pharmacie:</label>
                        <select
                            id="pharmacieId"
                            name="pharmacieId"
                            value={formData.pharmacieId}
                            onChange={handleChange}
                        >
                            <option value="">Select a Pharmacie</option>
                            {pharmacies.map((pharmacie) => (
                                <option key={pharmacie.id} value={pharmacie.id}>
                                    {pharmacie.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="gardeId">Garde:</label>
                        <select
                            id="gardeId"
                            name="gardeId"
                            value={formData.gardeId}
                            onChange={handleChange}
                        >
                            <option value="">Select a Garde</option>
                            {gardes.map((garde) => (
                                <option key={garde.id} value={garde.id}>
                                    {garde.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="card-save-button">Save</button>
                    </div>
                </form>
            </div>
            <br></br>
            <div className="list-container">
                <h2>Pharmacies de Garde List</h2>
                <ul>
                    {pharmaciesDeGarde.map((pharmacieDeGarde) => (
                        <li key={pharmacieDeGarde.pharmacieDeGardePK.dateDebut}>
                            <span>Date Début: {pharmacieDeGarde.pharmacieDeGardePK.dateDebut}</span>
                            <span>Date Fin: {pharmacieDeGarde.pharmacieDeGardePK.dateFin}</span>
                            <span>Pharmacie: {pharmacieDeGarde.pharmacie ? pharmacieDeGarde.pharmacie.name : ''}</span>
                            <span>Garde: {pharmacieDeGarde.garde ? pharmacieDeGarde.garde.name : ''}</span>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    );
};

export default BackendIntegrationComponent;
