import React, { Component,Fragment } from 'react';
import Menu from '../components/Menu';
import {Container,Row,Col,Card} from "react-bootstrap";
import Axios from "axios";
import LoadingDiv from "../components/loadingDiv";
import WentWrong from "../components/wentWrong";
class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            contactList:[],
            loading:true,
            error:false,
        }
    }

    componentDidMount(){
        Axios.get('/countNumber').then((response)=>{
            if(response.status===200){
                this.setState({contactList:response.data,loading:false,error:false})
            }else{
                this.setState({loading:false,error:true})
            }

        }).catch((error)=>{
            this.setState({loading:false,error:true})
        })
    }

    render() {
        const data=this.state.contactList;
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
            return (
                <Fragment>
                    <Menu title="Home">
                        <Container className="mt-5">
                            <Row>
                                <Col className="p-2" lg={4} md={4} sm={12}>
                                    <Card>
                                        <Card.Body>
                                            <h5 className="title-text">{data["contact"]}</h5>
                                            <h5 className="des-text">Total Contact</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col className="p-2" lg={4} md={4} sm={12}>
                                    <Card>
                                        <Card.Body>
                                            <h5 className="title-text">{data["review"]}</h5>
                                            <h5 className="des-text">Total Review</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col className="p-2" lg={4} md={4} sm={12}>
                                    <Card>
                                        <Card.Body>
                                            <h5 className="title-text">{data["project"]}</h5>
                                            <h5 className="des-text">Total Project</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col className="p-2" lg={3} md={3} sm={12}>
                                    <Card>
                                        <Card.Body>
                                            <h5 className="title-text">{data["course"]}</h5>
                                            <h5 className="des-text">Total Course</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col className="p-2" lg={3} md={3} sm={12}>
                                    <Card>
                                        <Card.Body>
                                            <h5 className="title-text">{data["service"]}</h5>
                                            <h5 className="des-text">Total Service</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>

                            </Row>
                        </Container>

                    </Menu>
                </Fragment>
            );
        }

        }
    }


export default Home;
