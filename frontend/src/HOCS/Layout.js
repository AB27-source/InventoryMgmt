import React, { useEffect } from 'react';
import Navigationbar from '../components/Navbar'
import { connect } from'react-redux';
import { checkAuthenticated, loadUser } from '../actions/auth';

const Layout = (props) => {
    useEffect(() => {
        props.checkAuthenticated();
        props.loadUser();
    },[])

    return (
        <div>
            <Navigationbar />
            {props.children}
        </div>
    );
};

export default connect(null, { checkAuthenticated, loadUser})(Layout);
