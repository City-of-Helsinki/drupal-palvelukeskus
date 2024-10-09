# Your Drupal 9 project

Description of your project.

## Environments

Env | Branch | Drush alias | URL
--- | ------ | ----------- | ---
development | main | - | https:///drupal-palvelukeskus.docker.so/
test        | dev  | - | https://helfi-palvelukeskus-drupal-test.agw.arodevtest.hel.fi
main  | prod | - | https://palvelukeskus.hel.fi/fi

## Requirements

You need to have these applications installed to operate on all environments:

- [Docker](https://github.com/druidfi/guidelines/blob/master/docs/docker.md)
- [Stonehenge](https://github.com/druidfi/stonehenge)
- For the new person: Your SSH public key needs to be added to servers

## Create and start the environment

For the first time (new project):

``
$ make new
``

And following times to start the environment:

``
$ make up
``

Create site based on database export:
``
$ make fresh
``

## Login to Drupal container

This will log you inside the app container:

```
$ make shell
```
