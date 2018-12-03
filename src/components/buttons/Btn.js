import React, { Component } from 'react'

class Btn extends Component {

    render() {
        const { type = 'button', disabled = false, className = '', title = '', onClick } = this.props
        return (
            <button
                type={type}
                disabled={disabled}
                className={`btn btn-primary btn-main ${className}`}
                onClick={onClick}>
                {title}
            </button>
        );
    }
}

export default Btn