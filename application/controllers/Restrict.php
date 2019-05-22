<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Restrict extends CI_Controller
{
  /** GERAR UM HASH DA SENHA 123456
   * echo password_hash("123456", PASSWORD_DEFAULT);
   */

  public function __construct()
  {
    parent::__construct();
    $this->load->library("session");
  }

  public function index()
  {
    if ($this->session->userdata("user_id")) {
      $data = array(
        "scripts" => array(
          "util.js",
          "restrict.js"
        )
      );
      $this->template->show("restrict", $data);
    } else {
      $data = array(
        "scripts" => array(
          "util.js",
          "login.js"
        )
      );

      $this->load->model("UserModel");
      $this->UserModel->getUserData("admin");

      $this->template->show('login', $data);
    }
  }

  public function logoff()
  {
    $this->session->sess_destroy();
    header("Location: " . base_url() . "restrict");
  }

  public function ajaxLogin()
  {
    if (!$this->input->is_ajax_request()) {
      exit("Nenhum acesso de script direto permitido!");
    }

    $json = array();
    $json['status'] = 1;
    $json['error_list'] = array();

    $username = $this->input->post("username");
    $password = $this->input->post("password");

    if (empty($username)) {
      $json['status'] = 0;
      $json['error_list']['#username'] = "Usuário não pode ser vazio!";
    } else {
      $this->load->model("UserModel");
      $result = $this->UserModel->getUserData($username);
      if ($result) {
        $userId = $result->user_id;
        $passwordHash = $result->password_hash;

        if (password_verify($password, $passwordHash)) {
          $this->session->set_userdata("user_id", $userId);
        } else {
          $json['status'] = 0;
        }
      } else {
        $json['status'] = 0;
      }

      if ($json['status'] == 0) {
        $json['error_list']['#btn_login'] = "Usuário e/ou senha incorretos!";
      }
    }

    echo json_encode($json);
  }

  public function ajaxImportImage()
  {
    if (!$this->input->is_ajax_request()) {
      exit("Nenhum acesso de script direto permitido!");
    }

    $config["upload_path"] = "./tmp/";
    $config["allowed_types"] = "gif|png|jpg";
    $config["overwrite"] = true;

    $this->load->library("upload", $config);

    $json = array();
    $json['status'] = 1;

    if (!$this->upload->do_upload("image_file")) {
      $json['status'] = 0;
      $json['error'] = $this->upload->display_errors("", "");
    } else {
      if ($this->upload->data()["file_size"] <= 1024) {
        $file_name = $this->upload->data()["file_name"];
        $json['img_path'] = base_url() . "tmp/" . $file_name;
      } else {
        $json['status'] = 0;
        $json['error'] = "Arquivo não deve ser maior que 1 MB";
      }
    }

    echo json_encode($json);
  }
}
