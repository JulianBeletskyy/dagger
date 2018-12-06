import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { history } from 'store'
import TextField from 'components/inputs/TextField'
import Btn from 'components/buttons/Btn'

class Commitset extends Component {
	componentDidMount() {
		const { client } = this.props
		const link = decodeURIComponent(this.props.match.params.commitset)
		client.get_dcommitset(link)
	}

	getList = (commitSet, type) => {
		return Object.keys(commitSet[type]).map(item => ({[type]: item, value: commitSet[type][item]}))
	}

    render() {
    	const { commitSet } = this.props
    	const dcallablesColumns = [{
		    Header: 'dcallables',
		    accessor: 'dcallables',
		    Cell: props => <span>{props.value}</span>
	  	},{
		    Header: 'value',
		    accessor: 'value',
		    Cell: props => <a href={props.value} target="_blank">{props.value}</a>
	  	}]

	  	const columns = [{
		    Header: 'dcommits',
		    accessor: 'dcommits',
		    className: 'text-center',
		    Cell: props => <a href={props.original} target="_blank">{props.original}</a>
	  	}]
        return (
            <div className="h-100">
            	<div className="d-flex align-items-center">
            		<h1>Commitset </h1>
            		<div className="ml-3">
            			<a href={decodeURIComponent(this.props.match.params.commitset)} target="_blank">{decodeURIComponent(this.props.match.params.commitset)}</a>
        			</div>
        		</div>
				<div>
				{
					commitSet.dcallables
					? 	<ReactTable
							showPagination={false}
		            		defaultPageSize={Object.keys(commitSet.dcallables).length}
				    		data={this.getList(commitSet, 'dcallables')}
				    		columns={dcallablesColumns} />
		    		: 	null
				}
				{
					commitSet.dcommits
					? 	<ReactTable
							showPagination={false}		            		
							defaultPageSize={commitSet.dcommits.size}
				    		data={[...commitSet.dcommits.values()]}
				    		columns={columns} />
					: 	null
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