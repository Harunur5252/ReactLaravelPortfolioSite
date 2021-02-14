import React, { Component,Fragment } from 'react';
import Menu from '../components/Menu';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios'
import {Container, Row, Col, Button, Spinner, Model, Modal, Form} from 'react-bootstrap';
import LoadingDiv from '../components/loadingDiv';
import WentWrong from '../components/wentWrong';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {toast, ToastContainer} from "react-toastify";

class Service extends Component {

    constructor(props){
        super(props);
        this.state={
            contactList:[],
            loading:true,
            error:false,
            rowDataId:" ",
            deleteBtnText:"Delete",
            show:false,
            modalShow:false,
            submit:"Submit",
            update:"Update",

            // for add
            serviceName:"",
            serviceDes:"",
            serviceLogo:"",

            // for edit
            serviceUpName:"",
            serviceUpDes:"",
            serviceUpLogo:"",

            serviceNameError:"",
            serviceDesError:"",
            serviceFileError:"",
        }
        this.dataDelete=this.dataDelete.bind(this);
        this.imageFormater=this.imageFormater.bind(this);
        this.modalOpen=this.modalOpen.bind(this);
        this.modalClose=this.modalClose.bind(this);
        this.imageFormater=this.imageFormater.bind(this);
        this.addFormSubmit=this.addFormSubmit.bind(this);
        this.onChangeServiceName=this.onChangeServiceName.bind(this);
        this.onChangeServiceDes=this.onChangeServiceDes.bind(this);
        this.onChangeServiceLogo=this.onChangeServiceLogo.bind(this);
        this.valid=this.valid.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleOpen=this.handleOpen.bind(this);
        this.onChangeUpName=this.onChangeUpName.bind(this);
        this.onChangeUpDes=this.onChangeUpDes.bind(this);
        this.onChangeUpLogo=this.onChangeUpLogo.bind(this);
        this.updateForm=this.updateForm.bind(this);
    }
    updateForm(event){
        let title = this.state.serviceUpName;
        let des = this.state.serviceUpDes;
        let photo = this.state.serviceUpLogo;
        let url="/UpdateService";
        let myFormData = new FormData();
        myFormData.append("title",title);
        myFormData.append("des",des);
        myFormData.append("photo",photo);
        myFormData.append("id",this.state.rowDataId);
        let config={
            headers:{"content-type":"multipart/form-data"}
        }
        Axios.post(url,myFormData,config)
            .then((response)=> {
                if(response.data===1){
                    this.handleClose();
                    this.componentDidMount();
                    toast.success('Update Success!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: 0,
                    });
                }else{
                    toast.error('You have not update any thing!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: 0,
                    });
                }
            })
            .catch((error)=> {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            })
        event.preventDefault();
    }
    onChangeUpName(e){
      this.setState({serviceUpName:e.target.value})
    }
    onChangeUpDes(e){
        this.setState({serviceUpDes:e.target.value})
    }
    onChangeUpLogo(e){
        this.setState({serviceUpLogo:e.target.files[0]})
    }

    handleClose(){
       this.setState({modalShow:false})
    }
    handleOpen(){
        if(this.state.rowDataId == false){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select a row first!',
            })
        }else{
            this.setState({modalShow:true})
            Axios.post('/servicedataedit', {id:this.state.rowDataId}).then((response)=>{
                if(response.status===200){

                    this.setState({serviceUpName:response.data.service_name})
                    this.setState({serviceUpDes:response.data.service_des})
                    this.setState({serviceUpLogo:response.data.service_logo})

                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Please select a row first!',
                    })
                }

            }).catch((error)=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please select a row first!',
                })
            })
        }
    }
    valid(){

        if(this.state.serviceName==false && this.state.serviceDes==false && this.state.serviceLogo==false){
            this.setState({
                serviceNameError:"The service name fields are required",
                serviceDesError:"The service description fields are required",
                serviceFileError:"please select a 'image/photo' file",
            })
        }
        else if(this.state.serviceDes==false && this.state.serviceLogo==false){
            this.setState({
                serviceDesError:"The service description fields are required",
                serviceFileError:"please select a 'image/photo' file",
            })
        }
        else if(this.state.serviceName==false && this.state.serviceDes==false){
            this.setState({
                serviceDesError:"The service description fields are required",
                serviceNameError:"The service name fields are required",
            })
        }
        else if(this.state.serviceName==false && this.state.serviceLogo==false){
            this.setState({
                serviceFileError:"please select a 'image/photo' file",
                serviceNameError:"The service name fields are required",
            })
        }
        else if(this.state.serviceLogo==false){
            this.setState({
                serviceFileError:"please select a 'image/photo' file",
            })
        }
        else if(!(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(this.state.serviceLogo)){
            this.setState({
                serviceFileError:"please select a 'jpeg/jpg/gif/tiff/png' image file",
            })
        }
        else if(this.state.serviceDes==false){
            this.setState({
                serviceDesError:"The service description fields are required",
            })
        }
        else if(this.state.serviceName==false){
            this.setState({
                serviceNameError:"The service name fields are required",
            })
        }
        else if(this.state.serviceName.length<5){
            this.setState({
                serviceNameError:"please enter at least five characters",
            })
        }
        else if(this.state.serviceDes.length<10){
            this.setState({
                serviceDesError:"Description must be entered at least ten characters",
            })
        }
        else {
            return  true;
        }
    }
    modalClose(){
        this.setState({show:false});
    }
    modalOpen(){
        this.setState({show:true});
    }
    onChangeServiceName(e){
        this.setState({serviceName:e.target.value})
    }
    onChangeServiceDes(e){
        this.setState({serviceDes:e.target.value})
    }
    onChangeServiceLogo(e){
        this.setState({serviceLogo:e.target.files[0]})
    }
    addFormSubmit(event){
        this.setState({
            serviceNameError:"",
            serviceDesError:"",
            serviceFileError:"",
        })
            if(this.valid()===true){
                let name = this.state.serviceName;
                let des  = this.state.serviceDes;
                let logo = this.state.serviceLogo;
                let url="/AddService";
                let myFormData = new FormData();
                myFormData.append("name",name);
                myFormData.append("des",des);
                myFormData.append("logo",logo);
                let config={
                    headers:{"content-type":"multipart/form-data"}
                }
                Axios.post(url,myFormData,config)
                    .then((response)=> {
                        this.setState({submit:"Submitting..."})
                        if(response.data===1){
                            this.modalClose();
                            this.componentDidMount();
                            setTimeout(function (){
                                this.setState({submit:"Submit"})
                            }.bind(this),2000)

                            toast.success('Inserted Success!', {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: 0,
                            });

                        }else{
                            this.setState({submit:"Submit"})
                            toast.error('Inserted Fail !', {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: 0,
                            });

                        }
                    })
                    .catch((error)=> {
                        this.setState({submit:"Submit"})
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })
                    })

            }

        event.preventDefault();
    }

    componentDidMount(){
        Axios.get('/ServiceList').then((response)=>{
            if(response.status===200){
                this.setState({contactList:response.data,loading:false,error:false})
            }else{
                this.setState({loading:false,error:true})
            }

        }).catch((error)=>{
            this.setState({loading:false,error:true})
        })
    }

    dataDelete(){
        if(this.state.rowDataId == false){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select a row first!',
            })
        }else{
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {

                if (result.isConfirmed) {
            this.setState({deleteBtnText:<Spinner as='span' animation='border' variant="danger" size='md' role='status' aria-hidden='true'/>})
            Axios.post('/ServiceDelete',{id:this.state.rowDataId}).then((response)=>{

                if(response.data===1 && response.status===200){
                    this.setState({deleteBtnText:"delete"})
                    toast.success('Delete Success!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: 0,
                    });
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    this.componentDidMount();
                }else{
                    this.setState({deleteBtnText:'Delete'})
                    toast.error('Delete Fail!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: 0,
                    });
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }

            }).catch((error)=>{
                this.setState({deleteBtnText:'Delete'})
                toast.error('Delete Fail!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: 0,
                });
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            })
            }
        })
        }
    }

    imageFormater(cell,row){
        return (
            <img className="w-100" src={cell}/>
        )
    }


    render() {

        if(this.state.loading===true){
            return(
                <Menu title="Service">
                    <Container>
                        <LoadingDiv />
                    </Container>
                </Menu>
            )

        }else if(this.state.error===true){
            return(
                <Menu title="Service">
                    <Container>
                        <WentWrong/>
                    </Container>
                </Menu>
            )
        }else{

            const data=this.state.contactList;
            const { SearchBar } = Search;

            const columns = [
                {dataField: 'id',text: 'ID'},
                {dataField: 'service_logo',text: 'Service Logo',formatter:this.imageFormater},
                {dataField: 'service_name',text: 'Service Name'},
                {dataField: 'service_des',text: 'Service Description'},
            ];

            const selectRow={
                mode:'radio',
                onSelect:(row,isSelect,rowIndex)=>{
                    this.setState({rowDataId:row['id']})
                }
            }
            const customTotal = (from, to, size) => (
                <span className="react-bootstrap-table-pagination-total p-2">
                    Showing { from } to { to } of { size } Results
                </span>
            );

            const options = {
                paginationSize: 4,
                pageStartIndex: 0,
                // alwaysShowAllBtns: true, // Always show next and previous button
                // withFirstAndLast: false, // Hide the going to First and Last page button
                // hideSizePerPage: true, // Hide the sizePerPage dropdown always
                // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
                firstPageText: 'First',
                prePageText: 'Back',
                nextPageText: 'Next',
                lastPageText: 'Last',
                nextPageTitle: 'First page',
                prePageTitle: 'Pre page',
                firstPageTitle: 'Next page',
                lastPageTitle: 'Last page',
                showTotal: true,
                paginationTotalRenderer: customTotal,
                disablePageTitle: true,
                sizePerPageList: [{
                    text: '3', value: 3
                }, {
                    text: '5', value: 5
                },
                    {
                    text: '10', value: 10
                }, {
                    text: 'All', value: data.length
                }] // A numeric array is also available. the purpose of above example is custom the text
            };

            return (
                <Fragment>
                    <Menu title="Service">
                        <Container>
                            <Row>
                                <Col lg={12} md={12} sm={12} className="mt-5">
                                    <ToolkitProvider
                                        keyField="id"
                                        data={ data }
                                        columns={ columns }
                                        search
                                    >
                                        {
                                            props => (
                                                <div>
                                                    <h3>Input something at below input field:</h3>
                                                    <SearchBar { ...props.searchProps } />
                                                    <br />

                                                    <Button className="normal-btn btn my-2" onClick={this.dataDelete}>{this.state.deleteBtnText}</Button>
                                                    <Button className="normal-btn btn my-2 m-2" onClick={this.modalOpen}>Add New</Button>
                                                    <Button className="normal-btn btn my-2 m-2" onClick={this.handleOpen}>Edit</Button>
                                                    <BootstrapTable keyField='id' data={ data } { ...props.baseProps } selectRow={selectRow} columns={ columns } pagination={ paginationFactory(options) } />
                                                </div>
                                            )
                                        }
                                    </ToolkitProvider>
                                </Col>
                            </Row>
                            <ToastContainer
                                position="top-right"
                                autoClose={3000}
                                hideProgressBar
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss={false}
                                draggable
                                pauseOnHover={false}
                            />
                        </Container>
                    </Menu>

                    {/*add form*/}
                    <Modal show={this.state.show} onHide={this.modalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Service Data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form onSubmit={this.addFormSubmit}>
                                <Form.Group>
                                    <Form.Label>Service Name</Form.Label>
                                    <Form.Control type="text"   onChange={this.onChangeServiceName} placeholder="Enter Name" />
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.serviceNameError}</p>
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Service Logo</Form.Label>
                                    <Form.Control type="file"  onChange={this.onChangeServiceDes} placeholder="Enter Logo" />
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.serviceFileError}</p>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Service Description</Form.Label>
                                    <Form.Control as="textarea" rows={3}  onChange={this.onChangeServiceDes}  placeholder="Enter Description" />
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.serviceDesError}</p>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    {this.state.submit}
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.modalClose}>
                                Close
                            </Button>

                        </Modal.Footer>

                    </Modal>
                    {/*edit form*/}
                    <Modal show={this.state.modalShow} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.updateForm}>
                                <Form.Group>
                                    <Form.Label>Service Name</Form.Label>
                                    <Form.Control type="text"   onChange={this.onChangeUpName} value={this.state.serviceUpName} placeholder="Enter Name" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Service Logo</Form.Label>
                                    <Form.Control type="file"  onChange={this.onChangeUpLogo} placeholder="Enter Logo" />
                                    <br/>
                                    <img src={this.state.serviceUpLogo} height="80px"/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Service Description</Form.Label>
                                    <Form.Control as="textarea" rows={3}  onChange={this.onChangeUpDes} value={this.state.serviceUpDes} placeholder="Enter Description" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    {this.state.update}
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>



                </Fragment>
            );
        }

    }
}

export default Service;
