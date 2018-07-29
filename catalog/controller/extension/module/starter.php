<?php

class ControllerExtensionModuleStarter extends Controller {
	
	public function index($setting) {
		
		//Load language file
		$this->language->load('extension/module/starter');

		//Set title from language file
		$data['heading_title'] = $this->language->get('heading_title');

		//Load Styles & Scripts
		// $this->document->addStyle('catalog/view/javascript/path/to/library.css');
		// $this->document->addScript('catalog/view/javascript/path/to/library.js');

		//Custom
		$data['variable'] = $setting['variable'];

		//Select template
		return $this->load->view('extension/module/starter', $data);

	}
}
