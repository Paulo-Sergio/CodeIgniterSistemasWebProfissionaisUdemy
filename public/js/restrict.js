$(function () {

  // EXIBIR MODAIS
  $('#btn_add_course').click(function () {
    clearErrors();
    $('#form_course')[0].reset()
    $('#course_img').attr("src", "")
    $('#modal_course').modal()
  })

  $('#btn_add_member').click(function () {
    $('#form_member')[0].reset()
    $('#member_photo').attr("src", "")
    $('#modal_member').modal()
  })

  $('#btn_add_user').click(function () {
    $('#form_user')[0].reset()
    $('#modal_user').modal()
  })

  /* input type file para anexar imagem */
  $('#btn_upload_course_img').change(function () {
    uploadImg($(this), $('#course_img'), $('#course_img_path'))
  })

  /* input type file para anexar foto */
  $('#btn_upload_member_photo').change(function () {
    uploadImg($(this), $('#member_photo'), $('#member_photo_path'))
  })

  /* Submissão do form de course */
  $("#form_course").submit(function () {

    $.ajax({
      type: "POST",
      url: BASE_URL + "restrict/ajaxSaveCourse",
      dataType: "json",
      data: $(this).serialize(),
      beforeSend: function () {
        clearErrors();
        $("#btn_save_course").siblings(".help-block").html(loadingImg("Verificando..."));
      },
      success: function (response) {
        clearErrors();
        if (response["status"]) {
          $("#modal_course").modal("hide");
          swal("Sucesso!", "Curso salvo com sucesso!", "success");
          dt_course.ajax.reload();
        } else {
          showErrorsModal(response["error_list"])
        }
      }
    })

    return false;
  });

  /* Submissão do form de member */
  $("#form_member").submit(function () {

    $.ajax({
      type: "POST",
      url: BASE_URL + "restrict/ajaxSaveMember",
      dataType: "json",
      data: $(this).serialize(),
      beforeSend: function () {
        clearErrors();
        $("#btn_save_member").siblings(".help-block").html(loadingImg("Verificando..."));
      },
      success: function (response) {
        clearErrors();
        if (response["status"]) {
          $("#modal_member").modal("hide");
          swal("Sucesso!", "Membro salvo com sucesso!", "success");
          dt_member.ajax.reload();
        } else {
          showErrorsModal(response["error_list"])
        }
      }
    })

    return false;
  });

  /* Submissão do form de user */
  $("#form_user").submit(function () {

    $.ajax({
      type: "POST",
      url: BASE_URL + "restrict/ajaxSaveUser",
      dataType: "json",
      data: $(this).serialize(),
      beforeSend: function () {
        clearErrors();
        $("#btn_save_user").siblings(".help-block").html(loadingImg("Verificando..."));
      },
      success: function (response) {
        clearErrors();
        if (response["status"]) {
          $("#modal_user").modal("hide");
          swal("Sucesso!", "Usuário salvo com sucesso!", "success");
          dt_user.ajax.reload();
        } else {
          showErrorsModal(response["error_list"])
        }
      }
    })
    return false;
  });

  /* clicar no btn para obter informações do usuário logado */
  $("#btn_your_user").click(function () {

    $.ajax({
      type: "POST",
      url: BASE_URL + "restrict/ajaxGetUserData",
      dataType: "json",
      data: { "user_id": $(this).attr("user_id") },
      success: function (response) {
        clearErrors();
        $("#form_user")[0].reset();
        $.each(response["input"], function (id, value) {
          $("#" + id).val(value);
        });
        $("#modal_user").modal();
      }
    })

    return false;
  });

})