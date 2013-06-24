<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'veerkamp_wordpress');

/** MySQL database username */
define('DB_USER', 'veerkamp');

/** MySQL database password */
define('DB_PASSWORD', 'TF*X6j>9q9t');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '|-+-AxQ[^%- ^R;is%`}QO*,4U76 (#XW1F2G%+Wm([9&6(`~w(8B[b!,Eh@Jq|?');
define('SECURE_AUTH_KEY',  '[,]+t.6Zr3POZC,BW_L)o<9=5^iqI8#9@W^}EMB/{RW23i+YT+C+Z!S+ur( W,KP');
define('LOGGED_IN_KEY',    '+So~QDH/Uu@V!s;-J@:yTd]4P&s6 UEN{+XDLSVHo3DuEK5d|L<<N%e>?k9PKn&}');
define('NONCE_KEY',        'N;DP<LP>``2CM~]-&I3VHB{frLqP3<6s?,UC;H9KoCK~n[k<2-4a* v2x_+Z (LG');
define('AUTH_SALT',        'XRId6SZPcT+!dk-/FAs@T:-:U{Z5C0~H?S!~CPK#AU;9l0Xhds*V4k@g0v*>s<Mk');
define('SECURE_AUTH_SALT', 'vb{pul@.)-Tl+l&{]TpA:GM.-i{M>^j*?aiSI7K-MKZ;,t)5#_Xi|jb||jZf<%*1');
define('LOGGED_IN_SALT',   'p&@?VnKq<(JD@`C_<j9#DP+PP6bWiKxz+Qzy~5sP|*oT>_r@N+B=;8|*6ld7S3Z:');
define('NONCE_SALT',       '8nTTDZ?KU5g%IskGe?m<<`a]< :KqQ3+IpO_k):qb$A^+tctY#`8Rrk 7FZ8}z0k');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
