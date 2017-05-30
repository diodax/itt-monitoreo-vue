# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # Switched boxes due to this bug: https://github.com/mitchellh/vagrant/issues/6426#issuecomment-234977448
  config.vm.box = "ubuntu/precise64"

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine.
  # Add port-forward Sails.js application
  config.vm.network :forwarded_port, guest: 1337, host: 1337, auto_correct: true
  # Add port-forward for the MongoDB service
  config.vm.network :forwarded_port, guest: 27017, host: 27017, auto_correct: true
  # Add port-forward for webpack's vue-cli hot reload template
  config.vm.network :forwarded_port, guest: 8080, host: 8080, auto_correct: true

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: "192.168.33.10"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  config.vm.synced_folder ".", "/vagrant", create: true
  # Note: do not use /home/vagrant as the path for the guest, because the .ssh files are not accesible there.

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # VirtualBox:
  config.vm.provider :virtualbox do |vb|
    # Use VBoxManage to customize the VM. To change memory:
    vb.customize ["modifyvm", :id, "--memory", "1024"]
  end

  # Ovverrides the host locale to solve a bug with MongoDB
  # Source: http://askubuntu.com/questions/536875/error-in-installing-mongo-in-virtual-machine
  ENV['LC_ALL']="en_US.UTF-8"

  # Fixes the "==> default: stdin: is not a tty" error message
  # Source: http://foo-o-rama.com/vagrant--stdin-is-not-a-tty--fix.html
  config.vm.provision "fix-no-tty", type: "shell" do |s|
    s.privileged = false
    s.inline = "sudo sed -i '/tty/!s/mesg n/tty -s \\&\\& mesg n/' /root/.profile"
  end

  # Enable provisioning with Puppet stand alone.  Puppet manifests
  # are contained in a directory path relative to this Vagrantfile.
  config.vm.provision :puppet do |puppet|
    puppet.manifests_path = "puppet/manifests"
    puppet.module_path    = "puppet/modules"
    puppet.manifest_file  = "main.pp"
    puppet.options        = ['--verbose']
  end

  # Sets the timezone to America/Santo_Domingo (I live there, but it should be changed as needed)
  config.vm.provision "shell",
    inline: "export TZ=America/Santo_Domingo",
    run: "always"
end
