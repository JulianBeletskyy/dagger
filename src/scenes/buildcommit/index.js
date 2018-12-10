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
            	<div className="row">
				  	<div className="col-sm-1 d-flex align-items-end">
				    	<label className="text-grey mb-1">Commitset</label>
				  	</div>
				  	<div className="col-sm-4">
				    	<TextField inputRef={ref => this.commit = ref} className="form-control my-0" label="[Git URL]#[commit hash]" />
				  	</div>
				  	<div className="col-sm-1 d-flex align-items-center">
				  		<Btn title="Ok" onClick={this.createCommit} />
			  		</div>
				</div>
				
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