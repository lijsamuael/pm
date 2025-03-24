// Copyright (c) 2025, Samuael Ketema and contributors
// For license information, please see license.txt

frappe.ui.form.on("Weekly Plan", {
	monthly_plan(frm) {
		get_tasks_by_monthly_plan(frm);
	},
	start_date(frm) {
		get_tasks_by_monthly_plan(frm);
	},
	end_date(frm) {
		get_tasks_by_monthly_plan(frm);
	},
});

function get_tasks_by_monthly_plan(frm) {
	if (frm.doc.monthly_plan && frm.doc.start_date && frm.doc.end_date) {
		frappe.call({
			method: "pm.pm.doctype.weekly_plan.weekly_plan.get_tasks_by_monthly_plan",
			args: {
				monthly_plan: frm.doc.monthly_plan,
				start_date: frm.doc.start_date,
				end_date: frm.doc.end_date,
			},
			callback: function (r) {
				if (r.message) {
					console.log("response", r.message);
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
