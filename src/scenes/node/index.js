import React, { Component } from 'react'
import { connect } from 'react-redux'
import JSONTree from 'react-json-tree'
import { history } from 'store'
import hljs from 'highlight.js'
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableRow';

class Node extends Component {
	
	componentDidMount() {
		const { client } = this.props
		client.get_node(this.props.match.params.id * 1)
		hljs.configure({languages: ['java', 'python']})
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
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell component="th">id</TableCell>
                        <TableCell>{node.id}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th">status</TableCell>
                        <TableCell>{node.dstatus.s}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th">call</TableCell>
                        <TableCell>{node.func + "(" + node.args.join(", ") + ")"}
						{
							node.dfuntype.s === "FUNCTION"
							? 	<div><h5>ts</h5>{node.ts}</div>
							:	null
						}
						</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th">value</TableCell>
                        <TableCell>{node.value}</TableCell>
                    </TableRow>
					{
						Object.keys(node.dep_callers).length > 0
						? 	<TableRow>
								<TableCell component="th">parents</TableCell>
								<TableCell>
								{Object.keys(node.dep_callers).map(function(dep, idx){
									var n = node.dep_callers[dep]
									return <li key={idx}><a href={`/node/${dep}`} onClick={goToNode(dep)}>{n.func+"("+n.args.join(",")+"): "+n.value}</a></li>;
								})}
								</TableCell>
							</TableRow>
						:	null
					}
					{
						Object.keys(node.dep_callees).length > 0
						? 	<TableRow>
								<TableCell component="th">children</TableCell>
								<TableCell>
								{Object.keys(node.dep_callees).map(function(dep, idx){
									var n = node.dep_callees[dep]
									return <li key={idx}><a href={`/node/${dep}`} onClick={goToNode(dep)}>{n.func+"("+n.args.join(",")+"): "+n.value}</a></li>;
								})}
								</TableCell>
							</TableRow>
						:	null
					}
					{
						node.fiddles.v.length > 0
						?	<TableRow>
								<TableCell component="th">fiddles</TableCell>
								<TableCell>{JSON.stringify(node.fiddles.v)}</TableCell>
							</TableRow>
						:	null
					}
					{
						node.stdout && node.stdout.length
						?	<TableRow><TableCell component="th">stdout</TableCell>
							<TableCell><pre>{node.stdout}</pre></TableCell>
							</TableRow>
						:	null
					}
					{
						node.stderr && node.stderr.length
						?	<TableRow><TableCell component="th">stderr</TableCell><TableCell><pre>{node.stderr}</pre></TableCell></TableRow>
						:	null
					}
					{
						node.stacktrace && node.stacktrace.length
						?	<TableRow><TableCell component="th">stacktrace</TableCell><TableCell><pre>{node.stacktrace}</pre></TableCell></TableRow>
						:	null
					}
                    <TableRow>
                        <TableCell component="th">source</TableCell>
                        <TableCell>
                            {/* <pre className="hljs-comment">(Language: {callable.source ? hljs.highlightAuto(callable.source).language : '-'})</pre> */}
                            {
								node.source
								? 	<pre><code dangerouslySetInnerHTML={{__html: `${hljs.highlightAuto(node.source).value}` }}/></pre>
								: 	null
                            }
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
		)
	}
}

const mapStateToProps = ({socket: { client }, nodes: {node}}) =>
    ({
        client: client,
        node: node,
    })

export default connect(mapStateToProps)(Node)