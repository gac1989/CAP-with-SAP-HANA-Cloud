# Getting Started

Welcome to your new CAP project.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`readme.md` | this getting started guide

## Startup - SAP CAP with SAP HANA Cloud Service

#### Prerequisites
- SAP Business Application Studio
- A running HDB instance
- Login to Cloud Foundry with your BTP user

#### Steps

- Run `git clone https://github.com/gac1989/CAP-with-SAP-HANA-Cloud.git`
- Run `npm install`

##### HANA

- Run `cds build --production` to generate the HANA artifacts.
- Bind your local project to the HANA database using the **SAP HANA Projects** panel.
- From the wizard, select **Bind to an HDI container** > **Create a new service instance** > Name it `MyHANAApp-dev-00`.
- From the **SAP HANA Projects** panel, deploy to the HANA Cloud Service.
- Run `cds add data --records 5` to generate mock data for testing.
- In your **HANA Database Explorer**, load the CSV files into their respective tables.
- Run `cds bind -2 MyHANAApp-dev-00:SharedDevKey` to bind your local project to your HDB.

##### Security

- Run `cf create-service xsuaa application MyHANAApp-auth -c xs-security.json` to create the XSUAA instance.
- Run `cf create-service-key MyHANAApp-auth default` to create the service key for the instance.
- Run `cds bind -2 MyHANAApp-auth:default` to bind your local project to the generated XSUAA.
- Run `npm install --prefix app/router` to install the Approuter packages.

##### Testing

- Open two terminals.
- Run `cds add approuter` to refresh your Approuter MTA module (if necessary).
- In the first terminal, run: `cds watch --profile hybrid` to start the local CAP project with HDB.
- In the second terminal, run: `cds bind --exec -- npm start --prefix app/router` to start the Approuter and test the application.

## Learn More

Learn more at <https://cap.cloud.sap>.
