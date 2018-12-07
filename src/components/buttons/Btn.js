import React, { Component } from 'react'
import Button from '@material-ui/core/Button'

class Btn extends Component {

    render() {
        const { type = 'button', disabled = false, className = '', title = '', onClick } = this.props
        return (
            <Button variant="contained" color="primary" className={`${className}`} onClick={onClick}>
                {title}
            </Button>
        );
    }
}

export default Btn