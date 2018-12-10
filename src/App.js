import React, { Component } from 'react'
import { connect } from 'react-redux'
import routing from 'config/route'
import { Route, Switch, Redirect } from 'react-router-dom'
import * as pages from 'scenes'
import { history } from 'store'
import { setLocation } from 'actions/ui'
import Alert from 'components/alert'
import Modal from 'components/modal'
import 'react-table/react-table.css'
import 'highlight.js/styles/github.css'
import './App.css'
import { setStartPing } from 'actions'
import Layout from 'layouts'
import { setClient } from 'actions'
import { responseHandler, onOpen } from 'api'
import { HOST } from 'config'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

const theme = createMuiTheme({
    palette: {
        primary: blue,
    }
})

class App extends Component {
    constructor(props) {
        super(props)
        const { dispatch } = props
        history.listen(({pathname}) => {
            dispatch(setLocation(pathname))
        })
    }

    startPing = () => {
        const { dispatch, client } = this.props
        setInterval(() => {
            const id = client.ping()
            dispatch(setStartPing(id, new Date()))
        }, 1000)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ready && nextProps.ready !== this.props.ready) {
            this.startPing()
        }
    }

    renderRoutes = (route, i) => <Route key={i} path={route.path} name={route.name} exact component={pages[route.component]} />

    componentDidMount() {
        const { dispatch } = this.props
        const client = new window.globalClient(HOST, onOpen, responseHandler)
        dispatch(setClient(client))
    }

    render() {
        const { token } = this.props
        const key = token ? 'private' : 'public'
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    {
                        token
                        ?   <Layout>
                                {
                                   this.props.ready
                                   ?    <Switch>
                                            { routing[key].map((route, i) => this.renderRoutes(route, i)) }
                                        </Switch>
                                   :    null 
                                }
                            </Layout>
                        :   <Switch>
                                { routing[key].map((route, i) => this.renderRoutes(route, i)) }
                                <Redirect to={'/'}/>
                            </Switch>
                    }
                    <Alert />
                    <Modal />
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = ({ui, user, socket: {connection, client, ready}}) =>
    ({
        ui: ui,
        connection: connection,
        client: client,
        ready: ready,
        token: user.token,
    })

export default connect(mapStateToProps)(App)