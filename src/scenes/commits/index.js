import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'


class Commits extends Component {
	componentDidMount() {
		const { client } = this.props
		client.get_dcommits()
	}

    render() {
    	const { list } = this.props
    	const columns = [{
		    Header: 'D Call Ables',
		    accessor: '# dcallables',
		    className: 'text-center',
		    Cell: props => <span>{props.value}</span>
	  	}, {
		    Header: 'D Commit',
		    accessor: 'dcommit',
		    Cell: props => <a href={props.value} target="_blank">{ props.value }</a>
	  	}, {
		    Header: 'Image ID',
		    accessor: 'imageid',
		    Cell: props => <span>{ props.value }</span>
	  	}]
        return (
            <div className="h-100">
            	<h1>Commits</h1>
            	<div>
	            	<ReactTable
	            		showPaginationTop={true}
	            		showPaginationBottom={false}
	            		defaultPageSize={5}
	            		previousText="Prev"
			    		data={list}
			    		columns={columns} />
	    		</div>
            </div>
        );
    }
}

const mapStateToProps = ({socket: { client }, commits: {list}}) =>
    ({
        client: client,
        list: list,
    })

export default connect(mapStateToProps)(Commits)