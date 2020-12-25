<?php
// add repository modstore.pro.
$provider_name = 'modstore.pro';
if ($transport->xpdo) {
	/* @var modX $modx */
	$modx =& $transport->xpdo;

	switch ($options[xPDOTransport::PACKAGE_ACTION]) {
		case xPDOTransport::ACTION_INSTALL:
		case xPDOTransport::ACTION_UPGRADE:
		    
			if (!$provider = $modx->getObject('transport.modTransportProvider', array('service_url:LIKE' => '%' . $provider_name . '%'))) {
				$provider = $modx->newObject('transport.modTransportProvider', array(
					'name' => $provider_name,
					'service_url' => 'https://' . $provider_name . '/extras/',
					'username' => !empty($options['email']) && preg_match('/.+@.+\..+/i', $options['email']) ? trim($options['email']) : '',
					'api_key' => !empty($options['key']) ? trim($options['key']) : '',
					'description' => 'Repository of ' . $provider_name,
					'created' => time(),
				));
				$provider->save();
			}
            $modx->log(modX::LOG_LEVEL_INFO, 'Repository added');
			break;
		case xPDOTransport::ACTION_UNINSTALL:
			break;
	}
}
return true;