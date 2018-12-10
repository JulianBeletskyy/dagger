import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { history } from 'store'

class Commitset extends Component {
	componentDidMount() {
		const { client } = this.props
		const link = decodeURIComponent(this.props.match.params.commitset)
		client.get_dcommitset(link)
	}

	getList = (commitSet, type) => {
		return Object.keys(commitSet[type]).map(item => ({[type]: item, value: commitSet[type][item]}))
	}

	goToCommit = link => e => {
		e.preventDefault()
		history.push(`/commit/${encodeURIComponent(link)}`)
	}

	goToCallable = dcallable_hash => e => {
		e.preventDefault()
		history.push(`/callable/${dcallable_hash}`)
	}

	render() {
		const { commitSet } = this.props
	
		const dcallablesColumns = [{
		    Header: 'Callable Name',
		    accessor: 'dcallable',
		    Cell: props => <span>{props.value}</span>
		},{
		    Header: 'Callable Hash',
		    accessor: 'dcallable_hash',
			Cell: props => <a href={props.value} onClick={this.goToCallable(props.value)}>{ props.value }</a>
		},{
		    Header: 'Commit',
		    accessor: 'dcommit',
		    Cell: props => <a href={props.value} onClick={this.goToCommit(props.value)}>{ props.value }</a>
	  	}]

	  	const dcommitsColumns = [{
		    Header: 'Commit',
		    accessor: 'dcommits',
		    className: 'text-center',
		    Cell: props => <a href={props.original} onClick={this.goToCommit(props.original)}>{ props.original }</a>
	  	}]
        return (
            <div className="h-100">
            	<div className="d-flex align-items-center">
            		<div className="ml-3">
            			{decodeURIComponent(this.props.match.params.commitset)}
        			</div>
        		</div>
				<div>
				<h2>Commits in the Commitset</h2>
				{
					commitSet.dcommits
					? 	<ReactTable
							showPagination={false}		            		
							defaultPageSize={commitSet.dcommits.size}
							data={[...commitSet.dcommits.values()]}
							columns={dcommitsColumns} />
					: 	null
				}
				<h2>Callables</h2>
				{
					commitSet.dcallables
					? 	<ReactTable
							showPagination={false}
		            		defaultPageSize={commitSet.dcallables.length}
				    		data={[...commitSet.dcallables]}
				    		columns={dcallablesColumns} />
		    		: 	null
				}
				<h2>Build Log</h2>
				{
					commitSet.buildlog
					?	
						<pre>{commitSet.buildlog}</pre>
					:	null
				}
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