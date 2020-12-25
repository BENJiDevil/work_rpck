/* mask for phone */
$('input.phone-input').mask('+7 ( 999 ) 999-99-99');
/* mask for name (without numbers) */
$('input.name-input').keypress(function (key) {
    if (key.charCode < 48 || key.charCode > 57) return true;
    return false;
});
/* mask for number (only numbers) */
$('input.number-input').keypress(function (key) {
    if (key.charCode < 48 || key.charCode > 57) return false;
    return true;
});
/* focus for phone */
$('input[name="phone_f"]').click(function() {
    this.focus();
    this.setSelectionRange(this.value.length, 4);
});