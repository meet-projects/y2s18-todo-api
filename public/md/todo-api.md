# MEET To-do API

* **URL:** `api.meet.sh/todo`

## Retrieve to-do list information 
* `api.meet.sh/todo/`
* **Method:** POST
* **Body Parameters:**
    * **<code>list</code>** The name of the list to retrieve.
    * **<code>password</code>** The password associated with the list.

## Update to-do list information
* `api.meet.sh/todo/edit`
* **Method:** POST
* **Body Parameters:**
    * **<code>list</code>** The name of the list to edit.
    * **<code>password</code>** The password associated with the list.
    * **<code>tasks</code>** A JSON string of a list of tasks. Each task in the list should have a `complete` (type: boolean) and `name` (type: string) attribute.

    