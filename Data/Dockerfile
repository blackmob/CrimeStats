# escape=`
FROM microsoft/mssql-server-windows-express  
SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop';"]

EXPOSE 1433  
VOLUME C:/Repos/CrimeStats/Data  
ENV sa_password w3asel-Monk3y ACCEPT_EULA=Y attach_dbs="[{'dbName':'CrimeStats','dbFiles':['C:\\repos\\CrimeStats\\Data\\CrimeStats.mdf','C:\\repos\\CrimeStats\\Data\\CrimeStats.ldf']}]"

#docker run -d -p 1433:1433 -e sa_password='w3asel-Monk3y' -e ACCEPT_EULA=Y -v C:/Repos/CrimeStats/Data:C:/Repos/CrimeStats/Data -e attach_dbs="[{'dbName':'CrimeStats','dbFiles':['C:\\repos\\CrimeStats\\Data\\CrimeStats.mdf','C:\\repos\\CrimeStats\\Data\\CrimeStats.ldf']}]" microsoft/mssql-server-windows-express

