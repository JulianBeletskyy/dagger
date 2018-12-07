import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { history } from 'store'
import handlers from 'actions/socket'

class Commit extends Component {
	getList = commit => {
		return Object.keys(commit.dcallables).map(item => ({dcallables: item, value: commit.dcallables[item], imageid: commit.imageid}))
	}

	goToCallable = dcallable_hash => e => {
		e.preventDefault()
		history.push(`/callable/${dcallable_hash}`)
	}

	componentWillUnmount() {
		const { dispatch } = this.props
		dispatch(handlers.get_dcommitHandler(false, {}))
	}

	componentDidMount() {
		const { client } = this.props
		const link = decodeURIComponent(this.props.match.params.commit)
		client.get_dcommit(link)
	}

    render() {
    	const {commit} = this.props
    	const link = decodeURIComponent(this.props.match.params.commit)
    	const columns = [{
    		columns: [{
			    Header: 'Callable',
			    accessor: 'dcallables',
			    maxWidth: 150,
			    className: 'text-center',
			    Cell: props => <span>{props.value}</span>
		  	},{
			    Header: 'Callable Hash',
			    accessor: 'value',
			    className: 'text-center',
				Cell: props => <a href={props.value} onClick={this.goToCallable(props.value)}>{ props.value }</a>
			}, {
			    Header: 'Image Id',
			    accessor: 'imageid',
			    maxWidth: 200,
			    className: 'text-center',
			    Cell: props => <span>{props.value}</span>
		  	}]
		  }]
        return (
            <div className="h-100">
            	<h1>Commit {link}</h1>
            	{
            		commit.dcallables
            		?	<ReactTable
							showPagination={false}
		            		defaultPageSize={Object.keys(commit.dcallables).length}
				    		data={this.getList(commit)}
				    		columns={columns} />
            		: 	null
            	}
            </div>
        );
    }
}

const mapStateToProps = ({socket: { client }, commits: {commit}}) =>
    ({
        client: client,
        commit: commit,
    })

export default connect(mapStateToProps)(Commit)