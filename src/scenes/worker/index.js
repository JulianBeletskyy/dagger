import React, { Component } from 'react'
import { connect } from 'react-redux'
import JSONTree from 'react-json-tree'
import ReactTable from 'react-table'
import { history } from 'store'


class Worker extends Component {
	
	componentDidMount() {
		const { client } = this.props
		client.get_worker(this.props.match.params.worker_id)
	}

	componentDidUpdate() {
		if(this.props.match.params.worker_id!=this.props.worker.worker_id) {
			const { client } = this.props
			client.get_worker(this.props.match.params.worker_id)
		}
	}

	goToCommit = link => e => {
		e.preventDefault()
		history.push(`/commit/${encodeURIComponent(link)}`)
	}

	render() {
		const { worker } = this.props
		if (Object.keys(worker).length === 0) {
			return null
		}
		const worker_data = Object.keys(worker).filter(function(k,idx) {
			return ! (k === 'stdout' || k === 'stderr' || k === 'worker_id')
		}).map(function(k,idx) {
			return {k:k,v:worker[k]}
		})

		const columns = [{
		    Header: 'K',
		    accessor: 'k',
		    Cell: props => <span>{props.value}</span>
		},{
		    Header: 'V',
		    accessor: 'v',
		    Cell: props => <div>{
				props.row.k === 'dcommit'
				?	<a href={props.value} onClick={this.goToCommit(props.value)}>{ props.value }</a>
				:	<span>{props.value}</span>
			}</div>
		}]

		return (
			<div className="h-100 node-tree">
				<h1>Worker {worker.worker_id}</h1>
				<ReactTable
					showPagination={false}		            		
					defaultPageSize={worker_data.length}
					data={worker_data}
					columns={columns} />
				{
					worker.stdout.length > 0
					?	<div><h5>stdout</h5><pre>{worker.stdout}</pre></div>
					:	null
				}
				{
					worker.stderr.length > 0
					?	<div><h5>stderr</h5><pre>{worker.stderr}</pre></div>
					:	null
				}
				<JSONTree invertTheme={false} data={worker} />
            </div>
		)
	}
}

const mapStateToProps = ({socket: { client }, workers: {worker}}) =>
{
	return {
        client: client,
        worker: worker,
	}
}

export default connect(mapStateToProps)(Worker)