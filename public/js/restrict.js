$(function () {

  // EXIBIR MODAIS
  $('#btn_add_course').click(function () {
    clearErrors();
    $('#form_course')[0].reset()
    $('#course_img').attr("src", "")
    $('#modal_course').modal()
  })

  $('#btn_add_member').click(function () {
    $('#modal_member').modal()
  })

  $('#btn_add_user').click(function () {
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

})