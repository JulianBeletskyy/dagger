export default {
    'public': [
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
    'private': [
        {
            'path': '/',
            'component': 'Main'
        },
    ]
}