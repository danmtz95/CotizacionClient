function initBarcode(objects) {
	objects.forEach((i) => {
		JsBarcode(i.id, i.code, i.options)
	})
}
