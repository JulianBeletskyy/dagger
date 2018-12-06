import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'

class Node extends Component {
	getList = node => {
		Object.keys(node).map(item => {
			//console.log(node[item])
		})
		return Object.keys(node).map(item => ({node: item, value: node[item]}))
	}

	componentDidMount() {
		const { client } = this.props
		client.get_node(this.props.match.params.id * 1)
	}

	render() {
		const { node } = this.props
		
		const columns = [{
		    Header: 'NODE',
		    accessor: 'node',
		    className: 'text-center',
		    Cell: props => <span>{props.value}</span>,
		    Aggregated: row => row,
		    aggregate: val => val,
	  	}, {
	  		Header: 'Value',
	  		accesor: 'value',
	  		Cell: props => {
	  			console.log(props.original.value)
	  			if (typeof props.original.value === 'string') {
	  				return <span>{props.original.value}</span>
	  			}
	  		}
	  	}]
		return (
			<div className="h-100">
            	<h1>Node</h1>
            	<div>
            	{
            		Object.keys(node).length
            		? 	<ReactTable
		            		showPagination={false}
		            		defaultPageSize={Object.keys(node).length}
				    		data={this.getList(node)}
				    		SubComponent={row => {
				    			//console.log(node[row.original.node])
			                    return (
			                      	<div>
			                      		<ReactTable
			                      			showPagination={false} 
			                      			columns={columns}
			                      			data={this.getList(node)} />
			                      	</div>
			                    );
		                  	}}
				    		columns={columns} />
            		: 	null
            	}
	    		</div>
            </div>
		)
	}
}

const mapStateToProps = ({socket: { client }, nodes: {node}}) =>
    ({
        client: client,
        node: node,
    })

export default connect(mapStateToProps)(Node)