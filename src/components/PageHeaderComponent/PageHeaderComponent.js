import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import './PageHeaderComponent.css'
export default function PageHeaderComponent({placeholder,filterSelection,sortBy, onFilterChange, onFilterSelectChange, action, showModal}) {
    let innerFilterSelection =[];
    let innerSortBy ="";
    
    if (filterSelection){
        innerFilterSelection = filterSelection.map(x=>{
            return <option>x</option>
        });
    }
    if (sortBy){
        innerSortBy= sortBy.map(x=>{
            return <Form.Check inline type="radio" name="sorting" lable={x}/>   
        });
    }

    return (     
        <Form className="c-page-header">
            <Row>
                <Col>               
                    <Form.Control type="text" placeholder={placeholder} onChange={(e)=>onFilterChange(e.target.value)}/>
                </Col>
                {innerFilterSelection.length>0 ? 
                    <Col>
                        <Form.Control as="select" onChange = {(e)=>onFilterSelectChange(e.target.value)}>
                            {innerFilterSelection}
                        </Form.Control>
                    </Col>
                :null}
                {innerSortBy? <Col>
                            <Form.Label>Sort by:</Form.Label>
                            {innerSortBy}
                        </Col>
                :null}
            </Row> 
            <Row>    
                <Col className="c-b-end">
                    <Button  variant="primary" onClick={showModal}>
                        {action}
                    </Button>
                </Col>
            </Row>         
        </Form>
    )
}
