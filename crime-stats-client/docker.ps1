#get the sql server docker image
docker pull microsoft/mssql-server-windows-express
#run the sql express docker image 
docker run -d -p 1433:1433 -e sa_password='{your password}' -e ACCEPT_EULA=Y -v C:/Repos/CrimeStats/Data:C:/Repos/CrimeStats/Data -e attach_dbs="[{'dbName':'CrimeStats','dbFiles':['C:\\repos\\CrimeStats\\Data\\CrimeStats.mdf','C:\\repos\\CrimeStats\\Data\\CrimeStats.ldf']}]" microsoft/mssql-server-windows-express
#command to run the swagger-codegen tool and generate a typescript client
docker run --rm -v C:/Repos/CrimeStats/crime-stats-client/src:/local swaggerapi/swagger-codegen-cli generate -c /local/services/swagger-options.json -i /local/services/swagger.json  -l typescript-fetch -o /local/services