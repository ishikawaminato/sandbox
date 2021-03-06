from fabric.api import sudo, cd, env, local
from cuisine import package_ensure, select_package, dir_exists
from fabtools import git

select_package("yum")

def app1():
  env.hosts = ["192.168.1.10"]
  env.user = "vagrant"
  env.key_filename = "./.vagrant/machines/app1/virtualbox/private_key"

def app2():
  env.hosts = ["192.168.1.20"]
  env.user = "vagrant"
  env.key_filename = "./.vagrant/machines/app2/virtualbox/private_key"

def deploy(dir="/tmp", repo="70-10/node-boilerplate"):
  package_ensure("git")
  if not dir_exists(dir + "/" + repo):
    with cd(dir):
      git.clone("https://github.com/" + repo, path=repo)

