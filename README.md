# ToDo API

Todo api. you can signup and save your tasks to do :)

---

# Installation

1 - clone or download project somewhere in your computer.

2 - edit the config file in the config folder for check that if mongodb url and other variables are true. (both for `dev.env` and `test.env` files)

3 - run `npm install` to install the packages.

4 - run `npm test` to make sure updates didn't break anything.

5 - run `npm run dev` to start the server. and now you are able to send requests from your front-end project to the api.

# Usage

#### project is ready to use and you can find api end points in here:

---

# Signup User

users need to signup in the database to use the application

- ### URL

  /user/signup

- ### Method

  ##### `POST`

- ### Data Params

```javascript
  {
    username: 'devmobin',
    email: 'dev@gmail.com',
    password: 'mobin1234'
  }
```

these are required fields.

users can provide more information for their account like: `name`

- ### Success Response:
  - #### Code: 201
    #### Content:

```javascript
{
    user: {
        _id: "5d8b79e31381132868766c52",
        username: "devmobin",
        email: "dev@mobin.com",
        createdAt: "2019-09-25T14:29:55.926Z",
        updatedAt: "2019-09-25T14:29:56.230Z"
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC"
}
```

- ### Error Response:
  - #### Code: 400
    #### Content:

```javascript
{
  error: 'please enter all the required fields [username, email, password]'
}
```

OR:

- #### Code: 400
  #### Content:

```javascript
{
  error: 'username "devmobin" is already taken'
}
```

OR:

- #### Code: 400
  #### Content:

```javascript
{
  error: 'email is already exists'
}
```

---

# Login User

now you have an account and you need a valid jwt token for any operation. you can take it from signup response or for other devices you can login again.

for use that token you just need to take that and put in a header for next request

```javascript
.set('Authorization', `Bearer ${token}`)
```

now time to login:

- ### URL

  /user/login

- ### Method

  ##### `POST`

- ### Data Params

```javascript
  {
    email: 'dev@gmail.com',
    password: 'mobin1234'
  }
```

these are required fields.

- ### Success Response:
  - #### Code: 200
    #### Content:

```javascript
{
    user: {
        _id: "5d8b79e31381132868766c52",
        username: "devmobin",
        email: "dev@mobin.com",
        createdAt: "2019-09-25T14:29:55.926Z",
        updatedAt: "2019-09-25T14:29:56.230Z"
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC"
}
```

- ### Error Response:
  - #### Code: 400
    #### Content:

```javascript
{
  error: 'please enter all the required fields [email, password]'
}
```

OR:

for cases with invalid password

- #### Code: 400
  #### Content:

```javascript
{
  error: 'Unable to login'
}
```

---

# Read User Profile

this is for see your profile in database

- ### URL

  /user/me

- ### Method

  ##### `GET`

- only needs Bearer token in header

- ### Success Response:
  - #### Code: 200
    #### Content:

```javascript
{
    _id: "5d8a42640f717a0d2ac761b8",
    username: "devmobin",
    email: "devmobin@mobin.com",
    createdAt: "2019-09-24T16:20:52.172Z",
    updatedAt: "2019-09-25T15:03:30.017Z",
    name: "mobin"
}
```

- ### Error Response:
  - #### Code: 401
    #### Content:

```javascript
{
  error: 'please signup or login'
}
```

this is what you see without token

---

# Edit User Profile

this is for editing your profile in database

- ### URL

  /user/me

- ### Method

  ##### `PATCH`

- ### Data Params

```javascript
  {
    email: 'devcom@mobin.com',
    password: 'mobin12345'
  }
```

you can edit `'name', 'email', 'password', 'username'`.

just send anything you want to edit in request body

- ### Success Response:
  - #### Code: 200
    #### Content:

```javascript
{
    _id: "5d8a42640f717a0d2ac761b8",
    username: "devmobin",
    email: "devcom@mobin.com",
    createdAt: "2019-09-24T16:20:52.172Z",
    updatedAt: "2019-09-25T15:03:30.017Z",
    name: "mobin"
}
```

- ### Error Response:
  - #### Code: 401
    #### Content:

```javascript
{
  error: 'please signup or login'
}
```

this is what you see without token

OR:

- #### Code: 400
  #### Content:

```javascript
{
  error: 'Invalid updates!'
}
```

when you are editing invalid field in user profile like: `location`

OR:

- #### Code: 500

when you choose an email or username that used before :)

---

# Logout User

this is for delete your token and logout

- ### URL

  /user/logout

- ### Method

  ##### `GET`

- only needs Bearer token in header

- ### Success Response:

  - #### Code: 200

- ### Error Response:
  - #### Code: 401

this is what you see without token

---

# Logout User from all devices

this is for delete your tokens and logout from all devices

- ### URL

  /user/logoutAll

- ### Method

  ##### `GET`

