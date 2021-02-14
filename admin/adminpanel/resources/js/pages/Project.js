import React, { Component,Fragment } from 'react';
import Menu from '../components/Menu';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios'
import {Container, Row, Col, Button, Spinner, Modal, Form} from 'react-bootstrap';
import LoadingDiv from '../components/loadingDiv';
import WentWrong from '../components/wentWrong';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Project extends Component {

    constructor(props){
        super(props);
        this.state={
            contactList:[],
            loading:true,
            error:false,
            submit:"Submit",
            update:"Update",
            addNewModal:false,
            show:false,
            rowDataId:" ",
            deleteBtnText:"Delete",

            // for add form data
            projectName:"",
            projectDes:"",
            projectFeature:"",
            projectCardImage:"",
            projectDetailsImage:"",
            projectPreviewLink:"",

            // for edit form data
            img_one:"",
            img_two:"",
            short_description:"",
            project_feature:"",
            live_preivew:"",
            project_name:"",

            // for add form validation
            projectNameError:"",
            projectDesError:"",
            projectPrevLinkError:"",
            projectFeatureError:"",
            projectCardImgError:"",
            projectDetailsImgError:"",

            // for update form validation
            projectNameUpdateError:"",
            projectDesUpdateError:"",
            projectPrevLinkUpdateError:"",
            projectFeatureUpdateError:"",
            projectCardImgUpdateError:"",
            projectDetailsImgUpdateError:"",

        }
        this.dataDelete=this.dataDelete.bind(this);
        this.imageFormater=this.imageFormater.bind(this);
        this.addNewModalOpen=this.addNewModalOpen.bind(this);
        this.addNewModalClose=this.addNewModalClose.bind(this);
        this.addFormSubmit=this.addFormSubmit.bind(this);
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeDes=this.onChangeDes.bind(this);
        this.onChangeFeature=this.onChangeFeature.bind(this);
        this.onChangeCardImage=this.onChangeCardImage.bind(this);
        this.onChangeDetailsImage=this.onChangeDetailsImage.bind(this);
        this.onChangePreviewLink=this.onChangePreviewLink.bind(this);
        this.modalClose=this.modalClose.bind(this);
        this.modalOpen=this.modalOpen.bind(this);
        this.onChangeImageOne=this.onChangeImageOne.bind(this);
        this.onChangeImageTwo=this.onChangeImageTwo.bind(this);
        this.onChnageProjectName=this.onChnageProjectName.bind(this);
        this.onChangeProjectDes=this.onChangeProjectDes.bind(this);
        this.onChangeProjectFeature=this.onChangeProjectFeature.bind(this);
        this.onChangeProjectPreviewLink=this.onChangeProjectPreviewLink.bind(this);
        this.formSubmit=this.formSubmit.bind(this);
        this.valid=this.valid.bind(this);
        this.InValidateImage=this.InValidateImage.bind(this);
    }
    InValidateImage(event) {
        var formData = new FormData();
        var file = document.getElementById("img").files[0];
        formData.append("Filedata", file);
        var t = file.type.split('/').pop().toLowerCase();
        if (t !== "jpeg" && t !== "jpg" && t !== "png" && t !== "bmp" && t !== "gif") {
            toast.error('Please select a valid jpeg,jpg,png,bmp and gif image file !', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: 0,
            });
            document.getElementById("img").value = '';
            return false;
        }
        if (file.size > 1024000) {
            toast.error('Max Upload size is 1MB only!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: 0,
            });
            document.getElementById("img").value = '';
            return false;
        }
        return true;
        event.preventDefault();

    }

    // update data
    formSubmit(event){
            let img_one = this.state.img_one;
            let img_two = this.state.img_two;
            let project_feature = this.state.project_feature;
            let short_description = this.state.short_description;
            let live_preivew = this.state.live_preivew;
            let project_name = this.state.project_name;
            let myFormData = new FormData();
            myFormData.append("img_one",img_one);
            myFormData.append("img_two",img_two);
            myFormData.append("project_feature",project_feature);
            myFormData.append("short_description",short_description);
            myFormData.append("live_preivew",live_preivew);
            myFormData.append("project_name",project_name);
            myFormData.append("id",this.state.rowDataId);
            let config={
                headers:{"content-type":"multipart/form-data"}
            }
            Axios.post("/UpdateProject",myFormData,config)
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

    onChangeImageOne(e){
        this.setState({img_one:e.target.files[0]})
    }
    onChangeImageTwo(e){
        this.setState({img_two:e.target.files[0]})
    }
    onChnageProjectName(e){
        this.setState({project_name:e.target.value})
    }
    onChangeProjectDes(e){
        this.setState({short_description:e.target.value})
    }
    onChangeProjectPreviewLink(e){
        this.setState({live_preivew:e.target.value})
    }
    onChangeProjectFeature(event){
        this.setState({project_feature:event.target.value})
    }


    addNewModalOpen(){
        this.setState({addNewModal:true})
    }
    addNewModalClose(){
        this.setState({addNewModal:false})
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
            Axios.post('/projectdataedit', {id:this.state.rowDataId}).then((response)=>{
                if(response.status===200){

                    this.setState({img_one:response.data.img_one})
                    this.setState({img_two:response.data.img_two})
                    this.setState({short_description:response.data.short_description})
                    this.setState({project_feature:response.data.project_feature})
                    this.setState({live_preivew:response.data.live_preivew})
                    this.setState({project_name:response.data.project_name})

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

        if(this.state.projectName==false && this.state.projectDes==false && this.state.projectFeature==false && this.state.projectCardImage==false && this.state.projectDetailsImage==false && this.state.projectPreviewLink==false){
            this.setState({
                projectNameError:"The project name fields are required",
                projectDesError:"The project description fields are required",
                projectPrevLinkError:"The project project preview link fields are required",
                projectFeatureError:"The project feature fields are required",
                projectCardImgError:"The project card image fields are required",
                projectDetailsImgError:"The project details image fields are required",
            })
        }
        else if(this.state.projectDes==false && this.state.projectFeature==false && this.state.projectCardImage==false && this.state.projectDetailsImage==false && this.state.projectPreviewLink==false){
            this.setState({
                projectDesError:"The project description fields are required",
                projectPrevLinkError:"The project project preview link fields are required",
                projectFeatureError:"The project feature fields are required",
                projectCardImgError:"The project card image fields are required",
                projectDetailsImgError:"The project details image fields are required",
            })
        }
        else if(this.state.projectFeature==false && this.state.projectCardImage==false && this.state.projectDetailsImage==false && this.state.projectPreviewLink==false){
            this.setState({
                projectPrevLinkError:"The project project preview link fields are required",
                projectFeatureError:"The project feature fields are required",
                projectCardImgError:"The project card image fields are required",
                projectDetailsImgError:"The project details image fields are required",
            })
        }
        else if(this.state.projectCardImage==false && this.state.projectDetailsImage==false && this.state.projectPreviewLink==false){
            this.setState({
                projectPrevLinkError:"The project project preview link fields are required",
                projectCardImgError:"The project card image fields are required",
                projectDetailsImgError:"The project details image fields are required",
            })
        }
        else if(this.state.projectCardImage==false && this.state.projectDetailsImage==false){
            this.setState({
                projectCardImgError:"The project card image fields are required",
                projectDetailsImgError:"The project details image fields are required",
            })
        }
        else if(this.state.projectName==false && this.state.projectFeature==false && this.state.projectDes==false  && this.state.projectCardImage==false && this.state.projectPreviewLink==false){
            this.setState({
                projectNameError:"The project name fields are required",
                projectFeatureError:"The project feature fields are required",
                projectDesError:"The project description fields are required",
                projectPrevLinkError:"The project project preview link fields are required",
                projectCardImgError:"The project card image fields are required",
            })
        }
        else if(this.state.projectName==false){
            this.setState({
                projectNameError:"The project name fields are required",

            })
        }
        else if(this.state.projectDes==false){
            this.setState({
                projectDesError:"The project description fields are required",
            })
        }
        else if(this.state.projectFeature==false){
            this.setState({
                projectFeatureError:"The project feature fields are required",
            })
        }
        else if(this.state.projectPreviewLink==false){
            this.setState({
                projectPrevLinkError:"The project project preview link fields are required",
            })
        }
        else if(this.state.projectCardImage==false){
            this.setState({
                projectCardImgError:"The project card image fields are required",
            })
        }
        // else if(!(/\\.(gif|jpg|jpeg|tiff|png)$/i).test(this.state.projectCardImage)){
        //     this.setState({
        //         projectCardImgError:"please select a \'jpeg/jpg/gif/tiff/png\' image file",
        //     })
        //     toast.error('please select a \'jpeg/jpg/gif/tiff/png\' image file!', {
        //         position: "top-right",
        //         autoClose: 4000,
        //         hideProgressBar: true,
        //         closeOnClick: true,
        //         pauseOnHover: false,
        //         draggable: true,
        //         progress: 0,
        //     });
        // }
        // else if(!(/\\.(gif|jpg|jpeg|tiff|png)$/i).test(this.state.projectDetailsImage)){
        //     this.setState({
        //         projectDetailsImgError:"please select a 'jpeg/jpg/gif/tiff/png' image file",
        //     })
        //     toast.error("please select a 'jpeg/jpg/gif/tiff/png' image file!", {
        //         position: "top-right",
        //         autoClose: 4000,
        //         hideProgressBar: true,
        //         closeOnClick: true,
        //         pauseOnHover: false,
        //         draggable: true,
        //         progress: 0,
        //     });
        // }

        else if(this.state.projectDetailsImage==false){
            this.setState({
                projectDetailsImgError:"The project details image fields are required",
            })
        }

        else if(this.state.projectName.length<5){
            this.setState({
                projectNameError:"please enter at least five characters",
            })
        }
        else if(this.state.projectDes.length>200){
            this.setState({
                projectDesError:"Description must be entered within 200 characters",
            })
        }
        else if(this.state.projectFeature.length>10000){
            this.setState({
                projectFeatureError:"feature must be entered within 10000 characters",
            })
        }
        else if(this.state.projectPreviewLink.length>30){
            this.setState({
                projectPrevLinkError:"preview link must be entered within 30 characters",
            })
        }
        else {
            return  true;
        }
    }
    // From data add
    addFormSubmit(event){
        this.setState({
            projectNameError:"",
            projectDesError:"",
            projectCardImgError:"",
            projectFeatureError:"",
            projectPrevLinkError:"",
            projectDetailsImgError:"",
        })
        if(this.valid()===true){
            let projectName = this.state.projectName;
            let projectDes = this.state.projectDes;
            let projectFeature = this.state.projectFeature;
            let projectCardImage = this.state.projectCardImage;
            let projectDetailsImage = this.state.projectDetailsImage;
            let projectPreviewLink = this.state.projectPreviewLink;
            let url="/AddProject";
            let myFormData = new FormData();
            myFormData.append("projectName",projectName);
            myFormData.append("projectDes",projectDes);
            myFormData.append("projectFeature",projectFeature);
            myFormData.append("projectCardImage",projectCardImage);
            myFormData.append("projectDetailsImage",projectDetailsImage);
            myFormData.append("projectPreviewLink",projectPreviewLink);
            let config={
                headers:{"content-type":"multipart/form-data"}
            }
            Axios.post(url,myFormData,config)
                .then((response)=> {
                    if(response.data===1){
                        this.addNewModalClose();
                        this.componentDidMount();
                        this.setState({submit:"submitting..."})
                        setTimeout(function (){
                            this.setState({submit:"Submit"})
                        }.bind(this),2000)

                        toast.success('Insert Success!', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: 0,
                        });

                    }else{
                        toast.error('Insert Fail!', {
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
                })
                .catch((error)=> {
                    toast.error('Insert Fail!', {
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
    onChangeName(event){
       let projectName=event.target.value;
       this.setState({projectName:projectName})
    }
    onChangeDes(event){
        let projectDes=event.target.value;
        this.setState({projectDes:projectDes})
    }
    onChangeFeature(content, delta, source, editor){
        let htmlContent=editor.getHTML();
        this.setState({projectFeature:htmlContent})
    }
    onChangeCardImage(event){
        let projectCardImage=event.target.files[0];
        this.setState({projectCardImage:projectCardImage})
    }
    onChangeDetailsImage(event){
        let projectDetailsImage=event.target.files[0];
        this.setState({projectDetailsImage:projectDetailsImage})
    }
    onChangePreviewLink(event){
        let projectPreviewLink=event.target.value;
        this.setState({projectPreviewLink:projectPreviewLink})
    }

    componentDidMount(){
        Axios.get('/ProjectList').then((response)=>{
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
            this.setState({deleteBtnText:<Spinner as='span' animation='border' variant="danger" size='md' role='status' aria-hidden='true'/>})
            Axios.post('/ProjectDelete',{id:this.state.rowDataId}).then((response)=>{

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
    }

    imageFormater(cell,row){
        return (
            <img className="w-100" src={cell}/>
        )
    }



    render() {

        if(this.state.loading===true){
            return(
                <Menu title="Project">
                    <Container>
                        <LoadingDiv />
                    </Container>
                </Menu>
            )

        }else if(this.state.error===true){
            return(
                <Menu title="Project">
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
                {dataField: 'img_one',text: 'Image One',formatter:this.imageFormater},
                {dataField: 'img_two',text: 'Image Two',formatter:this.imageFormater},
                {dataField: 'project_name',text: 'Project Name'},
                {dataField: 'short_description',text: 'Description'},
                {dataField: 'project_feature',text: 'Feature'},
                {dataField: 'live_preivew',text: 'Live Preview Link'},
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
                    <Menu title="Project">
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
                                                    <Button className="normal-btn btn my-2 m-2" onClick={this.addNewModalOpen}>Add New</Button>
                                                    <Button className="normal-btn btn my-2 m-2" onClick={this.modalOpen}>Edit</Button>
                                                    <div className="card mt-2">
                                                        <div className="card-body">
                                                            <BootstrapTable keyField='id' data={ data } { ...props.baseProps } selectRow={selectRow} columns={ columns } pagination={ paginationFactory(options) } />
                                                        </div>
                                                    </div>

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
                    <Modal scrollable={true} size="lg" show={this.state.addNewModal} onHide={this.addNewModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Project</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >

                            <Form onSubmit={this.addFormSubmit}>
                                <Form.Group>
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control onChange={this.onChangeName} type="text" placeholder="Enter Project Name" />
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.projectNameError}</p>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Short Description</Form.Label>
                                    <Form.Control onChange={this.onChangeDes} type="text" placeholder="Enter Short Description" />
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.projectDesError}</p>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Project Features</Form.Label>
                                    <ReactQuill onChange={this.onChangeFeature} className="reactQuilHeight" theme="snow"/>
                                    <p style={{color:"red",fontSize:"14px"}} className="featureError">{this.state.projectFeatureError}</p>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Live Preview Link</Form.Label>
                                    <Form.Control onChange={this.onChangePreviewLink} type="text" placeholder="Enter Live Preview Link" />
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.projectPrevLinkError}</p>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Project Card Image</Form.Label>
                                    <Form.Control onChange={this.onChangeCardImage} id="img" type="file" />
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.projectCardImgError}</p>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Project Details Image</Form.Label>
                                    <Form.Control onChange={this.onChangeDetailsImage}  type="file" />
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.projectDetailsImgError}</p>
                                </Form.Group>

                                <Button variant="primary" onClick={this.InValidateImage} type="submit">
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
                    <Modal scrollable={true} size="lg" show={this.state.show} onHide={this.modalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form onSubmit={this.formSubmit}>
                                <Form.Group>
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control  type="text" onChange={this.onChnageProjectName}  value={this.state.project_name} placeholder="Enter Project Name" />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Short Description</Form.Label>
                                    <Form.Control  type="text"  onChange={this.onChangeProjectDes} value={this.state.short_description} placeholder="Enter Short Description" />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Project Features</Form.Label>
                                    <Form.Control as="textarea" onChange={this.onChangeProjectFeature}  value={this.state.project_feature} rows={3} />
                                    {/*<ReactQuill  onChange={this.onChangeProjectFeature} value={this.state.project_feature}   className="reactQuilHeight" theme="snow"/>*/}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Live Preview Link</Form.Label>
                                    <Form.Control  type="text" onChange={this.onChangeProjectPreviewLink} name="live_preivew" value={this.state.live_preivew}  placeholder="Enter Live Preview Link" />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Project Card Image</Form.Label>
                                    <Form.Control  onChange={this.onChangeImageOne}   type="file" /><br/>
                                    <img src={this.state.img_one} height="80px" width="80px"/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Project Details Image</Form.Label>
                                    <Form.Control  onChange={this.onChangeImageTwo}   type="file" /><br/>
                                    <img src={this.state.img_two} height="80px" width="80px"/>
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

                </Fragment>
            );
        }

    }
}

export default Project;
