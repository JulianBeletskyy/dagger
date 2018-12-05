import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from 'components/inputs/TextField'
import Btn from 'components/buttons/Btn'
import { setAlert } from 'actions/ui'

class BuildCommit extends Component {
	state = {
		waitResponse: false,
	}

	createCommit = () => {
		const { dispatch, client } = this.props
		if (!this.commit.value) {
			dispatch(setAlert('Commit name is required', 'error'))
			return
		}
		client.build(this.commit.value)
		this.setState({waitResponse: true})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.buildCommit !== this.props.buildCommit) {
			this.setState({waitResponse: false})
		}
	}

    render() {
    	const { buildCommit } = this.props
        return (
            <div className="h-100">
            	<h1>Build Commit</h1>
            	<form className="form-inline">
					  <div className="form-group mb-2">
					    	<label className="text-grey">Build new commit</label>
					  </div>
					  <div className="form-group mx-sm-3 mb-2">
					    	<TextField inputRef={ref => this.commit = ref} />
					  </div>
				  	<Btn title="Ok" className="mb-2" onClick={this.createCommit} />
				</form>
				{
					this.state.waitResponse
					? 	<div><div className="layout-building-alert"></div><div className="inner-confirm-alert">Building...</div></div>
					:  	<div dangerouslySetInnerHTML={{__html: buildCommit.replace(/\\n/g, "\n").replace(/[\r\n]+/g, '<br />') }} />	
				}
            </div>
        );
    }
}

const mapStateToProps = ({socket: { client }, commitsets: {buildCommit}}) =>
    ({
        client: client,
        buildCommit: buildCommit,
    })

export default connect(mapStateToProps)(BuildCommit)