- only needs Bearer token in header

- ### Success Response:

  - #### Code: 200

- ### Error Response:
  - #### Code: 401

this is what you see without token

---

# Delete User Profile

this will completely delete user and tasks that related to this user

- ### URL

  /user/me

- ### Method

  ##### `DELETE`

- only needs Bearer token in header

- ### Success Response:

  - #### Code: 200
    #### Content:

```javascript
{
    _id: "5d8a42640f717a0d2ac761b8",
    username: "devmobin",
    email: "devcom@mobin.com",
    createdAt: "2019-09-24T16:20:52.172Z",
    updatedAt: "2019-09-25T15:03:30.017Z",
    name: "mobin"
}
```

- ### Error Response:
  - #### Code: 401

this is what you see without token

---

### now the interesting part

# Create New Task

users signed up for create tasks and here is the way:

- ### URL

  /task/new

- ### Method

  ##### `POST`

- ### Data Params

```javascript
{
  title: 'finish the project'
}
```

- needs token header

you can also send `'description'` and `'completed'`.
but `'title'` is required

`description` -> string

`completed` -> boolean

- ### Success Response:
  - #### Code: 200
    #### Content:

```javascript
{
    completed: false,
    _id: "5d8b90681381132868766c57",
    title: "finish the project",
    owner: "5d8b79e31381132868766c52",
    createdAt: "2019-09-25T16:06:00.570Z",
    updatedAt: "2019-09-25T16:06:00.570Z",
    __v: 0
}
```

- ### Error Response:
  - #### Code: 401

this is what you see without token

OR:

- #### Code: 400
  #### Content:

```javascript
{
  error: 'please enter valid title for task'
}
```

---

# Get All User Tasks

return all tasks for this user

- ### URL

  /task/me

- ### Method

  ##### `GET`

- only needs Bearer token in header

- ### Success Response:

  - #### Code: 200
    #### Content:

```javascript
;[
  {
    completed: false,
    _id: '5d8b90681381132868766c57',
    title: 'eat dinner',
    owner: '5d8b79e31381132868766c52',
    createdAt: '2019-09-25T16:06:00.570Z',
    updatedAt: '2019-09-25T16:06:00.570Z',
    __v: 0
  },
  {
    completed: false,
    _id: '5d8b90681381132868766c57',
    title: 'finish the project',
    owner: '5d8b79e31381132868766c52',
    createdAt: '2019-09-25T16:06:00.570Z',
    updatedAt: '2019-09-25T16:06:00.570Z',
    __v: 0
  }
]
```

- ### Error Response:
  - #### Code: 401

this is what you see without token

---

# Get Tasks by id

return task by id

- ### URL

  /task/5d8b90681381132868766c57

- ### Method

  ##### `GET`

- needs Bearer token in header

- ### Success Response:

  - #### Code: 200
    #### Content:

```javascript
{
    completed: false,
    _id: "5d8b90681381132868766c57",
    title: "finish the project",
    owner: "5d8b79e31381132868766c52",
    createdAt: "2019-09-25T16:06:00.570Z",
    updatedAt: "2019-09-25T16:06:00.570Z",
    __v: 0
}
```

- ### Error Response:
  - #### Code: 401

this is what you see without token

OR:

- #### Code: 404

when task doesn't exist

---

# Edit Task

this is for editing task by id

- ### URL

  /task/5d8b90681381132868766c57

- ### Method

  ##### `PATCH`

- ### Data Params

```javascript
  {
    title: 'finish node project',
    completed: true,
  }
```

you can edit `'title', 'description', 'completed'`.

just send anything you want to edit in request body

- ### Success Response:
  - #### Code: 200
    #### Content:

```javascript
{
    completed: true,
    _id: "5d8b90681381132868766c57",
    title: "finish node project",
    owner: "5d8b79e31381132868766c52",
    createdAt: "2019-09-25T16:06:00.570Z",
    updatedAt: "2019-09-25T16:06:00.570Z",
    __v: 0
}
```

- ### Error Response:
  - #### Code: 401

this is what you see without token

OR:

- #### Code: 400
  #### Content:

```javascript
{
  error: 'Invalid updates!'
}
```

when you are editing invalid field in task like: `time`

---

# Delete Task

this will completely delete the task

- ### URL

  /task/5d8b90681381132868766c57

- ### Method

  ##### `DELETE`

- needs Bearer token in header

- ### Success Response:

  - #### Code: 200
    #### Content:

```javascript
{
    completed: true,
    _id: "5d8b90681381132868766c57",
    title: "finish node project",
    owner: "5d8b79e31381132868766c52",
    createdAt: "2019-09-25T16:06:00.570Z",
    updatedAt: "2019-09-25T16:06:00.570Z",
    __v: 0
}
```

- ### Error Response:
  - #### Code: 401

this is what you see without token

OR

- #### Code: 404
