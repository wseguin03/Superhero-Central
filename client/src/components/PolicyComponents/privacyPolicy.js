import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
const PrivacyPolicy = () => {
    const [policy, setPolicy] = useState('');

    useEffect(() => {
        const fetchPolicy = async () => {
            try {
                const response = await fetch('/api/admin');
                const data = await response.json();
                console.log('Fetched policy:', data.securityAndPrivacyPolicy); // Debug line
                setPolicy(data.securityAndPrivacyPolicy);
            } catch (error) {
                console.error('Failed to fetch policy:', error);
            }
        };

        fetchPolicy();
    }, []);

    console.log('Current policy:', policy); // Debug line

    return (
        <Container className='policyContainer'>
            <p>{policy}</p>
        </Container>
    );
    };

export default PrivacyPolicy;