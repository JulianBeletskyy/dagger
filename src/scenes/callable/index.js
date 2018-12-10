import React, { Component } from 'react'
import { connect } from 'react-redux'
import hljs from 'highlight.js'
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableRow';

class Callable extends Component {
	componentDidMount() {
		const { client } = this.props
		const dcallable_hash = this.props.match.params.callable
		client.get_dcallable(dcallable_hash)
        hljs.configure({languages: ['java', 'python']})
	}

    componentWillReceiveProps(nextProps) {
        if (nextProps.callable.source !== this.props.callable.source) {
        }
        
    }

	render() {
		const { callable } = this.props
        const dcallable_hash = this.props.match.params.callable
        return (
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell component="th">hash</TableCell>
                        <TableCell>{dcallable_hash}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th">name</TableCell>
                        <TableCell>{callable.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th">type</TableCell>
                        <TableCell>{callable.type}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th">source</TableCell>
                        <TableCell>
                            {/* <pre className="hljs-comment">(Language: {callable.source ? hljs.highlightAuto(callable.source).language : '-'})</pre> */}
                            {
                                callable.source
                                ?   <pre><code dangerouslySetInnerHTML={{__html: `${hljs.highlightAuto(callable.source).value}` }}/></pre>
                                :   null
                            }
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
}

const mapStateToProps = ({socket: { client }, callables: {callable}}) =>
    ({
        client: client,
        callable: callable
    })

export default connect(mapStateToProps)(Callable)