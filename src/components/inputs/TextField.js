import React, { Component } from 'react'

class TextField extends Component {
    constructor() {
        super()
        this.input = null
        this.state = {value: ''}
    }
    
    thisRef = ref => {
        this.props.inputRef(ref)
        this.input = ref
    }

    handleChange = ({target: {value}}) => {
        this.setState({value})
        if (this.props.onChange) {
           this.props.onChange(value)
        }
    }

    render() {
        const { type = 'text', disabled = false, className = '', value } = this.props
        return (
            <input
                type={type}
                disabled={disabled}
                ref={this.thisRef}
                className={`form-control text-field  ${className}`}
                onChange={this.handleChange}
                defaultValue={value} />
        );
    }
}

export default TextField