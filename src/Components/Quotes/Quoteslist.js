import React from 'react'
import { Container, Table } from 'react-bootstrap'

const Quoteslist = () => {
    return (
        <div className='quotestables'>
            <Container>
                <Table className='quote_table mt-3' striped bordered hover>
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>LOB</th>
                            <th>Company Name</th>
                            <th>Policy Price</th>
                            <th>Benefits</th>
                            <th>Repair Type</th>
                            <th>Plan Nature</th>
                            <th>Instant Policy</th>
                            <th>Get it</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Motor</td>
                            <td>
                                <tr>
                                    <td>JDV</td>
                                    {/* <td>dmfknd</td> */}
                                </tr>
                            </td>
                            <td>999</td>
                            <td>100</td>
                            <td>Agency</td>
                            <td>Takaful</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default Quoteslist