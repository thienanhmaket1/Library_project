set pg_env="C:\Program Files\PostgreSQL\11\bin"
%pg_env%\pg_dump.exe -h 192.168.11.159 -p 5432 -U postgres kaigi > kaigi.sql
