<?php
$menus = array(
    'Base of blocks' => array(
        'text' => 'Base of blocks',
        'parent' => 'topnav',
        'action' => 'resource/update',
        'description' => '',
        'icon' => '',
        'menuindex' => 4,
        'params' => '',
        'handler' => '',
        'permissions' => '',
        'namespace' => 'core' 
    ),
);

if ($transport->xpdo) {
    /* @var modX $modx */
    $modx =& $transport->xpdo;

    switch ($options[xPDOTransport::PACKAGE_ACTION]) {
        case xPDOTransport::ACTION_INSTALL:
        case xPDOTransport::ACTION_UPGRADE:
            foreach($menus as $name => $value) {
                // get resource id for params parameter
                if($r = $modx->getObject('modResource', array('pagetitle' => $name))) {
                    $value['params'] = "&id={$r->get('id')}";
                    if (!$menu = $modx->getObject('modMenu', array('text' => $name))) {
                        $menu = $modx->newObject('modMenu');
                        $menu->set('text', $name);
                    }
                    $menu->fromArray($value);
                    $menu->save();
                }
            }
            $modx->log(modX::LOG_LEVEL_INFO, 'Menu updated');
            break;
        case xPDOTransport::ACTION_UNINSTALL:
            break;
    }
}
return true;