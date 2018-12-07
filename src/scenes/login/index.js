import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from 'components/inputs/TextField'
import Btn from 'components/buttons/Btn'
import { setAlert } from 'actions/ui'
import { LOGIN, PASSWORD } from 'config'
import { login } from 'actions'

class Login extends Component {
	handleSubmit = e => {
		e.preventDefault()
        const { dispatch } = this.props
        if (this.login.value === LOGIN && this.password.value === PASSWORD) {
            dispatch(login())
            return
        }
        dispatch(setAlert('Email or Password is incorrect', 'error'))
	}

    render() {
        return (
            <div className="h-100 d-flex justify-content-center align-items-center">
                <Card>
                    <CardContent>
                    	<form className="text-center" style={{minWidth: 300}} onSubmit={this.handleSubmit} noValidate={true}>
                    		<div className="form-group w-100">
                    			<TextField inputRef={ref => this.login = ref} className="w-100" label="Login" />
                			</div>
                			<div className="form-group">
                    			<TextField inputRef={ref => this.password = ref} className="w-100" label="Password" type="password" />
                			</div>
                			<div className="form-group">
                    			<Btn title="Login" className="mb-2" type="submit" />
                			</div>
                    	</form>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default connect()(Login)