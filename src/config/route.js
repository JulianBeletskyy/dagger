export default {
    'public': [
        {
            'path': '/',
            'component': 'Main'
        }, {
            'path': '/commitsets',
            'component': 'Commitsets'
        }, {
            'path': '/commitset',
            'component': 'Commitset'
        }, {
            'path': '/commits',
            'component': 'Commits'
        }, {
            'path': '/commit',
            'component': 'Commit'
        }, {
            'path': '/workers',
            'component': 'Workers',
        }, {
            'path': '/nodes',
            'component': 'Nodes'
        },  {
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