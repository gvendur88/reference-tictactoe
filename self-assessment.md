
----

1. Game URL (AWS) = 35.163.249.251:8080


## Scripts

Outline what script files you created and the purpose of each file. Each file should be commented. This could be

- einhverDjofulsKeyrsluskra

  This script is the one that gets the hash from my github, installs everything in the repository
  in client and then deletes the build folder and creates a new one with the newest modifcations.
  Then it creates a Docker file and then pushes it onto the docker hub.

- runNodeJS

  This script runs the production migrations for the database and then runs the run.js script
  that was premade for this assignment.

- jenkinsDeployScript

  A script that was created to copy files over to the ec2 machine from jenkins. When the newest files had been
  pushed from the github to jenkins in the commit-stage, then the deployment stage would run this script
  to copy .env and docker-compose.yaml over to the ec2 server to start up docker-compose. The script also
  starts up docker-compose as a deamon on the ec2 machine over ssh.



## Testing & logic

Outline what tests you created.

- UnitTests

  The ones I created were only the ones described in Day 7 on the syllabus.
  1. Create game
  2. Join game
  3. Join a full game
  4. Place a move
  5. Place an illegal move
  6. Try to place a move when it's not your turn
  7. Game won
  8. Game won on last move
  9. Game draw

  All the documentation for the tests is in coverage in the root folder.

- Is the game playable?

  Unfortunately the game is not playable because I didn't have enough time to implement that.
  And when the weekend came then we didn't have any help from TA's so any progress on this project
  stopped on friday before the turn in.

## Data migration

Did you create a data migration.

- Created a column for aggregate_id

  Created a databsae migration in server/migrations to update a table and add a column
  for aggregate_id. I didn't do anything to make it work for migration down.



## Jenkins

#### Do you have the following Jobs and what happens in each Job:

- commit-stage

  The commit stage runs each time I push something onto the github repository. It runs the
  einhverDjofulsKeyrsluskra script and checks if anything goes wrong in the setup of the
  project. Then this script runs another one called runNodeJS, that script migrates the production database.
  Then it runs run.js script to see if the project runs.

- export-to-ec2

  Copies the newest .env and docker-compose.yaml files over to the ec2 server and runs docker-compose up -d
  through an ssh connection.

#### Did you use any of the following features in Jenkins?

- Schedule or commit hooks

  Used Webhook in commit-stage job to hook everything that is pushed to my github and see if it works. Then I scheduled
  the export-to-ec2 job to start after commit-stage had finished.

- Login information for github

  Also I used a key tokem that I created from the github login information so that jenkins could
  access my github when running the commit-stage.


## Monitoring

Did you do any monitoring?

- URL to monitoring tool. Must be open or include username and pass.



## Other

Anything else you did to improve you deployment pipeline of the project itself?
