import React, { useContext, useEffect, useState } from 'react'
import { Container, Accordion, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';
import PageHeaderComponent from '../../components/PageHeaderComponent/PageHeaderComponent';
import TenantsCardComponent from '../../components/TenantCardComponent/TenantCardComponent';
import NewTenantModal from '../../components/NewTenantModal/NewTenantModal'
import ActiveUserContext from '../../shared/ActiveUserContext';
import BackendDataService from '../../utils/BackendDataService';
import './TenantsPage.css';

export default function TenantsPage() {
    const [filterText, setFilterText] = useState("");
    const [show, setShow] = useState(false);
    const [tenants, setTenants] = useState([]);
    const [addingTenantError, setAddingTenantError] = useState(false);
    const [updateTenantError, setUpdateTenantError] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState("");

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
            return <TenantsCardComponent tenant={tenant} index={index.toString()} onUpdateTenant={onUpdateTenant} />           
        });
    }

    async function handleNewTenant(fname,lname,email,apt, pwd){
        try{
            const tenant = await BackendDataService.addTenant(fname,lname,email,pwd,activeUser.community,apt);
            setTenants(tenants.concat(tenant));
            setAddingTenantError(false);
        }
        catch(e){
            console.log(e);
            setAddingTenantError(true);
        }
        setShow(false);
    }

    function onUpdateTenant(index){
        currentTenant = filteredTenants[index];
        setSelectedTenant(currentTenant);
        setShow(true)
    }
    function onClose(){
        setShow(false);
        setSelectedTenant("");
    }

    async function handleUpdateTenant(fname,lname,email,apt){
        if(fname || lname || email || apt){
            try{     
                const newTenant = await BackendDataService.updateTenant(selectedTenant, fname,lname,email,apt);
                let index = tenants.findIndex(x=>x.id===selectedTenant.id);
                let tempTenantArr = [];
                tenants.splice(index,1,newTenant);
                tempTenantArr = tempTenantArr.concat(tenants);
                setTenants(tempTenantArr);
                setUpdateTenantError(false);
            }              
            catch(e){
                console.log(e);
                setUpdateTenantError(true);
            }
        }
        setShow(false);
        setSelectedTenant("");
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
            {addingTenantError? <Alert variant="danger">Error in adding new tenant. Please try again.</Alert> : null}
            {updateTenantError? <Alert variant="danger">Error in update a tenant. Please try again.</Alert> : null}
            <Accordion defaultActiveKey="0">
                {tenantsCards.length> 0 ? tenantsCards :null}
            </Accordion>
            <NewTenantModal show={show} 
                            onClose={onClose}                   
                            onCreate={handleNewTenant}
                            tenant={selectedTenant} 
                            onUpdate={handleUpdateTenant}/>

        </Container>
    )
}
