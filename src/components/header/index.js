import React, { Component } from 'react'
import { connect } from 'react-redux'
import { history } from 'store'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { logout } from 'actions'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

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
				            		<div className="logo-header text-capitalize">{history.location.pathname.split('/')[1]}</div>
				            	</div>
			            	</div>
			            	<div className="col-9 d-flex justify-content-end">
			            		<div className="position-relative">
			            			{connection ? `ping: ${ping}ms` : `CONNECTION LOST`}
			            			<div className={`online-dot ${connection ? 'online' : 'offline'}`}></div>
		            			</div>
			            	</div>
			            	<div  className="col-1">
			            		<IconButton

									aria-label="More"
									aria-owns={open ? 'menu' : undefined}
									aria-haspopup="true"
									onClick={this.handleClick} >
									<MoreVertIcon className="text-white" />
								</IconButton>
								<Menu
									id="menu"
									anchorEl={anchorEl}
									open={open}
									onClose={this.handleClose}
									PaperProps={{
										style: {
											maxHeight: 48 * 4.5,
											width: 200,
										},
									}} >
									{
										options.map(option => (
											<MenuItem key={option} onClick={this.logout}>
												{option}
											</MenuItem>
										))
									}
								</Menu>
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