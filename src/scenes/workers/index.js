import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'

class Workers extends Component {
	formatDate = string => {
		const [date, time] = string.split('T')
		const [t] = time.split('.')
		return `${date} ${t}`
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
		    Cell: props => <span>{props.value}</span>
	  	}, {
		    Header: 'Commit',
		    accessor: 'dcommit',
		    className: 'text-center',
		    Cell: props => <a href={props.value} target="_blank">{props.value}</a>
	  	}, {
		    Header: 'Start Time',
		    accessor: 'start_time',
		    className: 'text-center',
		    Cell: props => <span>{ this.formatDate(props.value) }</span>
	  	}, {
		    Header: 'Stop Time',
		    accessor: 'stop_time',
		    className: 'text-center',
		    Cell: props => <span>{ this.formatDate(props.value) }</span>
	  	}]
        return (
            <div className="h-100">
            	<h1>Workers</h1>
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