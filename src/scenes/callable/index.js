import React, { Component } from 'react'
import { connect } from 'react-redux'

class Callable extends Component {
	componentDidMount() {
		const { client } = this.props
		const dcallable_hash = this.props.match.params.callable
		client.get_dcallable(dcallable_hash)
	}

	render() {
		const { callable } = this.props
        const dcallable_hash = this.props.match.params.callable
        return (
            <div className="h-100">
                <h1>Callable: {dcallable_hash}</h1>
                <h5>name</h5>{callable.name}
                <h5>type</h5>{callable.type}
                <h5>src</h5><pre>{callable.source}</pre>
            </div>
        );
    }
}

const mapStateToProps = ({socket: { client }, callables: {callable}}) =>
    ({
        client: client,
        callable: callable
    })

export default connect(mapStateToProps)(Callable)