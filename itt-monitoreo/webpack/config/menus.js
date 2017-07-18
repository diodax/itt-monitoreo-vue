export default [{
    name: 'Dashboard',
    link: '/dashboard',
    icon: 'fa-home',
    roles: ['registered']
  },
  {
    name: 'Appointments',
    link: '/appointment',
    icon: 'fa-edit',
    roles: ['doctor', 'patient', 'relative'],
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
    roles: ['admin'],
    child: [{
      name: 'New',
      link: '/user/add',
      icon: 'fa-circle-o',
    }, ]
  },
  {
    name: 'Prescriptions',
    link: '/prescription',
    icon: 'fa-stethoscope',
    roles: ['doctor'],
    child: [{
      name: 'New',
      link: '/prescription/add',
      icon: 'fa-circle-o',
    }, ]
  },
  // {
  //   name: 'Settings',
  //   link: '/settings',
  //   icon: 'fa-cogs',
  // }
];
