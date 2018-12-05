import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { history } from 'store'


class Commits extends Component {

	goToCommit = link => e => {
		e.preventDefault()
		history.push(`/commit/${encodeURIComponent(link)}`)
	}

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
		    maxWidth: 150,
		    Cell: props => <span>{props.value}</span>
	  	}, {
		    Header: 'D Commit',
		    accessor: 'dcommit',
		    className: 'text-center',
		    Cell: props => <a href={props.value} onClick={this.goToCommit(props.value)}>{ props.value }</a>
	  	}, {
		    Header: 'Image ID',
		    accessor: 'imageid',
		    maxWidth: 200,
		    className: 'text-center',
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