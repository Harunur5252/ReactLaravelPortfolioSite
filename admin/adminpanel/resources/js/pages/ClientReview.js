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
import withReactContent from 'sweetalert2-react-content'
import {toast, ToastContainer} from "react-toastify";

class ClientReview extends Component {

    constructor(props){
        super(props);
        this.state={
            contactList:[],
            loading:true,
            error:false,
            rowDataId:" ",
            deleteBtnText:"Delete",
            addNewModal:false,
            // for add
            addTitle:"",
            addDes:"",
            addFile:"",
            // for edit
            addEditTitle:"",
            addEditDes:"",
            addEditFile:"",


            submit:"Submit",
            update:"Update",
            addTitleError:"",
            addFileError:"",
            addDesError:"",
            show:false,
        }
        this.dataDelete=this.dataDelete.bind(this);
        this.addNewModalOpen=this.addNewModalOpen.bind(this);
        this.addNewModalClose=this.addNewModalClose.bind(this);
        this.titleOnChange=this.titleOnChange.bind(this);
        this.desOnChange=this.desOnChange.bind(this);
        this.fileOnChange=this.fileOnChange.bind(this);
        this.addFormSubmit=this.addFormSubmit.bind(this);
        this.valid=this.valid.bind(this);
        this.updateForm=this.updateForm.bind(this);
        this.titleUpOnChange=this.titleUpOnChange.bind(this);
        this.fileUpOnChange=this.fileUpOnChange.bind(this);
        this.desUpOnChange=this.desUpOnChange.bind(this);
        this.handleModalSHow=this.handleModalSHow.bind(this);
        this.handleModalClose=this.handleModalClose.bind(this);
    }
    updateForm(e){
        let title = this.state.addEditTitle;
        let des = this.state.addEditDes;
        let photo = this.state.addEditFile;
        let url="/UpdateReview";
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
                    this.handleModalClose();
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
        e.preventDefault();
    }

    //  InValidateImage(event) {
    //     var formData = new FormData();
    //     var file = document.getElementById("img").files[0];
    //     formData.append("Filedata", file);
    //     var t = file.type.split('/').pop().toLowerCase();
    //     if (t !== "jpeg" && t !== "jpg" && t !== "png" && t !== "bmp" && t !== "gif") {
    //         toast.error('Please select a valid jpeg,jpg,png,bmp and gif image file !', {
    //             position: "top-right",
    //             autoClose: 3000,
    //             hideProgressBar: true,
    //             closeOnClick: true,
    //             pauseOnHover: false,
    //             draggable: true,
    //             progress: 0,
    //         });
    //         document.getElementById("img").value = '';
    //         return false;
    //     }
    //     if (file.size > 1024000) {
    //         toast.error('Max Upload size is 1MB only!', {
    //             position: "top-right",
    //             autoClose: 3000,
    //             hideProgressBar: true,
    //             closeOnClick: true,
    //             pauseOnHover: false,
    //             draggable: true,
    //             progress: 0,
    //         });
    //         document.getElementById("img").value = '';
    //         return false;
    //     }
    //     return true;
    //      event.preventDefault();
    //
    // }

    componentDidMount(){
        Axios.get('/ReviewList').then((response)=>{
            if(response.status===200){
                this.setState({contactList:response.data,loading:false,error:false})
            }else{
                this.setState({loading:false,error:true})
            }

        }).catch((error)=>{
            this.setState({loading:false,error:true})
        })
    }

