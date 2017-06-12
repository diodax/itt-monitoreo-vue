export default [
  {
    name: 'Dashboard',
    link: '/dashboard',
    icon: 'fa-home',
  },
  {
    name: 'Users',
    link: '/user',
    icon: 'fa-user',
    child: [
    {
      name: 'New',
      link: '/user/new',
      icon: 'fa-circle-o',
    },
    {
      name: 'Lists',
      link: '/user/list',
      icon: 'fa-circle-o'
    }
    ]
  },
  {
    name: 'Settings',
    link: '/settings',
    icon: 'fa-cogs',
  }
]
