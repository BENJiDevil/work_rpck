{'!AjaxForm' | snippet : [
      'snippet' => 'FormIt',
      'hooks' => 'FormItSaveForm, email',
      'form' => 'tpl_form_name',
      'emailTpl' => 'tpl_email_name',

      'emailSubject' => 'Обратный звонок | Заявка с сайта',
      'emailTo' => ('emailsender'|option),
      'emailFrom' => ('emailsender'|option),
      'fieldNames'=> 'name_f==Имя, phone_f==Телефон, pageId==ID страницы',
      'validate' => 'phone_f:phone_f:required',
      'formName' => 'Обратный звонок | Заявка с сайта',
      'successMessage' => 'Сообщение успешно отправлено',
      'validationErrorMessage' => 'Проверьте правильность заполнения формы'
]}