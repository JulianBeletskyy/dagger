import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'

class Commit extends Component {
	getList = commit => {
		return Object.keys(commit.dcallables).map(item => ({dcallables: item, value: commit.dcallables[item], imageid: commit.imageid}))
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
    		Header: <a href={link} target="_blank">{link}</a>, 
    		columns: [{
			    Header: 'dcallables',
			    accessor: 'dcallables',
			    maxWidth: 150,
			    className: 'text-center',
			    Cell: props => <span>{props.value}</span>
		  	},{
			    Header: 'value',
			    accessor: 'value',
			    className: 'text-center',
			    Cell: props => <span>{props.value}</span>
		  	}, {
			    Header: 'imageid',
			    accessor: 'imageid',
			    maxWidth: 200,
			    className: 'text-center',
			    Cell: props => <span>{props.value}</span>
		  	}]
		  }]
        return (
            <div className="h-100">
            	<h1>Commit</h1>
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