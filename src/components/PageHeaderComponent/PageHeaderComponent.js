import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import './PageHeaderComponent.css'
export default function PageHeaderComponent({placeholder,filterSelection,sortBy,onSortChange, onFilterChange, onFilterSelectChange, action, showModal}) {
    let innerFilterSelection ="";
    let innerSortBy ="";
    
    if (filterSelection){
        innerFilterSelection = filterSelection.map(x=>{
            return <option>{x}</option>
        });
    }
    if (sortBy){
        innerSortBy= sortBy.map(x=>{
            return <Form.Check inline 
                        type="radio" 
                        name="sorting" 
                        label={x}
                        value={x} 
                        onChange={(e)=>onSortChange(e.target.value)}/>   
        });
    }

    return (     
        <Form className="c-page-header">
            <Row>
                <Col>               
                    <Form.Control type="text" placeholder={placeholder} onChange={(e)=>onFilterChange(e.target.value)}/>
                </Col>
                {filterSelection ? 
                    <Col md={3} lg={2}>
                        <Form.Control as="select" custom size="sm" onChange = {(e)=>onFilterSelectChange(e.target.value)}>
                            {innerFilterSelection}
                        </Form.Control>
                    </Col>
                :null}
                {innerSortBy? 
                    <Col className="c-header-sort" md={5} lg={4}>
                        <Form.Label>Sort by: </Form.Label>
                        {innerSortBy}
                    </Col>
                :null}
            </Row> 
            <Row>    
                <Col className="c-b-end">
                    {action?
                        <Button  variant="primary" onClick={showModal}>
                            {action}
                        </Button>
                    :null}
                </Col>
            </Row>         
        </Form>
    )
}
