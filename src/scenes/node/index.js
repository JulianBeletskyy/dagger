import React, { Component } from 'react'
import { connect } from 'react-redux'
import JSONTree from 'react-json-tree'

class Node extends Component {
	componentDidMount() {
		const { client } = this.props
		client.get_node(this.props.match.params.id * 1)
	}

	render() {
		const { node } = this.props
		return (
			<div className="h-100 node-tree">
            	<JSONTree invertTheme={false} data={node} />
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