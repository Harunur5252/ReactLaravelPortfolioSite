import React, { Component, Fragment } from 'react';
import {Switch,Route} from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Project from "../pages/Project";
import Service from "../pages/Service";
import ClientReview from "../pages/ClientReview";
import Course from "../pages/Course";

class AppRoute extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    
                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route path="/contact">
                        <Contact />
                    </Route>

                    <Route path="/course">
                        <Course />
                    </Route>

                    <Route path="/project">
                        <Project />
                    </Route>

                    <Route path="/service">
                        <Service />
                    </Route>

                    <Route path="/clientreview">
                        <ClientReview />
                    </Route>

                </Switch>
            </Fragment>
        );
    }
}

export default AppRoute;