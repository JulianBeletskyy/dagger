import React, { Component } from 'react'
import { connect } from 'react-redux'
import routing from 'config/route'
import { Route, Switch } from 'react-router-dom'
import * as pages from 'scenes'
import { history } from 'store'
import { setLocation } from 'actions/ui'
import Alert from 'components/alert'
import Modal from 'components/modal'
import 'react-table/react-table.css'
import './App.css'
import { setConnection, setStartPing } from 'actions'
import Layout from 'layouts'

class App extends Component {
    constructor(props) {
        super(props)
        const { dispatch } = props
        history.listen(({pathname}) => {
            dispatch(setLocation(pathname))
        })
        String.prototype.replaceAll = function(search, replacement) {
            return this.replace(new RegExp(search, 'g'), replacement)
        };
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

    renderRoutes = (route, i) => <Route key={i} path={route.path} exact component={pages[route.component]} />

    render() {
        const key = 'public'
        return (
            <div className="App">
                <Layout>
                    {
                       this.props.ready
                       ?    <Switch>
                                { routing[key].map((route, i) => this.renderRoutes(route, i)) }
                            </Switch>
                       :    null 
                    }
                    
                </Layout>
                <Alert />
                <Modal />
            </div>
        );
    }
}

const mapStateToProps = ({ui, socket: {connection, client, ready}}) =>
    ({
        ui: ui,
        connection: connection,
        client: client,
        ready: ready,
    })

export default connect(mapStateToProps)(App)