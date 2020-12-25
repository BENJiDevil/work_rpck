<?php
/* phone format (remover spaces) */
$phone = preg_replace('![^+0-9]+!', '', $val);
return $phone;