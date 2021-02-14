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
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

class Course extends Component {

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
            courseTitle:"",
            courseDes:"",
            courseSmallImg:"",
            courseLongTitle:"",
            courseLongDes:"",
            courseLecture:"",
            courseStudent:"",
            courseSkill:"",
            courseVideo:"",
            courseLink:"",
            // for edit
            courseUpTitle:"",
            courseUpDes:"",
            courseUpLecture:"",
            courseUpStudent:"",
            courseUpSmallImg:"",

            courseTitleError:"",
            courseLongTitleError:"",
            courseDesError:"",
            courseLongDesError:"",
            courseSmallImgError:"",
            courseLectureError:"",
            courseStudentError:"",
            courseSkillError:"",
            courseVideoError:"",
            courseLinkError:"",
        }
        this.dataDelete=this.dataDelete.bind(this);
        this.imageFormater=this.imageFormater.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleOpen=this.handleOpen.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onChangeCourseTitle=this.onChangeCourseTitle.bind(this);
        this.onChangeCourseLongTitle=this.onChangeCourseLongTitle.bind(this);
        this.onChangeCourseDes=this.onChangeCourseDes.bind(this);
        this.onChangeCourseLongDes=this.onChangeCourseLongDes.bind(this);
        this.onChangeCourseImg=this.onChangeCourseImg.bind(this);
        this.onChangeCourseLecture=this.onChangeCourseLecture.bind(this);
        this.onChangeCourseStudent=this.onChangeCourseStudent.bind(this);
        this.onChangeCourseSkill=this.onChangeCourseSkill.bind(this);
        this.onChangeCourseVideoUrl=this.onChangeCourseVideoUrl.bind(this);
        this.onChangeCourseUrl=this.onChangeCourseUrl.bind(this);
        this.valid=this.valid.bind(this);
        this.modalShow=this.modalShow.bind(this);
        this.modalClose=this.modalClose.bind(this);
        this.onChangeUpTitle=this.onChangeUpTitle.bind(this);
        this.onChangeUpDes=this.onChangeUpDes.bind(this);
        this.onChangeUpSmallImg=this.onChangeUpSmallImg.bind(this);
        this.onChangeUpLecture=this.onChangeUpLecture.bind(this);
        this.onChangeUpStudent=this.onChangeUpStudent.bind(this);
        this.updateForm=this.updateForm.bind(this);

    }
    updateForm(event){
        let courseUpTitle = this.state.courseUpTitle;
        let courseUpDes = this.state.courseUpDes;
        let courseUpLecture = this.state.courseUpLecture;
        let courseUpStudent = this.state.courseUpStudent;
        let courseUpSmallImg = this.state.courseUpSmallImg;
        let myFormData = new FormData();
        myFormData.append("courseUpTitle",courseUpTitle);
        myFormData.append("courseUpDes",courseUpDes);
        myFormData.append("courseUpLecture",courseUpLecture);
        myFormData.append("courseUpStudent",courseUpStudent);
        myFormData.append("courseUpSmallImg",courseUpSmallImg);
        myFormData.append("id",this.state.rowDataId);
        let config={
            headers:{"content-type":"multipart/form-data"}
        }
        Axios.post("/UpdateCourse",myFormData,config)
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

        event.preventDefault();
    }
    modalShow(){
        if(this.state.rowDataId == false){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select a row first!',
            })
        }else{
            this.setState({modalShow:true})
            Axios.post('/coursedataedit', {id:this.state.rowDataId}).then((response)=>{
                if(response.status===200){

                    this.setState({courseUpSmallImg:response.data.small_img})
                    this.setState({courseUpDes:response.data.short_des})
                    this.setState({courseUpTitle:response.data.short_title})
                    this.setState({courseUpLecture:response.data.total_lecture})
                    this.setState({courseUpStudent:response.data.total_student})
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
    modalClose(){
        this.setState({modalShow:false})
    }

    onChangeUpTitle(e){
        this.setState({courseUpTitle:e.target.value})
    }
    onChangeUpDes(e){
        this.setState({courseUpDes:e.target.value})
    }
    onChangeUpSmallImg(e){
        this.setState({courseUpSmallImg:e.target.files[0]})
    }
    onChangeUpLecture(e){
        this.setState({courseUpLecture:e.target.value})
    }
    onChangeUpStudent(e){
        this.setState({courseUpStudent:e.target.value})
    }



    valid(){

        if(this.state.courseTitle==false && this.state.courseDes==false && this.state.courseSmallImg==false && this.state.courseLongTitle==false && this.state.courseLongDes==false && this.state.courseLecture==false && this.state.courseStudent==false && this.state.courseSkill==false  && this.state.courseVideo==false && this.state.courseLink==false){
            this.setState({
                courseTitleError:"The course title fields are required",
                courseLongTitleError:"The course long title fields are required",
                courseDesError:"The course short description fields are required",
                courseLongDesError:"The course long description fields are required",
                courseSmallImgError:"The course imgae fields are required",
                courseLectureError:"The course lecture fields are required",
                courseStudentError:"The course student are required",
                courseSkillError:"The skill fields are required",
                courseVideoError:"The video fields are required",
                courseLinkError:"The course link fields are required",
            })
        }
        else if(this.state.courseDes==false && this.state.courseSmallImg==false && this.state.courseLongTitle==false && this.state.courseLongDes==false && this.state.courseLecture==false && this.state.courseStudent==false && this.state.courseSkill==false  && this.state.courseVideo==false && this.state.courseLink==false){
            this.setState({
                courseLongTitleError:"The course long title fields are required",
                courseDesError:"The course short description fields are required",
                courseLongDesError:"The course long description fields are required",
                courseSmallImgError:"The course imgae fields are required",
                courseLectureError:"The course lecture fields are required",
                courseStudentError:"The course student are required",
                courseSkillError:"The skill fields are required",
                courseVideoError:"The video fields are required",
                courseLinkError:"The course link fields are required",
            })
        }
        else if(this.state.courseDes==false && this.state.courseSmallImg==false && this.state.courseLongDes==false && this.state.courseLecture==false && this.state.courseStudent==false && this.state.courseSkill==false  && this.state.courseVideo==false && this.state.courseLink==false){
            this.setState({
                courseDesError:"The course short description fields are required",
                courseLongDesError:"The course long description fields are required",
                courseSmallImgError:"The course imgae fields are required",
                courseLectureError:"The course lecture fields are required",
                courseStudentError:"The course student are required",
                courseSkillError:"The skill fields are required",
                courseVideoError:"The video fields are required",
                courseLinkError:"The course link fields are required",
            })
        }
        else if(this.state.courseLongDes==false && this.state.courseSmallImg==false && this.state.courseSkill==false  && this.state.courseLecture==false && this.state.courseStudent==false && this.state.courseVideo==false && this.state.courseLink==false){
            this.setState({
                courseLongDesError:"The course long description fields are required",
                courseSmallImgError:"The course imgae fields are required",
                courseSkillError:"The skill fields are required",
                courseLectureError:"The course lecture fields are required",
                courseStudentError:"The course student are required",
                courseVideoError:"The video fields are required",
                courseLinkError:"The course link fields are required",
            })
        }
        else if(this.state.courseSmallImg==false && this.state.courseLecture==false && this.state.courseSkill==false  && this.state.courseStudent==false  && this.state.courseVideo==false && this.state.courseLink==false){
            this.setState({
                courseSmallImgError:"The course imgae fields are required",
                courseLectureError:"The course lecture fields are required",
                courseSkillError:"The skill fields are required",
                courseStudentError:"The course student are required",
                courseVideoError:"The video fields are required",
                courseLinkError:"The course link fields are required",
            })
        }
        else if(this.state.courseSmallImg==false && this.state.courseLecture==false && this.state.courseStudent==false &&  this.state.courseVideo==false && this.state.courseLink==false){
            this.setState({
                courseLectureError:"The course lecture fields are required",
                courseSmallImgError:"The course imgae fields are required",
                courseStudentError:"The course student are required",
                courseVideoError:"The video fields are required",
                courseLinkError:"The course link fields are required",
            })
        }
        else if(this.state.courseLecture==false && this.state.courseStudent==false && this.state.courseVideo==false && this.state.courseLink==false){
            this.setState({
                courseLectureError:"The course lecture fields are required",
                courseStudentError:"The course student are required",
                courseVideoError:"The video fields are required",
                courseLinkError:"The course link fields are required",
            })
        }

        else if(this.state.courseStudent==false && this.state.courseVideo==false && this.state.courseLink==false){
            this.setState({
                courseStudentError:"The course student are required",
                courseVideoError:"The video fields are required",
                courseLinkError:"The course link fields are required",
            })
        }
        else if(this.state.courseVideo==false && this.state.courseLink==false){
            this.setState({
                courseVideoError:"The video fields are required",
                courseLinkError:"The course link fields are required",
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

        else if(this.state.courseLink==false){
            this.setState({
                courseLinkError:"The course link fields are required",
            })
        }
        else if(this.state.courseVideo==false){
            this.setState({
                courseVideoError:"The video fields are required",
            })
        }
        else if(this.state.courseStudent==false){
            this.setState({
                courseStudentError:"The student fields are required",
            })
        }
        else if(this.state.courseLecture==false){
            this.setState({
                courseLectureError:"The lecture fields are required",
            })
        }
        else if(this.state.courseSmallImg==false){
            this.setState({
                courseSmallImgError:"The image fields are required",
            })
        }
        else if(this.state.courseSkill==false){
            this.setState({
                courseSkillError:"The image fields are required",
            })
        }
        else if(this.state.courseLongDes==false){
            this.setState({
                courseLongDesError:"The long description fields are required",
            })
        }
        else if(this.state.courseDes==false){
            this.setState({
                courseDesError:"The short description fields are required",
            })
        }
        else if(this.state.courseLongTitle==false){
            this.setState({
                courseLongTitleError:"The long title fields are required",
            })
        }
        else if(this.state.courseTitle==false){
            this.setState({
                courseTitleError:"The title fields are required",
            })
        }

        else if(this.state.courseTitle.length<5){
            this.setState({
                courseTitleError:"please enter at least five characters",
            })
        }
        else if(this.state.courseDes.length>200){
            this.setState({
                courseDesError:"Description must be entered within 200 characters",
            })
        }
        else if(this.state.courseLongTitle.length>30){
            this.setState({
                courseLongTitleError:"preview link must be entered within 30 characters",
            })
        }
        else {
            return  true;
        }
    }

    onSubmit(event){
        this.setState({
            courseTitleError:"",
            courseLongTitleError:"",
            courseDesError:"",
            courseLongDesError:"",
            courseSmallImgError:"",
            courseLectureError:"",
            courseStudentError:"",
            courseSkillError:"",
            courseVideoError:"",
            courseLinkError:"",
        })
        if(this.valid()===true){
            let courseTitle = this.state.courseTitle;
            let courseDes = this.state.courseDes;
            let courseSmallImg = this.state.courseSmallImg;
            let courseLongTitle = this.state.courseLongTitle;
            let courseLongDes = this.state.courseLongDes;
            let courseLecture = this.state.courseLecture;
            let courseStudent = this.state.courseStudent;
            let courseSkill = this.state.courseSkill;
            let courseVideo = this.state.courseVideo;
            let courseLink = this.state.courseLink;


            let url="/AddCourse";
            let myFormData = new FormData();
            myFormData.append("courseTitle",courseTitle);
            myFormData.append("courseDes",courseDes);
            myFormData.append("courseSmallImg",courseSmallImg);
            myFormData.append("courseLongTitle",courseLongTitle);
            myFormData.append("courseLongDes",courseLongDes);
            myFormData.append("courseLecture",courseLecture);
            myFormData.append("courseStudent",courseStudent);
            myFormData.append("courseSkill",courseSkill);
            myFormData.append("courseVideo",courseVideo);
            myFormData.append("courseLink",courseLink);
            let config={
                headers:{"content-type":"multipart/form-data"}
            }
            Axios.post(url,myFormData,config)
                .then((response)=> {
                    if(response.data===1){
                        this.handleClose();
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

    onChangeCourseTitle(e){
        this.setState({courseTitle:e.target.value})
    }
    onChangeCourseLongTitle(e){
        this.setState({courseLongTitle:e.target.value})
    }
    onChangeCourseDes(e){
        this.setState({courseDes:e.target.value})
    }
    onChangeCourseLongDes(content, delta, source, editor){
        let htmlContent=editor.getText();
        this.setState({courseLongDes:htmlContent})
    }
    onChangeCourseImg(e){
        this.setState({courseSmallImg:e.target.files[0]})
    }
    onChangeCourseLecture(e){
        this.setState({courseLecture:e.target.value})
    }
    onChangeCourseStudent(e){
        this.setState({courseStudent:e.target.value})
    }
    onChangeCourseSkill(content, delta, source, editor){
        let htmlContent=editor.getHTML();
        this.setState({courseSkill:htmlContent})
    }
    onChangeCourseVideoUrl(e){
        this.setState({courseVideo:e.target.value})
    }
    onChangeCourseUrl(e){
        this.setState({courseLink:e.target.value})
    }


    handleClose(){
        this.setState({show:false})
    }
    handleOpen(){
        this.setState({show:true})
    }

    componentDidMount(){
        Axios.get('/CourseList').then((response)=>{
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
        }else {
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
            this.setState({deleteBtnText: <Spinner as='span' animation='border' variant='danger' size='md' role='status' aria-hidden='true'/>})
                Axios.post('/CourseDelete', {id: this.state.rowDataId}).then((response) => {

                if (response.data === 1 && response.status === 200) {
                    this.setState({deleteBtnText: "delete"})
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
                } else {
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

            }).catch((error) => {
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
                <Menu title="Course">
                    <Container>
                        <LoadingDiv />
                    </Container>
                </Menu>
            )

        }else if(this.state.error===true){
            return(
                <Menu title="Course">
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
                {dataField: 'small_img',text: 'Image',formatter:this.imageFormater},
                {dataField: 'short_title',text: 'Course Name'},
                {dataField: 'short_des',text: 'Description'},
                {dataField: 'total_lecture',text: 'Lecture'},
                {dataField: 'total_student',text: 'Student'},
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
                    <Menu title="Course">
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
                                                    <Button className="normal-btn btn my-2 m-2" onClick={this.handleOpen}>Add New</Button>
                                                    <Button className="normal-btn btn my-2 m-1" onClick={this.modalShow}>Edit</Button>
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
                    <Modal  scrollable={true}  size="lg" show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form onSubmit={this.onSubmit}>
                                <Form.Group>
                                    <Form.Label>Course Title</Form.Label>
                                    <Form.Control type="text" onChange={this.onChangeCourseTitle} placeholder="short title" />
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.courseTitleError}</p>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Long Title</Form.Label>
                                    <Form.Control as="textarea" onChange={this.onChangeCourseLongTitle} rows={3} placeholder="long title"  />
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.courseLongTitleError}</p>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Short Description</Form.Label>
                                    <Form.Control type="text" onChange={this.onChangeCourseDes} placeholder="short description" />
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.courseDesError}</p>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Long Description</Form.Label>
                                    <ReactQuill  className="reactQuilHeightCourse" onChange={this.onChangeCourseLongDes} theme="snow"/>
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.courseLongDesError}</p>
                                </Form.Group>

                                <Form.Group className="courseSkill">
                                    <Form.Label>Skill</Form.Label>
                                    <ReactQuill  className="reactQuilHeightCourse" onChange={this.onChangeCourseSkill} theme="snow"/>
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.courseSkillError}</p>
                                </Form.Group>

                                <Form.Group className="coursePhoto">
                                    <Form.Label>Photo</Form.Label>
                                    <Form.Control type="file" onChange={this.onChangeCourseImg}/>
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.courseSmallImgError}</p>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Lecture</Form.Label>
                                    <Form.Control type="number" onChange={this.onChangeCourseLecture} placeholder="total lecture" />
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.courseLectureError}</p>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Student</Form.Label>
                                    <Form.Control type="number" onChange={this.onChangeCourseStudent} placeholder="total student" />
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.courseStudentError}</p>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Video Url</Form.Label>
                                    <Form.Control type="text" onChange={this.onChangeCourseVideoUrl} placeholder="video url" />
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.courseVideoError}</p>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Course Link</Form.Label>
                                    <Form.Control type="text" onChange={this.onChangeCourseUrl} placeholder="course link" />
                                    <p style={{color:"red",fontSize:"14px"}}>{this.state.courseLinkError}</p>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    {this.state.submit}
                                </Button>
                            </Form>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/*edit form*/}
                    <Modal scrollable={true}  show={this.state.modalShow} onHide={this.modalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.updateForm}>
                                <Form.Group>
                                    <Form.Label>Course Title</Form.Label>
                                    <Form.Control type="text" onChange={this.onChangeUpTitle} value={this.state.courseUpTitle} placeholder="short title" />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Short Description</Form.Label>
                                    <Form.Control type="text" onChange={this.onChangeUpDes} value={this.state.courseUpDes} placeholder="short description" />
                                </Form.Group>

                                <Form.Group className="coursePhoto">
                                    <Form.Label>Photo</Form.Label>
                                    <Form.Control type="file" onChange={this.onChangeUpSmallImg}/>
                                    <br/>
                                    <img src={this.state.courseUpSmallImg} height="80px"/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Lecture</Form.Label>
                                    <Form.Control type="number" onChange={this.onChangeUpLecture} value={this.state.courseUpLecture} placeholder="total lecture" />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Student</Form.Label>
                                    <Form.Control type="number" onChange={this.onChangeUpStudent} value={this.state.courseUpStudent} placeholder="total student" />
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

export default Course;
