<?php

class TeamModel extends CI_Model
{

  public function __construct()
  {
    parent::__construct();
    $this->load->database();
  }

  public function getData($id, $select = null)
  {
    if (!empty($select)) {
      $this->db->select($select);
    }
    $this->db->from("team");
    $this->db->where("member_id", $id);
    return $this->db->get();
  }

  public function insert($data)
  {
    $this->db->insert("team", $data);
  }

  public function update($id, $data)
  {
    $this->db->where("member_id", $id);
    $this->db->update("team", $data);
  }

  public function delete($id)
  {
    $this->db->where("member_id", $id);
    $this->db->delete("team");
  }

  public function isDuplicate($field, $value, $id = null)
  {
    if (!empty($id)) {
      $this->db->where("member_id <>", $id);
    }
    $this->db->from("team");
    $this->db->where($field, $value);

    $result = $this->db->get();
    return ($result->num_rows() > 0);
  }
}