    handleModalSHow(){
        if(this.state.rowDataId == false){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select a row first!',
            })
        }else{
            this.setState({show:true})
            Axios.post('/reviewdataedit', {id:this.state.rowDataId}).then((response)=>{
                if(response.status===200){

                    this.setState({addEditTitle:response.data.client_title})
                    this.setState({addEditDes:response.data.client_description})
                    this.setState({addEditFile:response.data.client_img})

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
    handleModalClose(){
        this.setState({show:false})
    }

    addNewModalOpen(){
       this.setState({addNewModal:true})

    }
    titleUpOnChange(e){
      this.setState({addEditTitle:e.target.value})
    }
    fileUpOnChange(e){
        this.setState({addEditFile:e.target.files[0]})
    }
    desUpOnChange(e){
        this.setState({addEditDes:e.target.value})
    }
    addNewModalClose(){
        this.setState({addNewModal:false})
    }

    valid(){

       if(this.state.addTitle==false && this.state.addDes==false && this.state.addFile==false){
           this.setState({
               addTitleError:"The title fields are required",
               addDesError:"The description fields are required",
               addFileError:"please select a 'image/photo' file",
               // addDesError:"Description must be entered at least ten characters",
           })
       }
       else if(this.state.addDes==false && this.state.addFile==false){
           this.setState({
               addDesError:"The description fields are required",
               addFileError:"please select a 'image/photo' file",
           })
       }
       else if(this.state.addTitle==false && this.state.addDes==false){
           this.setState({
               addDesError:"The description fields are required",
               addTitleError:"The title fields are required",
           })
       }
       else if(this.state.addTitle==false && this.state.addFile==false){
           this.setState({
               addFileError:"please select a 'image/photo' file",
               addTitleError:"The title fields are required",
           })
       }
       else if(this.state.addFile==false){
           this.setState({
               addFileError:"please select a 'image/photo' file",
           })
       }
       else if(!(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(this.state.addFile)){
           this.setState({
               addFileError:"please select a 'jpeg/jpg/gif/tiff/png' image file",
           })
       }
       else if(this.state.addDes==false){
           this.setState({
               addDesError:"The description fields are required",
           })
       }
       else if(this.state.addTitle==false){
           this.setState({
               addTitleError:"The title fields are required",
           })
       }
       // else if(this.state.addTitle.length<5 && this.state.addDes.length<10 && this.state.addFile==false){
       //     this.setState({
       //         addTitleError:"please enter at least five characters",
       //         addDesError:"Description must be entered at least ten characters",
       //         addFileError:"please select a 'image/photo' file",
       //     })
       // }

       else if(this.state.addTitle.length<5){
            this.setState({
                addTitleError:"please enter at least five characters",
            })
        }
       else if(this.state.addDes.length<10){
            this.setState({
                addDesError:"Description must be entered at least ten characters",
            })
        }
       else {
           return  true;
       }
    }


    addFormSubmit(event){
        this.setState({
            addTitleError:"",
            addDesError:"",
            addFileError:"",
        })

        if(this.valid()===true){
            let title = this.state.addTitle;
            let des = this.state.addDes;
            let photo = this.state.addFile;
            let url="/AddReview";
            let myFormData = new FormData();
            myFormData.append("title",title);
            myFormData.append("des",des);
            myFormData.append("photo",photo);
            let config={
                headers:{"content-type":"multipart/form-data"}
            }
            Axios.post(url,myFormData,config)
                .then((response)=> {
                    if(response.data===1){
                        this.addNewModalClose();
                        this.componentDidMount();
                        toast.success('Delete Success!', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: 0,
                        });
                    }else{
                        toast.error('Delete Fail!', {
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
         }

         event.preventDefault();
    }

    titleOnChange(event){
      let title = event.target.value;
       this.setState({addTitle:title})
    }

    desOnChange(event){
        let des = event.target.value;
        this.setState({addDes:des})
    }

    fileOnChange(event){
        let photo = event.target.files[0];
        this.setState({addFile:photo})
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
            Axios.post('/ReviewDelete',{id:this.state.rowDataId}).then((response)=>{

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
                }

            }).catch((error)=>{
                this.setState({deleteBtnText:'Delete'})
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
                <Menu title="Review">
                    <Container>
                        <LoadingDiv />
                    </Container>
                </Menu>
            )

        }else if(this.state.error===true){
            return(
                <Menu title="Review">
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
                {dataField: 'client_title',text: 'Client Name'},
                {dataField: 'client_img',text: 'Client Photo',formatter:this.imageFormater},
                {dataField: 'client_description',text: 'Description'},
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
                    <Menu title="Review">
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
                                                    <Button className="normal-btn btn m-2" onClick={this.addNewModalOpen}>Add New</Button>
                                                    <Button className="normal-btn btn m-1" onClick={this.handleModalSHow}>Edit</Button>
                                                    <BootstrapTable keyField='id' data={ data } { ...props.baseProps } selectRow={selectRow} columns={ columns } pagination={ paginationFactory(options) } />
                                                </div>
                                            )
                                        }
                                    </ToolkitProvider>

                                </Col>
                            </Row>
                            <ToastContainer
                                position="top-right"
                                autoClose={4000}
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
                    <Modal show={this.state.addNewModal} onHide={this.addNewModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Review</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form onSubmit={this.addFormSubmit}>
                                <Form.Group>
                                    <Form.Label>Client Title</Form.Label>
                                    <Form.Control onChange={this.titleOnChange} type="text" placeholder="Enter Title" />
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.addTitleError}</p>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Client Photo</Form.Label>
                                    <Form.Control onChange={this.fileOnChange} id="img"  type="file" />
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.addFileError}</p>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Review Description</Form.Label>
                                    <Form.Control onChange={this.desOnChange} as="textarea" rows={3} placeholder="Write Description"/>
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.addDesError}</p>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    {this.state.submit}
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.addNewModalClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {/*edit form*/}

                    <Modal show={this.state.show} onHide={this.handleModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update New Review</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form onSubmit={this.updateForm}>
                                <Form.Group>
                                    <Form.Label>Client Title</Form.Label>
                                    <Form.Control onChange={this.titleUpOnChange} value={this.state.addEditTitle} type="text" placeholder="Enter Title" />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Client Photo</Form.Label>
                                    <Form.Control onChange={this.fileUpOnChange} id="img"  type="file" />
                                    <br/>
                                    <img src={this.state.addEditFile} height="80px"/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Review Description</Form.Label>
                                    <Form.Control onChange={this.desUpOnChange} value={this.state.addEditDes} as="textarea" rows={3} placeholder="Write Description"/>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    {this.state.update}
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleModalClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>


                </Fragment>
            );
        }

    }
}

export default ClientReview;
