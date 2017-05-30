class apt-update {
    exec { "aptGetUpdate":
        command => "sudo apt-get update",
        path => ["/bin", "/usr/bin"]
    }
}

class othertools {
    package { "git":
        ensure => latest,
        require => Exec["aptGetUpdate"]
    }

    package { "vim-common":
        ensure => latest,
        require => Exec["aptGetUpdate"]
    }

    package { "curl":
        ensure => present,
        require => Exec["aptGetUpdate"]
    }

    package { "g++":
        ensure => present,
        require => Exec["aptGetUpdate"]
    }
}

class nodejs {
  file { '/vagrant':
    ensure => 'directory',
  }

  exec { "git-clone-n":
    command => "git clone https://github.com/tj/n.git /home/n",
    creates => '/home/n/Makefile',
    path => ["/bin", "/usr/bin"],
    require => [Exec["aptGetUpdate"], Package["git"], Package["curl"], Package["g++"]],
    logoutput => true
  }

  exec { "install-n":
    command => "make install",
    path => ["/bin", "/usr/bin"],
    cwd => "/home/n",
    require => Exec["git-clone-n"],
    logoutput => true
  }

  exec { "install-node":
    command => "n latest",
    path => ["/bin", "/usr/bin", "/usr/local/bin"],
    require => [Exec["git-clone-n"], Exec["install-n"]],
    logoutput => true
  }

  exec { "npm-update":
    command => "npm -g update",
    path => ["/usr/bin", "/bin", "/usr/sbin", "/sbin", "/usr/local/bin", "/usr/local/sbin"],
    require => [Exec["install-node"], File['/vagrant']],
    logoutput => true
  }

  exec { "npm-bower":
    command => "sudo npm -g install bower",
    path => ["/usr/bin", "/bin", "/usr/sbin", "/sbin", "/usr/local/bin", "/usr/local/sbin"],
    require => [Exec["install-node"], File['/vagrant'], Exec["npm-update"]],
    logoutput => true
  }

  exec { "npm-sails":
    command => "sudo npm -g install sails",
    path => ["/usr/bin", "/bin", "/usr/sbin", "/sbin", "/usr/local/bin", "/usr/local/sbin"],
    require => [Exec["install-node"], File['/vagrant'], Exec["npm-update"]],
    logoutput => true
  }
}

class mongodb {
  class {'::mongodb::globals':
    manage_package_repo => true
  }->

  class {'::mongodb::server':
    port    => 27017,
    bind_ip => ['0.0.0.0'],
    verbose => true,
    ensure  => "present"
  }->

  class {'::mongodb::client': }
}

include apt-update
include othertools
include nodejs
include mongodb
