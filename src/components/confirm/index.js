import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleConfirmAlert } from 'actions/ui'
import Btn from 'components/buttons/Btn'

class ConfirmAlert extends Component {

    cancel = () => {
        const { dispatch, onCancel } = this.props
        dispatch(toggleConfirmAlert())
        if (onCancel) {
            onCancel()
        }
        
        
    }

    confirm = () => {
        const { dispatch, onConfirm } = this.props
        dispatch(toggleConfirmAlert())
        if (onConfirm) {
            onConfirm()
        }
        
    }

    render() {
        const { text = '', buttons } = this.props
        return (
            <div className="back-confirm-alert">
                <div className="inner-confirm-alert">
                    <div className="position-relative pt-4">
                        <i className="fas fa-times pointer" onClick={this.cancel}></i>
                        <div className="mb-4">{text}</div>
                        {
                            buttons
                            ?   <div className="row">
                                    <div className="col-6">
                                        <Btn onClick={this.cancel} className="btn-block btn-cancel" title="Cancel" />
                                    </div>
                                    <div className="col-6">
                                        <Btn onClick={this.confirm} className="btn-block" title="OK" />
                                    </div>
                                </div>
                            :   null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>
    ({
        text: state.ui.confirm_alert.text,
        onConfirm: state.ui.confirm_alert.onConfirm,
        onCancel: state.ui.confirm_alert.onCancel,
        buttons: state.ui.confirm_alert.buttons,
    })

export default connect(mapStateToProps)(ConfirmAlert)