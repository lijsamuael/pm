// Copyright (c) 2025, Samuael Ketema and contributors
// For license information, please see license.txt

// frappe.ui.form.on("BOQ", {
// 	refresh(frm) {

// 	},
// });

// Machinery
frappe.ui.form.on("Machinery", {
	rate: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		calculate_machinery_cost(frm, row);
	},
	hr: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		calculate_machinery_cost(frm, row);
	},
	machinery_items_remove: function (frm) {
		calculate_totals(frm);
	},
});

function calculate_machinery_cost(frm, row) {
	if (row.rate && row.hr) {
		frappe.model.set_value(row.doctype, row.name, "total_cost", row.rate * row.hr);
	}
	calculate_totals(frm);
}

// Manpower
frappe.ui.form.on("Manpower", {
	rate: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		calculate_manpower_cost(frm, row);
	},
	qty: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		calculate_manpower_cost(frm, row);
	},
	manpower_items_remove: function (frm) {
		calculate_totals(frm);
	},
});

function calculate_manpower_cost(frm, row) {
	if (row.rate && row.qty) {
		frappe.model.set_value(row.doctype, row.name, "total_cost", row.rate * row.qty);
	}
	calculate_totals(frm);
}

// Material
frappe.ui.form.on("Material", {
	rate: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		calculate_material_cost(frm, row);
	},
	qty: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		calculate_material_cost(frm, row);
	},
	material_items_remove: function (frm) {
		calculate_totals(frm);
	},
});

function calculate_material_cost(frm, row) {
	if (row.rate && row.qty) {
		frappe.model.set_value(row.doctype, row.name, "total_cost", row.rate * row.qty);
		calculate_totals(frm);
	}
}

// Function to calculate totals for each child table and main total
function calculate_totals(frm) {
	let machinery_cost = 0;
	let manpower_cost = 0;
	let material_cost = 0;

	// Sum up Machinery total cost
	(frm.doc.machinery_items || []).forEach((row) => {
		machinery_cost += row.total_cost || 0;
	});

	// Sum up Manpower total cost
	(frm.doc.manpower_items || []).forEach((row) => {
		manpower_cost += row.total_cost || 0;
	});

	// Sum up Material total cost
	(frm.doc.material_items || []).forEach((row) => {
		material_cost += row.total_cost || 0;
	});

	// Update fields in the main form
	frm.set_value("machinery_cost", machinery_cost);
	frm.set_value("manpower_cost", manpower_cost);
	frm.set_value("material_cost", material_cost);

	// Calculate grand total
	let grand_total = machinery_cost + manpower_cost + material_cost;
	frm.set_value("total_cost", grand_total);
}
