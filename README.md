# Palvelukeskus

This project contains Drupal website for Palvelukeskus Helsinki.

## Environments

Env         | Branch    | Drush alias | URL
----------- | --------- | ----------- | ---
development | dev       | -           | https:///drupal-palvelukeskus.docker.so/
test        | dev       | -           | https://palvelukeskus.test.hel.fi/fi
stage       | main      | -           | https://palvelukeskus.stage.hel.fi/fi
main        | tag-based | -           | https://palvelukeskus.hel.fi/fi

## Requirements

You need to have these applications installed to operate on all environments:

- [Docker](https://github.com/druidfi/guidelines/blob/master/docs/docker.md)
- [Stonehenge](https://github.com/druidfi/stonehenge)

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
