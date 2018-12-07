import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'

class Callable extends Component {
	componentDidMount() {
		const { client } = this.props
		const dcallable_hash = this.props.match.params.callable
		client.get_dcallable(dcallable_hash)
	}

	render() {
		const { callable } = this.props
        const dcallable_hash = this.props.match.params.callable
    	const columns = [{
    		columns: [{
			    Header: 'K',
			    accessor: 'k',
			    className: 'text-center',
			    Cell: props => <span>{props.value}</span>
		  	},{
			    Header: 'V',
			    accessor: 'v',
			    className: 'text-center',
			    Cell: props => <span>{props.value}</span>
		  	}]
        }]
        console.log("callable/index.js line 28", callable);
        return (
            <div className="h-100">
                <h1>Callable: {dcallable_hash}</h1>
                <h5>name</h5>{callable.name}
                <h5>type</h5>{callable.type}
                <h5>src</h5><pre>{callable.source}</pre>
            </div>

            // <div className="h-100">
            //     {
            //         commit.dcallables
            //         ?	<ReactTable
            //                 showPagination={false}
            //                 defaultPageSize={Object.keys(commit.dcallables).length}
            //                 data={this.getList(commit)}
            //                 columns={columns} />
            //         : 	null
            //     }
            // </div>
    );
    }
}

const mapStateToProps = ({socket: { client }, callables: {callable}}) =>
    ({
        client: client,
        callable: callable
    })

export default connect(mapStateToProps)(Callable)