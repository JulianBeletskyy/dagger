import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { history } from 'store'

class Nodes extends Component {
	goToNode = id => e => {
		e.preventDefault()
		history.push(`/node/${id}`)
	}

	componentDidMount() {
		const { client } = this.props
		client.get_nodes()
	}

    render() {
    	const { list } = this.props
    	const columns = [{
		    Header: 'id',
		    accessor: 'id',
		    className: 'text-center',
		    Cell: props => <a href={`/node/${props.value}`} onClick={this.goToNode(props.value)}>{props.value}</a>
		}, {
			Header: 'call',
			accessor: 'func',
			className: 'text-center',
			Cell: props => <span>{ props.original.func + "(" + props.original.args.join(",") + ")" }</span>
		}, {
		  Header: 'value',
		  accessor: 'value',
		  className: 'text-center',
		  Cell: props => <span>{props.value}</span>
	  	// }, {
		//     Header: 'dfuntype',
		//     accessor: 'dfuntype',
		//     className: 'text-center',
		//     Cell: props => <span>{ props.value }</span>
	  	}, {
		    Header: 'dstatus',
		    accessor: 'dstatus',
		    className: 'text-center',
		    Cell: props => <span>{ props.value }</span>
	  	}]
        return (
            <div className="h-100">
            	<div>
            	{
            		list.length
            		? 	<ReactTable
		            		showPaginationTop={false}
		            		showPaginationBottom={false}
		            		defaultPageSize={list.length}
							data={list}
							filterable={true}
				    		columns={columns} />
            		: 	null
            	}
	    		</div>
            </div>
        );
    }
}

const mapStateToProps = ({socket: { client }, nodes: {list}}) =>
    ({
        client: client,
        list: list,
    })

export default connect(mapStateToProps)(Nodes)