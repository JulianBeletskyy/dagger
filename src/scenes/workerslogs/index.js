import React, { Component } from 'react'
import { connect } from 'react-redux'

class WorkersLogs extends Component {
	componentDidMount() {
		const { client } = this.props
		client.get_worker_logs()
	}

    render() {
    	const { logs } = this.props
        return (
            <div className="h-100">
            	<h1>Workers Logs</h1>
            	<pre>
            		{logs}
            	</pre>
            </div>
        );
    }
}

const mapStateToProps = ({socket: { client }, workers: {logs}}) =>
    ({
        client: client,
        logs: logs,
    })

export default connect(mapStateToProps)(WorkersLogs)