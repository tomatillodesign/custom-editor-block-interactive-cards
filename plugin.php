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



/* Enqueue Bootstrap Modal JS and CSS */
add_action( 'wp_enqueue_scripts', 'clb_enqueue_custom_cardset_scripts' );
function clb_enqueue_custom_cardset_scripts() {

          wp_enqueue_script( 'clb-cardset-flip-height', plugin_dir_url( __FILE__ ) . 'js/clb-cardset-flip-height.js', array('jquery'), '1.0.0', true );

}
