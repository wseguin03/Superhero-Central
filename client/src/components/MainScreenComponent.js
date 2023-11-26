import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const MainScreenComponent = ({ title, children }) => {
    return (
        <div className='main-back'>
            <Container>
                <Row>
                    <Col className='page'>
                        {title && (
                            <>
                                <h1 className='heading'>{title}</h1>
                                <hr />
                            </>
                        )}
                        {children}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MainScreenComponent;