import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SIDE_MENU_LIST } from 'config'
import { history } from 'store'

class PublicHeader extends Component {

    handleClick = item => () => {
        if (item.link) {
            history.push(`/${item.link}`)
        }
    }

	renderMenuList = (item, i) => {
		return <div key={i} className="item-side-menu" onClick={this.handleClick(item)}>{item.title}</div>
	}

    render() {
        return (
            <div className="wrap-side-menu p-3 text-white">
	            {SIDE_MENU_LIST.map((item, i) => this.renderMenuList(item, i))}
            </div>
        );
    }
}

const mapStateToProps = state =>
    ({
        client: state.socket.client,
    })

export default connect(mapStateToProps)(PublicHeader)