const res_reg_sucess = {
    "status": "success",
    "message": "User successfully registered!",
    "data": {
        "user_id": null,
        "username": null,
        "email": null,
        "full_name": null,
        "age": 0,
        "gender": null
    }
}
const res_get_tokens =
{
    "status": "success",
    "message": "Access token generated successfull",
    "data": {
        "access_token": null,
        "expires_in": 3600
    }
}
const res_store_data =
{
    "status": "success",
    "message": "Data stored successfully."
}
const res_retrieve_data =
{
    "status": "success",
    "data": {
        "key": null,
        "value": null
    }
}
const res_update_data = 
{
    "status": "success",
    "message": "Data updated successfully."
}
const res_delete_data =
{
    "status": "success",
    "message": "Data updated successfully."
}
const res_error_code = {
    "INVALID_REQUEST" : "Invalid request. Please provide all required fields: username, email, password, full_name.",
    "USERNAME_EXISTS" : "The provided username is already taken. Please choose a different username.",
    "EMAIL_EXISTS" : "The provided email is already registered. Please use a different email address.",
    "INVALID_PASSWORD" : " The provided password does not meet the requirements. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters.",
    "INVALID_AGE" : "Invalid age value. Age must be a positive integer.",
    "GENDER_REQUIRED": "Gender field is required. Please specify the gender (e.g., male, female, non-binary).",
    "INTERNAL_SERVER_ERROR" : "An internal server error occurred. Please try again later.",
    "INVALID_CREDENTIALS" : "Invalid credentials. The provided username or password is incorrect.",
    "MISSING_FIELDS" : "Missing fields. Please provide both username and password.",
    "INTERNAL_ERROR" : "Internal server error occurred. Please try again later.",
    "INVALID_KEY" : "The provided key is not valid or missing.",
    "INVALID_VALUE" : "The provided value is not valid or missing.",
    "KEY_EXISTS" : "The provided key already exists in the database. To update an existing key, use the update API.",
    "INVALID_TOKEN" : "Invalid access token provided.",
    "KEY_NOT_FOUND" : "The provided key does not exist in the database.",
    
}

module.exports = {res_reg_sucess,res_get_tokens,
    res_store_data, res_retrieve_data, res_update_data,
    res_delete_data, res_error_code
};

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV4YW1wbGVfdXNlciIsImlhdCI6MTY5MTIxOTg3MywiZXhwIjoxNjkxMjIzNDczfQ.90Qt9MOaPGkpUPH_U-453zVjafy1Ottx8Te7qaw3rew"
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV4YW1wbGVfdXNlciIsImlhdCI6MTY5MTIyMTE3NSwiZXhwIjoxNjkxMjI0Nzc1fQ.BKKLfkEBo_hQiLPO163iE-RdUQb8r5wQRA0vMA44G5s"