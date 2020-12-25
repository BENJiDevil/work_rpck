<?php
/* Remove .html */
/** @var xPDOTransport $transport */
/** @var array $options */
/** @var modX $modx */
if ($transport->xpdo) {
    $modx =& $transport->xpdo;
    switch ($options[xPDOTransport::PACKAGE_ACTION]) {
        case xPDOTransport::ACTION_INSTALL:
        case xPDOTransport::ACTION_UPGRADE:

            if ($type = $modx->getObject('modContentType', ['name' => 'HTML'])) {
                $type->set('file_extensions', '');
                $type->save();
            }
            $modx->log(modX::LOG_LEVEL_INFO, '.html removed');
            break;

        case xPDOTransport::ACTION_UNINSTALL:
            $success = true;
            break;
    }
}
return true;