<?php

declare(strict_types=1);

namespace Drupal\helfi_palvelukeskus_genesys\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a block for genesys chat.
 *
 * @Block(
 *   id = "helfi_palvelukeskus_genesys_block",
 *   admin_label = @Translation("Palvelukeskus Genesys chat")
 * )
 */
class GenesysBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    return [
      '#attached' => [
        'library' => ['helfi_palvelukeskus_genesys/genesys'],
      ],
    ];
  }

}
