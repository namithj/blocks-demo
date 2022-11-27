<?php
/**
 * Plugin Name: Blocks Demo
 * Plugin URI:
 * Description: This plugin is created for WordPress Meetup 27-11-2022.
 * Version: 1.0.0
 * Author: Namith Jawahar
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load translations for the plugin from the /languages/ folder.
 */
add_action(
	'init',
	function() {
		load_plugin_textdomain( 'blocks-demo', false, basename( __DIR__ ) . '/languages' );
	}
);

/**
 * Create a new category to hold our custom block(s).
 */
add_filter(
	'block_categories',
	function( $categories, $post ) {
		if ( ! in_array( $post->post_type, [ 'post', 'page' ], true ) ) {
			return $categories;
		}
		return array_merge(
			$categories,
			[
				[
					'slug'  => 'blocks-demo',
					'title' => __( 'Blocks Demo', 'blocks-demo' ),
					'icon'  => 'category',
				],
			]
		);
	},
	10,
	2
);

/**
 * Register all block assets (Scripts and Styles).
 */
add_action(
	'init',
	function() {
		/**
		 * Return without action if the block editor is not active.
		 */
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		/**
		 * Register the main block Script.
		 */
		wp_register_script(
			'blocks-demo-script',
			plugins_url( 'build/main.js', __FILE__ ),
			[ 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ],
			filemtime( str_replace( '/', DIRECTORY_SEPARATOR, plugin_dir_path( __FILE__ ) . 'build/main.js' ) ),
			false
		);

		/**
		 * Register the block specific stylesheet for the editor.
		 */
		wp_register_style(
			'blocks-demo-editor-styles',
			plugins_url( 'assets/css/editor.css', __FILE__ ),
			[ 'wp-edit-blocks' ],
			filemtime( str_replace( '/', DIRECTORY_SEPARATOR, plugin_dir_path( __FILE__ ) . 'assets/css/editor.css' ) )
		);

		/**
		 * Register the block specific stylesheet for the frontend.
		 */
		wp_register_style(
			'blocks-demo-styles',
			plugins_url( 'assets/css/style.css', __FILE__ ),
			[],
			filemtime( str_replace( '/', DIRECTORY_SEPARATOR, plugin_dir_path( __FILE__ ) . 'assets/css/style.css' ) )
		);

		/**
		 * Register the Static block and specify the script and style files to look for plus other parameters.
		 */
		register_block_type(
			'blocks-demo/visiting-card',
			[
				'editor_script' => 'blocks-demo-script',
				'editor_style'  => 'blocks-demo-editor-styles',
				'style'         => 'blocks-demo-styles',
			]
		);

		/**
		 * Register the Dynamic block and specify the script and style files to look for plus other parameters.
		 */
		register_block_type(
			'blocks-demo/recent-posts',
			[
				'editor_script'   => 'blocks-demo-script',
				'editor_style'    => 'blocks-demo-editor-styles',
				'style'           => 'blocks-demo-styles',
				'render_callback' => 'block_demo_dynamic_render_callback',
			]
		);

		/**
		 * Dynamic rendering for the block.
		 *
		 * @return string The HTML outfor of the block.
		 */
		function block_demo_dynamic_render_callback() {
			$posts  = get_posts(
				[
					'numberposts' => 5,
					'fields'      => 'ids',
				]
			);
			$output = '';
			if ( isset( $posts ) && ( 0 < count( $posts ) ) ) {
				$output = '<ul>';
				foreach ( $posts as $post ) {
					$output .= '<li><a href="' . get_the_permalink( $post ) . '">' . get_the_title( $post ) . '</a></li>';
				}
				$output .= '</ul>';
			} else {
				$output = '<p>Posts not found.</p>';
			}
			return $output;
		}

		/**
		* Add translations to the block main script if internationalisation present.
		*/
		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations( 'blocks-demo-script', 'blocks-demo', plugin_dir_path( __FILE__ ) . '/languages' );
		}

	}
);
