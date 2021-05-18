import React, { useContext, useEffect, useState } from 'react'
import { Container, Accordion } from 'react-bootstrap';
import { Redirect } from 'react-router';
import PageHeaderComponent from '../../components/PageHeaderComponent/PageHeaderComponent';
import TenantsCardComponent from '../../components/TenantCardComponent/TenantCardComponent';
import ActiveUserContext from '../../shared/ActiveUserContext';
import BackendDataService from '../../utils/BackendDataService';
import './TenantsPage.css';

export default function TenantsPage() {
    const [filterText, setFilterText] = useState("");
    const [show, setShow] = useState(false);
    const [tenants, setTenants] = useState([]);

    const activeUser = useContext(ActiveUserContext);
    
    useEffect(() => {
        async function getAllTenants(){  
            const communityTenants = await BackendDataService.getAllCommunityTenants(activeUser.community);
            setTenants(communityTenants);     
        }   
        if (activeUser){
            getAllTenants();
        }
    }, [activeUser]);
    
    if(!activeUser || activeUser.role!==1){
        return <Redirect to= '/' />
    }
    let filteredTenants=[];
    let tenantsCards=[];
    let currentTenant="";
    if(tenants && tenants.length>0)
    {
        if(filterText){
            filteredTenants = tenants.filter(tenant=> {
                return tenant.lname.includes(filterText) || 
                        tenant.fname.includes(filterText) ||
                        tenant.email.includes(filterText)||
                        tenant.apartment.includes(filterText);
            });
        }
        else{
            filteredTenants = filteredTenants.concat(tenants);
        }
        tenantsCards = filteredTenants.map((tenant, index) =>{
            return <TenantsCardComponent tenant={tenant} index={index.toString()}/>           
        });
    }

    return (
        <Container>
            <PageHeaderComponent placeholder="Filter:" 
                                filterSelection=""
                                sortBy=""
                                onFilterChange={(data)=>setFilterText(data)} 
                                onFilterSelectChange=""
                                action="Add Tenant"
                                showModal={()=>setShow(true)}/>

            <Accordion defaultActiveKey="0">
                {tenantsCards.length> 0 ? tenantsCards :null}
            </Accordion>
           

        </Container>
    )
}
