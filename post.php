<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    require 'PHPMailer/PHPMailer.php';
    require 'PHPMailer/SMTP.php';

	/* main__form */
    $response = '';
    $errors = array();

	if($_POST['main__form_name'] == '')   $errors[] = 'Поле необходимо заполнить';
	if($_POST['main__form_phone'] == '')   $errors[] = 'Поле необходимо заполнить';
 
    // если форма без ошибок
    if(empty($errors)){
        $message  = '<h2>Новая заявка на сайте Хамелеон-потолки.РФ</h2>';
        $message .= '<p><b>Имя:</b>&nbsp;'.$_POST['main__form_name'].'</p>';
        $message .= '<p><b>Телефон:</b>&nbsp;'.$_POST['main__form_phone'].'</p>';
        $message .= '<p><b>Отправлено из блока:</b>&nbsp;'.$_POST['main__form_block'].'</p>';
        $message .= '<p><b>Кнопка:</b>&nbsp;'.$_POST['main__form_btn'].'</p><br />';

        $message .= '<p><b>Ширина, м:</b>&nbsp;'.$_POST['main__form_width'].'</p>';
        $message .= '<p><b>Длина, м:</b>&nbsp;'.$_POST['main__form_length'].'</p>';
        $message .= '<p><b>Площадь, м:<sup>2</sup></b>&nbsp;'.$_POST['main__form_square'].'</p>';
        $message .= '<p><b>Тип:</b>&nbsp;'.$_POST['main__form_type'].'</p>';
        $message .= '<p><b>Количество углов:</b>&nbsp;'.$_POST['main__form_angles'].'</p>';
        $message .= '<p><b>Количество светильников:</b>&nbsp;'.$_POST['main__form_lamps'].'</p><br />';

        $message .= '<p><b>IP адрес отправителя:</b>&nbsp;'.$_SERVER['REMOTE_ADDR'].'</p>';
        $message .= '<p>Отправитель пришел на сайт по ссылке&nbsp;<b>'.getenv('HTTP_REFERER').'</b></p>';
        $message .= '<p><b>Дата и время:</b>&nbsp;'.date( 'd.m.Y - H:i' ).'</p>';
		
        send_mail($message);

        $response = 'success';

    } else {
        $response = 'error';
		/*
        foreach($errors as $errors__item){
            $response .= $errors__item.PHP_EOL;
        }
		*/
    }
 
    echo json_encode(array(
        'result' => $response
    ));

    function send_mail($message){

//        $to='Xameleon.potolki@yandex.ru, it@potolki-na-donu.ru';
//		$subject='Новая заявка на сайте хамелеон-потолки.рф';
//
//		$headers= "MIME-Version: 1.0\r\n";
//		$headers .= "Content-type: text/html; charset=utf-8\r\n";
//		$headers .= "From: noreplay <tech.messages.mailbox@gmail.com>\r\n";
//        mail($to, $subject, $message, $headers);
        $mail = new PHPMailer();
        $mail->isSMTP();                   // Отправка через SMTP
        $mail->Host   = 'smtp.yandex.ru';  // Адрес SMTP сервера
        $mail->SMTPAuth   = true;          // Enable SMTP authentication
        $mail->Username   = 'directxameleon@yandex.ru';       // ваше имя пользователя (без домена и @)
        $mail->Password   = 'irigqdwiaqtbnxpf';    // ваш пароль teceaaozxirvguuk
        $mail->SMTPSecure = 'ssl';         // шифрование ssl
        $mail->Port   = 465;               // порт подключения

        $mail->setFrom('directxameleon@yandex.ru', 'directxameleon@yandex.ru');    // от кого
        $mail->addAddress('directxameleon@yandex.ru', 'directxameleon@yandex.ru'); // кому
        $mail->CharSet = 'UTF-8';
        $mail->Subject = 'Новая заявка на сайте Хамелеон-потолки.РФ';
        $mail->msgHTML($message);
        // Отправляем
        $mail->send();
    }

?>