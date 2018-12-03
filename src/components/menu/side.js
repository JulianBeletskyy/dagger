import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SIDE_MENU_LIST } from 'config'
import { history } from 'store'
import { toggleConfirmAlert } from 'actions/ui'
import { setConnection } from 'actions'

class PublicHeader extends Component {

    handleClick = item => () => {
        if (item.link) {
            history.push(`/${item.link}`)
        } else {
            const { dispatch } = this.props
            dispatch(toggleConfirmAlert(true, 'Are you sure you want to restart the server?', this.handleConfirm))
        }
    }

    handleConfirm = () => {
        const { client, dispatch } = this.props
        client.shutdown()
        dispatch(setConnection(false))
        dispatch(toggleConfirmAlert(true, 'Please wait a few seconds and refresh this page', null, null, false))
    }

	renderMenuList = (item, i) => {
        const [,location] = history.location.pathname.split('/')
		return <div key={i} className={`item-side-menu ${item.link === location ? 'active' : ''}`} onClick={this.handleClick(item)}>{item.title}</div>
	}

    render() {
        return (
            <div className="wrap-side-menu p-3 text-white">
	            { SIDE_MENU_LIST.map((item, i) => this.renderMenuList(item, i)) }
            </div>
        );
    }
}

const mapStateToProps = state =>
    ({
        client: state.socket.client,
        location: state.ui.location,
    })

export default connect(mapStateToProps)(PublicHeader)