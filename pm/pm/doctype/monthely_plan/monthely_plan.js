// Copyright (c) 2025, Samuael Ketema and contributors
// For license information, please see license.txt

frappe.ui.form.on("Monthely Plan", {
	operational_plan(frm) {
		get_tasks_by_operational_plan(frm);
	},
	start_date(frm) {
		get_tasks_by_operational_plan(frm);
	},
	end_date(frm) {
		get_tasks_by_operational_plan(frm);
	},
});

function get_tasks_by_operational_plan(frm) {
	if (frm.doc.operational_plan && frm.doc.start_date && frm.doc.end_date) {
		frappe.call({
			method: "pm.pm.doctype.monthely_plan.monthely_plan.get_tasks_by_operational_plan",
			args: {
				operational_plan: frm.doc.operational_plan,
				start_date: frm.doc.start_date,
				end_date: frm.doc.end_date,
			},
			callback: function (r) {
				if (r.message) {
					frm.clear_table("tasks");
					r.message.forEach((task) => {
						frm.add_child("tasks", {
							task: task.task,
							start_date: task.start_date,
							end_date: task.end_date,
							duration: task.duration,
							qty: task.qty,
						});
					});
					frm.refresh_field("tasks");
				}
			},
		});
	}
}
