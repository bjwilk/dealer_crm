# Dealer CRM Project

This is the starter for the Dealer CRM project.

## Getting started

1. Clone this repository.

2. Install dependencies in root, backend and frontend

   ```bash
   npm install
   ```

3. Create a .env file in the backend folder with these varibles.
  PORT=<port_number>
  JWT_SECRET=<super_secret_number>
  JWT_EXPIRES_IN=<604800>
  SCHEMA=<schema_name>
  DATABASE_URL=<postgresql_database_url>

5. This project is designed to use Postgres in development and Production so you will need to have a postgres db created beforehand to connect project to.

6. This starter organizes all tables inside the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

7. Get into your backend folder, migrate your database, seed your database, and run your
   app:

   ```bash
   npx sequelize db:migrate
   ```

   ```bash
   npx sequelize db:seed:all
   ```

   ```bash
   npm start
   ```


8. To run the React frontend in development, `cd` into the frontend
   directory and run `npm run dev`

9. Before deploying to render or hosting site, cd into frontend folder and do 'npm run buil'.  Then push to your repo for deployment

## Deployment through Render.com

Refer to your Render.com deployment articles for more detailed instructions
about getting started with [Render.com], creating a production database, and
deployment debugging tips.

From the Render [Dashboard], click on the "New +" button in the navigation bar,
and click on "Web Service" to create the application that will be deployed.

Select that you want to "Build and deploy from a Git repository" and click
"Next". On the next page, find the name of the application repo you want to
deploy and click the "Connect" button to the right of the name.

Now you need to fill out the form to configure your app.

Start by giving your application a name.

Make sure the Region is set to the location closest to you, the Branch is set to
"main", and Runtime is set to "Docker". You can leave the Root Directory field
blank. (By default, Render will run commands from the root directory.)

Select "Free" as your Instance Type.

### Add environment variables

In the development environment, you have been securing your environment
variables in a __.env__ file, which has been removed from source control (i.e.,
the file is gitignored). In this step, you will need to input the keys and
values for the environment variables you need for production into the Render
GUI.

Add the following keys and values in the Render GUI form:

  -PORT=<port_number>
  -JWT_SECRET=<super_secret_number>
  -JWT_EXPIRES_IN=<604800>
  -SCHEMA=<schema_name>
  -DATABASE_URL=<postgresql_database_url>

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from the **External Database URL** field)

**Note:** Add any other keys and values that may be present in your local
.env file. As you work to further develop your project, you may need to add
more environment variables to your local .env file. Make sure you add these
environment variables to the Render GUI as well for the next deployment.

### Deploy

Now you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your Dockerfile
commands being executed and any errors that occur.

When deployment is complete, open your deployed site and check to see that you
have successfully deployed your Flask application to Render! You can find the
URL for your site just below the name of the Web Service at the top of the page.

**Note:** By default, Render will set Auto-Deploy for your project to true. This
setting will cause Render to re-deploy your application every time you push to
main, always keeping it up to date.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/
