import React, {Component, Fragment} from 'react';
import {Navbar,NavLink} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faHome,faEnvelope,faBookOpen,faCode,faFolder,faComment,faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom"

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state={
            sideNav:false,
            sideNavClass:"sidenavClose",
            NavText:"d-none",
            mainDiv:"mydiv",
        }

        this.showHideSideNav=this.showHideSideNav.bind(this);
    }


    showHideSideNav(){
        if(this.state.sideNav===false){
            this.setState({sideNav:true,NavText:"",sideNavClass:"sidenavOpen",mainDiv:"mydiv2"})
        }
        else {
            this.setState({sideNav:false,NavText:"d-none",sideNavClass:"sidenavClose",mainDiv:"mydiv"})
        }
    }


    render() {
        return (
            <Fragment>

                <title>{this.props.title}</title>
                <Navbar  expand="lg" className="fixed-top shadow-sm  mb-5 py-3" variant="light" bg="success">
                    <Navbar.Brand onClick={this.showHideSideNav} style={{color:"yellow"}} href="#"><FontAwesomeIcon icon={faBars} /></Navbar.Brand>
                    <b>ADMIN DASHBOARD</b>
                </Navbar>

                <div className={this.state.sideNavClass}>
                    <NavLink><Link to="/" className="pageDecorationLink"> <FontAwesomeIcon icon={faHome} /> <span className={this.state.NavText}>Home</span></Link> </NavLink>
                    <NavLink><Link to="/contact" className="pageDecorationLink"> <FontAwesomeIcon icon={faEnvelope} /> <span className={this.state.NavText}>Contact</span></Link></NavLink>
                    <NavLink><Link to="/course" className="pageDecorationLink"><FontAwesomeIcon icon={faBookOpen} /> <span className={this.state.NavText}>Courses</span></Link></NavLink>
                    <NavLink><Link to="/project" className="pageDecorationLink"><FontAwesomeIcon icon={faCode} /> <span className={this.state.NavText}>Projects</span></Link></NavLink>
                    <NavLink><Link to="/service" className="pageDecorationLink"><FontAwesomeIcon icon={faFolder} /> <span className={this.state.NavText}>Services</span></Link></NavLink>
                    <NavLink><Link to="/clientreview" className="pageDecorationLink"><FontAwesomeIcon icon={faComment} /> <span className={this.state.NavText}>Review</span></Link></NavLink>
                    <a className=" ml-3 NavItem" href="/logout"> <FontAwesomeIcon icon={faPowerOff} /> <span className={this.state.NavText}>Sign Out</span></a>
                </div>

                <div onClick={this.showHideSideNav} className={this.state.mainDivOverlay}>

                </div>

                <div className={this.state.mainDiv}>
                    {this.props.children}
                </div>


            </Fragment>
        );
    }
}

export default Menu;
