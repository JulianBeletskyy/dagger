export default {
    'private': [
        {
            'path': '/',
            'component': 'Main'
        }, {
            'path': '/commitsets',
            'component': 'Commitsets'
        }, {
            'path': '/commitset/:commitset',
            'component': 'Commitset'
        }, {
            'path': '/commits',
            'component': 'Commits'
        }, {
            'path': '/commit/:commit',
            'component': 'Commit'
        }, {
            'path': '/callable/:callable',
            'component': 'Callable'
        }, {
            'path': '/build-commit',
            'component': 'BuildCommit'
        }, {
            'path': '/workers',
            'component': 'Workers',
        }, {
            'path': '/worker/:worker_id',
            'component': 'Worker'
        }, {
            'path': '/workers-logs',
            'component': 'WorkersLogs',
        }, {
            'path': '/nodes',
            'component': 'Nodes'
        }, {
            'path': '/node/:id',
            'component': 'Node'
        }, {
            'path': '*',
            'component': 'NotFound'
        },
    ],
    'public': [
        {
            'path': '/',
            'component': 'Login'
        },
    ]
}