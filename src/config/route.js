export default {
    'public': [
        {
            'path': '/',
            'component': 'Main'
        }, {
            'path': '/commits',
            'component': 'Commits'
        }, {
            'path': '/workers',
            'component': 'Workers',
        }, {
            'path': '/nodes',
            'component': 'Nodes'
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