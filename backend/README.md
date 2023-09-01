# FLASK API
 - This is a Flask API where I can organize the back end app this are all the main API methods:


## /get_task_and_ddbb (GET)
 - With this method we can insert or publish new task and insert into our database (sqlite)

## /get_all_taks/<string:apiKey>/<string:orderBy> (GET)
 - Get all tasks from the database.
 - ApiKey is required
 - orderBy (optional) order our taks by and specific order, there are these options: 
     - dl_desc: Order by Deadline by its descend.
     - dl_asc: Orer by Deadline by ascend.
     - pred_flip: Order by its date of published but fliped.
     - pred: Order by its date of published.
 

## /remove_single_task/<string:apiKey>/<string:task_id> (GET)
 - Removes a task from the database, witch means remove the ask.
 - ApiKey is required.
 - Task_id is required.

## /edit_single_task/<string:apiKey>/<string:task_id> (POST)
 - Edit the task from the database, witch means that we are editing our task.
 - Apikey is required.
 - Task_id is required.

## /return_single_task/<string:apiKey>/<string:task_id> (GET)
 - Return a single task from the database from its ID.
 - Apikey is required.
 - Task_id is required.