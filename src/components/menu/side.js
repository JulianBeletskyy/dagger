import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SIDE_MENU_LIST } from 'config'
import { history } from 'store'
import { toggleConfirmAlert } from 'actions/ui'
import { setConnection } from 'actions'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

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
        return  <ListItem 
                    key={i}
                    button
                    onClick={this.handleClick(item)}
                    selected={item.link === location}>
                    <ListItemText primary={item.title} />
                </ListItem>
	}

    render() {
        console.log(this.props)
        return (
            <List component="nav">
                { SIDE_MENU_LIST.map((item, i) => this.renderMenuList(item, i)) }
            </List>
        );
    }
}

const mapStateToProps = state =>
    ({
        client: state.socket.client,
        location: state.ui.location,
    })

export default connect(mapStateToProps)(PublicHeader)