<?php
if((isset($_POST['phone_f'])&&$_POST['phone_f']!="")){
    $to = 'testorange@mail.ru';
    // $to = 'bbenjamin68@yandex.ru';
    $subject = 'Заполнена форма с сайта ЭкоКонсалтинг';
    $from_title = 'Заполнена форма с ЭкоКонсалтинг';
    $from_mail = 'landing@eko.ru';

    $message ='
		<html>
			<head>
				<title>'.$subject.'</title>
            </head>
			<body>
				<p>Форма: '.$_POST['nameForm'].'</p>
				<p>Имя: '.$_POST['name_f'].'</p>
                <p>Телефон: '.$_POST['phone_f'].'</p>                     
				<br>';

    if((isset($_POST['mail_f'])&&$_POST['mail_f']!="")){
        $message .='<p>Почта: '.$_POST['mail_f'].'</p>';
    }
    if((isset($_POST['com_type'])&&$_POST['com_type']!="")){
        $message .='<p>Тип связи: '.$_POST['com_type'].'</p>';
    }

    $message .='
            </body>
        </html>';
    $headers = "From: ".$from_title." <".$from_mail.">\r\n";
    $headers .= "Content-type: text/html; charset=utf-8 \r\n";
    mail($to, $subject , $message, $headers);
}