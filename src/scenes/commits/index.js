import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { history } from 'store'
import handlers from 'actions/socket'

class Commits extends Component {

	goToCommit = link => e => {
		e.preventDefault()
		history.push(`/commit/${encodeURIComponent(link)}`)
	}

	componentWillUnmount() {
		const { dispatch } = this.props
		dispatch(handlers.get_dcommitsHandler(false, []))
	}

	componentDidMount() {
		const { client } = this.props
		client.get_dcommits()
	}

    render() {
    	const { list } = this.props
    	const columns = [{
		    Header: '# Callables',
		    accessor: '# dcallables',
		    className: 'text-center',
		    maxWidth: 150,
		    Cell: props => <span>{props.value}</span>
	  	}, {
		    Header: 'Commit',
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
				{
	            	list && list.length>0
					?	<ReactTable
							showPaginationTop={false}
							showPaginationBottom={false}
							defaultPageSize={list.length}
							data={list}
							columns={columns} />
					:	null
				}
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