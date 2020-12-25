<?php
// templates
$templates_array = [
    'BaseTemplate' => [
        'file' => 'index',
        'description' => 'Шаблон главной страницы',
        'icon' => 'icon-home'
    ],
    '404' => [
        'file' => '404',
        'description' => 'Шаблон 404 страницы',
        'icon' => 'icon-lock'
    ],
    'Текстовая страница' => [
        'file' => 'simple',
        'description' => 'Шаблон текстовой страницы',
        'icon' => 'icon-file-text'
    ]
];
// resources
$resources_array = [
    'web' => [
        'index' => [
            'pagetitle' => 'Главная',
            'template' => 1,
            'hidemenu' => false,
            'published' => true,
            'menuindex' => 0,
            'richtext' => true
        ],
        'webservices' => [
            'pagetitle' => 'Служебные страницы',
            'template' => 0,
            'hidemenu' => true,
            'published' => false,
            'alias_visible' => false,
            'menuindex' => 999,
            'resources' => [
                '404' => [
                    'pagetitle' => '404',
                    'template' => 2,
                    'hidemenu' => true,
                    'uri' => '404',
                    'uri_override' => true,
                    'richtext' => false,
                    'content' => '<p>К сожалению, по Вашему запросу ничего не найдено.</p>'
                ],
                'sitemap_html' => [
                    'pagetitle' => 'Карта сайта HTML',
                    'alias' => 'sitemap',
                    'template' => 0,
                    'hidemenu' => true,
                    'published' => false,
                    'uri' => 'sitemap',
                    'uri_override' => true,
                    'richtext' => false,
                    'content' => '[[pdoMenu? &parents=`-2` &fastMode=`1`]]'
                ],
                'sitemap_xml' => [
                    'pagetitle' => 'Карта сайта XML',
                    'template' => 0,
                    'hidemenu' => true,
                    'uri' => 'sitemap.xml',
                    'uri_override' => true,
                    'content_type' => 2,
                    'richtext' => false,
                    'cacheable' => false,
                    'content' => '[[!StercSeoSiteMap? &templates=`-0,-2,-3`]]'
                ],
            ],
        ],
    ],
];
// plugins
$plugins_array = [
    // Disable uploading files to the root directory
    'uploadFiles' => [
        'file' => 'uploadfiles',
        'description' => 'Запрещает загрузку файлов в корневой каталог',
        'events' => [
            'OnFileManagerUpload' => []
        ]
    ],
];
// settings
$settings_array = [
    // main settings
    'friendly_alias_realtime' => [
        'key' => 'friendly_alias_realtime',
        'xtype' => 'combo-boolean',
        'value' => true,
        'namespace' => 'core',
        'area' => 'furls',
    ],
    'friendly_urls' => [
        'key' => 'friendly_urls',
        'xtype' => 'combo-boolean',
        'value' => true,
        'namespace' => 'core',
        'area' => 'furls',
    ],
    'friendly_urls_strict' => [
        'key' => 'friendly_urls_strict',
        'xtype' => 'combo-boolean',
        'value' => true,
        'namespace' => 'core',
        'area' => 'furls',
    ],
    'use_alias_path' => [
        'key' => 'use_alias_path',
        'xtype' => 'combo-boolean',
        'value' => true,
        'namespace' => 'core',
        'area' => 'furls',
    ],
    'use_frozen_parent_uris' => [
        'key' => 'use_frozen_parent_uris',
        'xtype' => 'combo-boolean',
        'value' => true,
        'namespace' => 'core',
        'area' => 'furls',
    ],
    'friendly_alias_translit' => [
        'key' => 'friendly_alias_translit',
        'xtype' => 'textfield',
        'value' => 'russian',
        'namespace' => 'core',
        'area' => 'furls',
    ],
    'resource_tree_node_name' => [
        'key' => 'resource_tree_node_name',
        'xtype' => 'textfield',
        'value' => 'menutitle',
        'namespace' => 'core',
        'area' => 'manager',
    ],
    'resource_tree_node_tooltip' => [
        'key' => 'resource_tree_node_tooltip',
        'xtype' => 'textfield',
        'value' => 'alias',
        'namespace' => 'core',
        'area' => 'manager',
    ],
    'link_tag_scheme' => [
        'key' => 'link_tag_scheme',
        'xtype' => 'textfield',
        'value' => 'abs',
        'namespace' => 'core',
        'area' => 'site',
    ],
    'site_start' => [
        'key' => 'site_start',
        'xtype' => 'textfield',
        'value' => '1',
        'namespace' => 'core',
        'area' => 'site',
    ],
    'error_page' => [
        'key' => 'error_page',
        'xtype' => 'textfield',
        'value' => '3',
        'namespace' => 'core',
        'area' => 'site',
    ],
    'log_deprecated' => [
        'key' => 'log_deprecated',
        'xtype' => 'combo-boolean',
        'value' => false,
        'namespace' => 'core',
        'area' => 'system',
    ],
    'default_per_page' => [
        'key' => 'default_per_page',
        'xtype' => 'textfield',
        'value' => '50',
        'namespace' => 'core',
        'area' => 'manager'
    ],
    // fix locale
    'locale' => [
        'key' => 'locale',
        'xtype' => 'textfield',
        'value' => 'en_US.UTF-8',
        'namespace' => 'core',
        'area' => 'language',
    ],
    // pdotools settings
    'pdotools_fenom_default' => [
        'key' => 'pdotools_fenom_default',
        'xtype' => 'combo-boolean',
        'value' => true,
        'namespace' => 'pdotools',
        'area' => 'pdotools_main',
    ],
    'pdotools_fenom_modx' => [
        'key' => 'pdotools_fenom_modx',
        'xtype' => 'combo-boolean',
        'value' => true,
        'namespace' => 'pdotools',
        'area' => 'pdotools_main',
    ],
    'pdotools_fenom_parser' => [
        'key' => 'pdotools_fenom_parser',
        'xtype' => 'combo-boolean',
        'value' => true,
        'namespace' => 'pdotools',
        'area' => 'pdotools_main',
    ],
    'pdotools_elements_path' => [
        'key' => 'pdotools_elements_path',
        'xtype' => 'textfield',
        'value' => '{core_path}elements/',
        'namespace' => 'pdotools',
        'area' => 'pdotools_main',
    ],
    // ace settings
    'ace.font_size' => [
        'key' => 'ace.font_size',
        'xtype' => 'textfield',
        'value' => '18px',
        'namespace' => 'ace',
        'area' => 'general',
    ],
    'ace.theme' => [
        'key' => 'ace.theme',
        'xtype' => 'textfield',
        'value' => 'monokai',
        'namespace' => 'ace',
        'area' => 'general',
    ],
    // admin tools settings
    'admintools_theme' => [
        'key' => 'admintools_theme',
        'xtype' => 'textfield',
        'value' => 'dark',
        'namespace' => 'admintools',
        'area' => 'admintools_main',
    ],
    // client config settings
    'clientconfig.context_aware' => [
        'key' => 'clientconfig.context_aware',
        'xtype' => 'combo-boolean',
        'value' => true,
        'namespace' => 'clientconfig',
        'area' => 'Default',
    ],
    'clientconfig.vertical_tabs' => [
        'key' => 'clientconfig.vertical_tabs',
        'xtype' => 'combo-boolean',
        'value' => true,
        'namespace' => 'clientconfig',
        'area' => 'Default',
    ],
    // tinymce setings
    'tinymcerte.valid_elements' => [
        'key' => 'tinymcerte.valid_elements',
        'xtype' => 'textfield',
        'value' => '+*[*]',
        'namespace' => 'tinymcerte',
        'area' => 'default',
    ]
];
// packages
// settings in /resolvers/01_setup.php
