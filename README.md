# Usyd_Hackton

download mysql at https://dev.mysql.com/downloads/mysql/

remember to do all the listed thingss

create a database named hackton
create a user named netShareAdmin with password admin

    MySql commands:
        CREATE DATABASE hackton;
        CREATE USER 'netShareAdmin'@'localhost' IDENTIFIED BY 'admin';
        GRANT ALL PRIVILEGES ON hackton.* TO 'netShareAdmin'@'localhost';
        FLUSH PRIVILEGES;
        Connect hackton

pip install -r requirements.txt

python main.py
