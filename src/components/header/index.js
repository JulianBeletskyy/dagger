import React, { Component } from 'react'
import { connect } from 'react-redux'
import { history } from 'store'
import { logout } from 'actions'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

class PublicHeader extends Component {
	state = {
	    anchorEl: null,
  	}

  	handleClick = event => {
	    this.setState({ anchorEl: event.currentTarget })
  	}

  	handleClose = () => {
	    this.setState({ anchorEl: null })
  	}

  	logout = () => {
  		const { dispatch } = this.props
  		dispatch(logout())
  	}

    render() {
    	const { ping, connection } = this.props
    	const options = ['Log Out']
    	const { anchorEl } = this.state
    	const open = Boolean(anchorEl)
        return (
    		<AppBar position="static">
    			<Toolbar>
		            <div className="container-fluid position-relative">
			            <div className="row justify-content-between align-items-center">
			            	<div className="col-2">
				            	<div className="d-flex align-items-center">
				            		<div className="logo-header text-capitalize">
				            			{history.location.pathname.split('/')[1].replace('-', ' ')}
			            			</div>
				            	</div>
			            	</div>
			            	<div className="col-10 d-flex justify-content-end align-items-center">
			            		<div className="position-relative mr-2">
			            			{connection ? `ping: ${ping}ms` : `CONNECTION LOST`}
			            			<div className={`online-dot ${connection ? 'online' : 'offline'}`}></div>
		            			</div>
		            			<Button color="inherit" onClick={this.logout}><strong>Log Out</strong></Button>
			            	</div>
			            </div>
		            </div>
	            </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = state =>
    ({
        ping: state.socket.ping,
        connection: state.socket.connection,
    })

export default connect(mapStateToProps)(PublicHeader)