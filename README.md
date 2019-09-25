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
