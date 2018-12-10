import React, { Component } from 'react'
import { connect } from 'react-redux'
import hljs from 'highlight.js'

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
            <div className="h-100">
                <h1>Callable: {dcallable_hash}</h1>
                <h5>name</h5>{callable.name}
                <h5>type</h5>{callable.type}
                <h5>src</h5>
                <pre className="hljs-comment">(Language: {callable.source ? hljs.highlightAuto(callable.source).language : '-'})</pre>
                {
                    callable.source
                    ?   <pre><code dangerouslySetInnerHTML={{__html: `${hljs.highlightAuto(callable.source).value}` }}/></pre>
                    :   null
                }
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