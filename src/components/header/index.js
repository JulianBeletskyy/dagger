import React, { Component } from 'react'
import { connect } from 'react-redux'
import { history } from 'store'

class PublicHeader extends Component {
    render() {
    	const { ping, connection } = this.props
        return (
            <div className="header-wrap bg-white container-fluid p-3">
	            <div className="row justify-content-between align-items-center">
	            	<div className="col-2">
		            	<div className="d-flex align-items-center">
		            		<div className="logo-header" onClick={() => history.push('/')}>Dagger4</div>
		            	</div>
	            	</div>
	            	<div className="col-10 d-flex justify-content-end">
	            		<div className="position-relative">
	            			{connection ? `ping: ${ping}ms` : `CONNECTION LOST`}
	            			<div className={`online-dot ${connection ? 'online' : 'offline'}`}></div>
            			</div>
	            	</div>
	            </div>
            </div>
        );
    }
}

const mapStateToProps = state =>
    ({
        ping: state.socket.ping,
        connection: state.socket.connection,
    })

export default connect(mapStateToProps)(PublicHeader)