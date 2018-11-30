import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from 'components/header'
import SideMenu from 'components/menu/side'

class Layout extends Component {
	render() {
		const { children } = this.props
		return (
			<div>
				<header>
					<Header />
			    </header>
			    <div className="container-fluid">
				    <div className="row">
				    	<div className="col-2 pl-0">
						    <aside>
						    	<SideMenu />
						    </aside>
					    </div>
					    <div className="col-10">
					    	<main>
						    	{ children }
						    </main>
					    </div>
				    </div>
			    </div>
			    <footer>
			    	
			    </footer>
		    </div>
		)
	}
}

const mapStateToProps = state =>
    ({
        
    })

export default connect(mapStateToProps)(Layout)