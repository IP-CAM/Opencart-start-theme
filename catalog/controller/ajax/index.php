<?php
class ControllerAjaxIndex extends Controller {
	public function index() {
		$this->language->load('ajax/index');
		$this->load->model('catalog/product');

		$data['heading_title'] = $this->language->get('heading_title');

		//Load Styles & Scripts
		// $this->document->addStyle('catalog/view/javascript/path/to/library.css');
		// $this->document->addScript('catalog/view/javascript/path/to/library.js');

		$product = [
			'price' => '50 ue',
			'id' => '10',
			'name' => 'Test Product'
		];
		$data['json'] = json_encode($product);
		$this->response->setOutput($this->load->view('ajax/index', $data));
	}
}