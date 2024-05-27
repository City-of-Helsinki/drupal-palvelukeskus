<?php

/**
 * @file
 * Contains site specific overrides.
 */

$additionalEnvVars = [
  'DRUPAL_VARNISH_HOST',
  'DRUPAL_VARNISH_PORT',
  'DRUPAL_PUBSUB_VAULT',
  'REDIS_HOST',
  'REDIS_PORT',
  'REDIS_PASSWORD',
  'SENTRY_DSN',
  'SENTRY_ENVIRONMENT',
];
foreach ($additionalEnvVars as $var) {
  $preflight_checks['environmentVariables'][] = $var;
}
