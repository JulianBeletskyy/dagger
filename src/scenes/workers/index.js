import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { history } from 'store'

class Workers extends Component {
	formatDate = string => {
		if(!string) return null;
		const [date, time] = string.split('T')
		const [t] = time.split('.')
		return `${date} ${t}`
	}

	goToCommit = commit => e => {
		e.preventDefault()
		history.push(`/commit/${encodeURIComponent(commit)}`)
	}

	goToWorker = worker_id => e => {
		e.preventDefault()
		history.push(`/worker/${worker_id}`)
	}

	componentDidMount() {
		const { client } = this.props
		client.get_workers()
	}

    render() {
    	const { list } = this.props
    	const columns = [{
		    Header: 'Worker ID',
		    accessor: 'worker_id',
		    className: 'text-center',
		    Cell: props => <a href={"/worker/"+props.value} onClick={this.goToWorker(props.value)}>{ props.value }</a>
	  	}, {
		    Header: 'Commit',
		    accessor: 'dcommit',
		    className: 'text-center',
		    Cell: props => <a href={"/commit/"+encodeURIComponent(props.value)} onClick={this.goToCommit(props.value)}>{ props.value }</a>
	  	}, {
		    Header: 'Start Time',
		    accessor: 'start_time',
		    className: 'text-center',
		    maxWidth: 200,
		    Cell: props => <span>{ this.formatDate(props.value) }</span>
	  	}, {
		    Header: 'Stop Time',
		    accessor: 'stop_time',
		    className: 'text-center',
		    maxWidth: 200,
		    Cell: props => <span>{ this.formatDate(props.value) }</span>
	  	}]
        return (
            <div className="h-100">
            	<div>
            	{
            		list.length
            		? 	<ReactTable
		            		showPagination={false}
		            		defaultPageSize={list.length}
				    		data={list}
				    		columns={columns} />
            		: 	null
            	}
	    		</div>
            </div>
        );
    }
}

const mapStateToProps = ({socket: { client }, workers: {list}}) =>
    ({
        client: client,
        list: list,
    })

export default connect(mapStateToProps)(Workers)