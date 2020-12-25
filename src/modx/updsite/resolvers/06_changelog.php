<?php
// Delete changelog.txt
if ($transport->xpdo) {
	/** @var modX $modx */
	$modx =& $transport->xpdo;
    switch ($options[xPDOTransport::PACKAGE_ACTION]) {
		case xPDOTransport::ACTION_INSTALL:
		case xPDOTransport::ACTION_UPGRADE:
		    $file = $modx->getOption('core_path') . 'docs/changelog.txt';
			if (file_exists($file)) {
			    $modx->log(modX::LOG_LEVEL_INFO, 'changelog.txt removed');
			    unlink($file);
			}
			break;

		case xPDOTransport::ACTION_UNINSTALL:
			break;
	}
}
return true;