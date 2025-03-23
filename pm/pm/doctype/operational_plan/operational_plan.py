# Copyright (c) 2025, Samuael Ketema and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class OperationalPlan(Document):
	pass





@frappe.whitelist()
def get_tasks_by_project(project):
    # Query tasks based on the selected project
    tasks = frappe.get_all('Task', filters=[{'project': project}, {'is_group': 0}], fields=['*'], order_by="exp_start_date asc")

    return tasks

