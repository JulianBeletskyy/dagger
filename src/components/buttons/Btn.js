import React, { Component } from 'react'
import Button from '@material-ui/core/Button'

class Btn extends Component {

    render() {
        const { 
            type = 'button',
            disabled = false,
            className = '',
            title = '',
            onClick,
            color = 'primary' } = this.props
        return (
            <Button 
                variant="contained"
                disabled={disabled}
                color={color}
                type={type}
                className={`${className}`}
                onClick={onClick}>
                {title}
            </Button>
        );
    }
}

export default Btn