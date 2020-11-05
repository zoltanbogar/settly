import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
//import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import './Layout.css';
//import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    /*sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    };*/

    render() {
        return (
            <Auxiliary>
                {/*<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />*/}
                {/*<SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer} />*/}
                <main className="Content">
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

export default Layout;