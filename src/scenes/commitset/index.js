import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import TextField from 'components/inputs/TextField'
import Btn from 'components/buttons/Btn'

class Commitset extends Component {
	getCommitset = () => {
		const { client } = this.props
		client.get_dcommitset(this.commit.value)
	}

    render() {
    	const { commitSet = [] } = this.props
    	console.log(commitSet)
        return (
            <div className="h-100">
            	<h1>Commitset</h1>
            	<form className="form-inline">
					  <div className="form-group mb-2">
					    	<label className="text-grey">Commitset</label>
					  </div>
					  <div className="form-group mx-sm-3 mb-2">
					    	<TextField inputRef={ref => this.commit = ref} />
					  </div>
				  	<Btn title="Ok" className="mb-2" onClick={this.getCommitset} />
				</form>
				<div>
	            	
	    		</div>
            </div>
        );
    }
}

const mapStateToProps = ({socket: { client }, commitsets: {commitSet}}) =>
    ({
        client: client,
        commitSet: commitSet
    })

export default connect(mapStateToProps)(Commitset)