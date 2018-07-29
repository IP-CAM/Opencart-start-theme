<?php
class ControllerExtensionModuleMy extends Controller {
	public function index($setting) {

		$data['setting'] = $setting;

		return $this->load->view('extension/module/my', $data);
	}
}