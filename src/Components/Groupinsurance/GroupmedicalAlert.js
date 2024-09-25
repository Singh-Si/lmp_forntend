import React, { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

const GroupmedicalAlert = () => {
    const [show, setShow] = useState(true);

    return (
        <div>
            <Container>
                {show && (
                    <Row>
                        <Col>
                            <Alert variant="warning" onClose={() => setShow(false)} dismissible className='custom-alert d-flex align-items-center'>
                            <div className="d-flex align-items-center">
                                    <p className="mb-0 mr-3">Dedicated Client Care Officer -</p>
                                    <p className="mb-0 mr-3"><strong>Name :</strong> Hency Jadeja</p>
                                    <p className="mb-0 mr-3"><strong>Phone Number :</strong> +91 98765 43210</p>
                                    <p className="mb-0"><strong>Email :</strong> hencyzala@gmail.com</p>
                                </div>
                            </Alert>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
}

export default GroupmedicalAlert;
