<?php
// Rename ht.access
if ($transport->xpdo) {
    /** @var modX $modx */
    $modx =& $transport->xpdo;
    $inroot = $modx->getOption('base_path') . 'ht.access';
    $incore = $modx->getOption('core_path') . 'ht.access';
    switch ($options[xPDOTransport::PACKAGE_ACTION]) {
        case xPDOTransport::ACTION_INSTALL:
        case xPDOTransport::ACTION_UPGRADE:
            if (file_exists($inroot) || file_exists($incore)) {
                $new_inroot = $modx->getOption('base_path') . '.htaccess';
                $new_incore = $modx->getOption('core_path') . '.htaccess';
                if (!file_exists($new_inroot)) {
                    rename($inroot, $new_inroot);
                    $modx->log(modX::LOG_LEVEL_INFO, 'Renaming htaccess in base');
                }
                if (!file_exists($new_incore)) {
                    rename($incore, $new_incore);
                    $modx->log(modX::LOG_LEVEL_INFO, 'Renaming htaccess in core');
                }
            }
            break;
        case xPDOTransport::ACTION_UNINSTALL:
            break;
    }
}
return true;