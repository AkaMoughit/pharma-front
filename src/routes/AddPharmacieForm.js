import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddPharmaciePage = () => {
    const [newPharmacie, setNewPharmacie] = useState({
        nom: '',
        adresse: '',
        telephone: '',
        lat: 0,
        log: 0,
        etat: 0,
        zoneId: '',
        villeId: '',
    });
    
    const [zoneOptions, setZoneOptions] = useState([]);
    const [villeOptions, setVilleOptions] = useState([]);

    useEffect(() => {
        fetchZoneOptions();
        fetchVilleOptions();
    }, []);

    const fetchZoneOptions = async () => {
        try {
            const response = await axios.get('http://localhost:9071/zones/all');
            setZoneOptions(response.data);
        } catch (error) {
            console.error('Error fetching zone options:', error);
        }
    };

    const fetchVilleOptions = async () => {
        try {
            const response = await axios.get('http://localhost:9071/villes/all');
            setVilleOptions(response.data);
        } catch (error) {
            console.error('Error fetching ville options:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewPharmacie((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const response = await axios.post('http://localhost:9071/pharmacies/add/1', newPharmacie);
            // Redirect to the list page after successful save
        } catch (error) {
            console.error('Error adding pharmacie:', error);
        }
    };

    return (
        <div>
            <h2>Add Pharmacy</h2>
            <input
                type="text"
                name="nom"
                value={newPharmacie.nom}
                onChange={handleInputChange}
                placeholder="Pharmacy Name"
            />
            <input
                type="text"
                name="adresse"
                value={newPharmacie.adresse}
                onChange={handleInputChange}
                placeholder="Pharmacy Address"
            />
            <input
                type="text"
                name="telephone"
                value={newPharmacie.telephone}
                onChange={handleInputChange}
                placeholder="Pharmacy Telephone"
            />
            <input
                type="number"
                name="lat"
                value={newPharmacie.lat}
                onChange={handleInputChange}
                placeholder="Latitude"
            />
            <input
                type="number"
                name="log"
                value={newPharmacie.log}
                onChange={handleInputChange}
                placeholder="Longitude"
            />
            <select name="zoneId" value={newPharmacie.zoneId} onChange={handleInputChange}>
                <option value="">Select Zone</option>
                {zoneOptions.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                        {zone.nom}
                    </option>
                ))}
            </select>
            <select name="villeId" value={newPharmacie.villeId} onChange={handleInputChange}>
                <option value="">Select Ville</option>
                {villeOptions.map((ville) => (
                    <option key={ville.id} value={ville.id}>
                        {ville.nom}
                    </option>
                ))}
            </select>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default AddPharmaciePage;
