import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

class TextInput extends Component {
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
        const { type = 'text', disabled = false, className = '', value, label } = this.props
        return (
            <TextField
                label={label}
                type={type}
                disabled={disabled}
                className={className}
                value={value}
                inputRef={this.thisRef}
                onChange={this.handleChange}
                margin="normal" />
        );
    }
}

export default TextInput