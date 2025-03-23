// Copyright (c) 2025, Samuael Ketema and contributors
// For license information, please see license.txt

frappe.ui.form.on("Operational Plan", {
	project: function (frm) {
		frappe.call({
			method: "pm.pm.doctype.operational_plan.operational_plan.get_tasks_by_project",
			args: { project: frm.doc.project },
			callback: function (response) {
				if (response.message) {
					// Clear existing tasks
					frm.clear_table("tasks");

					// Store the last task for predecessor calculation
					let previousTask = null;

					response.message.forEach((task, index) => {
						let duration = 0,
							leadDays = 0,
							lagDays = 0,
							predecessor = "";

						if (task.exp_start_date && task.exp_end_date) {
							const startDate = new Date(task.exp_start_date);
							const endDate = new Date(task.exp_end_date);
							duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

							if (previousTask) {
								const prevEndDate = new Date(previousTask.exp_end_date);
								predecessor = previousTask.name;

								// Calculate Lead and Lag Days
								if (startDate < prevEndDate) {
									leadDays = Math.ceil(
										(prevEndDate - startDate) / (1000 * 60 * 60 * 24)
									); // Overlapping days
								} else if (startDate > prevEndDate) {
									lagDays = Math.ceil(
										(startDate - prevEndDate) / (1000 * 60 * 60 * 24)
									); // Delay days
								}
							}
						}

						// Add to child table
						frm.add_child("tasks", {
							start_date: task.exp_start_date,
							end_date: task.exp_end_date,
							duration: duration,
							task: task.name,
							predecessor_task: predecessor,
							lead_days: leadDays,
							lag_days: lagDays,
						});

						// Set current task as predecessor for the next one
						previousTask = task;
					});

					frm.refresh_field("tasks");
				}
			},
		});
	},
});
