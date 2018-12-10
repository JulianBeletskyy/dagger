import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from 'components/header'
import SideMenu from 'components/menu/side'
import ConfirmAlert from 'components/confirm'

class Layout extends Component {
	render() {
		const { children, confirm } = this.props
		return (
			<div>
				<div className={`layout-confirm-alert ${confirm ? 'active' : 'disabled'}`}>
				
			    <div className="container-fluid bg-white">
				    <div className="row">
				    	<div className="col-5 col-sm-4 col-md-3 col-lg-2 pl-0 pr-0">
						    <aside className="h-100">
						    	<SideMenu />
						    </aside>
					    </div>
					    <div className="col-7 col-sm-8 col-md-9 col-lg-10 pl-0">
					    	<Header />
					    	<main className="wrap-main">
						    	{ children }
						    </main>
					    </div>
				    </div>
			    </div>
			    <footer>
			    	
			    </footer>
			    </div>
			    <div className={`layout-confirm-alert ${confirm ? 'active' : 'disabled'}`}></div>
			    {confirm && <ConfirmAlert />}
		    </div>
		)
	}
}

const mapStateToProps = state =>
    ({
        confirm: state.ui.confirm_alert.show,
    })

export default connect(mapStateToProps)(Layout)