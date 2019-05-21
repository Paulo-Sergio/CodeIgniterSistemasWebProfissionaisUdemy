$(function () {

  $("#login_form").submit(function() {

    $.ajax({
      type: "post",
      url: BASE_URL + "auth/ajaxLogin",
      dataType: "json",
      data: $(this).serialize(),
      beforeSend: function() {
        clearErrors();
        $("#btn_login").parent().siblings(".help-block").html(loadingImg("Verificando..."));
      },
      success: function(json) {
        if (json['status'] == 1) {
          clearErrors();
          $("#btn_login").parent().siblings(".help-block").html(loadingImg("Logando..."));
          window.location = BASE_URL + "auth";
        } else {
          showErrors(json['error_list']);
        }
      },
      error: function(resp) {
        console.log(resp);
      }
    });

    return false;
  });

})