function updateOrCreate (model, where, newItem, onCreate, onUpdate, onError) {
	// First try to find the record
	model.findOne({where: where}).then(function (foundItem) {
		if (!foundItem) {
			// Item not found, create a new one
			model.create(newItem)
				.then(onCreate)
				.catch(onError);
		} else {
			// Found an item, update it
			model.update(newItem, {where: where})
				.then(onUpdate)
				.catch(onError);
		}
	}).catch(onError);
}

module.exports = {
	updateOrCreate
};