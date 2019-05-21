<?php

class UserModel extends CI_Model
{

  public function __construct()
  {
    parent::__construct();
    $this->load->database();
  }

  public function getUserData($userLogin)
  {
    $this->db
      ->select("user_id, password_hash, user_full_name, user_email")
      ->from("users")
      ->where("user_login", $userLogin);

    $result = $this->db->get();

    if ($result->num_rows() > 0) {
      return $result->row();
    } else {
      return null;
    }
  }
}
