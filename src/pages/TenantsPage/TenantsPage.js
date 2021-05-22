import React, { useContext, useEffect, useState } from 'react'
import { Container, Accordion, Alert, Button, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router';
import PageHeaderComponent from '../../components/PageHeaderComponent/PageHeaderComponent';
import TenantsCardComponent from '../../components/TenantCardComponent/TenantCardComponent';
import NewTenantModal from '../../components/NewTenantModal/NewTenantModal'
import ActiveUserContext from '../../shared/ActiveUserContext';
import BackendDataService from '../../utils/BackendDataService';
import './TenantsPage.css';
import DeleteModalComponent from '../../components/DeleteModalComponent/DeleteModalComponent';
import CommunityModel from '../../models/CommunityModel';

export default function TenantsPage() {
    const [tenants, setTenants] = useState([]);
    const [selectedTenant, setSelectedTenant] = useState("");
    const [filterText, setFilterText] = useState("");
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false)
    const [addingTenantError, setAddingTenantError] = useState(false);
    const [updateTenantError, setUpdateTenantError] = useState(false);
    const [deleteTenantError, setDeletTenantError] = useState(false)
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
    let loading = true;
    let filteredTenants=[];
    let tenantsCards=[];
    let currentTenant="";
    const community = new CommunityModel(activeUser.community); 
    if(tenants && tenants.length>0)
    {
        if(filterText){
            filteredTenants = tenants.filter(tenant=> {
                return  tenant.fullName.includes(filterText) ||
                        tenant.email.includes(filterText)||
                        tenant.apartment.includes(filterText);
            });
        }
        else{
            filteredTenants = filteredTenants.concat(tenants);
        }
        tenantsCards = filteredTenants.map((tenant, index) =>{
            return <TenantsCardComponent key={index} tenant={tenant} 
                                        index={index.toString()} 
                                        onUpdateTenant={onUpdateTenant} 
                                        onDeleteTenant={onDeleteTenant} />           
        });
        loading = false;
    }
    
    function onClose(){
        setShow(false);
        setShowDelete(false)
        setSelectedTenant("");
    }
    function onUpdateTenant(index){
        currentTenant = filteredTenants[index];
        setSelectedTenant(currentTenant);
        setShow(true)
    }
    function onDeleteTenant(index){
        currentTenant = filteredTenants[index];
        setSelectedTenant(currentTenant);
        setShowDelete(true);
    }   
    async function handleNewTenant(fullName,email,apt, pwd, img){
        try{
            const tenant = await BackendDataService.addTenant(fullName, email, pwd, activeUser.community, apt, img);
            setTenants(tenants.concat(tenant));
            setAddingTenantError(false);
        }
        catch(e){
            console.log(e);
            setAddingTenantError(true);
        }
        setShow(false);
    }
    async function handleUpdateTenant(fullName, email, apt, img){
        if(fullName!==selectedTenant.fullName || 
            email!==selectedTenant.email || 
            apt!==selectedTenant.apartment || 
            img!==selectedTenant.img){
            try{     
                const newTenant = await BackendDataService.updateTenant(selectedTenant, fullName, email, apt, img);
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
    async function handleDeleteTenant(){
        try{
            BackendDataService.deleteTenant(selectedTenant);
            const tempArr = tenants.filter(tenant=>tenant.id!==selectedTenant.id);
            setTenants(tempArr);
            setDeletTenantError(false);
        }
        catch(e){
            console.log(e);
            setDeletTenantError(true);
        }
        setShowDelete(false)
        setSelectedTenant("");
    }

    return (
        <Container className="p-tenant">
            <h2>Tenants for building: {community? community.name:""}</h2>
            <PageHeaderComponent placeholder="Filter by name/email/apartment:" 
                                onFilterChange={(data)=>setFilterText(data)} 
                                action="Add Tenant"
                                showModal={()=>setShow(true)}/>
            {addingTenantError? <Alert variant="danger">Error in adding new tenant. Please try again.</Alert> : null}
            {updateTenantError? <Alert variant="danger">Error in updating a tenant. Please try again.</Alert> : null}
            {deleteTenantError? <Alert variant="danger">Error in deleting a tenant. Please try again.</Alert> : null}
            {loading ? 
                <Button variant="primary" disabled>
                    <Spinner
                    as="span"
                    animation="border"
                    role="status"
                    aria-hidden="true"
                    />
                    <span className="sr-only">Signing...</span>
                </Button>
                : <Accordion>
                    {tenantsCards.length> 0 ? tenantsCards :null}
                </Accordion>
            }
            <NewTenantModal show={show} 
                            onClose={onClose}                   
                            onCreate={handleNewTenant}
                            tenant={selectedTenant} 
                            onUpdate={handleUpdateTenant}/>
            <DeleteModalComponent show={showDelete}
                                onClose={onClose}
                                title="Tenant"
                                name={selectedTenant.fullName}
                                onDelete={handleDeleteTenant}/>

        </Container>
    )
}
