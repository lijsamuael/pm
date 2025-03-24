# Copyright (c) 2025, Samuael Ketema and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class WeeklyPlan(Document):
	pass



@frappe.whitelist()
def get_tasks_by_monthly_plan(monthly_plan, start_date, end_date):
    # Query tasks based on the selected monthly plan
    tasks = frappe.get_all('MP Tasks', filters=[{'parent': monthly_plan}, {'start_date': ["between", [start_date, end_date]]}], fields=['*'], order_by="start_date asc")

    return tasks