import React, { Component,Fragment } from 'react';
import Menu from '../components/Menu';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios'
import  { Container,Row,Col, Button, Spinner,Modal,Form } from 'react-bootstrap';
import LoadingDiv from '../components/loadingDiv';
import WentWrong from '../components/wentWrong';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cellEditFactory from 'react-bootstrap-table2-editor';
import withReactContent from 'sweetalert2-react-content'

class Contact extends Component {

    constructor(props){
        super(props);
        this.state={
            contactList:[],
            loading:true,
            error:false,
            rowDataId:" ",
            deleteBtnText:"Delete",
            show:false,
            name:"",
            message:"",
            email:"",

            upName:"",
            upEmail:"",
            upMessage:"",

            contactName:"",
            contactEmail:"",
            contactMsg:"",

            contactNameError:"",
            contactEmailError:"",
            contactMsgError:"",

            update:"Update",
            submit:"Submit",
            showModal:false,

        }
        this.dataDelete=this.dataDelete.bind(this);
        this.modalClose=this.modalClose.bind(this);
        this.modalOpen=this.modalOpen.bind(this);
        this.nameChnage=this.nameChnage.bind(this);
        this.emailChnage=this.emailChnage.bind(this);
        this.messageChnage=this.messageChnage.bind(this);
        this.updateFormSubmit=this.updateFormSubmit.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleOpen=this.handleOpen.bind(this);
        this.addForm=this.addForm.bind(this);
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangeMsg=this.onChangeMsg.bind(this);
        this.valid=this.valid.bind(this);
    }
    valid(){

        if(this.state.contactName==false && this.state.contactEmail==false && this.state.contactMsg==false){
            this.setState({
                contactNameError:"The name fields are required",
                contactEmailError:"The email fields are required",
                contactMsgError:"The message fields are required",
            })
        }
        else if(this.state.contactEmail==false && this.state.contactMsg==false){
            this.setState({
                contactEmailError:"The email fields are required",
                contactMsgError:"The message fields are required",
            })
        }
        else if(this.state.contactName==false && this.state.contactEmail==false){
            this.setState({
                contactNameError:"The name fields are required",
                contactEmailError:"The email fields are required",
            })
        }
        else if(this.state.contactName==false && this.state.contactMsg==false){
            this.setState({
                contactNameError:"The name fields are required",
                contactMsgError:"The message fields are required",
            })
        }
        else if(this.state.contactEmail==false){
            this.setState({
                contactEmailError:"The email fields are required",
            })
        }
        else if(!this.state.contactEmail.includes("@")){
            this.setState({
                contactEmailError:"please select a valid email address",
            })
        }
        else if(this.state.contactName==false){
            this.setState({
                contactNameError:"The name fields are required",
            })
        }
        else if(this.state.contactMsg==false){
            this.setState({
                contactMsgError:"The message fields are required",
            })
        }
        else if(this.state.contactName.length<5){
            this.setState({
                contactNameError:"please enter at least five characters",
            })
        }
        else if(this.state.contactMsg.length<10){
            this.setState({
                contactMsgError:"Description must be entered at least ten characters",
            })
        }
        else {
            return  true;
        }
    }
    updateFormSubmit(event){

        let name = this.state.name;
        let email = this.state.email;
        let message = this.state.message;

        let myFormData = new FormData();
        myFormData.append("name",name);
        myFormData.append("email",email);
        myFormData.append("message",message);
        myFormData.append("id",this.state.rowDataId);

        Axios.post("/UpdateContact",myFormData)
            .then((response)=> {
                this.setState({update:"Updating..."})
                if(response.data===1){
                    this.modalClose();
                    this.componentDidMount();
                    setTimeout(function (){
                        this.setState({update:"Update"})
                    }.bind(this),2000)

                    toast.success('Update Success!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: 0,
                    });
                    Swal.fire(
                        'Updated!',
                        'Your data has been updated.',
                        'success'
                    )
                }else{
                    this.setState({update:"Update"})
                    toast.error('Update Fail !', {
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
                        text: 'you have not update any things!',
                    })
                }
            })
            .catch((error)=> {
                this.setState({update:"Update"})
                toast.error('Update Fail !', {
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
        event.preventDefault();
    }
    addForm(event){
        this.setState({
            contactNameError:"",
            contactEmailError:"",
            contactMsgError:"",
        })

        if(this.valid()===true){
            let name = this.state.contactName;
            let email = this.state.contactEmail;
            let message = this.state.contactMsg;

            let myFormData = new FormData();
            myFormData.append("name",name);
            myFormData.append("email",email);
            myFormData.append("message",message);

            Axios.post("/AddContact",myFormData)
                .then((response)=> {
                    this.setState({submit:"Submitting..."})
                    if(response.data===1){
                        this.handleClose();
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
                        this.setState({update:"Update"})
                        toast.error('Inserted Fail !', {
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
                            text: 'you have not update any things!',
                        })
                    }
                })
                .catch((error)=> {
                    this.setState({update:"Update"})
                    toast.error('Update Fail !', {
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

        event.preventDefault();
    }
    onChangeName(e){
        this.setState({contactName:e.target.value})
    }
    onChangeEmail(e){
        this.setState({contactEmail:e.target.value})
    }
    onChangeMsg(e){
        this.setState({contactMsg:e.target.value})
    }
    handleClose(){
        this.setState({showModal:false})
    }
    handleOpen(){
        this.setState({showModal:true})
    }
    nameChnage(e){
       this.setState({[e.target.name]:e.target.value})
        //  let upName=e.target.value;
        // this.setState({upName:upName})
    }
    emailChnage(e){
        this.setState({[e.target.name]:e.target.value})
        // let upEmail=e.target.value;
        // this.setState({upEmail:upEmail})
    }
    messageChnage(e){
       this.setState({[e.target.name]:e.target.value})
        // let upMessage=e.target.value;
        // this.setState({upMessage:upMessage})
    }

    modalClose(){
        this.setState({show:false});
    }
    modalOpen(){
        if(this.state.rowDataId == false){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select a row first!',
            })
        }else{
            this.setState({show:true});
            Axios.post('/dataedit', {id:this.state.rowDataId}).then((response)=>{
                if(response.status===200){

                    this.setState({name:response.data.name})
                    this.setState({email:response.data.email})
                    this.setState({message:response.data.message})

                }else{

                }

            }).catch((error)=>{

            })
        }

    }


   async componentDidMount(){
        await Axios.get('/contactlist').then((response)=>{
            if(response.status===200){
                 this.setState({contactList:response.data,loading:false,error:false})
            }else{
                this.setState({loading:false,error:true})
            }

        }).catch((error)=>{
            this.setState({loading:false,error:true})
        })
    }

    // dataDelete(){
    //         this.setState({deleteBtnText:<Spinner as='span' animation='border' variant="danger" size='md' role='status' aria-hidden='true'/>})
    //         Axios.post('/contactDelete',{id:this.state.rowDataId}).then((response)=>{
    //
    //             if(response.data===1 && response.status===200){
    //                 this.setState({deleteBtnText:"delete success"})
    //                 this.componentDidMount();
    //                 setTimeout(function (){
    //                     this.setState({deleteBtnText:"delete"})
    //                 }.bind(this),2000)
    //             }else{
    //                 this.setState({deleteBtnText:"delete fail"})
    //                 setTimeout(function (){
    //                     this.setState({deleteBtnText:"delete"})
    //                 }.bind(this),2000)
    //             }
    //
    //         }).catch((error)=>{
    //             this.setState({deleteBtnText:"delete fail"})
    //             setTimeout(function (){
    //                 this.setState({deleteBtnText:"delete"})
    //             }.bind(this),2000)
    //
    //         })
    // }

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
                    this.setState({deleteBtnText:'Deleting...'})
                    Axios.post('/contactDelete',{id:this.state.rowDataId}).then((response)=>{
                        if(response.data===1 && response.status===200){
                            this.setState({deleteBtnText:'Delete'})
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

    render() {

        if(this.state.loading===true){
            return(
                <Menu title="Contact">
                    <Container>
                        <LoadingDiv />
                    </Container>
                </Menu>
            )

        }else if(this.state.error===true){
            return(
                <Menu title="Contact">
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
                {dataField: 'name',text: 'Name'},
                {dataField: 'email',text: 'Email'},
                {dataField: 'message',text: 'Message'},
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
                    text: '5', value: 5
                }, {
                    text: '10', value: 10
                }, {
                    text: 'All', value: data.length
                }] // A numeric array is also available. the purpose of above example is custom the text
            };


            return (
                <Fragment>
                    <Menu title="Contact">
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
                                                    <SearchBar { ...props.searchProps }  />
                                                    <br/>

                                                    <Button className="normal-btn btn my-2" onClick={this.dataDelete}>{this.state.deleteBtnText}</Button>
                                                    <Button className="normal-btn btn my-2 m-2" onClick={this.modalOpen}>Edit</Button>
                                                    <Button className="normal-btn btn my-2 m-1" onClick={this.handleOpen}>Add New</Button>
                                                    <BootstrapTable
                                                        keyField='id'
                                                        data={ data }
                                                        { ...props.baseProps }
                                                        selectRow={selectRow}
                                                        columns={ columns }
                                                        pagination={ paginationFactory(options) } />
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
                       {/*for update*/}
                    <Modal show={this.state.show} onHide={this.modalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form onSubmit={this.updateFormSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control type="text" value={this.state.name} name="name"  onChange={this.nameChnage} placeholder="Enter Name" />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" value={this.state.email} name="email" onChange={this.emailChnage} placeholder="Enter Email" />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={this.state.message} onChange={this.messageChnage} name="message"  placeholder="Enter Message" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    {this.state.update}
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.modalClose}>
                                Close
                            </Button>

                        </Modal.Footer>

                    </Modal>

                    {/*for add*/}

                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Contact</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form onSubmit={this.addForm}>
                                <Form.Group>
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control type="text" onChange={this.onChangeName} placeholder="Enter Name" />
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.contactNameError}</p>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email"onChange={this.onChangeEmail} placeholder="Enter Email" />
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.contactEmailError}</p>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" onChange={this.onChangeMsg} placeholder="Enter Message" rows={3} />
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.contactMsgError}</p>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
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

export default Contact;
