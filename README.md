
# Experiment project
This project allows for central management of all experiments. Users can CRUD experiments as well as submit their responses. Common questions are added to all experiments so that users do not need to retype them everytime they create a new experiment.
## Authors

- [@Min Yang](https://github.com/evelynym)


## How to Run

Please follow the steps to  run this project

- You need to pull from both client and server repository
- Checkout to server folder and run npm i to install the dependencies
```bash
  npm i
```
- Checkout to client folder and run npm i to install the dependencies
```bash
  npm i
```
- Inside the server folder, start the backend by running
```bash
  npm start
```
- Inside the client folder and start the frontend by running
```bash
  npm start
```

## API Reference

#### Get all experiments

```http
  GET /experiments
```
#### Create a new experiment

```http
  POST /experiments/createExperiment
```

#### Get experiment by name

```http
  GET /experiments/fetchExperimentByName/${name}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of item to fetch |

#### Update experiment by id

```http
  PATCH /experiments/updateExperiment/${_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `_id`      | `Objective` | **Required**. The Key of experiments. |


#### Delete an experiment by Id
```http
  Delete /experiments/delete/${_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `_id`      | `Objective` | **Required**. The Key of experiments |

#### Check if the experiment exists by name
```http
  GET /experiments/isExistsExperimentByName/${name}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. The name of the experiment. |

#### Submit user response
```http
  POST /answers/submitAns
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. The name of the experiment. |



## Features

- A form page that displays the question set for the current experiment
- pages to add and delete experiment
- A page to edit the existing experiment


## Tech Stack

**Client:** React

**Server:** Node, Express

**Datebase:** MoogoDB


## Assumptions
- At least two options should be provided if the question type is multiple choice.
- Disabling an experiment means deleting the experiment.
- Experiment name should be unique.
- All questions are mandatory to answer.
- Only one answer can be selected from a list of options
- Name, email address, and phone are single line type.
- You don't need to add the comment questions in the create experiment page. (They will automatically be added on creation.)
## Feedback

If you have any feedback, please reach out to me at evelynym@outlook.com

