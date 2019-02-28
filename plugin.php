<?php
/**
 * Plugin Name: CLB Custom Block - Interactive Cards
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: Creates interactive cards. A custom Gutenberg plugin created via create-guten-block.
 * Author: Chris Liu-Beers
 * Author URI: https://www.tomatillodesign.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
