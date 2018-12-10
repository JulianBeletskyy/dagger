import React, { Component } from 'react'
import { connect } from 'react-redux'
import JSONTree from 'react-json-tree'
import { history } from 'store'


class Node extends Component {
	
	componentDidMount() {
		const { client } = this.props
		client.get_node(this.props.match.params.id * 1)
	}

	componentDidUpdate() {
		if(this.props.match.params.id!=this.props.node.id) {
			const { client } = this.props
			client.get_node(this.props.match.params.id * 1)
		}
	}

	goToNode = id => e => {
		e.preventDefault()
		history.push(`/node/${id}`)
	}
	
	render() {
		const { node } = this.props
		var goToNode = this.goToNode
		if (Object.keys(node).length === 0) {
			return null
		}
		return (
			<div className="h-100 node-tree">
				<h1>Node {node.id}</h1>
				<h5>status</h5>
				{node.dstatus.s}
				<h5>type</h5>
				{node.dfuntype.s}
				<h5>name</h5>
				{node.func + "(" + node.args.join(", ") + ")"}
				{
					node.dfuntype.s === "FUNCTION"
					? 	<div><h5>ts</h5>{node.ts}</div>
					:	null
				}
				<h5>value</h5>
				{node.value}
				{
					Object.keys(node.dep_callers).length > 0
					? 	<div>
							<h5>parents</h5>
							{Object.keys(node.dep_callers).map(function(dep, idx){
								var n = node.dep_callers[dep]
								return <li key={idx}><a href={`/node/${dep}`} onClick={goToNode(dep)}>{n.func+"("+n.args.join(",")+"): "+n.value}</a></li>;
					  		})}
					  	</div>
					:	null
				}
				{
					Object.keys(node.dep_callees).length > 0
					? 	<div>
							<h5>children</h5>
							{Object.keys(node.dep_callees).map(function(dep, idx){
								var n = node.dep_callees[dep]
								return <li key={idx}><a href={`/node/${dep}`} onClick={goToNode(dep)}>{n.func+"("+n.args.join(",")+"): "+n.value}</a></li>;
							})}
					  	</div>
					:	null
				}
				{
					node.fiddles.v.length > 0
					?	<div><h5>fiddles</h5>{JSON.stringify(node.fiddles.v)}</div>
					:	null
				}
				<h5>source</h5>
				<pre>{node.source}</pre>
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