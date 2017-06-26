export default [{
    name: 'Dashboard',
    link: '/dashboard',
    icon: 'fa-home',
  },
  {
    name: 'Appointments',
    link: '/appointment',
    icon: 'fa-edit',
    child: [{
      name: 'New',
      link: '/appointment/add',
      icon: 'fa-circle-o',
    }]
  },
  {
    name: 'Users',
    link: '/user',
    icon: 'fa-user',
    child: [{
      name: 'New',
      link: '/user/create',
      icon: 'fa-circle-o',
    }, ]
  },
  {
    name: 'Settings',
    link: '/settings',
    icon: 'fa-cogs',
  }
];
