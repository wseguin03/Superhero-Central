import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

const DmcaPolicy = () => {
    const [policy, setPolicy] = useState('');

    useEffect(() => {
        const fetchPolicy = async () => {
            try {
                const response = await fetch('/api/admin');
                const data = await response.json();
                setPolicy(data.dmcaNoticeAndTakedownPolicy);
            } catch (error) {
                console.error('Failed to fetch policy:', error);
            }
        };

        fetchPolicy();
    }, []);

    return (
        <Container>
            <div>{policy}</div>
        </Container>
    );
};

export default DmcaPolicy;