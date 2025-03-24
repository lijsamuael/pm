# Copyright (c) 2025, Samuael Ketema and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class MonthelyPlan(Document):
	pass



@frappe.whitelist()
def get_tasks_by_operational_plan(operational_plan, start_date, end_date):
    # Query tasks based on the selected operational plan
    tasks = frappe.get_all('OP Tasks', filters=[{'parent': operational_plan}, {'start_date': ["between", [start_date, end_date]]}], fields=['*'], order_by="start_date asc")

    return tasks
