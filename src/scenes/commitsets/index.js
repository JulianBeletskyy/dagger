import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { history } from 'store'
import TextField from 'components/inputs/TextField'
import Btn from 'components/buttons/Btn'
import { setAlert } from 'actions/ui'

class Commitsets extends Component {
	formatDate = string => {
		const [date, time] = string.split('T')
		const [t] = time.split('.')
		return `${date} ${t}`
	}

	createCommit = () => {
		const { dispatch, client } = this.props
		if (!this.commit.value) {
			dispatch(setAlert('Commit name is required', 'error'))
			return
		}
		client.build(this.commit.value)
	}

	componentDidMount() {
		const { client } = this.props
		client.get_dcommitsets()
	}

    render() {
    	const { list, buildCommit } = this.props
	  	const columns = [{
		    Header: 'Commit',
		    accessor: 'dcommitset',
		    Cell: props => <a href={props.value} target="_blank">{props.value}</a>
	  	}, {
		    Header: 'Build Time',
		    accessor: 'buildtime',
		    Cell: props => <span className='number'>{ this.formatDate(props.value)}</span>
	  	}]
        return (
            <div className="h-100">
            	<h1>Commitsets</h1>
            	<form className="form-inline">
					  <div className="form-group mb-2">
					    	<label className="text-grey">Build new commit</label>
					  </div>
					  <div className="form-group mx-sm-3 mb-2">
					    	<TextField inputRef={ref => this.commit = ref} />
					  </div>
				  	<Btn title="Ok" className="mb-2" onClick={this.createCommit} />
				</form>
            	<div>
	            	<ReactTable
	            		showPaginationTop={true}
	            		showPaginationBottom={false}
	            		defaultPageSize={5}
	            		defaultSorted={[{id: 'buildtime',desc: true}]}
	            		previousText="Prev"
			    		data={list}
			    		columns={columns} />
	    		</div>
	    		<div dangerouslySetInnerHTML={{__html: 
	    			buildCommit.replace(/\\n/g, "\n").replace(/[\r\n]+/g, '<br />')
					 }} />
            </div>
        );
    }
}

const mapStateToProps = ({socket: { client }, commitsets: {list, buildCommit}}) =>
    ({
        client: client,
        list: list,
        buildCommit: buildCommit,
    })

export default connect(mapStateToProps)(Commitsets)