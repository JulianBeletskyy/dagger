import React, { Component } from 'react'
import { connect } from 'react-redux'

class Node extends Component {
	componentDidMount() {
		const { client } = this.props
		client.get_node(this.props.match.params.id * 1)
	}

	render() {
		const { node } = this.props
		console.log(node)
		return (
			<div className="h-100">
            	<h1>Node</h1>
            	
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