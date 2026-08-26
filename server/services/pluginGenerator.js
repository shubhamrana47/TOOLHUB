import {
  createSlug,
  safeFunctionName,
  escapePHP,
  escapeHTML,
} from "../utils/pluginHelpers.js";

// =========================================================
// CREATE WORDPRESS PLUGIN FILES
// =========================================================

export const createPluginFiles = (
  pluginName,
  requirement,
  features
) => {
  // =======================================================
  // BASIC DATA
  // =======================================================

  const slug = createSlug(pluginName);

  const functionName =
    safeFunctionName(pluginName);

  const escapedPluginName =
    escapePHP(pluginName);

  const escapedRequirement =
    escapePHP(requirement);

  const featureList =
    Array.isArray(features)
      ? features
      : [];

  const featureText =
    featureList.length
      ? featureList
          .map(
            (feature) =>
              `- ${String(feature)}`
          )
          .join("\n")
      : "- Custom WordPress functionality";

  // =========================================================
  // MAIN PLUGIN FILE
  // =========================================================

  const mainPlugin = `<?php

/**
 * Plugin Name: ${escapedPluginName}
 * Plugin URI: https://example.com/
 * Description: AI generated WordPress plugin.
 * Version: 1.0.0
 * Author: WP AI Builder
 * Author URI: https://example.com/
 * License: GPL-2.0-or-later
 * Text Domain: ${slug}
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Plugin constants.
 */

define(
    '${functionName.toUpperCase()}_VERSION',
    '1.0.0'
);

define(
    '${functionName.toUpperCase()}_PATH',
    plugin_dir_path(__FILE__)
);

define(
    '${functionName.toUpperCase()}_URL',
    plugin_dir_url(__FILE__)
);

/**
 * Plugin initialization.
 */

function ${functionName}_init() {

    // Plugin initialization code.

}

add_action(
    'plugins_loaded',
    '${functionName}_init'
);

/**
 * Load admin functionality.
 */

require_once
    ${functionName.toUpperCase()}_PATH .
    'includes/class-admin.php';

/**
 * Load frontend functionality.
 */

require_once
    ${functionName.toUpperCase()}_PATH .
    'includes/class-frontend.php';

/**
 * Enqueue plugin assets.
 */

function ${functionName}_assets() {

    wp_enqueue_style(
        '${slug}-style',
        ${functionName.toUpperCase()}_URL .
        'assets/css/style.css',
        array(),
        ${functionName.toUpperCase()}_VERSION
    );

    wp_enqueue_script(
        '${slug}-script',
        ${functionName.toUpperCase()}_URL .
        'assets/js/script.js',
        array('jquery'),
        ${functionName.toUpperCase()}_VERSION,
        true
    );

}

add_action(
    'wp_enqueue_scripts',
    '${functionName}_assets'
);

add_action(
    'admin_enqueue_scripts',
    '${functionName}_assets'
);
`;

  // =========================================================
  // ADMIN CLASS
  // =========================================================

  const adminClass = `<?php

if (!defined('ABSPATH')) {
    exit;
}

class ${functionName}_Admin {

    /**
     * Constructor.
     */

    public function __construct() {

        add_action(
            'admin_menu',
            array(
                $this,
                'admin_menu'
            )
        );

    }

    /**
     * Add admin menu.
     */

    public function admin_menu() {

        add_menu_page(
            '${escapedPluginName}',
            '${escapedPluginName}',
            'manage_options',
            '${slug}',
            array(
                $this,
                'admin_page'
            ),
            'dashicons-admin-generic',
            25
        );

    }

    /**
     * Admin page.
     */

    public function admin_page() {

        if (!current_user_can('manage_options')) {
            return;
        }

        ?>

        <div class="wrap">

            <h1>
                ${escapedPluginName}
            </h1>

            <div class="notice notice-success">

                <p>
                    Plugin is installed and working successfully.
                </p>

            </div>

            <div class="card">

                <h2>
                    Plugin Requirement
                </h2>

                <p>
                    ${escapedRequirement}
                </p>

            </div>

            <div class="card">

                <h2>
                    Included Features
                </h2>

                <ul>

                    ${
                      featureList.length
                        ? featureList
                            .map(
                              (feature) =>
                                `<li>✓ ${escapeHTML(
                                  feature
                                )}</li>`
                            )
                            .join("\n")
                        : "<li>✓ Custom functionality</li>"
                    }

                </ul>

            </div>

        </div>

        <?php
    }
}

new ${functionName}_Admin();
`;

  // =========================================================
  // FRONTEND CLASS
  // =========================================================

  const frontendClass = `<?php

if (!defined('ABSPATH')) {
    exit;
}

class ${functionName}_Frontend {

    /**
     * Constructor.
     */

    public function __construct() {

        add_shortcode(
            '${slug}',
            array(
                $this,
                'shortcode'
            )
        );

    }

    /**
     * Shortcode.
     */

    public function shortcode(
        $atts = array(),
        $content = null
    ) {

        ob_start();

        ?>

        <div
            class="${slug}"
            data-plugin="${slug}"
        >

            <div class="${slug}-box">

                <h3>
                    ${escapedPluginName}
                </h3>

                <p>
                    Your custom WordPress plugin
                    is working successfully.
                </p>

            </div>

        </div>

        <?php

        return ob_get_clean();
    }
}

new ${functionName}_Frontend();
`;

  // =========================================================
  // CSS
  // =========================================================

  const css = `.${slug} {

    width: 100%;
    margin: 20px 0;

}

.${slug}-box {

    padding: 25px;

    background: #ffffff;

    border: 1px solid #e1e5ea;

    border-radius: 12px;

    box-shadow:
        0 5px 20px
        rgba(0, 0, 0, 0.05);

}

.${slug}-box h3 {

    margin: 0 0 10px;

    color: #1d2327;

    font-size: 22px;

}

.${slug}-box p {

    margin: 0;

    color: #646970;

    line-height: 1.6;

}
`;

  // =========================================================
  // JAVASCRIPT
  // =========================================================

  const javascript = `document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "${pluginName} loaded successfully."
        );

    }
);
`;

  // =========================================================
  // README
  // =========================================================

  const readme = `=== ${pluginName} ===

Contributors: wp-ai-builder

Tags: wordpress, plugin, ai

Requires at least: 5.8

Tested up to: 6.9

Requires PHP: 7.4

Stable tag: 1.0.0

License: GPLv2 or later

License URI: https://www.gnu.org/licenses/gpl-2.0.html

== Description ==

${requirement}

This plugin was generated using WP AI Builder.

== Features ==

${featureText}

== Installation ==

1. Download the plugin ZIP.
2. Go to WordPress Dashboard.
3. Open Plugins > Add New Plugin.
4. Click Upload Plugin.
5. Select the ZIP file.
6. Install and activate the plugin.

== Usage ==

Use the shortcode:

[${slug}]

== Version ==

1.0.0
`;

  // =========================================================
  // UNINSTALL
  // =========================================================

  const uninstall = `<?php

if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

/**
 * Plugin cleanup code.
 *
 * Add database cleanup here if required.
 */
`;

  // =========================================================
  // RETURN ALL PLUGIN FILES
  // =========================================================

  return {

    // Main plugin file
    [`${slug}/${slug}.php`]:
      mainPlugin,

    // Admin functionality
    [`${slug}/includes/class-admin.php`]:
      adminClass,

    // Frontend functionality
    [`${slug}/includes/class-frontend.php`]:
      frontendClass,

    // CSS
    [`${slug}/assets/css/style.css`]:
      css,

    // JavaScript
    [`${slug}/assets/js/script.js`]:
      javascript,

    // README
    [`${slug}/readme.txt`]:
      readme,

    // Uninstall
    [`${slug}/uninstall.php`]:
      uninstall,
  };
};