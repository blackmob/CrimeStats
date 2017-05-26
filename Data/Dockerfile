# escape=`
FROM microsoft/mssql-server-windows-express  
SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop';"]

EXPOSE 1433  
VOLUME C:/Repos/CrimeStats/Data:C:/Repos/CrimeStats/Data  
ENV sa_password w3asel-Monk3y 
ENV ACCEPT_EULA=Y 
ENV attach_dbs="[{'dbName':'CrimeStats','dbFiles':['C:\\repos\\CrimeStats\\Data\\CrimeStats.mdf','C:\\repos\\CrimeStats\\Data\\CrimeStats.ldf']}]"

