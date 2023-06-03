import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner,Card  } from 'react-bootstrap';
import Map from './Map';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './style.css';

const PharmacieDetails = () => {
  const { id } = useParams();
  const [pharmacie, setPharmacie] = useState(null);

  useEffect(() => {
    // Fetch pharmacy data from the API
    const fetchPharmacie = async () => {
      try {
        const response = await axios.get(`http://localhost:9071/pharmacies/pharmacie/id=${id}`);
        setPharmacie(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPharmacie();
  }, [id]);

  return (
<div>
      <h2>Pharmacie Details</h2>
          {pharmacie ? (
            <Card>
            <Card.Body>
              <Card.Title>Pharmacy Information</Card.Title>
              <table className="pharmacie-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Telephone</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{pharmacie.nom}</td>
                    <td>{pharmacie.adresse}</td>
                    <td>{pharmacie.telephone}</td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
          ) : (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
              <p>Loading pharmacy details...</p>
            </div>
          )}
            <Map pharmacy={pharmacie} />
    </div>
  );
};

export default PharmacieDetails;
